//==========================================================================
// Eli_ExpByLevel.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Actor gains exp according to their level.
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Adds a new method of obtaining experience according to the actor's level.

============================================================================
How to use
============================================================================

There are two ways for this plugin to work. You can choose the way you 
prefer via plugin parameters:

Basic
• Actors with the same level or below as the enemy will gain the 
experience defined in the database.
• Actors with a level above the enemy will not gain experience according 
to the level difference.

Dynamic
• Actors with a level below the enemy will gain an experience bonus 
according to the level difference.
• Actors with the same level as the enemy will gain the experience 
defined in the database.
• Actors with a level above the enemy will not gain experience according 
to the level difference.

The experience loss or gain is defined on the plugin parameter 
by % values.

See the example below where an enemy has 100 Exp defined in the database:

Percentage in the parameters = 10%.
• Enemy level 5 → 100 Exp

• Actor level 3 → You are two levels below the enemy. So you will gain 20% 
extra experience that this enemy would give. In this case, you would 
earn 120 instead of 100.
• Actor level 5 → You are on the same level. Will get 100 Exp (100%)
• Actor level 7 → You are two levels above the enemy. So you will lose 20% 
experience that this enemy would give. In this case, you would get 80 
instead of 100.

You can set the level of enemies with the following note:
• <EnLevel: 10>
Or if you want to change the value during the game:
• <EnLevel: \v[id]>

If you don't set a level for the enemy, it will always give full exp.

Also, you can customize it even further if you set a note tag on the class 
note field:

<ExpByLevelPlus: number>
If none is set, it will be 0.

This is useful if you have some kind of system that lets the actor gain 
less exp when killing an enemy, even if the actor itself is on a lower 
level, but in a different class.

Let's see another example:
• Enemy level 5 → 100 Exp

• Actor level 1 & <ExpByLevelPlus: 2> (1 + 2 = 3) → Two levels below.
• Actor level 3 & <ExpByLevelPlus: 0> (5 + 0 = 5) → Same level.
• Actor level 5 & <ExpByLevelPlus: 2> (5 + 2 = 7) → Two levels above.

NOTE¹: If you are using Eli Enemy Class, you can ignore these note tags as 
they will take the ones from the Enemy Class Plugin(Except the 
ExpByLevelPlus. That, regarding the actor, will work with or without the 
enemy class. But to work with the enemy, you need the class enemy plugin).

NOTE²: All notes are case-sensitive.

============================================================================
Update Log
============================================================================

https://tinyurl.com/expByLevel

============================================================================

@param rule
@text Rule
@type select
@option Basic
@option Dynamic
@desc Please, see help file.
@default 10

@param percent
@text Exp Difference %
@type number
@min 0
@max 100
@desc How much experience the actor will lose or gain per level difference from the enemy(percent)
@default 10

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ExpByLevel = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ExpByLevel = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-exp-by-level-for-rpg-maker",
    parameters: {percent: 0, rule: ""},
    alias: {},
    lastExp: [],

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    getLastExp(){
        return this.lastExp
    },

    setActorLastExp(actorId, exp){
        this.lastExp[actorId] = exp
    },

    getActorLastExp(actorId){
        return this.lastExp[actorId]
    },

}

const Plugin = Eli.ExpByLevel
const Alias = Eli.ExpByLevel.alias

Plugin.initialize()

/* ----------------------------- BATTLE MANAGER ----------------------------- */
{

Alias.BattleManager_makeRewards = BattleManager.makeRewards
BattleManager.makeRewards = function() {
    Alias.BattleManager_makeRewards.call(this)
    this.makeExpByLevelForActors()
}

// Overwrite
BattleManager.gainExp = function() {
    for(const actor of $gameParty.allMembers()){
        const exp = Plugin.getActorLastExp(actor._actorId)
        actor.gainExp(exp)
    }
}

// Overwrite
BattleManager.displayExp = function() {
    const actors = $gameParty.battleMembers()

    for (const actor of actors){
        const exp = Plugin.getActorLastExp(actor.actorId())

        if(exp){
            const text = `${actor.name()} received ${exp} Exp!`
            $gameMessage.add("\\." + text)
        }
    }
}

BattleManager.makeExpByLevelForActors = function(){
    const enemies = $gameTroop.members()
    const party = $gameParty.allMembers()

    for(const member of party){
        const extraLevel = member.currentClass().meta.ExpByLevelPlus || 0
        const memberLevel = member._level + Number(extraLevel)
        let exp = 0

        for(const enemy of enemies){
            const enemyLevel = enemy.getLevel() === NaN ? memberLevel : enemy.getLevel()
            
            if(memberLevel > enemyLevel){
                exp += this.getExpByLevelDifference(memberLevel, enemyLevel, enemy)

            }else if(memberLevel === enemyLevel){
                exp += this.getFullEnemyExp(enemy)

            }else if(memberLevel < enemyLevel && Plugin.param().rule === "Dynamic"){
                const extra = this.getExpByLevelDifference(memberLevel, enemyLevel, enemy) - this.getFullEnemyExp(enemy)
                exp += this.getFullEnemyExp(enemy) + extra

            }else{
                exp += this.getFullEnemyExp(enemy)
            }
        }

        Plugin.setActorLastExp(member.actorId(), exp)
    }
}

BattleManager.getExpByLevelDifference = function(memberLevel, enemyLevel, enemy){
    const xpPercent = Plugin.param().percent
    const difference = memberLevel - enemyLevel
    const totalPercent = Math.min(difference * xpPercent, 100)
    const newExp = enemy.exp() - (enemy.exp() * totalPercent) / 100

    return Math.max(0, Math.floor(newExp))
}

BattleManager.getFullEnemyExp = function(enemy){
    return enemy.exp()
}

}

/* ------------------------------- GAME ENEMY ------------------------------- */
{

Game_Enemy.prototype.getLevel = function(){
    if(Imported.Eli_EnemyClass && this._classId > 0){
        return this.getLevelByClass()
    }else{
        return this.getLevelByMeta()
    }
}

Game_Enemy.prototype.getLevelByClass = function(){
    const meta = this.currentClass().meta
    const extraLevel = meta.ExpByLevelPlus || 0

    return this._level + Number(extraLevel)
}

Game_Enemy.prototype.getLevelByMeta = function(){
    const meta = this.enemy().meta

    if(meta.hasOwnProperty('EnLevel')){
        return Number(Eli.Utils.convertEscapeVariablesOnly(meta.EnLevel))
    }else{
        return NaN
    }
}

}

}
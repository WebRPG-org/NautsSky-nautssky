//============================================================================
// Eli_TpSystem.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Enhance the default TP System!
@author Hakuen Studio

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/hakuen-studio-tp-system-for-rpg-maker/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Requirements
==============================================================================

Need Eli Book.
Order After Eli Book.

==============================================================================
Features
==============================================================================

● Let battlers start with custom TP values.
● States can affect the Start TP Value with note tags.
● Change the max TP value for each battler.
● Optionally, set TP Regeneration to work only on battle.
● Optionally, remove the gain of TP when inflicting damage.
● Optionally, remove the gain of TP when using items or skills 
(Database > item/Skill > Tp Gain).

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/1ijBWqPWq-19yYp8TwJaEmKZKTuXVuDyGvuNBIIAPLgw/edit?usp=sharing

============================================================================

@param chargeTpByDamage
@text Charge Tp By Damage
@type boolean
@desc If true, battlers will gain TP when inflict damage on enemies.
@default false

@param chargeTpByAction
@text Charge Tp By Action
@type boolean
@desc If true, battlers will gain TP when using items or skills through their Database TP Gain field.
@default false

@param regenTpOnBattle
@text Tp Regen Only On Battle
@type boolean
@desc If true, the actors will only regenerate TP on the battle scene.
@default true

@param Actor

@param actorStartTp
@text Default Start Tp
@type note
@desc The default TP value each actor will have when start the battle.
@default 50
@parent Actor

@param actorMaxTp
@text Default Max Tp
@type note
@desc The default Max TP value for each actor.
@default 100
@parent Actor

@param Enemy

@param enemyStartTp
@text Default Start Tp
@type note
@desc The default TP value each enemy will have when start the battle.
@default 50
@parent Enemy

@param enemyMaxTp
@text Default Max Tp
@type note
@desc The default Max TP value for each enemy.
@default 100
@parent Enemy

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_TpSystem = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.TpSystem = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/hakuen-studio-tp-system-for-rpg-maker",
    alias: {},
    parameters: {
        actorStartTp: () => {},
        actorMaxTp: () => {},
        enemyStartTp: () => {},
        enemyMaxTp: () => {},
        chargeTpByDamage: false,
        chargeTpByAction: false,
        regenTpOnBattle: true,
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_TpSystem")
        this.parameters.actorStartTp = new Function(`return ${JSON.parse(parameters.actorStartTp)}`)
        this.parameters.actorMaxTp = new Function(`return ${JSON.parse(parameters.actorMaxTp)}`)
        this.parameters.enemyStartTp = new Function(`return ${JSON.parse(parameters.enemyStartTp)}`)
        this.parameters.enemyMaxTp = new Function(`return ${JSON.parse(parameters.enemyMaxTp)}`)
        this.parameters.chargeTpByDamage = parameters.chargeTpByDamage === "true"
        this.parameters.chargeTpByAction = parameters.chargeTpByAction === "true"
        this.parameters.regenTpOnBattle = parameters.regenTpOnBattle === "true"
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

}

const Plugin = Eli.TpSystem
const Alias = Eli.TpSystem.alias

Plugin.initialize()

/* ------------------------------ GAME BATTLER ------------------------------ */

Alias.Game_Battler_initTp = Game_Battler.prototype.initTp
Game_Battler.prototype.initTp = function(){
    Alias.Game_Battler_initTp.call(this)
    this.setStartTp()
}

Game_Battler.prototype.setStartTp = function(){
    const baseTp = this.getBaseTp()
    const stateTp = this.getStateStartTp()
    const finalTp = Math.floor(baseTp + stateTp)
    this.setTp(finalTp)
}

Game_Battler.prototype.getBaseTp = function(){
    return 0 // Overwrite by actor and enemy.
}

Game_Battler.prototype.getStateStartTp = function(){
    let stateTp = 0

    for(const state of this.states()){
        if(state.meta.hasOwnProperty("StartTp")){
            const func = new Function(`return ${state.meta.StartTp}`).bind(this)
            stateTp += func()
        }
    }

    return stateTp
}

Alias.Game_Battler_chargeTpByDamage = Game_Battler.prototype.chargeTpByDamage
Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
    if(Plugin.param().chargeTpByDamage){
        Alias.Game_Battler_chargeTpByDamage.call(this, damageRate)
    }
}

Alias.Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp
Game_Battler.prototype.regenerateTp = function() {
    if(Plugin.param().regenTpOnBattle){

        if(SceneManager._scene instanceof Scene_Battle){
            Alias.Game_Battler_regenerateTp.call(this)
        }

    }else{
        Alias.Game_Battler_regenerateTp.call(this)
    }
}

/* ------------------------------- GAME ACTOR ------------------------------- */

Game_Actor.prototype.getBaseTp = function(){
    if(this.actor().meta.hasOwnProperty("StartTp")){
        const func = new Function(`return ${this.actor().meta.StartTp}`).bind(this)
        return func()
    }else{
        const func = Plugin.param().actorStartTp.bind(this)
        return func()
    }
}

Game_Actor.prototype.getMaxTp = function(){
    if(this.actor().meta.hasOwnProperty("MaxTp")){
        const func = new Function(`return ${this.actor().meta.MaxTp}`).bind(this)
        return func()
    }else{
        const func = Plugin.param().actorMaxTp.bind(this)
        return func()
    }
}

Game_Actor.prototype.maxTp = function() {
    return this.getMaxTp()
}

/* ------------------------------- GAME ENEMY ------------------------------- */

Game_Enemy.prototype.getBaseTp = function(){
    if(this.enemy().meta.hasOwnProperty("StartTp")){
        const func = new Function(`return ${this.enemy().meta.StartTp}`).bind(this)
        return func()
    }else{
        const func = Plugin.param().enemyStartTp.bind(this)
        return func()
    }
}

Game_Enemy.prototype.getMaxTp = function(){
    if(this.enemy().meta.hasOwnProperty("MaxTp")){
        const func = new Function(`return ${this.enemy().meta.MaxTp}`).bind(this)
        return func()
    }else{
        const func = Plugin.param().enemyMaxTp.bind(this)
        return func()
    }
}

Game_Enemy.prototype.maxTp = function() {
    return this.getMaxTp()
}

/* ------------------------------- GAME ACTION ------------------------------ */

Alias.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect
Game_Action.prototype.applyItemUserEffect = function(target) {
    if(Plugin.param().chargeTpByAction){
        Alias.Game_Action_applyItemUserEffect.call(this, target)
    }
}

}
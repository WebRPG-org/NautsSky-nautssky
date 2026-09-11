//==========================================================================
// Eli_StaticExp.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Sets an static exp value to level up.
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
==============================================================================
Plugin Order
==============================================================================

Order after Eli Enemy Class

==============================================================================
Features
==============================================================================

• Set a static exp value that the actors will need to have to level up.
• Set different static exp value based on class id.

==============================================================================
How to use
==============================================================================

Just config the plugin parameter.

You can choose a static value per class id too. But if you don't use it, 
the actor will take the default value.

============================================================================
Update Log
============================================================================

https://tinyurl.com/staticExpLog

============================================================================

@param default
@text Static value
@type text
@desc Choose the default static exp value to level up.
@default 100

@param classExp
@text Class Static Exp
@type text[]
@desc Choose the static exp value for each class.
[ClassId, value]
@default []

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_StaticExp = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.StaticExp = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-static-exp-for-rpg-maker-mz",
    parameters: {default: 100, classExp: {}},
    alias: {},

    param(){
        return this.parameters
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.formatParameters()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){

    },

    formatParameters(){
        const obj = {};
        const classExp = this.parameters.classExp
        if(classExp.length > 0){
            for(let i = 0; i < classExp.length; i++){
                const [classId, value] = classExp[i].split(",")
                obj[classId] = value
            }
            this.parameters.classExp = obj
        }
    },

}

const Plugin = Eli.StaticExp
const Alias = Eli.StaticExp.alias

Plugin.initialize()

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Game_Actor.prototype.getDefaultExpForLevelUp = function() {
    const param = Plugin.param()
    if(param.classExp.hasOwnProperty(this._classId)){
        return param.classExp[this._classId]
    }else{
        return param.default
    }
}

Game_Actor.prototype.expForLevel = function(level) {
    const exp = this.getDefaultExpForLevelUp()
    const nextLevel = exp * (level-1)

    return nextLevel
}

}

/* ------------------------------- GAME ENEMY ------------------------------- */
if(Imported.Eli_EnemyClass){

Game_Enemy.prototype.getDefaultExpForLevelUp = function() {
    const param = Plugin.param()
    if(param.classExp.hasOwnProperty(this._classId)){
        return param.classExp[this._classId]
    }else{
        return param.default
    }
}

Alias.Game_Enemy_expForLevel = Game_Enemy.prototype.expForLevel
Game_Enemy.prototype.expForLevel = function(level) {
    if(this._classId > 0){
        const exp = this.getDefaultExpForLevelUp()
        const nextLevel = exp * (level-1)
        return nextLevel
    }else{
        return Alias.Game_Enemy_expForLevel.call(this, level)
    }

}
    
}

}
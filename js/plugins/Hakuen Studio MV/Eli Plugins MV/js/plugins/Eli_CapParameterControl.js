//==========================================================================
// Eli_CapParameterControl.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Manage how the actor can exceed the cap value.
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/cap-parameter-control-for-rpg-maker-mz/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Requirements
============================================================================

Need Eli Class Curves
Order After Eli Class Curves

============================================================================
Features
============================================================================

• Can choose to exceed the maximum/limit/cap value of a parameter by using 
Items, Equips, Traits, or Buff rates.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1b5dtiJEnNzMPbBVX7JJpwiF3O-2bK7u02n950imYE9E/edit?usp=sharing

============================================================================

@param capEquip
@text Equipment Plus
@type boolean
@desc If true, the cap value may be exceeded by equipment.
@default false

@param capItem
@text Item Plus
@type boolean
@desc If true, the cap value may be exceeded by items(grow effect and add param event command).
@default false

@param capTrait
@text Trait Plus
@type boolean
@desc If true, the cap value may be exceeded by param rates(traits).
@default false

@param capBuff
@text Buff Plus
@type boolean
@desc If true, the cap value may be exceeded by buff rates.
@default false

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CapParameterControl = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.CapParameterControl = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/cap-parameter-control-for-rpg-maker-mz",
    parameters: {
        capEquip: false,
        capBuff: false,
        capTrait: false,
        capItem: false,
    },
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_CapParameterControl")
        this.parameters.capEquip = parameters.capEquip === "true"
        this.parameters.capBuff = parameters.capBuff === "true"
        this.parameters.capTrait = parameters.capTrait === "true"
        this.parameters.capItem = parameters.capItem === "true"
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },
}

const Plugin = Eli.CapParameterControl
const Alias = Eli.CapParameterControl.alias

Plugin.initialize()

/* ---------------------------- GAME BATTLER BASE --------------------------- */
{
// Only get the equip value instead of the whole plus.
Game_BattlerBase.prototype.getEquipParameters = function(paramId){
    let value = 0
    for(const equip of this.equips()){
        if(equip){
            value += equip.params[paramId]
        }
    }
    return value
}

Game_BattlerBase.prototype.getEquipCParameters = function(paramId){
    let value = 0
    for(const equip of this.equips()){
        if(equip){
            value += equip.cparams[paramId]
        }
    }
    return value
}

}

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Alias.Game_Actor_param = Game_Actor.prototype.param;
Game_Actor.prototype.param = function(paramId) {
    const alias = Alias.Game_Actor_param.call(this, paramId)
    const baseValue = this.paramBase(paramId)
    const equipValue = this.getEquipParameters(paramId)
    const itemValue = Math.max(0, (this.paramPlus(paramId) -equipValue))
    const rateValue = this.paramRate(paramId)
    const buffValue = this.paramBuffRate(paramId)
    const maxValue = this.capParamCurve(paramId)
    const minValue = this.paramMin(paramId)

    const {capItem, capEquip, capTrait, capBuff} = Plugin.param()

    // Attempt to track down the extra values added from other plugins,
    // by removing all the default values that calc a parameter.
    // Then take what is left. It can be added before or after
    // the calculations of plus values.
    let extraValues = (baseValue + equipValue + itemValue) * rateValue * buffValue
    extraValues = Math.floor( Math.max(0, (alias - extraValues)) )
    
    let equipPlus = 0
    let itemPlus = 0
    let traitPlus = 0
    let buffPlus = 0

    let currentValue = extraValues
    currentValue += baseValue

    currentValue += itemValue
    if(currentValue > maxValue){
        itemPlus = currentValue - maxValue
    }

    currentValue += equipValue
    if(currentValue > maxValue){
        equipPlus = (currentValue - maxValue) - itemPlus
    }

    currentValue = Math.floor(currentValue * rateValue)
    if(currentValue > maxValue){
        traitPlus = (currentValue - maxValue) - (itemPlus + equipPlus)
    }

    currentValue = Math.floor(currentValue * buffValue)
    if(currentValue > maxValue){
        buffPlus = (currentValue - maxValue) - (itemPlus + equipPlus + traitPlus)
    }

    itemPlus     = capItem   ? 0 : itemPlus
    equipPlus    = capEquip  ? 0 : equipPlus
    traitPlus    = capTrait  ? 0 : traitPlus
    buffPlus     = capBuff   ? 0 : buffPlus

    const plusValues = itemPlus + equipPlus + traitPlus + buffPlus
    const value = currentValue - plusValues

    return Math.max(minValue, value)
}
    
if(Imported.Eli_CustomParameter){

Alias.Game_Actor_cparam = Game_Actor.prototype.cparam
Game_Actor.prototype.cparam = function(paramId) {
    const alias = Alias.Game_Actor_cparam.call(this, paramId)
    const baseValue = this.cparamBase(paramId)
    const equipValue = this.getEquipCParameters(paramId)
    const itemValue = Math.max(0, (this.cparamPlus(paramId) - equipValue))
    const rateValue = this.cparamRate(paramId)
    const buffValue = this.cparamBuffRate(paramId)
    const maxValue = this.capParamCurve(paramId, true)
    const minValue = this.paramMin(paramId, true)

    const {capItem, capEquip, capTrait, capBuff} = Plugin.param()

    // Attempt to track down the extra values added from other plugins,
    // by removing all the default values that calc a parameter.
    // Then take what is left. It can be added before or after
    // the calculations of plus values.
    let extraValues = (baseValue + equipValue + itemValue) * rateValue * buffValue;
    extraValues = Math.floor(Math.max(0, (alias - extraValues)))
    
    let equipPlus = 0
    let itemPlus = 0
    let traitPlus = 0
    let buffPlus = 0

    let currentValue = extraValues
    currentValue += baseValue

    currentValue += itemValue
    if(currentValue > maxValue){
        itemPlus = currentValue - maxValue
    }

    currentValue += equipValue
    if(currentValue > maxValue){
        equipPlus = (currentValue - maxValue) - itemPlus
    }

    currentValue = Math.floor(currentValue * rateValue)
    if(currentValue > maxValue){
        traitPlus = (currentValue - maxValue) - (itemPlus + equipPlus)
    }

    currentValue = Math.floor(currentValue * buffValue)
    if(currentValue > maxValue){
        buffPlus = (currentValue - maxValue) - (itemPlus + equipPlus + traitPlus)
    }

    itemPlus     = capItem   ? 0 : itemPlus
    equipPlus    = capEquip  ? 0 : equipPlus
    traitPlus    = capTrait  ? 0 : traitPlus
    buffPlus     = capBuff   ? 0 : buffPlus

    const plusValues = itemPlus + equipPlus + traitPlus + buffPlus
    const value = currentValue - plusValues

    return Math.max(minValue, value)
}

} // Imported Custom Parameter

}
    
/* ------------------------------- GAME ENEMY ------------------------------- */
if(Imported.Eli_EnemyClass){

Alias.Game_Enemy_param = Game_Enemy.prototype.param
Game_Enemy.prototype.param = function(paramId) {
    const alias = Alias.Game_Enemy_param.call(this, paramId)

    if(this._classId > 0){
        const baseValue = this.paramBase(paramId)
        const equipValue = this.getEquipParameters(paramId)
        const itemValue = Math.max(0, (this.paramPlus(paramId) - equipValue))
        const rateValue = this.paramRate(paramId)
        const buffValue = this.paramBuffRate(paramId)
        const maxValue = this.capParamCurve(paramId)
        const minValue = this.paramMin(paramId)

        const {capItem, capEquip, capTrait, capBuff} = Plugin.param()

        // Attempt to track down the extra values added from other plugins,
        // by removing all the default values that calc a parameter.
        // Then take what is left. It can be added before or after
        // the calculations of plus values.
        let extraValues = (baseValue + equipValue + itemValue) * rateValue * buffValue
        extraValues = Math.floor( Math.max(0, (alias - extraValues)) )
        
        let equipPlus = 0
        let itemPlus = 0
        let traitPlus = 0
        let buffPlus = 0

        let currentValue = extraValues
        currentValue += baseValue

        currentValue += itemValue
        if(currentValue > maxValue){
            itemPlus = currentValue - maxValue
        }

        currentValue += equipValue
        if(currentValue > maxValue){
            equipPlus = (currentValue - maxValue) - itemPlus
        }

        currentValue = Math.floor(currentValue * rateValue)
        if(currentValue > maxValue){
            traitPlus = (currentValue - maxValue) - (itemPlus + equipPlus)
        }

        currentValue = Math.floor(currentValue * buffValue)
        if(currentValue > maxValue){
            buffPlus = (currentValue - maxValue) - (itemPlus + equipPlus + traitPlus)
        }

        itemPlus     = capItem   ? 0 : itemPlus
        equipPlus    = capEquip  ? 0 : equipPlus
        traitPlus    = capTrait  ? 0 : traitPlus
        buffPlus     = capBuff   ? 0 : buffPlus

        const plusValues = itemPlus + equipPlus + traitPlus + buffPlus
        const value = currentValue - plusValues

        return Math.max(minValue, value)
    }

    return alias
}

if(Imported.Eli_CustomParameter){

Alias.Game_Enemy_cparam = Game_Enemy.prototype.cparam
Game_Enemy.prototype.cparam = function(paramId) {
    const alias = Alias.Game_Enemy_cparam.call(this, paramId)

    if(this._classId > 0){
        const baseValue = this.cparamBase(paramId)
        const equipValue = this.getEquipCParameters(paramId)
        const itemValue = Math.max(0, (this.cparamPlus(paramId) -equipValue))
        const rateValue = this.cparamRate(paramId)
        const buffValue = this.cparamBuffRate(paramId)
        const maxValue = this.capParamCurve(paramId, true)
        const minValue = this.paramMin(paramId, true)

        const {capItem, capEquip, capTrait, capBuff} = Plugin.param()

        // Attempt to track down the extra values added from other plugins,
        // by removing all the default values that calc a parameter.
        // Then take what is left. It can be added before or after
        // the calculations of plus values.
        let extraValues = (baseValue + equipValue + itemValue) * rateValue * buffValue
        extraValues = Math.floor( Math.max(0, (alias - extraValues)) )
        
        let equipPlus = 0
        let itemPlus = 0
        let traitPlus = 0
        let buffPlus = 0

        let currentValue = extraValues
        currentValue += baseValue

        currentValue += itemValue
        if(currentValue > maxValue){
            itemPlus = currentValue - maxValue
        }

        currentValue += equipValue
        if(currentValue > maxValue){
            equipPlus = (currentValue - maxValue) - itemPlus
        }

        currentValue = Math.floor(currentValue * rateValue)
        if(currentValue > maxValue){
            traitPlus = (currentValue - maxValue) - (itemPlus + equipPlus)
        }

        currentValue = Math.floor(currentValue * buffValue)
        if(currentValue > maxValue){
            buffPlus = (currentValue - maxValue) - (itemPlus + equipPlus + traitPlus)
        }

        itemPlus     = capItem   ? 0 : itemPlus
        equipPlus    = capEquip  ? 0 : equipPlus
        traitPlus    = capTrait  ? 0 : traitPlus
        buffPlus     = capBuff   ? 0 : buffPlus

        const plusValues = itemPlus + equipPlus + traitPlus + buffPlus

        const value = currentValue - plusValues
        return Math.max(minValue, value)
    }

    return alias
}

} // Imported Custom Parameter
     
} // Imported Eli Enemy Class

}
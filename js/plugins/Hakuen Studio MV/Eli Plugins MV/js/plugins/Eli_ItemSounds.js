//==========================================================================
// Eli_ItemSounds.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Plays different SE sounds when using items,skills, or equips on the menu. Also for equipping different equipment types.
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/eli-item-sounds-for-rpg-maker-mz/rate?source=game

Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Features
==============================================================================

● Can play different sounds for each item or skill or equip through his 
note tags when used on the menu.
● Can play different sounds for equipping different pieces of equipment 
Equip types(note tags has priority over this)

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/1c9sag-HWPUE4LEZA83xLTNWHcYDUJDzMyAR2cVxoAGM/edit?usp=sharing

============================================================================

@param isEquipSeEnabled
@text Enable Equip Se
@type boolean
@desc Choose if you want a different sound when equipping different equipment.
@default true

@param equipTypeSe
@text Equip Types Se-Name List
@type file[]
@dir audio/se/
@desc Set here a list for all SE to play for each equipment types of your game.
@default []

@param equipPan
@text Equip Se-Pan
@type number
@min -100
@max 100
@desc A number to use as a pan value(-100 to 100)
@default 0

@param equipPitch
@text Equip Se-Pitch
@type number
@min -50
@max 150
@desc A number to use as a pitch value(-50 to 150)
@default 100

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ItemSounds = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Parameters{
    constructor(parameters){
        this.isEquipSeEnabled = parameters.isEquipSeEnabled === "true"
        this.equipTypeSe = JSON.parse(parameters.equipTypeSe)
        this.equipPan = Number(parameters.equipPan)
        this.equipPitch = Number(parameters.equipPitch)
    }
}

Eli.ItemSounds = {

    url: "https://hakuenstudio.itch.io/eli-item-sounds-for-rpg-maker-mz",
    parameters: new Parameters(PluginManager.parameters("Eli_ItemSounds")),
    alias: {},
    temp: { equip: {}, item: {}, skill: {} },

    initialize(){},

    initPluginCommands(){},

    param(){
        return this.parameters
    },
    
}

const Plugin = Eli.ItemSounds
const Alias = Eli.ItemSounds.alias

Plugin.initialize()

/* ------------------------------ SOUND MANAGER ----------------------------- */
Alias.SoundManager_playUseItem = SoundManager.playUseItem
SoundManager.playUseItem = function() {
    const item = Plugin.temp.item
    if(item && item.meta.Se){
        this.playCustomSeFromMeta(item)
    }else{
        Alias.SoundManager_playUseItem.call(this)
    }
}

Alias.SoundManager_playUseSkill = SoundManager.playUseSkill
SoundManager.playUseSkill = function() {
    const skill = Plugin.temp.skill
    if(skill && skill.meta.Se){
        this.playCustomSeFromMeta(skill)
    }else{
        Alias.SoundManager_playUseSkill.call(this)
    }
}

Alias.SoundManager_playEquip = SoundManager.playEquip
SoundManager.playEquip = function() {
    if(Plugin.param().isEquipSeEnabled){
        this.playCustomSeForEquip()
    }else{
        Alias.SoundManager_playEquip.call(this)
    }
}

SoundManager.playCustomSeFromMeta = function(item){
    const customSe = item.meta.Se.split(',')
    const se = {
        name: Eli.String.removeSpaces(customSe[0]),
        pan: Number(customSe[1]) || 0,
        pitch: Number(customSe[2]) || 100,
        volume: Number(customSe[3]) || ConfigManager.seVolume,
    }
    AudioManager.playSe(se)
}

SoundManager.playCustomSeForEquip = function(){
    const equip = Plugin.temp.equip

    if(equip && equip.meta.Se){
        this.playCustomSeFromMeta(equip)
        
    }else{
        const customSeName = equip ? Plugin.param().equipTypeSe[equip.etypeId-1] : false
        const se = {
            name: customSeName || $dataSystem.sounds[4].name,
            pan: Plugin.param().equipPan || 0,
            pitch: Plugin.param().equipPitch || 100,
            volume: ConfigManager.seVolume
        }
        AudioManager.playSe(se)
    }
}

/* ------------------------------ GAME BATTLER ------------------------------ */
Alias.Game_Battler_consumeItem = Game_Battler.prototype.consumeItem
Game_Battler.prototype.consumeItem = function(item) {
    Alias.Game_Battler_consumeItem.call(this, item)
    Plugin.temp.item = {}
}

Alias.Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Alias.Game_BattlerBase_paySkillCost.call(this, skill)
    Plugin.temp.skill = {}
}

/* ------------------------------- SCENE ITEM ------------------------------- */
Alias.Scene_Item_playSeForItem = Scene_Item.prototype.playSeForItem
Scene_Item.prototype.playSeForItem = function() {
    Plugin.temp.item = this.item()
    Alias.Scene_Item_playSeForItem.call(this)
    Plugin.temp.item = {}
}

/* ------------------------------- SCENE SKILL ------------------------------ */
Alias.Scene_Skill_playSeForItem = Scene_Skill.prototype.playSeForItem
Scene_Skill.prototype.playSeForItem = function() {
    Plugin.temp.skill = this.item()
    Alias.Scene_Skill_playSeForItem.call(this)
    Plugin.temp.skill = {}
}

/* ------------------------------- SCENE EQUIP ------------------------------ */
Alias.Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk
Scene_Equip.prototype.onItemOk = function() {
    Plugin.temp.equip = this._itemWindow.item()
    Alias.Scene_Equip_onItemOk.call(this)
    Plugin.temp.equip = {}
}

}
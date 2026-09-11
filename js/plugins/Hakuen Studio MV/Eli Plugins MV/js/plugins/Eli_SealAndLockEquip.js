//==========================================================================
// EliMZ_SealAndLockEquip.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦1.0.0♦ Lock, Unlock, Seal, and Unseal equip types and slots with plugin commands!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-lock-and-seal-equipment-for-rpg-maker

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
Rate Plugin  → https://hakuenstudio.itch.io/hakuen-studio-lock-and-seal-equipment-for-rpg-maker/rate?source=game
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Requirements
============================================================================

Need Eli Book.
Order somewhere after Eli Book.

============================================================================
Features
============================================================================

Use plugin commands to:
● Lock and Unlock Equipment types or slot index for a specific actor.
● Seal and Unseal Equipment types or slot index for a specific actor.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1XYo6VKlOdLqOVq-0k1UP2_ggbDoA0LfxH4163CTXZ6Q/edit?usp=sharing

============================================================================

@command cmd_lockEquip
@text Lock/Unlock Equip
@desc Select one or more actor unlock or lock a type of equipment or slot index.

    @arg battlerTypeId
    @text Battler Type
    @type select
    @option Actor Id
    @option Member Index
    @desc Choose the way you want to choose the actor to apply the changes.
    @default Member Index

    @arg battlerId
    @text Actor Id / Member Index
    @type text
    @desc Set here one or more ids/index. Use -1 for all.
    @default 0
    @parent battlerTypeId

    @arg slotType
    @text Slot Type
    @type select
    @option Equip Type
    @option Slot Id
    @desc Equip Type = Database Equip Types. 
    Slot Id = Actor Slots.
    @default Equip Type

    @arg slotId
    @text Equip Type Id / Slot Id
    @type text
    @desc Slot Id starts at 0. 
    Equip Type Id starts at 1.
    @default 1
    @parent slotType

    @arg operation
    @text Operation Type
    @type select
    @option Lock
    @option Unlock
    @option Toggle
    @desc Set type of operation.
    @default Lock

    @arg text
    @text Label
    @type text
    @desc An additional and optional text to show after the equip name for the current operation.
    @default

@command cmd_sealEquip
@text Seal/Unseal Equip
@desc Select one or more actor to unseal or seal a type of equipment or slot index.

    @arg battlerTypeId
    @text Battler Type
    @type select
    @option Actor Id
    @option Member Index
    @desc Choose the way you want to choose the actor to apply the changes.
    @default Member Index
    
    @arg battlerId
    @text Actor Id / Member Index
    @type text
    @desc Set here one or more ids/index. Use -1 for all.
    @default 0
    @parent battlerTypeId

    @arg slotType
    @text Slot Type
    @type select
    @option Equip Type
    @option Slot Id
    @desc Equip Type = Database Equip Types. 
    Slot Id = Actor Slots.
    @default Equip Type

    @arg slotId
    @text Equip Type Id / Slot Id
    @type text
    @desc Slot Id starts at 0. 
    Equip Type Id starts at 1.
    @default 1
    @parent slotType

    @arg operation
    @text Operation Type
    @type select
    @option Seal
    @option Unseal
    @option Toggle
    @desc Set type of operation.
    @default Seal

    @arg text
    @text Label
    @type text
    @desc An additional and optional text to show after the equip name for the current operation.
    @default

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SealAndLockEquip = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.SealAndLockEquip = {

    version: 5.20,
    url: "https://hakuenstudio.itch.io/hakuen-studio-lock-and-seal-equipment-for-rpg-maker",
    parameters: {},
    alias: {},
    currentSlotIndex: 0,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){
        // const commands = ["cmd_lockEquip", "cmd_sealEquip"]
        // Eli.PluginManager.registerCommands(this, commands)
    },

    param(){
        return this.parameters
    },

    cmd_lockEquip(args){
        const [slotId, text, battlers] = this.parsedBasicArguments(args)
        const dataType = args.slotType === "Equip Type" ? "type" : "slot"

        for(const actor of battlers){
            actor.lockedEquipData[dataType][slotId].text = text
            this.processOperation(actor, slotId, args.operation, "lockedEquipData", dataType)
        }

    },

    cmd_sealEquip(args){
        const [slotId, text, battlers] = this.parsedBasicArguments(args)
        const dataType = args.slotType === "Equip Type" ? "type" : "slot"

        for(const actor of battlers){
            const etypeId = slotId
            actor.sealedEquipData[dataType][etypeId].text = text
            this.processOperation(actor, slotId, args.operation, "sealedEquipData", dataType)

            if(dataType === "type" && actor.sealedEquipData.type[etypeId].value){
                this.onSealedEquipType(actor, slotId)

            }else if(dataType === "slot" && actor.sealedEquipData.slot[slotId].value){
                this.onSealedSlotId(actor, slotId)
            }
        }
    },

    parsedBasicArguments(args){
        const slotId = Number(Eli.Utils.processEscapeVarOrFormula(args.slotId))
        const battlers = this.createBattlerList(args.battlerTypeId, args.battlerId)
        const text = args.text || ""

        return [slotId, text, battlers]
    },

    processOperation(actor, id, operation, equipData, dataType){
        if(operation === "Toggle"){
            actor[equipData][dataType][id].value = !actor[equipData][dataType][id].value
        }else{
            actor[equipData][dataType][id].value = this.getOperationValue(operation)
        }
    },

    onSealedEquipType(actor, etypeId){
        for(let i = 0; i < actor.equips().length; i++){
            const equip = actor.equips()[i]

            if(equip && equip.etypeId === etypeId){
                actor.forceChangeEquip(i, null)
                $gameParty.gainItem(equip, 1)
            }
        }
    },

    onSealedSlotId(actor, slotId){
        const equip = actor.equips()[slotId]

        if(equip){
            actor.forceChangeEquip(slotId, null)
            $gameParty.gainItem(equip, 1)
        }
    },

    createBattlerList(idType, idString){
        if(Number(idString) === -1){
            return $gameParty.members()

        }else{
            const ids = Eli.PluginManager.createRangeOfNumbers(idString)

            if(idType === "Member Index"){
                return $gameParty.members().filter((member, index) => ids.includes(index))
            }else{
                return $gameParty.members().filter(member => ids.includes(member.actorId()))
            }
        }
        
    },

    getOperationValue(type){
        return {
            Lock: true,
            Unlock: false,
            Seal: true,
            Unseal: false,
        }[type]
    }

}

const Plugin = Eli.SealAndLockEquip
const Alias = Eli.SealAndLockEquip.alias

Plugin.initialize()

Alias.Game_Actor_initEquips = Game_Actor.prototype.initEquips
Game_Actor.prototype.initEquips = function(equips) {
    this.initLockAndSealData()
    Alias.Game_Actor_initEquips.call(this, equips)
}

Game_Actor.prototype.initLockAndSealData = function() {
    const slots = this.equipSlots()
    this.lockedEquipData = {
        type: {},
        slot: [],
    }
    this.sealedEquipData = {
        type: {},
        slot: [],
    }

    for(let i = 0; i < slots.length; i++){
        const etypeId = slots[i]

        this.lockedEquipData.type[etypeId] = {value: false, text: ""}
        this.sealedEquipData.type[etypeId] = {value: false, text: ""}
        this.lockedEquipData.slot[i] = {value: false, text: ""}
        this.sealedEquipData.slot[i] = {value: false, text: ""}
    }
}

Alias.Game_Actor_isEquipChangeOk = Game_Actor.prototype.isEquipChangeOk
Game_Actor.prototype.isEquipChangeOk = function(slotId) {
    return  Alias.Game_Actor_isEquipChangeOk.call(this, slotId) && 
            ( !this.isSlotLocked(slotId) && !this.isSlotSealed(slotId) )
}

Game_Actor.prototype.isSlotLocked = function(slotId) {
    return this.lockedEquipData.slot[slotId].value
}

Game_Actor.prototype.isSlotSealed = function(slotId) {
    return this.sealedEquipData.slot[slotId].value
}


Alias.Game_Actor_isEquipTypeLocked = Game_Actor.prototype.isEquipTypeLocked
Game_Actor.prototype.isEquipTypeLocked = function(etypeId) {
    return Alias.Game_Actor_isEquipTypeLocked.call(this, etypeId) || this.lockedEquipData.type[etypeId].value
}

Game_Actor.prototype.getTextForSealAndLockEquips = function(slotId, etypeId = 0) {
    if(this.lockedEquipData.type[etypeId]){
        return this.lockedEquipData.type[etypeId].text

    }else if(this.sealedEquipData.type[etypeId]){
        return this.sealedEquipData.type[etypeId].text

    }else if(this.lockedEquipData.slot[slotId]){
        return this.lockedEquipData.slot[slotId].text
        
    }else if(this.sealedEquipData.slot[slotId]){
        return this.sealedEquipData.slot[slotId].text
    }
}

Alias.Game_Actor_isEquipTypeSealed = Game_Actor.prototype.isEquipTypeSealed
Game_Actor.prototype.isEquipTypeSealed = function(etypeId) {
    return Alias.Game_Actor_isEquipTypeSealed.call(this, etypeId) || this.sealedEquipData.type[etypeId].value
}

Alias.Window_EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem
Window_EquipSlot.prototype.drawItem = function(index) {
    Plugin.currentSlotIndex = index
    Alias.Window_EquipSlot_drawItem.call(this, index)
}

Alias.Window_EquipSlot_drawItemName = Window_EquipSlot.prototype.drawItemName
Window_EquipSlot.prototype.drawItemName = function(item, x, y, width) {
    var backupName = null
    
    if(item){
        const equipType = item.etypeId
        const customText = this._actor.getTextForSealAndLockEquips(Plugin.currentSlotIndex, equipType) || ""
        backupName = item.name
        item.name = `${backupName} ${customText}`

    }else{
        const slots = this._actor.equipSlots()
        const slotName = $dataSystem.equipTypes[slots[Plugin.currentSlotIndex]]
        const equipType = $dataSystem.equipTypes.indexOf(slotName)
        const customText = this._actor.getTextForSealAndLockEquips(Plugin.currentSlotIndex, equipType) || ""

        if(customText.length > 0){
            this.drawText(customText, x, y, width)
        }
    }

    Alias.Window_EquipSlot_drawItemName.call(this, item, x, y, width)

    if(backupName){
        item.name = backupName
    }
}

}
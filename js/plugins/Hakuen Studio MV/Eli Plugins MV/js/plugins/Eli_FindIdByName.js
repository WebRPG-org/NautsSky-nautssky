//============================================================================
// Eli_FindIdByName.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Find an id of any object using their name.
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

• Assigning values ​​by name: Adds a method of assigning, returning, and 
checking values ​​of various data/objects of the Rpg maker MV through their 
names and not just by ID.
• Currently supported: Actors, switches, variables, classes, items, 
weapons, armors, skills, enemies, troops,  equipament types, states, 
common events, armor types, weapon types, skill types, maps and events.
NOTE: For now, acess to events id by their names, are only supported in 
the current map.
• You can better organize your database using these methods, since you 
can rearrange them in the list without worrying about their id. It means 
this is not affect your game at all, since yu will don't need to change 
the in-game references.

============================================================================
How to use
============================================================================

• In the plugin parameters you can choose to use the automatic mode or 
manual mode.

• In the manual mode, it will not aliase, change or overwrite any function
of the default code, so It will be more compatible with other plugins too!
But instead of simply replacing the argument of the script calls by a name,
you have to call another function:
getId('name', 'dataType')
Ex: $gameTemp.reserveCommonEvent(getId('commonEventName', 'commonEvents'))
$gameParty.addActor(getId('actorName', 'actors'))

'dataType' - You can replace this by the data you want to search.
Use the follow strings to represent each data:
▫ actors
▫ classes
▫ skills
▫ items
▫ weapons
▫ armors
▫ enemies
▫ troops
▫ states
▫ commonEvents
▫ variables
▫ switches
▫ equipTypes
▫ armorTypes
▫ weaponTypes
▫ skillTypes
▫ elements
▫ maps
▫ events
* They are not case sensitive.

• This is still experimental.
In the automatic mode, you can use the default script calls from MZ to 
search by a data through it's name. However it aliases the default 
functions of MZ and maybe can get you some plugins incompatibilities, 
if they, pherhaps, overwrite some of these functions. It also can be 
expensive depends on machine, since some functions are updated every 
frame, so you have to use and see for yourself if it will cause 
performance issues in your project.

Currently, you can use the name search in these functions:
▫ $gameTemp.reserveCommonEvent('commonEventName')

▫ $gameSwitches.value('switchName')
▫ $gameSwitches.setValue('switchName', value)

▫ $gameVariables.value('variableName')
▫ $gameVariables.setValue('variableName', value)

▫ $gameSelfSwitches.value(['mapName', 'eventName', SelfSw])
▫ $gameSelfSwitches.setValue(['mapName', 'eventName', SelfSw], value)

▪ $gameActors(complete with any of the below)
▫ .actor('actorName').hasWeapon('weaponName')
▫ .actor('actorName').hasArmor('armorName')
▫ .actor('actorName').changeEquip(slotId, 'weapon/armor name')
▫ .actor('actorName').forceChangeEquip(slotId, 'weapon/armor name')
▫ .actor('actorName').changeEquipById(equipTypeId, 'weapon/armor name')
▫ .actor('actorName').isEquipped('weapon/armor name')
▫ .actor('actorName').discardEquip('weapon/armor name')
▫ .actor('actorName').isClass('className')
▫ .actor('actorName').learnSkill('skillName')
▫ .actor('actorName').forgetSkill('skillName')
▫ .actor('actorName').isLearnedSkill('skillName')
▫ .actor('actorName').hasSkill('skillName')
▫ .actor('actorName').changeClass('className', keepExp)

▪ $gameParty(complete with any of the below)
▫ .addActor('actorName')
▫ .removeActor('actorName')
▫ .numItems('item/weapon/armor name')
▫ .hasMaxItems('item/weapon/armor name')
▫ .hasItem('item/weapon/armor name', includeEquip)
▫ .isAnyMemberEquipped('weapon/armor name')
▫ .gainItem('item/weapon/armor name', amount, includeEquip)
▫ .discardMembersEquip('weapon/armor name', amount)
▫ .consumeitem('itemName')
▫ .canUse('itemName')
▫ .setMenuActor('actorName')
▫ .swapOrder('actorName', 'actorName')

* The arguments are not case sensitive.

* You still will be able to use the function normally, like:
$gameParty.isAnyMemberEquipped($dataWeapons[1])

* Event if you set to the automatic mode, you still can use the manual 
function getId('name', 'dataType')

============================================================================
Update Log
============================================================================

https://tinyurl.com/findIdByName

============================================================================

@param mode
@text Automatic
@type select
@desc Choose the mode that the plugin will work. See more details in the help file.
@option Automatic
@value Auto
@option Manual
@value Manual
@default Auto

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_FindIdByName = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.FindIdByName = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-find-id-by-name-for-rpg-maker-mv",
    parameters: {mode: ''},
    alias: {},
    params: { mhp: 0, mmp: 1, atk: 2, def: 3, mat: 4, mdf: 5, agi: 6, luk: 7, },
    xParams: { hit: 0, eva: 1, cri: 2, cev: 3, mev: 4, mrf: 5, cnt: 6, hrg: 7, mrg: 8, trg: 9 },
    sParams: { tgr: 0, grd: 1, rec: 2, pha: 3, mcr: 4, tcr: 5, pdr: 6, mdr: 7, fdr: 8, exr: 9 },
    datas: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.setData()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    setData(){
        this.datas = {
            actors:         {contents: 'getDataActors',                 searchMethod: 'findName'},
            classes:        {contents: 'getDataClasses',                searchMethod: 'findName'},
            skills:         {contents: 'getDataSkills',                 searchMethod: 'findName'},
            items:          {contents: 'getDataItems',                  searchMethod: 'findName'},
            weapons:        {contents: 'getDataWeapons',                searchMethod: 'findName'},
            armors:         {contents: 'getDataArmors',                 searchMethod: 'findName'},
            enemies:        {contents: 'getDataEnemies',                searchMethod: 'findName'},
            troops:         {contents: 'getDataTroops',                 searchMethod: 'findName'},
            states:         {contents: 'getDataStates',                 searchMethod: 'findName'},
            commonevents:   {contents: 'getDataCommonEvents',           searchMethod: 'findName'},
            variables:      {contents: 'getDataSystemVariables',        searchMethod: 'findNameSystem'},
            switches:       {contents: 'getDataSystemSwitches',         searchMethod: 'findNameSystem'},
            equiptypes:     {contents: 'getDataSystemEquipTypes',       searchMethod: 'findNameSystem'},
            armortypes:     {contents: 'getDataSystemArmorTypes',       searchMethod: 'findNameSystem'},
            weapontypes:    {contents: 'getDataSystemWeaponTypes',      searchMethod: 'findNameSystem'},
            skilltypes:     {contents: 'getDataSystemSkillTypes',       searchMethod: 'findNameSystem'},
            elements:       {contents: 'getDataSystemElements',         searchMethod: 'findNameSystem'},
            maps:           {contents: 'getDataMaps',                   searchMethod: 'findName'},
            events:         {contents: 'getDataEvents',                 searchMethod: 'findName'},
            params:         {contents: 'getParams',                     searchMethod: 'findNameParams'},
            sparams:        {contents: 'getSParams',                    searchMethod: 'findNameParams'},
            xparams:        {contents: 'getXParams',                    searchMethod: 'findNameParams'},
        }
    },

    getDataActors(){
        return $dataActors
    },

    getDataClasses(){
        return $dataClasses
    },
    
    getDataSkills(){
        return $dataSkills
    },
    
    getDataItems(){
        return $dataItems
    },
    
    getDataWeapons() {
        return $dataWeapons
    },
    
    getDataArmors(){
        return $dataArmors
    },
    
    getDataEnemies(){
        return $dataEnemies
    },
    
    getDataTroops(){
        return $dataTroops
    },
    
    getDataStates(){
        return $dataStates
    },
    
    getDataCommonEvents(){
        return $dataCommonEvents
    },
    
    dataSystem(){
        return $dataSystem
    },
    
    getDataSystemVariables(){
        return $dataSystem.variables
    },
    
    getDataSystemSwitches(){
        return $dataSystem.switches
    },
    
    getDataSystemEquipTypes(){
        return $dataSystem.equipTypes
    },
    
    getDataSystemArmorTypes(){
        return $dataSystem.armorTypes
    },
    
    getDataSystemWeaponTypes(){
        return $dataSystem.weaponTypes
    },
    
    getDataSystemSkillTypes(){
        return $dataSystem.skillTypes
    },
    
    getDataSystemElements(){
        return $dataSystem.elements
    },
    
    getDataMaps(){
        return $dataMapInfos
    },
    
    getDataEvents(){
        return $dataMap.events
    },
    
    getParams(){
        return this.params
    },

    getSParams(){
        return this.sParams
    },
    
    getXParams(){
        return this.xParams
    },
    
    getData(){
        return this.datas
    },
    
    findName(searchName, object) {
        searchName = String(searchName).toLowerCase()
        const getName = data => data && data.name.toLowerCase() === searchName
        const subject = object.find(getName)

        return subject ? subject.id : searchName
    },
    
    findNameSystem(searchName, object) {
        searchName = String(searchName).toLowerCase()
        const getName = data => data && data.toLowerCase() === searchName
        const subject = object.find(getName)

        return subject ? object.indexOf(subject) : searchName
    },
    
    findNameParams(searchName, object) {
        return object[searchName] >= 0 ? object[searchName] : -1
    },
    
    getId(searchName, dataName){
        const data = this.getData()[dataName.toLowerCase()]
        const obj = this[data.contents]()

        return this[data.searchMethod](searchName, obj)
    },
    
    findEquip(equip){
        const weaponId = this.getId(equip, 'weapons')
        const armorId = this.getId(equip, 'armors')

        return $dataWeapons[weaponId] || $dataArmors[armorId]
    },
    
    findAllItems(item, includeEquip){
        const itemId = includeEquip ? 0 : this.getId(item, 'items')
        const weaponId = this.getId(item, 'weapons')
        const armorId = this.getId(item, 'armors')

        return $dataItems[itemId] || $dataWeapons[weaponId] || $dataArmors[armorId] || item
    },

}

const Plugin = Eli.FindIdByName
const Alias = Eli.FindIdByName.alias

Plugin.initialize()

/* ========================================================================== */
/*                                   MANUAL                                   */
/* ========================================================================== */
{

Eli.Utils.getIdByName = function(searchName, dataName){
    const data = Plugin.getData()[dataName.toLowerCase()]
    const obj = Plugin[data.contents]()
    
    return Plugin[data.searchMethod](searchName, obj)
}

window.getIdByName = function(searchName, dataName){
    const data = Plugin.getData()[dataName.toLowerCase()]
    const obj = Plugin[data.contents]()
    
    return Plugin[data.searchMethod](searchName, obj)
}

window.getId = function(searchName, dataName){
    const data = Plugin.getData()[dataName.toLowerCase()]
    const obj = Plugin[data.contents]()
    
    return Plugin[data.searchMethod](searchName, obj)
}

}

/* ========================================================================== */
/*                                  AUTOMATIC                                 */
/* ========================================================================== */

if(Plugin.param().mode === 'Auto'){

/* -------------------------------- GAME TEMP ------------------------------- */
{

Alias.Game_Temp_reserveCommonEvent = Game_Temp.prototype.reserveCommonEvent
Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
    commonEventId = Plugin.getId(commonEventId, 'commonEvents')

    Alias.Game_Temp_reserveCommonEvent.call(this, Number(commonEventId))
}

}

/* ------------------------------ GAME SWITCHES ----------------------------- */
{

Alias.Game_Switches_value = Game_Switches.prototype.value
Game_Switches.prototype.value = function(switchId) {
    switchId = Plugin.getId(switchId, 'switches')

    return Alias.Game_Switches_value.call(this, Number(switchId))
}

Alias.Game_Switches_setValue = Game_Switches.prototype.setValue
Game_Switches.prototype.setValue = function(switchId, value) {
    switchId = Plugin.getId(switchId, 'switches')

    Alias.Game_Switches_setValue.call(this, Number(switchId), value)
}

}

/* ----------------------------- GAME VARIABLES ----------------------------- */
{

Alias.Game_Variables_value = Game_Variables.prototype.value
Game_Variables.prototype.value = function(variableId) {
    variableId = Plugin.getId(variableId, 'variables')
    
    return Alias.Game_Variables_value.call(this, Number(variableId))
}

Alias.Game_Variables_setValue = Game_Variables.prototype.setValue
Game_Variables.prototype.setValue = function(variableId, value) {
    variableId = Plugin.getId(variableId, 'variables')

    Alias.Game_Variables_setValue.call(this, Number(variableId), value)
}

}

/* --------------------------- GAME SELF SWITCHES --------------------------- */
{

Alias.Game_SelfSwitches_value = Game_SelfSwitches.prototype.value
Game_SelfSwitches.prototype.value = function(key){
    const mapId = Plugin.getId(key[0], 'maps')
    const eventId = Plugin.getId(key[1], 'events')
    key[0] = isNaN(mapId)   ? $gameMap.mapId()  : mapId 
    key[1] = isNaN(eventId) ? this._eventId     : eventId

    return Alias.Game_SelfSwitches_value.call(this, key)
}

Alias.Game_SelfSwitches_setValue = Game_SelfSwitches.prototype.setValue
Game_SelfSwitches.prototype.setValue = function(key, value){
    const mapId = Plugin.getId(key[0], 'maps')
    const eventId = Plugin.getId(key[1], 'events')
    key[0] = isNaN(mapId) ? $gameMap.mapId() : mapId 
    key[1] = eventId

    Alias.Game_SelfSwitches_setValue.call(this, key, value)
}

}

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Alias.Game_Actor_hasWeapon = Game_Actor.prototype.hasWeapon
Game_Actor.prototype.hasWeapon = function(weapon){
    const id = Plugin.getId(weapon, 'weapons')
    weapon = $dataWeapons[id] || weapon

    return Alias.Game_Actor_hasWeapon.call(this, weapon)
}

Alias.Game_Actor_hasArmor = Game_Actor.prototype.hasArmor
Game_Actor.prototype.hasArmor = function(armor) {
    const id = Plugin.getId(armor, 'armors')
    armor = $dataArmors[id] || armor

    return Alias.Game_Actor_hasArmor.call(this, armor)
}

Alias.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip
Game_Actor.prototype.changeEquip = function(slotId, item) {
    item = this.findEquipForSlot(slotId, item) || item

    Alias.Game_Actor_changeEquip.call(this, slotId, item)
}

Alias.Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    item = this.findEquipForSlot(slotId, item) || item

    Alias.Game_Actor_forceChangeEquip.call(this, slotId, item)
}

Alias.Game_Actor_changeEquipById = Game_Actor.prototype.changeEquipById
Game_Actor.prototype.changeEquipById = function(etypeId, itemId) {
    etypeId = Plugin.getId(etypeId, 'equipTypes')
    const weaponId = Plugin.getId(itemId, 'weapons') 
    const armorId = Plugin.getId(itemId, 'armors')

    if($dataWeapons[weaponId] && $dataWeapons[weaponId].etypeId === etypeId){
        itemId = weaponId
    }else if($dataArmors[armorId] && $dataArmors[armorId].etypeId === etypeId){
        itemId = armorId
    }

    Alias.Game_Actor_changeEquipById.call(this, etypeId, itemId)
}

Alias.Game_Actor_isEquipped = Game_Actor.prototype.isEquipped
Game_Actor.prototype.isEquipped = function(item) {
    item = Plugin.findEquip(item) || item

    return Alias.Game_Actor_isEquipped.call(this, item)
}

Alias.Game_Actor_discardEquip = Game_Actor.prototype.discardEquip
Game_Actor.prototype.discardEquip = function(item) {
    item = Plugin.findEquip(item) || item

    Alias.Game_Actor_discardEquip.call(this, item)
}

Alias.Game_Actor_isClass = Game_Actor.prototype.isClass
Game_Actor.prototype.isClass = function(gameClass) {
    const id = Plugin.getId(gameClass, 'classes')
    gameClass = $dataClasses[id] || gameClass

    return Alias.Game_Actor_isClass.call(this, gameClass)
}

Alias.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill
Game_Actor.prototype.learnSkill = function(skillId) {
    skillId = Plugin.getId(skillId, 'skills') || skillId

    return Alias.Game_Actor_learnSkill.call(this, Number(skillId))
}

Alias.Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill
Game_Actor.prototype.forgetSkill = function(skillId) {
    skillId = Plugin.getId(skillId, 'skills') || skillId

    Alias.Game_Actor_forgetSkill.call(this, Number(skillId))
}

Alias.Game_Actor_isLearnedSkill = Game_Actor.prototype.isLearnedSkill
Game_Actor.prototype.isLearnedSkill = function(skillId) {
    skillId = Plugin.getId(skillId, 'skills') || skillId

    return Alias.Game_Actor_isLearnedSkill.call(this, Number(skillId))
}

Alias.Game_Actor_hasSkill = Game_Actor.prototype.hasSkill
Game_Actor.prototype.hasSkill = function(skillId) {
    skillId = Plugin.getId(skillId, 'skills') || skillId

    return Alias.Game_Actor_hasSkill.call(this, Number(skillId))
}

Alias.Game_Actor_changeClass = Game_Actor.prototype.changeClass
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    classId = Plugin.getId(classId, 'classes') || classId

    Alias.Game_Actor_changeClass.call(this, Number(classId), keepExp)
}

Game_Actor.prototype.findEquipForSlot = function(slotId, equip){
    const slot = this.equips()[slotId]
    const weaponId = Plugin.getId(equip, 'weapons')
    const armorId = Plugin.getId(equip, 'armors')
    const weapon = $dataWeapons[weaponId]
    const armor = $dataArmors[armorId]

    if(weapon && slot.etypeId === weapon.etypeId) {
        return weapon

    } else if(armor && slot.etypeId === armor.etypeId) {
        return armor
    }

    return equip
}

}

/* ------------------------------- GAME ACTORS ------------------------------ */
{

Alias.Game_Actors_actor = Game_Actors.prototype.actor
Game_Actors.prototype.actor = function(actorId){
    actorId = Plugin.getId(actorId, 'actors') || actorId

    return Alias.Game_Actors_actor.call(this, Number(actorId))
}

}

/* ------------------------------- GAME PARTY ------------------------------- */
{

Alias.Game_Party_addActor = Game_Party.prototype.addActor
Game_Party.prototype.addActor = function(actorId) {
    actorId = Plugin.getId(actorId, 'actors') || actorId

    Alias.Game_Party_addActor.call(this, Number(actorId))
}

Alias.Game_Party_removeActor = Game_Party.prototype.removeActor
Game_Party.prototype.removeActor = function(actorId) {
    actorId = Plugin.getId(actorId, 'actors') || actorId

    Alias.Game_Party_removeActor.call(this, Number(actorId))
}

Alias.Game_Party_numItems = Game_Party.prototype.numItems
Game_Party.prototype.numItems = function(item) {
    item = Plugin.findAllItems(item) || item

    return Alias.Game_Party_numItems.call(this, item)
}

Alias.Game_Party_hasMaxItems = Game_Party.prototype.hasMaxItems
Game_Party.prototype.hasMaxItems = function(item) {
    item = Plugin.findAllItems(item) || item

    return Alias.Game_Party_hasMaxItems.call(this, item)
}

Alias.Game_Party_hasItem = Game_Party.prototype.hasItem
Game_Party.prototype.hasItem = function(item, includeEquip) {
    item = Plugin.findAllItems(item, includeEquip) || item

    return Alias.Game_Party_hasItem.call(this, item, includeEquip)
}

Alias.Game_Party_isAnyMemberEquipped = Game_Party.prototype.isAnyMemberEquipped
Game_Party.prototype.isAnyMemberEquipped = function(item) {
    item = Plugin.findEquip(item) || item

    return Alias.Game_Party_isAnyMemberEquipped.call(this, item)
}

Alias.Game_Party_gainItem = Game_Party.prototype.gainItem
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    item = Plugin.findAllItems(item, includeEquip) || item

    Alias.Game_Party_gainItem.call(this, item, amount, includeEquip)
}

Alias.Game_Party_consumeItem = Game_Party.prototype.consumeItem
Game_Party.prototype.consumeItem = function(item) {
    const id = Plugin.getId(item, 'items')
    item = $dataItems[id] || item 

    Alias.Game_Party_consumeItem.call(this, item)
}

Alias.Game_Party_canUse = Game_Party.prototype.canUse
Game_Party.prototype.canUse = function(item) {
    const id = Plugin.getId(item, 'items')
    item = $dataItems[id] || item

    return Alias.Game_Party_canUse.call(this, item)
}

Alias.Game_Party_setMenuActor = Game_Party.prototype.setMenuActor
Game_Party.prototype.setMenuActor = function(actor) {
    const id = Plugin.getId(actor, 'actors')
    actor = $gameActors.actor(id) || actor

    Alias.Game_Party_setMenuActor.call(this, actor)
}

Alias.Game_Party_swapOrder = Game_Party.prototype.swapOrder
Game_Party.prototype.swapOrder = function(index1, index2) {
    if(typeof(index1) === 'string' || typeof(index2) === 'string'){
        index1 = this.findActorInParty(index1)
        index2 = this.findActorInParty(index2)
    }

    Alias.Game_Party_swapOrder.call(this, index1, index2)
}

Game_Party.prototype.findActorInParty = function(actorName){
    const actorId = Plugin.getId(actorName, 'actors')
    const getMember = actor => actor && actor._actorId === actorId
    const subject = this.members().find(getMember)

    return subject ? this.members().indexOf(subject) : actorName
}

}

}

}
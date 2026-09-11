//==========================================================================
// Eli_VisualItem.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Display a picture when selecting Skills, Items or Equipments.
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/eli-visual-items-for-rpg-maker/rate?source=game

• Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Displays a picture when selecting items on map, menu, shop, and 
battle.[PRO]
● Displays a picture when selecting equipments on menu, and shop. [PRO]
● Displays a picture when selecting skills on menu and battle.
● You can adjust the picture position on each scene.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1us27Iv09lOwq3VcwFWymKFLhNhQBcRE_Fk21aLCyaOU/edit?usp=sharing

============================================================================

@param itemPath
@text Items Path
@type text
@desc The folder you will load your visual pictures for items.
@default img/pictures/visual_items/

@param equipPath
@text Equips Path
@type text
@desc The folder you will load your visual pictures for equips.
@default img/pictures/visual_equips/

@param skillPath
@text Skill Path
@type text
@desc The folder you will load your visual pictures for skills.
@default img/pictures/visual_skills/

@param item
@text Item Settings
@type struct<itemSt>
@desc Visual Item Image Settings
@default {"mapEnabled":"true","mapPos":"{\"alignX\":\"center\",\"offsetX\":\"0\",\"alignY\":\"center\",\"offsetY\":\"0\",\"scale\":\"1\"}","menuEnabled":"true","menuPos":"{\"alignX\":\"right\",\"offsetX\":\"0\",\"alignY\":\"bottom\",\"offsetY\":\"0\",\"scale\":\"1\"}","equipPos":"{\"alignX\":\"left\",\"offsetX\":\"0\",\"alignY\":\"bottom\",\"offsetY\":\"0\",\"scale\":\"1\"}","equipEnabled":"true","battleEnabled":"true","battlePos":"{\"alignX\":\"right\",\"offsetX\":\"0\",\"alignY\":\"center\",\"offsetY\":\"0\",\"scale\":\"1\"}","shopEnabled":"true","shopPos":"{\"alignX\":\"left\",\"offsetX\":\"0\",\"alignY\":\"bottom\",\"offsetY\":\"0\",\"scale\":\"1\"}"}

@param skill
@text Skill Settings
@type struct<skillSt>
@desc Visual Skill Image Settings
@default {"menuEnabled":"true","menuPos":"{\"alignX\":\"left\",\"offsetX\":\"0\",\"alignY\":\"top\",\"offsetY\":\"0\",\"scale\":\"1\"}","battleEnabled":"true","battlePos":"{\"alignX\":\"right\",\"offsetX\":\"0\",\"alignY\":\"center\",\"offsetY\":\"0\",\"scale\":\"1\"}"}

*/

/* ---------------------------------- ITEM ---------------------------------- */
{
/*~struct~itemSt:

@param mapEnabled
@text Enable on Map
@type boolean
@desc Enable the usage of visual pictures when selecting items.
@default true

@param mapPos
@text Image Position
@type struct<positionSt>
@desc Set the position of the pictures.
@default {"alignX":"left","offsetX":"0","alignY":"bottom","offsetY":"0","scale":"1"}
@parent mapEnabled

@param menuEnabled
@text Enable on Scene Item
@type boolean
@desc Enable the usage of visual pictures when on Scene Item.
@default true

@param menuPos
@text Image Position
@type struct<positionSt>
@desc Set the position of the pictures.
@default {"alignX":"left","offsetX":"0","alignY":"bottom","offsetY":"0","scale":"1"}
@parent menuEnabled

@param equipEnabled
@text Enable on Scene Equip
@type boolean
@desc Enable the usage of visual pictures when on Scene Equip.
@default true

@param equipPos
@text Image Position
@type struct<positionSt>
@desc Set the position of the pictures.
@default {"alignX":"left","offsetX":"0","alignY":"bottom","offsetY":"0","scale":"1"}
@parent menuEnabled

@param battleEnabled
@text Enable on Battle
@type boolean
@desc Enable the usage of visual pictures when on Scene Battle.
@default true

@param battlePos
@text Image Position
@type struct<positionSt>
@desc Set the position of the pictures.
@default {"alignX":"left","offsetX":"0","alignY":"bottom","offsetY":"0","scale":"1"}
@parent battleEnabled

@param shopEnabled
@text Enable on Shop
@type boolean
@desc Enable the usage of visual pictures when on Scene Shop.
@default true

@param shopPos
@text Image Position
@type struct<positionSt>
@desc Set the position of the pictures.
@default {"alignX":"left","offsetX":"0","alignY":"bottom","offsetY":"0","scale":"1"}
@parent shopEnabled

*/
}

/* ---------------------------------- SKILL --------------------------------- */
{

/*~struct~skillSt:

@param menuEnabled
@text Enable on Skill Scene
@type boolean
@desc Enable the usage of visual pictures when on Scene Skill.
@default true

@param menuPos
@text Image Position
@type struct<positionSt>
@desc Set the position of the pictures.
@default {"alignX":"left","offsetX":"0","alignY":"bottom","offsetY":"0","scale":"1"}
@parent menuEnabled

@param battleEnabled
@text Enable on Battle
@type boolean
@desc Enable the usage of visual pictures when on Scene Battle.
@default true

@param battlePos
@text Image Position
@type struct<positionSt>
@desc Set the position of the pictures.
@default {"alignX":"left","offsetX":"0","alignY":"bottom","offsetY":"0","scale":"1"}
@parent battleEnabled

*/

}

/* -------------------------------- POSITION -------------------------------- */
{
/*~struct~positionSt:

@param alignX
@text Align X
@type select
@option left
@option center
@option right
@desc Select none to only use offset value.
@default left

@param offsetX
@text Position X
@type text
@desc The Offset X position.
@default 0
@parent alignX

@param alignY
@text Align Y
@type select
@option top
@option center
@option bottom
@desc Select none to only use offset value.
@default top

@param offsetY
@text Position Y
@type text
@desc The offset Y position.
@default 0
@parent alignY

@param scale
@text Image Scale
@type text
@desc The scale of the image.
@default 1

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_VisualItem = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Sprite_VisualItem extends Sprite{

    initialize(bitmap){
        super.initialize(bitmap)
        this.imageWindows = []
    }

    setImageWindow(win){
        this.imageWindows = []
        this.imageWindows.push(...win)
    }

    update(){
        super.update()
        this.visible = this.imageWindows.some(item => item.isOpenAndActive())
    }
}

Eli.VisualItem = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-visual-items-for-rpg-maker",
    parameters: {
        itemPath: '',
        equipPath: '',
        skillPath: '',
        item: {
            mapEnabled: false,
            mapPos: {alignX: '', offsetX: 0, alignY: '', offsetY: 0, scale: 1},
            menuEnabled: false,
            menuPos: {alignX: '', offsetX: 0, alignY: '', offsetY: 0, scale: 1},
            equipEnabled: false,
            equipPos: {alignX: '', offsetX: 0, alignY: '', offsetY: 0, scale: 1},
            battleEnabled: false,
            battlePos: {alignX: '', offsetX: 0, alignY: '', offsetY: 0, scale: 1},
            shopEnabled: false,
            shopPos: {alignX: '', offsetX: 0, alignY: '', offsetY: 0, scale: 1},
        },
        skill: {
            menuEnabled: false,
            menuPos: {alignX: '', offsetX: 0, alignY: '', offsetY: 0, scale: 1},
            battleEnabled: false,
            battlePos: {alignX: '', offsetX: 0, alignY: '', offsetY: 0, scale: 1},
        },
    },
    alias: {},
    imageSprite: null,
    Sprite_VisualItem: Sprite_VisualItem,

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

    getImageSprite(){
        return this.imageSprite
    },

    getSkillPosition(){
        const isBattle = SceneManager._scene.constructor.name === "Scene_Battle"
        const pos = isBattle ? this.param().skill.battlePos : this.param().skill.menuPos

        return pos
    },

    getItemPosition(){
        const scene = SceneManager._scene.constructor.name
        const param = this.param().item
        switch(scene){
            case "Scene_Map":       return param.mapPos
            case "Scene_Item":      return param.menuPos
            case "Scene_Battle":    return param.battlePos
            case "Scene_Shop":      return param.shopPos
            case "Scene_Equip":     return param.equipPos
            default:                return param.menuPos
        }
    },
    
}

const Plugin = Eli.VisualItem
const Alias = Eli.VisualItem.alias

Plugin.initialize()

const metaTag = "VisualImage"

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects
Scene_Map.prototype.createDisplayObjects = function() {
    Alias.Scene_Map_createDisplayObjects.call(this)
    if(Plugin.param().item.mapEnabled){
        this.createVisualItem()
    }else{
        Plugin.imageSprite = null
    }
    
}

Scene_Map.prototype.createVisualItem = function() {
    const bitmap = new Bitmap(Graphics.width, Graphics.height)
    this.visualItem = new Sprite_VisualItem(bitmap)
    this.visualItem.setImageWindow([this._messageWindow._itemWindow])
    Plugin.imageSprite = this.visualItem
    this.addChild(this.visualItem)
}

}

/* ------------------------------- SCENE ITEM ------------------------------- */
{

Alias.Scene_Item_create = Scene_Item.prototype.create
Scene_Item.prototype.create = function() {
    Alias.Scene_Item_create.call(this)
    if(Plugin.param().item.menuEnabled){
        this.createVisualItem()
    }else{
        Plugin.imageSprite = null
    }
}

Scene_Item.prototype.createVisualItem = function() {
    const bitmap = new Bitmap(Graphics.width, Graphics.height)
    this.visualItem = new Sprite_VisualItem(bitmap)
    this.visualItem.setImageWindow([this._itemWindow])
    Plugin.imageSprite = this.visualItem
    this.addChild(this.visualItem)
}

}

/* ------------------------------- SCENE EQUIP ------------------------------ */
{

Alias.Scene_Equip_create = Scene_Equip.prototype.create
Scene_Equip.prototype.create = function() {
    Alias.Scene_Equip_create.call(this)
    if(Plugin.param().item.menuEnabled){
        this.createVisualItem()
    }else{
        Plugin.imageSprite = null
    }
}

Scene_Equip.prototype.createVisualItem = function() {
    const bitmap = new Bitmap(Graphics.width, Graphics.height)
    this.visualItem = new Sprite_VisualItem(bitmap)
    this.visualItem.setImageWindow([this._itemWindow])
    Plugin.imageSprite = this.visualItem
    this.addChild(this.visualItem)
}

}

/* ------------------------------- SCENE SKILL ------------------------------ */
{

Alias.Scene_Skill_create = Scene_Skill.prototype.create
Scene_Skill.prototype.create = function() {
    Alias.Scene_Skill_create.call(this)
    if(Plugin.param().skill.menuEnabled){
        this.createVisualItem()
    }else{
        Plugin.imageSprite = null
    }
}

Scene_Skill.prototype.createVisualItem = function() {
    const bitmap = new Bitmap(Graphics.width, Graphics.height)
    this.visualItem = new Sprite_VisualItem(bitmap)
    this.visualItem.setImageWindow([this._itemWindow])
    Plugin.imageSprite = this.visualItem
    this.addChild(this.visualItem)
}

}

/* ------------------------------- SCENE SHOP ------------------------------- */
{

Alias.Scene_Shop_create = Scene_Shop.prototype.create
Scene_Shop.prototype.create = function() {
    Alias.Scene_Shop_create.call(this)
    if(Plugin.param().item.shopEnabled){
        this.createVisualItem()
    }else{
        Plugin.imageSprite = null
    }
}

Scene_Shop.prototype.createVisualItem = function() {
    const bitmap = new Bitmap(Graphics.width, Graphics.height)
    this.visualItem = new Sprite_VisualItem(bitmap)
    this.visualItem.setImageWindow([this._buyWindow, this._sellWindow])

    Plugin.imageSprite = this.visualItem
    this.addChild(this.visualItem)
}

}

/* ------------------------------ SCENE BATTLE ------------------------------ */
{

Alias.Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset
Scene_Battle.prototype.createSpriteset = function() {
    Alias.Scene_Battle_createSpriteset.call(this)
    if(Plugin.param().skill.battleEnabled || Plugin.param().item.battleEnabled){
        this.createVisualItem()
    }else{
        Plugin.imageSprite = null
    }
}

Scene_Battle.prototype.createVisualItem = function() {
    const bitmap = new Bitmap(Graphics.width, Graphics.height)
    this.visualItem = new Sprite_VisualItem(bitmap)
    Plugin.imageSprite = this.visualItem
    this.addChild(this.visualItem)
}

Alias.Scene_Battle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
    Alias.Scene_Battle_update.call(this)
    if(this.visualItem){
        this.updateVisualItemSprite()
    }
}

Scene_Battle.prototype.updateVisualItemSprite = function() {
    if(this.canUpdateVisualImageForSkills()){
        this.visualItem.setImageWindow([this._skillWindow, this._enemyWindow, this._actorWindow])

    }else if(this.canUpdateVisualImageForItems()){
        this.visualItem.setImageWindow([this._itemWindow, this._enemyWindow, this._actorWindow])

    }else if(this.canHideVisualImageSprite()){
        this.visualItem.setImageWindow([])
    }
}

Scene_Battle.prototype.canUpdateVisualImageForItems = function(){
    return this._itemWindow.isOpenAndActive() && Plugin.param().item.battleEnabled
}

Scene_Battle.prototype.canUpdateVisualImageForSkills = function(){
    return this._skillWindow.isOpenAndActive() && Plugin.param().skill.battleEnabled
}

Scene_Battle.prototype.canHideVisualImageSprite = function(){
    return !this._skillWindow.isOpenAndActive() && !this._itemWindow.isOpenAndActive()
}

}

/* ---------------------------- WINDOW ITEM LIST ---------------------------- */
{

Alias.Window_ItemList_select = Window_ItemList.prototype.select
Window_ItemList.prototype.select = function(index) {
    Alias.Window_ItemList_select.call(this, index)
    if(Plugin.getImageSprite()){
        this.refreshVisualImage(index)
    }
}

Window_ItemList.prototype.refreshVisualImage = function(index){
    if(this.canShowItemVisualImage(index)){
        this.drawItemVisualImage()
    }else{
        Plugin.getImageSprite().bitmap.clear()
    }
}

Window_ItemList.prototype.findVisualImageFolder = function(){
    if(DataManager.isItem(this.item())){
        return Plugin.param().itemPath
    }else{
        return Plugin.param().equipPath
    }
}

Window_ItemList.prototype.createVisualItemPosition = function(bitmap, settings){
    const {alignX, offsetX, alignY, offsetY} = settings
    const x = Eli.Utils.calculateScreenPosition(alignX, offsetX, bitmap.width, "x")
    const y = Eli.Utils.calculateScreenPosition(alignY, offsetY, bitmap.height, "y")

    return [x, y]
}

Window_ItemList.prototype.drawItemVisualImage = function(){
    const file = Eli.String.removeSpaces(this.item().meta[metaTag])
    const folder = this.findVisualImageFolder()
    const bitmap = ImageManager.loadBitmap(folder, file)
    const position = Plugin.getItemPosition()

    bitmap.addLoadListener(()=> {
        const sx = 0
        const sy = 0
        const sw = bitmap.width
        const sh = bitmap.height
        const [dx, dy] = this.createVisualItemPosition(bitmap, position)
        const dw = sw * position.scale
        const dh = sh * position.scale
        Plugin.getImageSprite().bitmap.clear()
        Plugin.getImageSprite().bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh)
    })
}

Window_ItemList.prototype.canShowItemVisualImage = function(index){
    return index > -1 && this.item() && this.hasItemVisualImage(this.item())
}

Window_ItemList.prototype.hasItemVisualImage = function(item){
    return item.meta.hasOwnProperty(metaTag)
}

}

/* ----------------------------- WINDOW SHOP BUY ---------------------------- */
{

Alias.Window_ShopBuy_select = Window_ShopBuy.prototype.select
Window_ShopBuy.prototype.select = function(index) {
    Alias.Window_ShopBuy_select.call(this, index)
    if(Plugin.getImageSprite()){
        this.refreshVisualImage(index)
    }
}

Window_ShopBuy.prototype.refreshVisualImage = function(index){
    if(this.canShowItemVisualImage(index)){
        this.drawItemVisualImage()
    }else{
        Plugin.getImageSprite().bitmap.clear()
    }
}

Window_ShopBuy.prototype.findVisualImageFolder = function(){
    if(DataManager.isItem(this.item())){
        return Plugin.param().itemPath
    }else{
        return Plugin.param().equipPath
    }
}

Window_ShopBuy.prototype.createVisualItemPosition = function(bitmap, settings){
    const {alignX, offsetX, alignY, offsetY} = settings
    const x = Eli.Utils.calculateScreenPosition(alignX, offsetX, bitmap.width, "x")
    const y = Eli.Utils.calculateScreenPosition(alignY, offsetY, bitmap.height, "y")

    return [x, y]
}

Window_ShopBuy.prototype.drawItemVisualImage = function(){
    const file = Eli.String.removeSpaces(this.item().meta[metaTag])
    const folder = this.findVisualImageFolder()
    const bitmap = ImageManager.loadBitmap(folder, file)
    const position = Plugin.getItemPosition()

    bitmap.addLoadListener(()=> {
        const sx = 0
        const sy = 0
        const sw = bitmap.width
        const sh = bitmap.height
        const [dx, dy] = this.createVisualItemPosition(bitmap, position)
        const dw = sw * position.scale
        const dh = sh * position.scale
        Plugin.getImageSprite().bitmap.clear()
        Plugin.getImageSprite().bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh)
    })
}

Window_ShopBuy.prototype.canShowItemVisualImage = function(index){
    return index > -1 && this.item() && this.hasItemVisualImage(this.item())
}

Window_ShopBuy.prototype.hasItemVisualImage = function(item){
    return item.meta.hasOwnProperty(metaTag)
}

}

/* ---------------------------- WINDOW EQUIP ITEM --------------------------- */
{

Alias.Window_EquipItem_select = Window_EquipItem.prototype.select
Window_EquipItem.prototype.select = function(index) {
    Alias.Window_EquipItem_select.call(this, index)
    if(Plugin.getImageSprite()){
        this.refreshVisualImage(index)
    }
}

Window_EquipItem.prototype.refreshVisualImage = function(index){
    if(this.canDrawVisualItem(index)){
        this.drawVisualItem()
    }else{
        Plugin.getImageSprite().bitmap.clear()
    }
}

Window_EquipItem.prototype.createVisualItemPosition = function(bitmap){
    const {alignX, offsetX, alignY, offsetY} = Plugin.getItemPosition()
    const x = Eli.Utils.calculateScreenPosition(alignX, offsetX, bitmap.width, "x")
    const y = Eli.Utils.calculateScreenPosition(alignY, offsetY, bitmap.height, "y")

    return [x, y]
}

Window_EquipItem.prototype.drawVisualItem = function(){
    const file = Eli.String.removeSpaces(this.item().meta[metaTag])
    const folder = Plugin.param().equipPath
    const bitmap = ImageManager.loadBitmap(folder, file)
    const param = Plugin.getItemPosition()

    bitmap.addLoadListener(()=> {
        const sx = 0
        const sy = 0
        const sw = bitmap.width
        const sh = bitmap.height
        const [dx, dy] = this.createVisualItemPosition(bitmap)
        const dw = sw * param.scale
        const dh = sh * param.scale
        Plugin.getImageSprite().bitmap.clear()
        Plugin.getImageSprite().bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh)
    })
}

Window_EquipItem.prototype.canDrawVisualItem = function(index){
    return index > -1 && this.item() && this.hasVisualItem(this.item())
}

Window_EquipItem.prototype.hasVisualItem = function(item){
    return item.meta.hasOwnProperty(metaTag)
}

}

/* ---------------------------- WINDOW SKILL LIST --------------------------- */
{

Alias.Window_SkillList_select = Window_SkillList.prototype.select
Window_SkillList.prototype.select = function(index) {
    Alias.Window_SkillList_select.call(this, index)
    if(Plugin.getImageSprite()){
        this.refreshVisualImage(index)
    }
}

Window_SkillList.prototype.refreshVisualImage = function(index){
    if(this.canShowPictureSkill(index)){
        this.drawSkillVisualImage()
    }else{
        Plugin.getImageSprite().bitmap.clear()
    }
}

Window_SkillList.prototype.createVisualItemPosition = function(bitmap, settings){
    const {alignX, offsetX, alignY, offsetY} = settings
    const x = Eli.Utils.calculateScreenPosition(alignX, offsetX, bitmap.width, "x")
    const y = Eli.Utils.calculateScreenPosition(alignY, offsetY, bitmap.height, "y")

    return [x, y]
}

Window_SkillList.prototype.drawSkillVisualImage = function(){
    const file = Eli.String.removeSpaces(this.item().meta[metaTag])
    const folder = Plugin.param().skillPath
    const bitmap = ImageManager.loadBitmap(folder, file)
    const param = Plugin.getSkillPosition()

    bitmap.addLoadListener(()=> {
        const sx = 0
        const sy = 0
        const sw = bitmap.width
        const sh = bitmap.height
        const [dx, dy] = this.createVisualItemPosition(bitmap, param)
        const dw = sw * param.scale
        const dh = sh * param.scale
        Plugin.getImageSprite().bitmap.clear()
        Plugin.getImageSprite().bitmap.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh)
    })
}

Window_SkillList.prototype.canShowPictureSkill = function(index){
    return index > -1 && this.item() && this.hasSkillPicture(this.item())
}

Window_SkillList.prototype.hasSkillPicture = function(item){
    return item.meta.hasOwnProperty(metaTag)
}

}

}
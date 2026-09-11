//============================================================================
// Eli_GameFrame.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Adds a background image frame for the game
@author Hakuen Studio

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/hakuen-studio-game-frame-for-rpg-maker/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Features
==============================================================================

● Add a background/frame image for your game!
● Change game frame image with map note tags!

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/1oS2ue3lTqfoqy0bVdqw5kAWn9jH_wUIH6oStlZYDKmU/edit?usp=sharing

==============================================================================

@param sides
@text Sides
@type select
@option All
@option Left and Right
@desc Choose what sides your frame will have/show.
@default All

@param extraWidth
@text Extra Width
@type number
@desc How much space you want to open on both sides to show the images/background.
@default 48

@param extraHeight
@text Extra Height
@type number
@desc How much space you want to open on Top and Bottom to show the images/background.
@default 0

@param backRepeat
@text Background Repeat
@type boolean
@desc If true, the background will not stretch on the screen, but it will repeat itself.
@default false

@param backImage
@text Background Images
@type file[]
@dir img/system
@desc The image used as the frame. The first one will be the default.
@default []

@param ---Options---

@param enableOptions
@text Enable Options
@type boolean
@desc If true, a command will be added to the options menu.
@default true
@parent ---Options---

@param optionsCommandIndex
@text Command Index
@type combo
@option Auto
@desc The position of the options command.
@default 1
@parent ---Options---

@param optionsCommandName
@text Options Command Name
@type text
@desc The name of the command on the options menu.
@default Game Frame
@parent ---Options---

@param helpWindowText
@text Help Window Text
@type text
@desc The text on the help window.
@default OK To select a frame | Cancel to quit the selection
@parent ---Options---

@param itemWidth
@text Preview Width
@type text
@desc The width size of the background preview.
@default 300
@parent ---Options---

@param itemHeight
@text Preview Height
@type text
@desc The width size of the background preview.
@default 300
@parent ---Options---

@param cursorAbovePreview
@text Cursor Above Previews
@type boolean
@desc If true, the default cursor will be shown above the background.
@default true
@parent ---Options---

@param removeFilters
@text Remove Filters
@type boolean
@desc Need Eli Game Filters. If true, the filters will be removed while selecting background.
@default true
@parent ---Options---

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_FacesReaction = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Window_GameFrameHelp extends Window_Base{

    initialize(){
        super.initialize(...this.getRect())
        this.setTextPrefix()
        this.openness = 0
        this.close()
        this.refreshText()
    }

    setTextPrefix(){
        if(Imported.Eli_MessageActions){
            this.prefix = `\x1bAlign[center]` 
        }else{
            this.prefix = ""
        }
    }

    getRect(){
        const x = 0
        const y = 0
        const width = Graphics.boxWidth
        const height = this.fittingHeight(1)
   
        return [x, y, width, height]
    }

    setDefaultTextAlignment() {
        this.currentAlign = 'center'
    }

    refreshText(){
        this._text = `${this.prefix}${Plugin.param().helpWindowText}`
        this.contents.clear()
        this.currentAlign = 'center'
        this.drawText(this._text, 0, 0, this.contentsWidth(), "center")
    }
}

class Window_GameFrameOptions extends Window_Command{

    initialize(rect = new Rectangle()){
        super.initialize(...this.getRect())
        this.openness = 0
        this.close()
        this.deactivate()
        this.setHandler("cancel", this.onCancel.bind(this) )
        this.setHandler("ok", this.onOk.bind(this) )
    }

    getRect(){
        const helpWin = SceneManager._scene._gameFrameHelpWindow
        const x = 0
        const width = this.windowWidth()
        const heightArea = Graphics.boxHeight - helpWin.height
        const lines = Math.floor(heightArea/this.itemHeight())
        const height = (this.itemHeight() * lines) + this.standardPadding() * 2
        const y = (helpWin.y + helpWin.height) + (heightArea/2 - height/2)

        return [x, y, width, height]
    }

    windowWidth(){
        return Graphics.boxWidth
    }

    windowHeight(){
        const heightArea = Graphics.boxHeight - SceneManager._scene._gameFrameHelpWindow.height
        const lines = Math.floor(heightArea/this.itemHeight())
        const height = (this.itemHeight() * lines) + this.standardPadding() * 2

        return height
    }

    onCancel(){
        this.close()
        SceneManager._scene._gameFrameHelpWindow.close()

        if(Imported.Eli_GameFilters && Plugin.param().removeFilters){
            SceneManager._scene.createGameFilter()
        }

        if(SceneManager._scene._helpWindow){
            SceneManager._scene._helpWindow.open()
        }

        SceneManager._scene._optionsWindow.open()
        SceneManager._scene._optionsWindow.activate()
    }

    onOk(){
        ConfigManager.gameFrame = Plugin.param().background.image[this.index()]
        Plugin.refreshBackgroundImage()
        this.activate()
    }

    itemHeight(){
        return Plugin.param().itemHeight + this.lineHeight() + this.spacing()
    }

    maxCols(){
        return Math.floor(this.contentsWidth()/(Plugin.param().itemWidth + this.spacing()))
    }

    itemRect(index) {
        const rect = super.itemRect(index)
        //rect.y += Math.floor(index/this.maxCols()) * this.spacing()
        
        return rect
    }

    makeCommandList(){
        for(let i = 0; i < Plugin.param().background.image.length; i++){
            const cmd = Plugin.param().background.image[i]
            ImageManager.loadSystem(cmd)
            this.addCommand("", cmd)
        }
    }

    itemTextAlign() {
        return 'center';
    }

    drawItem(index){
        const rect = this.itemRectForText(index)
        const bitmap = ImageManager.loadSystem(Plugin.param().background.image[index])

        bitmap.addLoadListener(() => {
            this.contents.clearRect(rect.x, rect.y, rect.width, rect.height)
            const sx = 0
            const sy = 0
            const sw = bitmap.width
            const sh = bitmap.height
            this.contents.blt(bitmap, sx, sy, sw, sh, rect.x, rect.y, rect.width, rect.height)
        })
    }

    _createAllParts() {
        super._createAllParts()
        if(Plugin.param().cursorAbovePreview){
            const contentIndex = this.getChildIndex(this._windowContentsSprite)
            this.setChildIndex(this._windowCursorSprite, contentIndex)
        }
    }
}

Eli.GameFrame = {

    version: 5.10,
    url: '',
    alias: {},
    parameters: {
        sides: "",
        extraWidth: 0,
        extraHeight: 0,
        background: {
            image: [""],
            repeat: false,
        },
        enableOptions: true,
        optionsCommandName: "",
        optionsCommandIndex: "",
        helpWindowText: "",
        itemWidth: 0,
        itemHeight: 0,
        cursorAbovePreview: true,
        removeFilters: true,
    },
    divContainer: document.createElement('div'),
    extraWidth: 0,
    extraHeight: 0,
    Window_GameFrameHelp: Window_GameFrameHelp,
    Window_GameFrameOptions: Window_GameFrameOptions,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.initExtraSize()
        this.changeScreenSize()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_GameFrame")
        this.parameters.sides = parameters.sides
        this.parameters.extraWidth = Number(parameters.extraWidth)
        this.parameters.extraHeight = Number(parameters.extraHeight)
        this.parameters.enableOptions = parameters.enableOptions === "true"
        this.parameters.optionsCommandName = parameters.optionsCommandName
        this.parameters.optionsCommandIndex = parameters.optionsCommandIndex
        this.parameters.helpWindowText = parameters.helpWindowText
        this.parameters.itemWidth = Number(parameters.itemWidth)
        this.parameters.itemHeight = Number(parameters.itemHeight)
        this.parameters.cursorAbovePreview = parameters.cursorAbovePreview === "true"
        this.parameters.removeFilters = parameters.removeFilters === "true"
        this.parameters.background = {
            image: JSON.parse(parameters.backImage),
            repeat: parameters.backRepeat === "true",
        }
    },

    initPluginCommands(){},

    initExtraSize(){
        if(this.param().sides === "All"){
            this.extraWidth = this.param().extraWidth * 2
            this.extraHeight = this.param().extraHeight * 2

        }else if(this.param().sides === "Left and Right"){
            this.extraWidth = this.param().extraWidth * 2
            this.extraHeight = 0
        }
    },

    changeScreenSize(){
        SceneManager._screenWidth       += this.extraWidth
        SceneManager._boxWidth          += this.extraWidth

        if(this.parameters.sides === "All"){
            SceneManager._screenHeight      += this.extraHeight
            SceneManager._boxHeight         += this.extraHeight
        }
    },

    createHtmlElements(){
        this.createDiv()
        this.createBackground()
    },

    createDiv(){
        const div = document.createElement('div')
        div.id = 'GameFrame'
        div.style.position = "absolute"
        div.style.overflow = "hidden"
        div.style.zIndex = "10.9"
        div.style.top = 0+'px'
        div.style.left = 0+'px'
        div.style.right = 0+'px'
        div.style.bottom = 0+'px'
        div.style.margin = "auto"
        
        this.divContainer = div
        document.body.append(div)
    },

    createBackground(){
        this.divContainer.style.visibility = "hidden"
        let img = document.createElement("img")
        img.src = `img/system/${ConfigManager.gameFrame}.png`

        img.addEventListener("load", () => {
            this.divContainer.style.backgroundRepeat = Plugin.param().background.repeat ? "repeat" : "no-repeat"
            this.divContainer.style.backgroundSize = `100% 100%`
            this.divContainer.style.backgroundImage = `url('img/system/${ConfigManager.gameFrame}.png')`
            this.divContainer.style.visibility = "visible"
            img = null
        }, {once: true})
    },

    getDiv(){
        return this.divContainer
    },

    param(){
        return this.parameters
    },

    isLandscape(){
        if(typeof screen.orientation === "undefined"){
            return window.innerHeight < window.innerWidth //detect landscape old style
        }else{
            return screen.orientation.type.includes("landscape")    
        }
    },

    refreshBackgroundImage(){
        this.divContainer.style.backgroundImage = `url('img/system/${ConfigManager.gameFrame}.png')`
    }
}

const Plugin = Eli.GameFrame
const Alias = Eli.GameFrame.alias

Plugin.initialize()

/* -------------------------------- GRAPHICS -------------------------------- */
Alias.Graphics_initialize = Graphics.initialize
Graphics.initialize = function(width, height, type){
    width -= Plugin.extraWidth
    height -= Plugin.extraHeight
    Alias.Graphics_initialize.call(this, width, height, type)
    Plugin.createHtmlElements()
}

Alias.Graphics_updateRealScale = Graphics._updateRealScale
Graphics._updateRealScale = function() {
    Alias.Graphics_updateRealScale.call(this)

    if(this._stretchEnabled){
        let h = (window.innerWidth - Plugin.extraWidth) / this._width
        let v = (window.innerHeight - Plugin.extraHeight) / this._height
        if(h >= 1 && h - 0.01 <= 1) h = 1
        if(v >= 1 && v - 0.01 <= 1) v = 1
        this._realScale = Math.min(h, v)
    }
}

Graphics.refreshBoxSize = function(){
    if(this.boxHeight !== this._height){
        this.boxHeight = this._height
    }

    if(this.boxWidth !== this._width){
        this.boxWidth = this._width
    }

    this._updateAllElements()
}

/* ----------------------------- CONFIG MANAGER ----------------------------- */
ConfigManager.gameFrame = Plugin.param().background.image[0]

Alias.ConfigManager_makeData = ConfigManager.makeData
ConfigManager.makeData = function() {
    const config = Alias.ConfigManager_makeData.call(this)
    config.gameFrame = this.gameFrame

    return config
}

Alias.ConfigManager_applyData = ConfigManager.applyData
ConfigManager.applyData = function(config) {
    Alias.ConfigManager_applyData.call(this, config)
    this.gameFrame = this.readGameFrame(config)
}

ConfigManager.readGameFrame = function(config){
    return config["gameFrame"] || Plugin.param().background.image[0]
}

/* ------------------------------ SCENE MANAGER ----------------------------- */
Alias.SceneManager_onSceneCreate = SceneManager.onSceneCreate
SceneManager.onSceneCreate = function() {
    Graphics.refreshBoxSize()
    Alias.SceneManager_onSceneCreate.call(this)
}

/* ------------------------------ SCENE OPTIONS ----------------------------- */
Alias.Scene_Options_create = Scene_Options.prototype.create
Scene_Options.prototype.create = function() {
    Alias.Scene_Options_create.call(this)
    this.createGameFrameTitleWindow()
    this.createGameFrameOptionsWindow()
}

Scene_Options.prototype.createGameFrameTitleWindow = function() {
    this._gameFrameHelpWindow = new Window_GameFrameHelp()
    this.addWindow(this._gameFrameHelpWindow)
}

Scene_Options.prototype.createGameFrameOptionsWindow = function() {
    this._gameFrameWindow = new Window_GameFrameOptions()
    this.addWindow(this._gameFrameWindow)
}

/* -------------------------------- SCENE MAP ------------------------------- */
Alias.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded
Scene_Map.prototype.onMapLoaded = function() {
    Alias.Scene_Map_onMapLoaded.call(this)
    if($dataMap.meta.GameFrame){
        this.changeGameFrame()
    }
}

Scene_Map.prototype.changeGameFrame = function() {
    ConfigManager.gameFrame = Eli.String.removeSpaces($dataMap.meta.GameFrame)
    ConfigManager.save()
    Plugin.refreshBackgroundImage()
}

/* ----------------------------- WINDOW OPTIONS ----------------------------- */
const GAME_FRAME_SYMBOL = "gameFrame"

Alias.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList
Window_Options.prototype.makeCommandList = function() {
    Alias.Window_Options_makeCommandList.call(this)

    if(Plugin.param().enableOptions){
        this.addGameFrameOptions()
    }
}

Window_Options.prototype.addGameFrameOptions = function(){
    this.addCommand(Plugin.param().optionsCommandName, GAME_FRAME_SYMBOL)

    if(Plugin.param().optionsCommandIndex !== "Auto"){
        const destIndex = Number(Plugin.param().optionsCommandIndex)
        const element = this._list.pop()
        this._list.splice(destIndex, 0, element)
    }
}

Alias.Window_Options_statusText = Window_Options.prototype.statusText
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index)

    if(this.isGameFrameSymbol(symbol)){
        return this.getGameFrameText()
    }else{
        return Alias.Window_Options_statusText.call(this, index)
    } 
}

Window_Options.prototype.isGameFrameSymbol = function(symbol) {
    return symbol === GAME_FRAME_SYMBOL
}

Window_Options.prototype.getGameFrameText = function() {
    return ""
}

Alias.Window_Options_processOk = Window_Options.prototype.processOk
Window_Options.prototype.processOk = function() {
    const symbol = this.commandSymbol(this.index())

    if(this.isGameFrameSymbol(symbol)){
        this.onGameFrameSymbol()
    }else{
        Alias.Window_Options_processOk.call(this)
    }
}

Window_Options.prototype.onGameFrameSymbol = function() {
    SoundManager.playOk()
    if(this._helpWindow){
        this._helpWindow.close()
    }
    this.close()
    this.deactivate()

    if(Imported.Eli_GameFilters && Plugin.param().removeFilters){
        SceneManager._scene.resetGameFilters()
    }
    
    SceneManager._scene._gameFrameWindow.open()
    SceneManager._scene._gameFrameHelpWindow.open()
    SceneManager._scene._gameFrameWindow.activate()
}

Alias.Window_Options_cursorRight = Window_Options.prototype.cursorRight
Window_Options.prototype.cursorRight = function(wrap) {
    const symbol = this.commandSymbol(this.index())

    if(this.isGameFrameSymbol(symbol)){

    }else{
        Alias.Window_Options_cursorRight.call(this, wrap)
    }
}

Alias.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft
Window_Options.prototype.cursorLeft = function(wrap) {
    const symbol = this.commandSymbol(this.index())

    if(this.isGameFrameSymbol(symbol)){

    }else{
        Alias.Window_Options_cursorLeft.call(this, wrap)
    }
}

}
//============================================================================
// Eli_GameFilters.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Add filters to the game screen via options menu.
@author Hakuen Studio

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Please, is very important to me that you rate this plugin ^^
https://hakuenstudio.itch.io/hakuen-studio-game-filter-for-rpg-maker/rate?source=game

• Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Features
==============================================================================

● Add a custom filter to all game screen!
● Let the player choose the filter he wants on Options Menu!

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/17qUD3OMvN--EzqNLTLDccz2_QgP6hVaZpDpunD05GP0/edit?usp=sharing

==============================================================================

@param optionsCommandName
@text Options Command Name
@type text
@desc The name of the command on the options menu.
@default Screen Filter

@param helpWindowText
@text Help Window Text
@type text
@desc The text on the help window.
@default Current Filter: 

@param filterImage
@text Filter Image
@type file
@dir img/system
@desc The image used on the filter window.
@default

@param commandList
@text Command List
@type struct<commandListSt>[]
@desc A lis of commands and their filters.
@default []

*/

/* ------------------------------ COMMAND LIST ------------------------------ */
{

/*~struct~commandListSt:

@param name
@text Name
@type text
@desc The name of the command.
@default

@param filters
@text Filter List
@type struct<filterSt>[]
@desc A list of filters this command will have.
@default []

*/
}

/* -------------------------------- FILTER ST ------------------------------- */
{

/*~struct~filterSt:

@param type
@text Filter Select
@type combo
@option Color Matrix Filter
@option Adjustment Filter
@option CRT Filter
@option RGB Split Filter
@desc Select a filter to use, then build his settings according to the list below.
@default Color Matrix Filter

@param separator1
@text ▬▬▬▬▬▬▬▬▬▬
@default ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

@param colorMatrix
@text Color Matrix
@type struct<colorMatrixSt>
@desc
@default

@param adjustment
@text Adjustment
@type struct<adjustmentSt>
@desc
@default

@param crt
@text CRT
@type struct<crtSt>
@desc
@default

@param rgbSplit
@text RGB Split
@type struct<rgbSplitSt>
@desc
@default

*/

}

/* ------------------------------ COLOR MATRIX ------------------------------ */
{

/*~struct~colorMatrixSt:

@param sepia
@text Sepia
@type select
@option true
@option false
@option none
@desc Sepia image
@default none

@param negative
@text Negative
@type select
@option true
@option false
@option none
@desc Negative image
@default none

@param kodachrome 
@text Kodachrome 
@type select
@option true
@option false
@option none
@desc Color reversal film introduced by Eastman Kodak in 1935
@default none

@param lsd 
@text LSD 
@type select
@option true
@option false
@option none
@desc LSD effect
@default none

@param polaroid 
@text Polaroid 
@type select
@option true
@option false
@option none
@desc Polaroid filter
@default none

@param desaturate 
@text Desaturate 
@type select
@option true
@option false
@option none
@desc Desaturate image (remove color)
@default none

@param contrast 
@text Contrast 
@type select
@option true
@option false
@option none
@desc Increase contrast : shadows darker and highlights brighter
@default none

@param contrastAmount 
@text Amount 
@type text
@desc From 0 to 1.
@default 1
@parent contrast

@param greyscale 
@text Greyscale 
@type select
@option true
@option false
@option none
@desc Set the matrices in grey scales
@default none

@param greyscaleAmount 
@text Amount 
@type text
@desc From 0 to 1.
@default 1
@parent greyscale

@param predator 
@text Predator 
@type select
@option true
@option false
@option none
@desc
@default none

@param predatorAmount 
@text Amount 
@type text
@desc Any number.
@default 1
@parent predator

@param saturate 
@text Saturate 
@type select
@option true
@option false
@option none
@desc
@default none

@param saturateAmount 
@text Amount 
@type text
@desc From 0 to 1.
@default 1
@parent saturate

*/

}

/* ---------------------------- ADJUSTMENT FILTER --------------------------- */
{

/*~struct~adjustmentSt:

@param gamma
@text Gamma
@type text
@desc The amount of luminance
@default 1

@param saturation
@text Saturation
@type text
@desc The amount of color saturation
@default 1

@param contrast
@text Contrast
@type text
@desc The amount of contrast
@default 1

@param brightness
@text Brightness
@type text
@desc The overall brightness
@default 1

@param red
@text Red
@type text
@desc The multipled red channel
@default 1

@param green
@text Green
@type text
@desc The multipled green channel
@default 1

@param blue
@text Blue
@type text
@desc The multipled blue channel
@default 1

@param alpha
@text Alpha
@type text
@desc The overall alpha amount. Allow decimals. Form 0 to 1.
@default 1

*/

}

/* ------------------------------- CRT FILTER ------------------------------- */
{

/*~struct~crtSt:

@param curvature
@text Curvature
@type text
@desc Bent of interlaced lines, higher value means more bend
@default 1.0

@param lineWidth
@text Line Width
@type text
@desc Width of the interlaced lines
@default 1.0

@param lineContrast
@text Line Contrast
@type text
@desc Contrast of interlaced lines
@default 0.25

@param verticalLine
@text Vertical Line
@type boolean
@desc true is vertical lines, false is horizontal
@default false

@param noise
@text Noise
@type text
@desc Opacity/intensity of the noise effect between 0 and 1
@default 0.3

@param noiseSize
@text Noise Size
@type text
@desc The size of the noise particles
@default 1

@param vignetting
@text Vignetting
@type text
@desc The radius of the vignette effect, smaller values produces a smaller vignette
@default 0.3

@param vignettingAlpha
@text Vignetting Alpha
@type text
@desc Amount of opacity of vignette
@default 1.0

@param vignettingBlur
@text Vignetting Blur
@type text
@desc Blur intensity of the vignette
@default 0.3

@param seed
@text Seed
@type text
@desc A seed value to apply to the random noise generation
@default 0

@param time
@text Time
@type text
@desc For animating interlaced lines
@default 0

*/

}

/* -------------------------------- RGBSPLIT -------------------------------- */
{

/*~struct~rgbSplitSt:

@param redX
@text Red X
@type text
@desc Red channel offset
@default 0

@param redY
@text Red Y
@type text
@desc Red channel offset
@default 0

@param blueX
@text Blue X
@type text
@desc Blue channel offset
@default 0

@param blueY
@text Blue Y
@type text
@desc Blue channel offset
@default 0

@param greenX
@text Green X
@type text
@desc Green channel offset
@default 0

@param greenY
@text Green Y
@type text
@desc Green channel offset
@default 0

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_GameFilters = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Sprite_FilterBitmap extends Sprite {

    initialize(bitmap, row, filterSettings = []){
        super.initialize(bitmap)
        this.initMembers(row, filterSettings)
        this.createFilter() 
    }

    initMembers(row, filterSettings){
        this.row = row
        this.filterSettings = filterSettings
        this._filters = []
    }

    createFilter(){
        this._filters.push(...Plugin.createFilter(this.filterSettings))
    }

    update(){
        super.update()
        this.updateGameFilters()
    }

    updateGameFilters(){
        for(let i = 0; i < this.filterSettings.length; i++){
            const settings = this.filterSettings[i]
            const type = settings.type
            const time = settings[type].time || 0

            this._filters[i].time += time
        }
    }
}

class Window_GameFilterHelp extends Window_Base{

    initialize(){
        super.initialize(...this.getRect())
        this.setTextPrefix()
        this.openness = 0
        this.close()
        this.refreshText()
    }

    setTextPrefix(){
        if(Imported.Eli_MessageActions){
            this.prefix = `\x1bAlign[center]${Plugin.param().helpWindowText}` 
        }else{
            this.prefix = Plugin.param().helpWindowText
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
        this.filterText = `${this.prefix}${ConfigManager.gameFilter}`
        this.contents.clear()
        this.currentAlign = 'center'
        this.drawText(this.filterText, 0, 0, this.contentsWidth(), "center")
    }

}

class Window_Options_GameFilter extends Window_Command{

    initialize(rect = new Rectangle()){
        this.initMembers()
        super.initialize(...this.getRect())
        this.openness = 0
        this.close()
        this.deactivate()
        this.setHandler("cancel", this.onCancel.bind(this) )
        this.setHandler("ok", this.onOk.bind(this) )
    }

    initMembers(){
        this.windowSpriteFilterOptions = new Sprite()
        this.filterBitmap = ImageManager.loadSystem(Plugin.param().filterImage)
        this.spriteList = []
    }

    getRect(){
        const helpWin = SceneManager._scene._gameFilterHelpWindow
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
        const heightArea = Graphics.boxHeight - SceneManager._scene._gameFilterHelpWindow.height
        const lines = Math.floor(heightArea/this.itemHeight())
        const height = (this.itemHeight() * lines) + this.standardPadding() * 2

        return height
    }

    onCancel(){
        const scene = SceneManager._scene
        this.close()
        scene._optionsWindow.redrawCurrentItem()
        scene._gameFilterHelpWindow.close()
        scene.createGameFilter()

        if(scene._helpWindow){
            scene._helpWindow.open()
        }

        scene._optionsWindow.open()
        scene._optionsWindow.activate()
    }

    onOk(){
        ConfigManager.gameFilter = this.commandName(this.index())
        SceneManager._scene._gameFilterHelpWindow.refreshText()
        this.activate()
    }

    itemHeight(){
        return this.filterBitmap.height + this.lineHeight() + this.spacing()
    }

    maxCols(){
        return Math.floor(this.contentsWidth()/(this.filterBitmap.width + this.spacing()))

    }

    itemRect(index) {
        const rect = super.itemRect(index)
        //rect.y += Math.floor(index/this.maxCols()) * this.spacing()
        
        return rect
    }

    clearCommandList(){
        super.clearCommandList()
        this.spriteList = []
        this.windowSpriteFilterOptions.children = []
    }

    makeCommandList(){
        for(let i = 0; i < Plugin.param().commandList.length; i++){
            const cmd = Plugin.param().commandList[i]
            const filterSettings = Plugin.param().commandList[i].filters
            const itemRect = this.itemRect(i)
            const row = Math.floor(i / this.maxCols())
            const sprite = new Sprite_FilterBitmap(this.filterBitmap, row, filterSettings)
            const x = itemRect.x + (itemRect.width/2 - this.filterBitmap.width/2)

            this.addCommand(cmd.name, cmd.name.toLowerCase())
            sprite.move(x, itemRect.y + this.lineHeight())
            this.spriteList[i] = sprite
            this.windowSpriteFilterOptions.addChild(sprite)
        }
    }

    refresh(){
        this.filterBitmap.addLoadListener(() => {
            super.refresh()
        })
    }

    _createAllParts() {
        super._createAllParts()
        const index = this.getChildIndex(this._windowCursorSprite)
        this.addChildAt(this.windowSpriteFilterOptions, index+1)
    }

    _refreshContents() {
        super._refreshContents()
        this.windowSpriteFilterOptions.move(this.padding, this.padding)
    }

    _updateContents() {
        super._updateContents()
        const w = this._width - this._padding * 2
        const h = this._height - this._padding * 2

        if(w > 0 && h > 0) {
            this.windowSpriteFilterOptions.setFrame(this.origin.x, this.origin.y, w, h)
            this.windowSpriteFilterOptions.visible = this.isOpen()
        }else{
            this.windowSpriteFilterOptions.visible = false
        }
    }

    itemTextAlign() {
        return 'center';
    }

    select(index){
        super.select(index)
        if(this.index() > -1){

            for(const sprite of this.spriteList){
                sprite.visible = sprite.row >= this.topRow() && sprite.row <= this.bottomRow()
            }
        }
    }
}

Eli.GameFilters = {

    version: 5.01,
    url: '',
    alias: {},
    parameters: {
        optionsCommandName: "",
        filterImage: "",
        helpWindowText: "",
        commandList: [{
            name: "",
            filters: [{
                type: "",
                colorMatrix: {},
                crt: {},
                adjustment: {},
                rgbSplit: {},
            }]
        }]
    },
    regRemoveSpace: /\s/g,
    Sprite_FilterBitmap: Sprite_FilterBitmap,
    Window_Options_GameFilter: Window_Options_GameFilter,

    initialize(){
        this.initParameters()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_GameFilters")
        this.parameters.optionsCommandName = parameters.optionsCommandName
        this.parameters.filterImage = parameters.filterImage
        this.parameters.helpWindowText = parameters.helpWindowText
        this.parameters.commandList = this.parseCommandList(parameters.commandList)
    },

    parseCommandList(rawParameters){
        const commandList = JSON.parse(rawParameters)
        const arr = []

        for(const rawCmd of commandList){
            const cmd = JSON.parse(rawCmd)
            const filterData = JSON.parse(cmd.filters)
            const newFilters = []

            for(const data of filterData){
                const filter = JSON.parse(data)
                const type = this.findFilterParameter(filter.type)
  
                filter.type = type
                filter[type] = this[`parse_${type}`](filter[type])
                newFilters.push(filter)
            }

            cmd.filters = newFilters
            arr.push(cmd)
        }

        return arr
    },

    findFilterParameter(type){
        return{
            "Color Matrix Filter":  "colorMatrix",
            "Adjustment Filter":    "adjustment",
            "CRT Filter":           "crt",
            "RGB Split Filter":     "rgbSplit",
        }[type]
    },

    parse_colorMatrix(rawFilter){
        const filter = JSON.parse(rawFilter)
        return {
            sepia: filter.sepia,
            negative: filter.negative,
            kodachrome: filter.kodachrome,
            lsd: filter.lsd,
            polaroid: filter.polaroid,
            desaturate: filter.desaturate,
            contrast: filter.contrast,
            contrastAmount: Number(filter.contrastAmount),
            greyscale: filter.greyscale,
            greyscaleAmount: Number(filter.greyscaleAmount),
            predator: filter.predator,
            predatorAmount: Number(filter.predatorAmount),
            saturate: filter.saturate,
            saturateAmount: Number(filter.saturateAmount),
        }
    },

    parse_adjustment(rawFilter){
        const filter = JSON.parse(rawFilter)
        return {
            gamma: Number(filter.gamma),
            saturation: Number(filter.saturation),
            contrast: Number(filter.contrast),
            brightness: Number(filter.brightness),
            red: Number(filter.red),
            green: Number(filter.green),
            blue: Number(filter.blue),
            alpha: Number(filter.alpha),
        }
    },

    parse_crt(rawFilter){
        const filter = JSON.parse(rawFilter)
        return {
            curvature: Number(filter.curvature),
            lineWidth: Number(filter.lineWidth),
            lineContrast: Number(filter.lineContrast),
            verticalLine: filter.verticalLine === "true",
            noise: Number(filter.noise),
            noiseSize: Number(filter.noiseSize),
            seed: Number(filter.seed),
            vignetting: Number(filter.vignetting),
            vignettingAlpha: Number(filter.vignettingAlpha),
            vignettingBlur: Number(filter.vignettingBlur),
            time: Number(filter.time),
        }
    },

    parse_rgbSplit(rawFilter){
        const filter = JSON.parse(rawFilter)
        return {
            red: [Number(filter.redX), Number(filter.redY)],
            green: [Number(filter.greenX), Number(filter.greenY)],
            blue: [Number(filter.blueX), Number(filter.blueY)],
        }
    },

    param(){
        return this.parameters
    },

    removeSpaces(str){
        return str.replace(this.regRemoveSpace, "")
    },

    create_colorMatrix(settings){
        const filter = new PIXI.filters.ColorMatrixFilter()
        const hasAmount = ["saturate", "greyscale", "predator", "contrast"]

        for(const method in settings){
            const arg = settings[method]

            if(isNaN(arg) && arg !== "none"){
                const flag = arg === "true"
                
                if(hasAmount.includes(method)){
                    const amount = settings[`${arg}Amount`]
                    filter[method](amount, flag)
                }else{
                    filter[method](flag)
                }
                
            }
        }

        return filter
    },

    create_adjustment(settings){
        const filter = new PIXI.filters.AdjustmentFilter(settings)
        
        return filter
    },

    create_crt(settings){
        const filter = new PIXI.filters.CRTFilter(settings)
        
        return filter
    },

    create_rgbSplit(settings){
        const red = settings.red
        const green = settings.green
        const blue = settings.blue
        const filter = new PIXI.filters.RGBSplitFilter(red, green, blue)
        
        return filter
    },

    createFilter(filterSettings){
        const filters = []

        for(const settings of filterSettings){
            const type = settings.type
            const filter = this[`create_${type}`](settings[type])

            filters.push(filter)
        }

        return filters
    }

}

const Plugin = Eli.GameFilters
const Alias = Eli.GameFilters.alias

Plugin.initialize()

/* ----------------------------- CONFIG MANAGER ----------------------------- */
{

ConfigManager.gameFilter = "Original"

Alias.ConfigManager_makeData = ConfigManager.makeData
ConfigManager.makeData = function() {
    const config = Alias.ConfigManager_makeData.call(this)
    config.gameFilter = this.gameFilter

    return config
}

Alias.ConfigManager_applyData = ConfigManager.applyData
ConfigManager.applyData = function(config) {
    Alias.ConfigManager_applyData.call(this, config)
    this.gameFilter = this.readGameFilter(config)
}

ConfigManager.readGameFilter = function(config){
    return config["gameFilter"] || "original"
}

}

/* ------------------------------- SCENE BASE ------------------------------- */
{

Alias.Scene_Base_initialize = Scene_Base.prototype.initialize
Scene_Base.prototype.initialize = function(){
    Alias.Scene_Base_initialize.call(this)
    this.gameFilters = {
        settings:[],
        filters:[],
    }
}

Scene_Base.prototype.resetGameFilters = function(){
    if(this._filters){
        this.removeGameFilters()
    }
    this.gameFilters = {
        settings:[],
        filters:[],
    }
}

Scene_Base.prototype.removeGameFilters = function(){
    for(const customFilter of this.gameFilters.filters){
        const index = this._filters.indexOf(customFilter)
        Eli.Array.removeElement(this._filters, index, 1)
    }
}

Alias.Scene_Base_create = Scene_Base.prototype.create
Scene_Base.prototype.create = function(){
    Alias.Scene_Base_create.call(this)
    this.createGameFilter()
}

Scene_Base.prototype.createGameFilter = function(){
    if(!this._filters){
        this._filters = []
    }

    for(const cmd of Plugin.param().commandList){

        if(cmd.name === ConfigManager.gameFilter){
            const settings = cmd.filters
            const filters = [...Plugin.createFilter(settings)]

            this.gameFilters.settings = settings
            this.gameFilters.filters.push(...filters)
            this._filters.push(...filters)
        }
    }
}

Alias.Scene_Base_update = Scene_Base.prototype.update
Scene_Base.prototype.update = function(){
    Alias.Scene_Base_update.call(this)
    this.updateCustomFilters()
}

Scene_Base.prototype.updateCustomFilters = function(){
    for(let i = 0; i < this.gameFilters.settings.length; i++){
        const settings = this.gameFilters.settings[i]
        const filterType = settings.type

        if(filterType === "crt"){
            const time = settings[filterType].time || 0
            this.gameFilters.filters[i].time += time
        } 
    }
}

}

/* ------------------------------- SCENE BOOT ------------------------------- */
{

Alias.Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages
Scene_Boot.loadSystemImages = function() {
    Alias.Scene_Boot_loadSystemImages.call(this)
    ImageManager.loadSystem(Plugin.param().filterImage)
}

}

/* ------------------------------ SCENE OPTIONS ----------------------------- */
{

Alias.Scene_Options_create = Scene_Options.prototype.create
Scene_Options.prototype.create = function() {
    Alias.Scene_Options_create.call(this)
    this.createGameFilterHelpWindow()
    this.createGameFilterOptionsWindow()
}

Scene_Options.prototype.createGameFilterHelpWindow = function() {
    this._gameFilterHelpWindow = new Window_GameFilterHelp()
    this.addWindow(this._gameFilterHelpWindow)
}

Scene_Options.prototype.createGameFilterOptionsWindow = function() {
    this._gameFilterWindow = new Window_Options_GameFilter()
    this.addWindow(this._gameFilterWindow)
}

}

/* ----------------------------- WINDOW OPTIONS ----------------------------- */
{

const GAME_FILTER_SYMBOL = "filters"

Alias.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList
Window_Options.prototype.makeCommandList = function() {
    this.addCommand(Plugin.param().optionsCommandName, GAME_FILTER_SYMBOL)
    Alias.Window_Options_makeCommandList.call(this)
}

Alias.Window_Options_statusText = Window_Options.prototype.statusText
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index)

    if(this.isGameFilterSymbol(symbol)){
        return this.getGameFilterText()
    }else{
        return Alias.Window_Options_statusText.call(this, index)
    } 
}

Window_Options.prototype.isGameFilterSymbol = function(symbol) {
    return symbol === GAME_FILTER_SYMBOL
}

Window_Options.prototype.getGameFilterText = function() {
    return ConfigManager.gameFilter
}

Alias.Window_Options_processOk = Window_Options.prototype.processOk
Window_Options.prototype.processOk = function() {
    const symbol = this.commandSymbol(this.index())

    if(this.isGameFilterSymbol(symbol)){
        this.onGameFilterSymbol()
    }else{
        Alias.Window_Options_processOk.call(this)
    }
}

Window_Options.prototype.onGameFilterSymbol = function() {
    const scene = SceneManager._scene
    SoundManager.playOk()

    if(this._helpWindow){
        this._helpWindow.close()
    }

    this.close()
    this.deactivate()
    scene.resetGameFilters()
    scene._gameFilterWindow.open()
    scene._gameFilterHelpWindow.open()
    scene._gameFilterWindow.activate()
}

Alias.Window_Options_cursorRight = Window_Options.prototype.cursorRight
Window_Options.prototype.cursorRight = function(wrap) {
    const symbol = this.commandSymbol(this.index())

    if(this.isGameFilterSymbol(symbol)){

    }else{
        Alias.Window_Options_cursorRight.call(this, wrap)
    }
}

Alias.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft
Window_Options.prototype.cursorLeft = function(wrap) {
    const symbol = this.commandSymbol(this.index())

    if(this.isGameFilterSymbol(symbol)){

    }else{
        Alias.Window_Options_cursorLeft.call(this, wrap)
    }
}

}

}
//==========================================================================
// Eli_MapSelect.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Creates a scene that you can select a map to go.
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

• Creates a map selection scene.
• Add an image for each map.
• Choose to use on-screen buttons or not.
• Help window for description of each map.
• You can add new maps within the game!

============================================================================
How to use
============================================================================

● Create a new folder in your img folder: "map_select" 
(Without quotes, all lower case). You will store the map select preview 
images there.

● You can add as many maps as you like using the plugin parameters. I 
believe that all are very explanatory, however the "Condition Type" 
requires clarification.

● There are conditions to show/hide the map commands on the map select scene.
And there are conditions that can enable/disable theses commands. 
The difference is, that when a command is disabled, it will still show on 
the command window, but the player will not be able to select it.

● On MV version, there is no way to add new maps using plugin commands.
What you need to do, is create all the maps you want on the plugin 
parameter, and you can enable/show them as the game progress, either 
using switches or variables.

============================================================================
Update Log
============================================================================

https://tinyurl.com/mapSelectLog

============================================================================

@param switch
@text Disable Switch
@type switch
@desc If this switch is on, the map select menu will be disabled(also hides the screen button)
@default 0

@param enableOnTitle
@text Add Command to Title
@type boolean
@desc If true, the plugin will add a command on the title screen for map select.
@default false

@param titleCommandName
@text Title Screen Command
@type text
@desc The display name of the command.
@default Map Select
@parent enableOnTitle

@param separator1
@text Keyboard / Gamepad

@param overwrite
@text Overwrite keys
@type boolean
@desc Set to true if you want to overwrite the default keys.
@default true
@parent separator1

@param keyboardButton
@text Keyboard button
@type select
@option none @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc The keyboard button that calls the map select scene.
Default is s
@default s
@parent separator1

@param gamepadButton
@text Game pad button
@type select
@option none @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right 
@desc Choose the gamepad button. Put none to not use.
Default is none.
@default none
@parent separator1

@param separator2
@text Map Screen Button

@param mapButtonEnable
@text Enable Map Button
@type boolean
@desc Enable/Disable the map button that can call the scene for map select.
@default true
@parent separator2

@param mapButtonImage
@text Map Button Image
@type file
@dir img/system
@desc The image of the button on the map scene.
@parent separator2

@param mapButtonPosition
@text Map Button Position
@type struct<positionSt>
@desc The position of the press start.
@default {"alignX":"center","offsetX":"0","alignY":"center","offsetY":"0"}
@parent separator2

@param separator3
@text Map Select Scene

@param commandWindow
@text Command Window
@type struct<commandWindowSt>
@desc The command window
@default
@parent separator3

@param helpPosition
@text Help Position
@type select
@option bottom
@option top
@desc
@default bottom
@parent separator3

@param helpLines
@text Help Lines
@type text
@desc This will decide the height of the help window.
@default 2
@parent separator3

@param resize
@text Resize Image
@type boolean
@desc True to fit the image on the window.
@default true
@parent separator3

@param aspectRatio
@text Aspect Ratio
@type boolean
@desc True to maintain the aspect ratio of the image when resizing it.
@default true
@parent separator3

*/

/* ----------------------------- COMMAND WINDOW ----------------------------- */
{

/*~struct~commandWindowSt:

@param widthType
@text Command Width
@type boolean
@on Auto
@off Manual
@desc If Auto, the plugin will use the largest text command to set the window width.
@default true

@param width
@text Manual Width
@type text
@desc Only works if you set Manual in the Command Window Width Parameter
@default 240

@param position
@text Command position
@type select
@option right
@option left
@desc 
@default right

@param list
@text Command list
@type struct<commandListST>[]
@desc Put here all your initial maps.
@default

@param order
@text List order
@type select
@option manual
@option name
@option mapId
@desc Put here all your initial maps.
@default manual

*/
}

/* ------------------------------ COMMAND LIST ------------------------------ */
{
/*~struct~commandListST:

@param name
@text Command Name
@type text
@desc This is the name that will appear on the command.
@default

@param image
@text Image
@type file
@dir img/map_select
@desc Choose an image from your pictures folder.
@default

@param help
@text Help text
@type note
@desc Set here your help text for this command.
@default "Set here your text. \n\\c[3] You can use escape codes!"

@param id
@text Map Id
@type text
@desc The map id that the player will be transfer.
@default 1

@param pos
@text Pos X Y
@type text
@desc The x y position on the destination map.
@default 12, 7

@param showCondition
@text Show/Hide Condition
@type struct<conditionsSt>[]
@desc
@default []

@param enableCondition
@text Enable/Disable condition
@type struct<conditionsSt>[]
@desc
@default []

*/
}

/* ------------------------------- CONDITIONS ------------------------------- */
{
/*~struct~conditionsSt:

@param type
@text Condition Type
@type select
@option switch
@option item
@option formula
@desc Choose a condition type.
@default switch

@param switchId
@text Switch Id
@type switch
@desc
@default 0

@param itemId
@text Item possesion
@type item
@desc
@default 0

@param formula
@text Formula
@type note
@desc The formula must return a true/false value.
@default "$gameVariables.value(1) > $gameVariables.value(2)"

*/
}

/* -------------------------------- POSITION -------------------------------- */
{

/*~struct~positionSt:

@param alignX
@text Align X
@type select
@option none
@option left
@option center
@option right
@desc Select none to only use offset value.
@default left
    
@param offsetX
@text Position X
@type text
@desc The Offset X position.
@default 10
@parent alignX

@param alignY
@text Align Y
@type select
@option none
@option top
@option center
@option bottom
@desc Select none to only use offset value.
@default top

@param offsetY
@text Position Y
@type text
@desc The offset Y position.
@default 10
@parent alignY

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MapSelect = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

/* ---------------------------- SPRITE MAP BUTTON --------------------------- */
class Sprite_SelectMapButton extends Sprite_Base {

    constructor(bitmap){
        super(bitmap)
    }

    initialize(bitmap){
        super.initialize(bitmap)
        this.createBitmap()
        this.maxWaitCount = 15
        this.waitCount = 0
    }

    initPosition(){
        const positionCache = Plugin.cache.mapButtonPosition

        if(isNaN(positionCache.x)){
            const {alignX, offsetX, alignY, offsetY} = Plugin.param().mapButtonPosition
            const x = Eli.Utils.calculateScreenPosition(alignX, offsetX, this.bitmap.width, "x")
            const y = Eli.Utils.calculateScreenPosition(alignY, offsetY, this.bitmap.height/2, "y")
            positionCache.x = x
            positionCache.y = y
            this.move(x, y)

        }else{
            this.move(positionCache.x, positionCache.y)
        }
    }

    createBitmap(){
        this.bitmap = ImageManager.loadSystem(Plugin.param().mapButtonImage)
        this.bitmap.addLoadListener(() => {
            this.setFrame(0, 0, this.bitmap.width, this.bitmap.height/2)
            this.initPosition()
            this.refreshMainRect(false)
        })
    }

    updateFrameOnClick(){
        this.setFrame(0, this.bitmap.height/2, this.bitmap.width, this.bitmap.height/2)
    }

    isVisible(){
        return !$gameSwitches.disableMapSelect() && !$gameMessage.isBusy() && !$gameMap.isEventRunning()
    }

    updateWaitCount(){
        this.waitCount++
        if(this.waitCount >= this.maxWaitCount){
            this.waitCount = 0
            this.visible = true
        }
    }

    update(){
        if(this.isVisible() && !this.visible){
            this.updateWaitCount()
        }else{
            this.waitCount = 0
            this.visible = this.isVisible()
        }
    }

}

/* ---------------------------- SCENE MAP SELECT ---------------------------- */
class Scene_MapSelect extends Scene_MenuBase{

    constructor(){
        super()
    }

    create(){
        super.create()
        this.createHelpWindow()
        this.createCommandWindow()
        this.createMapWindow()
        this.associateWindows()
        this.adjustWindowPositions()
    }

    adjustWindowPositions(){
        if(this.isBottomHelpMode()){
            this._commandWindow.y = 0
            this._mapWindow.y = 0
            this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height
        }else{
            this._helpWindow.y = 0
            this._commandWindow.y = this._helpWindow.height
            this._mapWindow.y = this._helpWindow.height
        }
    }

    createHelpWindow(){
        this._helpWindow = new Window_Help(Plugin.param().helpLines)
        this.addWindow(this._helpWindow)
    }
    
    createCommandWindow(){
        const {x, y, width, height} = this.commandWindowRect()
        const commandWindow = new Window_MapSelectCommand(x, y, width, height)

        for(const command of Plugin.getCommands()){
            commandWindow.setHandler(command.id, this.commandTransfer.bind(this))
        }

        commandWindow.setHandler("cancel", this.popScene.bind(this))
        this.addWindow(commandWindow)
        this._commandWindow = commandWindow
    }

    commandWindowRect(){
        const auto = Plugin.param().commandWindow.widthType
        const ww = auto ? this.autoMainCommandWidth() : this.mainCommandWidth()
        const wh = Graphics.boxHeight - this._helpWindow.height
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0
        const wy = 0

        return new Rectangle(wx, wy, ww, wh)
    }

    mainCommandWidth(){
        return Plugin.param().commandWindow.width
    }

    autoMainCommandWidth(){
        const dummyWindow = new Window_Command(0, 0)
        const allCommands = Plugin.getCommands()
        const allNamesWidth = allCommands.map(item => Eli.Utils.getTextWidth(item.name, false))
        const largestName = Math.floor(Math.max(...allNamesWidth))

        return largestName + dummyWindow.standardPadding() * 2 + dummyWindow.textPadding() + dummyWindow.spacing()
    }

    createMapWindow(){
        const {x, y, width, height} = this.mapWindowRect()
        this._mapWindow = new Window_Preview(x, y, width, height)
        this.addWindow(this._mapWindow)
    }

    mapWindowRect(){
        const ww = Math.abs(Graphics.boxWidth - this._commandWindow.width)
        const wh = Graphics.boxHeight - this._helpWindow.height
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww
        const wy = 0

        return new Rectangle(wx, wy, ww, wh)
    }

    associateWindows(){
        this._commandWindow.setHelpWindow(this._helpWindow)
    }

    commandTransfer(){
        const {id, pos} = this._commandWindow.getRealCommand()
        const [x, y] = pos.split(",").map(coord => Number(coord))

        if(SceneManager._stack[0].name === "Scene_Title") {
            DataManager.setupNewGame()
        }

        this.fadeOutAll()
        $gamePlayer.reserveTransfer(id, x, y, 2, 0)
        SceneManager.goto(Scene_Map)  
    }

    isRightInputMode(){
        return Plugin.param().commandWindow.position === "right"
    }

    isBottomHelpMode(){
        return Plugin.param().helpPosition === "bottom"
    }

}

/* ---------------------------- SPRITE MAP IMAGE ---------------------------- */
class Sprite_MapImage extends Sprite{

    constructor(bitmap, id, contentWidth, contentHeight){
        super(bitmap, id, contentWidth, contentHeight)
    }

    initialize(bitmap, id, contentWidth, contentHeight){
        super.initialize(bitmap)
        this.initializePlus(id, contentWidth, contentHeight)
    }

    initializePlus(id, contentWidth, contentHeight){
        this.visible = false
        this.id = id
        this.maxWidth = contentWidth
        this.maxHeight = contentHeight
        this.bitmap.addLoadListener(this.adjustImage.bind(this))
    }

    adjustImage(){
        if(Plugin.param().resize){
            this.stretchScaleTo(Plugin.param().aspectRatio, this.maxWidth, this.maxHeight)
        }
        this.centerPositionTo(this.maxWidth, this.maxHeight)

    }

    update(){
        this.visible = SceneManager._scene._commandWindow.currentSymbol() === this.id
    }

}

/* ------------------------ WINDOW MAP SELECT COMMAND ----------------------- */
class Window_MapSelectCommand extends Window_Command{

    constructor(x, y, width, height){
        super(x, y, width, height)

    }

    initialize(x, y, width, height){
        this.customWidth = width
        this.customHeight = height
        this.rawList = []
        super.initialize(x, y)
    }

    windowHeight(){
        return this.customHeight
    }

    windowWidth(){
        return this.customWidth
    }

    makeCommandList() {
        for(const command of this.rawList){
            let canShow = true
            let isEnabled = true
            
            for(const condition of command.showCondition){
            
                switch(condition.type){
                    case "switch":
                        canShow = $gameSwitches.value(condition.switchId)
                    break
                    case "item":
                        canShow = $gameParty.hasItem($dataItems[condition.itemId])
                    break
                    case "formula":
                        canShow = eval(condition.formula)
                    break
                }
 
                if(!canShow) break
            }

            if(!canShow) continue
           
            for(const condition of command.enableCondition){

                switch(condition.type){
                    case "switch":
                        isEnabled = $gameSwitches.value(condition.switchId)
                    break
                    case "item":
                        isEnabled = $gameParty.hasItem($dataItems[condition.itemId])
                    break
                    case "formula":
                        isEnabled = eval(condition.formula)
                    break
                }

                if(!isEnabled) break
            }

            this.addCommand(command.name, command.id, isEnabled)
        }

        this.sortList()
    }

    sortList(){
        switch(Plugin.param().commandWindow.order){
            case "name":
                this._list.sort((a, b) => a.name.localeCompare(b.name))
            break
            case "mapId":
                this._list.sort((a, b) => a.symbol - b.symbol)
            break
        }
    }

    getRealCommand(){
        const symbol = this.currentSymbol()
        return this.rawList.find(command => command.id === symbol)
    }

    itemTextAlign() {
        return "center"
    }

    updateHelp(){
        const text = this.getRealCommand().help
        this._helpWindow.setText(text)
    }

    refresh() {
        this.rawList = Plugin.getCommands()
        super.refresh()
    }

}

/* ------------------------ WINDOW MAP PREVIEW IMAGE ------------------------ */
class Window_Preview extends Window_Base{

    constructor(x, y, width, height){
        super(x, y, width, height)
    }

    initialize(x, y, width, height){
        super.initialize(x, y, width, height)
        this.createImages()
    }

    createImages(){
        const width = this.contents.width
        const height = this.contents.height
        const commands = Plugin.getCommands()

        for(const command of commands){
            const bitmap = ImageManager.loadMapSelect(command.image)
            const id = command.id
            const sprite = new Sprite_MapImage(bitmap, id, width, height)
            Eli.Utils.addInnerChildOnWindow(this, sprite)
        }
    }
}

/* ------------------------------ PLUGIN OBJECT ----------------------------- */
Eli.MapSelect = {

    version: 5.02,
    url: "https://hakuenstudio.itch.io/eli-map-select-for-rpg-maker-mz",
    alias: {},
    parameters: {
        aspectRatio: false,
        gamepadButton: "",
        helpPosition: "",
        helpLines: 0,
        keyboardButton: "",
        mapButtonEnable: false,
        mapButtonImage: "",
        switch: 0,
        overwrite: false,
        resize: false,
        enableOnTitle: false,
        titleCommandName: "Map Select",
        commandWindow: {
            widthType: "", width: 0, position: "", order: "",
            list: [{
                conditionType: "",
                conditionValue: false,
                help: "",
                id: 0,
                image: "",
                name: "",
                pos: "",
            }]
        },
        mapButtonPosition: {alignX: "", offsetX: 0, alignY: "", offsetY: 0},
        sceneButton: {cancel: true, page: true, position: ""},
    },
    cache: {
        mapButtonPosition: {x: "null", y: "null"},
    },
    button: 'mapSelect',
    Sprite_SelectMapButton: Sprite_SelectMapButton,
    Scene_MapSelect: Scene_MapSelect,
    Sprite_MapImage: Sprite_MapImage,
    Window_MapSelectCommand: Window_MapSelectCommand,
    Window_Preview: Window_Preview,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.setKeyboardButton()
        this.setGamePadButton()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){},

    initButtons(){
        if(this.parameters.keyboardButton !== "none"){
            this.setKeyboardButton()
        }

        if(this.parameters.gamepadButton !== "none"){
            this.setGamePadButton()
        }
    },

    setKeyboardButton(){
        const keyName = this.parameters.keyboardButton.toLowerCase()
        const keyCode = Eli.KeyCodes.keyboard[keyName]

        if(this.parameters.overwrite){
            Input.keyMapper[keyCode] = this.button

        }else if(!Eli.KeyCodes.isDefaultKeyboard(keyCode)){
            Input.keyMapper[keyCode] = this.button

        }else{
            this.button = Input.keyMapper[keyCode]
        }
    },

    setGamePadButton(){
        const keyName = this.parameters.gamepadButton.toLowerCase()
        const keyCode = Eli.KeyCodes.gamepad[keyName]

        if(this.parameters.overwrite){
            Input.gamepadMapper[keyCode] = this.button

        }else if(!Eli.KeyCodes.isDefaultGamepad(keyCode)){
            Input.gamepadMapper[keyCode] = this.button

        }else{
            this.button = Input.gamepadMapper[keyCode]
        }
        
    },

    getButton(){
        return this.button
    },

    param(){
        return this.parameters
    },

    getCommands(){
        const allCommands = [...this.param().commandWindow.list, ...$eliData.mapSelect().commands]
        return allCommands
    },

    addNewCommand(name, image, helpText, mapId, posXy, conditionType, conditionValue){
        const newCommand = {
            name: name, image: image, help: helpText, 
            id: mapId, 
            pos: posXy, 
            showCondition: conditionType, 
            enableCondition: conditionValue
        }
        $eliData.mapSelect().commands.push(newCommand)
    },

    isMapSelectButtonTriggered(){
        return Input.isTriggered(this.getButton())
    },

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */

    addNewMap(args){
        args = Eli.PluginManager.convertParameters(args)
        const {name, image, help, id, pos, showCondition, enableCondition} = args.commandList
        this.addNewCommand(name, image, help, id, pos, showCondition, enableCondition)
    },

    callScene(){
        SceneManager.push(this.Scene_MapSelect)
    },

    executePluginCommandMV(command, mvArgs){
        const cmdList = {
            OPENMAPSELECT: "callScene",
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]){
            this[cmd](mvArgs)
        }
    },

}

const Plugin = Eli.MapSelect
const Alias = Eli.MapSelect.alias

Plugin.initialize()

/* -------------------------------- SAVE DATA ------------------------------- */
{

Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize;
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.createNewContent('mapSelect')
    this.addNewDataToContent('mapSelect', 'commands', [])
}

Eli_SavedContents.prototype.mapSelect = function(){
    return this.contents.mapSelect
}

}

/* ------------------------------ IMAGE MANAGER ----------------------------- */
{

ImageManager.loadMapSelect = function(filename){
    return this.loadBitmap("img/map_select/", filename)
}

}

/* ------------------------------ GAME SWITCHES ----------------------------- */
{

Game_Switches.prototype.disableMapSelect = function(){
    const id = Plugin.param().switch
    return this.value(id)
}

}

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args){
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

/* ------------------------------- SCENE TITLE ------------------------------ */
{

Alias.Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow
Scene_Title.prototype.createCommandWindow = function() {
    Alias.Scene_Title_createCommandWindow.call(this)
    if(Plugin.param().titleScreenCommand){
        this._commandWindow.setHandler("mapSelect", this.commandMapSelect.bind(this))
    }
    
}

Scene_Title.prototype.commandMapSelect = function() {
    this._commandWindow.close()
    SceneManager.push(Plugin.Scene_MapSelect)
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_createButtons = Scene_Map.prototype.createButtons;
Scene_Map.prototype.createButtons = function() {
    Alias.Scene_Map_createButtons.call(this)
    this.createMapSelectButton()
}

Alias.Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function() {
    const alias = Alias.Scene_Map_isAnyButtonPressed.call(this)
    return alias || this.isMapSelectButtonPressed()
}

Alias.Scene_Map_updateScene = Scene_Map.prototype.updateScene
Scene_Map.prototype.updateScene = function() {
    Alias.Scene_Map_updateScene.call(this)
    if (!SceneManager.isSceneChanging()) {
        this.updateMapSelectScreenButton()
        this.updateMapSelectKeyButton()
    }
}

Alias.Scene_Map_terminate = Scene_Map.prototype.terminate
Scene_Map.prototype.terminate = function() {
    this.hideMapSelectButton()
    Alias.Scene_Map_terminate.call(this)
}

Scene_Map.prototype.createMapSelectButton = function() {
    if (!Plugin.param().mapButtonEnable) return
    
    this.mapSelectButton = new Sprite_SelectMapButton(new Bitmap(0, 0))
    this.addChild(this.mapSelectButton)
}

Scene_Map.prototype.isMapSelectButtonPressed = function(){
    return  this.mapSelectButton && this.mapSelectButton.isMainRectClicked() && 
            !$gameMap.isEventRunning()
}

Scene_Map.prototype.updateMapSelectScreenButton = function() {
    if(this.isMapSelectButtonPressed()){
        this.mapSelectButton.updateFrameOnClick()
        this.callMapSelect()
    }
}

Scene_Map.prototype.updateMapSelectKeyButton = function() {
    if(Plugin.isMapSelectButtonTriggered()){
        this.callMapSelect()
    }
}

Scene_Map.prototype.callMapSelect = function() {
    if($gameSwitches.disableMapSelect()) return

    $gameTemp.clearDestination()
    SoundManager.playOk()
    SceneManager.push(Plugin.Scene_MapSelect)
    this._waitCount = 2
}

Scene_Map.prototype.hideMapSelectButton = function() {
    if (this.mapSelectButton) {
        this.mapSelectButton.hide()
    }
}

}

/* -------------------------- WINDOW TITLE COMMAND -------------------------- */
{

Alias.Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList
Window_TitleCommand.prototype.makeCommandList = function() {
    Alias.Window_TitleCommand_makeCommandList.call(this)
    if(Plugin.param().enableOnTitle){
        this.addCommand(Plugin.param().titleCommandName, "mapSelect", true)
    }
}

}

}
//============================================================================
// EliMZ_ExtraTrigger.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦1.0.0♦ Adds extra action buttons to activate events!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-extratrigger-rpg-maker-mv

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Rate Plugin  → https://hakuenstudio.itch.io/eli-extratrigger-rpg-maker-mv/rate?source=game
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Creates extra action buttons to trigger events!
● It gives the option to remove the event behavior from looking at the 
player when activated with the extra button.
● Three types of action buttons: Normal, By Distance(FREE), and 
Remote(PRO)!
● Can create more than one button for each type(PRO)
● Remote buttons can also be activated by mouse/touch! (PRO)
● Show icons above the event head that represents the extra action 
buttons!(PRO)
● Multiple remote event selections(PRO)

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1b0yt6ob_kkSt1V75NerXH0D779u2hBlmMKOk-nkcWLQ/edit?usp=sharing

============================================================================

@param buttonNormal
@text Button Normal
@type struct<buttonsSt>
@desc Setup all your extra action buttons here.
@default 

@param buttonDistance
@text Button Distance
@type struct<buttonsSt>
@desc Setup all your extra action buttons here.
@default

*/

/* ----------------------------- BUTTON SETTINGS ---------------------------- */
{

/*~struct~buttonsSt:

@param overwrite
@text Overwrite keys
@type boolean
@desc Set to true if you want to overwrite the default keys.
@default true

@param keyboardKey
@text Key Name
@type select
@option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply" @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc Just insert the keyboard button. Default is C.
@default c

@param gamepadKey
@text Game pad button
@type select
@option none @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right 
@desc Choose the gamepad button. Put none to not use.
Default is none.
@default none

@param label
@text Label Name
@type text
@desc Add here the label command you want to use to activate the event with this button. Do not use spaces.
@default Extra

@param separator1
@text Distance Settings

@param minDistance
@text Minimum distance
@type number
@desc The minimum distance value between event and player required for this button work.
@default 0
@parent separator1

@param distanceVar
@text Distance variable
@type variable
@desc This variable value will control how far, in tiles, you can activate an event.
@default 0
@parent separator1

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ExtraTrigger = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ExtraTrigger = {

    version: 6.01,
    url: "https://hakuenstudio.itch.io/eli-extratrigger-rpg-maker-mv",
    pro: false,
    parameters: {
        showMultipleButtons: true,
        containerOffsetY: 0,
        selectionSwitch: 0,
        selectionVar: 0,
        buttons: [{
            type: "", 
            overwrite: false, 
            keyboardKey: "", 
            gamepadKey: "", 
            label:"", 
            minDistance: 0, 
            distanceVar: 0,
            clickable: true,
            distanceRule: "",
            icon: 0,
        }],
        buttonDistance:{
            type: "", 
            overwrite: false, 
            keyboardKey: "", 
            gamepadKey: "", 
            label:"", 
            minDistance: 0, 
            distanceVar: 0,
            clickable: true,
            distanceRule: "",
            icon: 0,
        },
        buttonNormal: {
            type: "", 
            overwrite: false, 
            keyboardKey: "", 
            gamepadKey: "", 
            label:"", 
            minDistance: 0, 
            distanceVar: 0,
            clickable: true,
            distanceRule: "",
            icon: 0,
        },
    },
    alias: {},
    eventCacheData: {},
    buttonByLabel: {},
    buttonByKeyboardKey: {},
    buttonByGamepadKey: {},
    playerCurrentActionLabel: {eventId: 0, name:""},
    
    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.mapButtons()
    },

    initParameters(){
        const pluginName = Eli.PluginManager.getPluginName()
        const rawParameters = PluginManager.parameters(pluginName)
        this.parameters = this.createParameters(rawParameters)
        this.parameters.buttonNormal.type = "Normal"
        this.parameters.buttonDistance.type = "Distance"
        this.parameters.buttons = [
            this.parameters.buttonNormal, 
            this.parameters.buttonDistance
        ]
    },

    createParameters(rawParameters){
        return {
            showMultipleButtons: rawParameters.showMultipleButtons === "true",
            containerOffsetY: Number(rawParameters.containerOffsetY),
            selectionSwitch: Number(rawParameters.selectionSwitch),
            selectionVar: Number(rawParameters.selectionVar),
            buttonDistance: this.parseSingleButtonParameter(rawParameters.buttonDistance),
            buttonNormal: this.parseSingleButtonParameter(rawParameters.buttonNormal),
        }
    },

    parseAllButtonParameters(buttonParameters){},

    parseSingleButtonParameter(button){
        button = JSON.parse(button)
        button.overwrite = button.overwrite === "true"
        button.distanceVar = Number(button.distanceVar)
        button.minDistance = Number(button.minDistance)
        button.icon = 0
        button.keyboardKey = button.keyboardKey.toLowerCase()
        button.gamepadKey = button.gamepadKey.toLowerCase()
        button.label = button.label

        this.buttonByLabel[button.label] = button
        this.buttonByKeyboardKey[button.keyboardKey] = button
        this.buttonByGamepadKey[button.gamepadKey] = button

        return button
    },

    initPluginCommands(){},

    mapButtons(){
        for(const button of this.param().buttons){
            const canOverwrite = button.overwrite

            if(button.keyboardKey !== "none"){
                this.mapKeyboardButtons(button, canOverwrite)
            }

            if(button.gamepadKey !== "none"){
                this.mapGamepadButtons(button, canOverwrite)
            }
            
        }
    },

    mapKeyboardButtons(button, canOverwrite){
        const keyCode = Eli.KeyCodes.keyboard[button.keyboardKey]

        if(canOverwrite || !Eli.KeyCodes.isDefaultKeyboard(keyCode)){
            Input.keyMapper[keyCode] = button.keyboardKey

        }else{
            button.keyboardKey = Input.keyMapper[keyCode]
        }
    },

    mapGamepadButtons(button, canOverwrite){
        const keyCode = Eli.KeyCodes.gamepad[button.gamepadKey]

        if(canOverwrite || !Eli.KeyCodes.isDefaultGamepad(keyCode)){
            Input.gamepadMapper[keyCode] = button.gamepadKey

        }else{
            button.gamepadKey = Input.gamepadMapper[keyCode]
        }
    },

    param(){
        return this.parameters
    },

    setPlayerCurrentActionLabel(eventId, label){
        this.playerCurrentActionLabel.eventId = eventId
        this.playerCurrentActionLabel.name = label
    },

    clearPlayerCurrentActionLabel(){
        this.playerCurrentActionLabel.eventId = 0
        this.playerCurrentActionLabel.name = ""
    },

    findActionButton(key){
        return this.buttonByKeyboardKey[key] || this.buttonByGamepadKey[key]
    },

    getClickableButton(){},

    isEventOnCache(eventId){
        return this.eventCacheData.hasOwnProperty(eventId)
    },

    registerEventOnCache(eventId){
        this.eventCacheData[eventId] = {}
    },

    isEventPageOnCache(eventId, pageIndex){
        return this.eventCacheData[eventId].hasOwnProperty(pageIndex)
    },

    registerEventPageOnCache(eventId, pageIndex){
        this.eventCacheData[eventId][pageIndex] = []
    },

    commandHasActionButtonLabel(cmd){
        if(cmd && cmd.code === 118){
            const [label, icon] = cmd.parameters[0].split(":")
            const button = this.buttonByLabel[label]
            if(button){
                return true

            }else{
                return false
            }

        }else{
            return false
        }
    },

    registerLabelOnCache(eventId, pageIndex, label, tempIcon){
        this.eventCacheData[eventId][pageIndex].push(label, tempIcon)
    },

}

const Plugin = Eli.ExtraTrigger
const Alias = Eli.ExtraTrigger.alias

Plugin.initialize()

/* -------------------------------- GAME MAP -------------------------------- */
{

Alias.Game_Map_setup = Game_Map.prototype.setup
Game_Map.prototype.setup = function(mapId) {
    Plugin.eventCacheData = {}
    Alias.Game_Map_setup.call(this, mapId)
}

}

/* ------------------------------- GAME PLAYER ------------------------------ */
{

Alias.Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction
Game_Player.prototype.triggerButtonAction = function() {
    const alias = Alias.Game_Player_triggerButtonAction.call(this)

    if(Input._latestButton){
        return this.triggerExtraActionButton()
    }else{

        return alias
    }
}

Game_Player.prototype.triggerExtraActionButton = function(){
    const button = Plugin.findActionButton(Input._latestButton)

    if(button){
        Input.clear()
        const buttonFunction = this.getActionButtonFuntion(button.type)
        return this[buttonFunction](button)
    }else{
        return false
    }
}

Game_Player.prototype.getActionButtonFuntion = function(buttonType){
    const functions = {
        Normal: "triggerNormalActionButton",
        Distance: "triggerDistanceActionButton",
    }
    return functions[buttonType]
}

Game_Player.prototype.triggerNormalActionButton = function(button) {
    const minDistance = 0
    const maxDistance = 1

    return this.findEventForActionButton(minDistance, maxDistance, button)
}

Game_Player.prototype.triggerDistanceActionButton = function(button){
    const minDistance = button.minDistance
    const maxDistance = this.getActionButtonDistanceValue(button)
    
    return this.findEventForActionButton(minDistance, maxDistance, button)
}

Game_Player.prototype.findEventForActionButton = function(minDistance, maxDistance, button){
    for(let i = minDistance; i <= maxDistance; i++){
        const distance = i
        const {x, y} = this.getCoordinatesForActionButton(distance)
        const event = $gameMap.eventsXy(x, y).find(event => event._trigger === 0)

        if(event){
            if(event.hasActionButtonLabel(button.label)){
                event.startWithExtraActionButton(button.label)
            }
            
            return true
        }
    }

    return false
}

Game_Player.prototype.getCoordinatesForActionButton = function(distance){
    const coords = { 
        2: {x:this.x,                       y: Math.abs(this.y + distance)}, 
        4: {x:Math.abs(this.x - distance),  y: this.y}, 
        6: {x:Math.abs(this.x + distance),  y: this.y}, 
        8: {x:this.x,                       y: Math.abs(this.y - distance)} 
    }

    return coords[this.direction()]
}

Game_Player.prototype.getActionButtonDistanceValue = function(button){
    const varValue = $gameVariables.value(button.distanceVar)
    const min = button.minDistance
    const distance = Math.max(min, varValue)

    return distance
}

}

/* ------------------------------- GAME EVENT ------------------------------- */
{

Alias.Game_Event_afterSetupPage = Game_Event.prototype.afterSetupPage
Game_Event.prototype.afterSetupPage = function(){
    Alias.Game_Event_afterSetupPage.call(this)
    this.setupActionButtonLabels()
}

Alias.Game_Event_onListIteration = Game_Event.prototype.onListIteration
Game_Event.prototype.onListIteration = function(index){
    let aliasIndex = Alias.Game_Event_onListIteration.call(this, index)
    aliasIndex = this.searchListForActionButtonlabels(aliasIndex)
    return aliasIndex
}

Alias.Game_Event_afterListIteration = Game_Event.prototype.afterListIteration
Game_Event.prototype.afterListIteration = function(){
    Alias.Game_Event_afterListIteration.call(this)

    if(this.canHaveActionButtonLabels() && this.doesNotHaveActionButtonLabels()){
        Plugin.registerLabelOnCache(this.eventId(), this._pageIndex, "", null)  
    }
}

Game_Event.prototype.setupActionButtonLabels = function(){
    this.refreshActionButtonCache()
    if(!this.canIterateList()){
        this.needIterateList = this.canHaveActionButtonLabels() && this.doesNotHaveActionButtonLabels()
    }
}

Game_Event.prototype.refreshActionButtonCache = function(){
    const eventId = this.eventId()
    const pageIndex = this._pageIndex

    if(!Plugin.isEventOnCache(eventId)){
        Plugin.registerEventOnCache(eventId)
    }
    if(!Plugin.isEventPageOnCache(eventId, pageIndex)){
        Plugin.registerEventPageOnCache(eventId, pageIndex)
    }
}

Game_Event.prototype.canHaveActionButtonLabels = function(){
    return this._trigger === 0 && !this._erased
}

Game_Event.prototype.doesNotHaveActionButtonLabels = function(){
    return this.getActionButtonLabels().length === 0
}

Game_Event.prototype.searchListForActionButtonlabels = function(i){
    const cmd = this.list()[i]
    
    if(Plugin.commandHasActionButtonLabel(cmd)){
        this.processActionButtonLabelCommand(cmd)
    }

    return i
}

Game_Event.prototype.processActionButtonLabelCommand = function(cmd){
    const [label, icon = -1] = cmd.parameters[0].split(":")
    const tempIcon = Number(icon)
    cmd.parameters[0] = label

    this.registerActionButtonLabel(label, tempIcon)
}

Game_Event.prototype.registerActionButtonLabel = function(label, icon){
    Plugin.registerLabelOnCache(this.eventId(), this._pageIndex, label, icon)
}

Game_Event.prototype.getActionButtonLabels = function(){
    return Plugin.eventCacheData[this.eventId()][this._pageIndex]
}

Game_Event.prototype.hasActionButtonLabel = function(label){
    return this.canHaveActionButtonLabels() && this.getActionButtonLabels().includes(label)
}

Game_Event.prototype.startWithExtraActionButton = function(label){
    const list = this.list()

    if(list && list.length > 1){
        const hasLock = this.event().note.toLowerCase().includes('<lock>')

        Plugin.setPlayerCurrentActionLabel(this.eventId(), label)
        this.listRemoveJumpToLabelForActionButton()
        this.listInsertJumpToLabelForActionButton(label)
        
        this._starting = true

        if(this.isTriggerIn([0,1,2]) && !hasLock){
            this.lock()
        }
    }
}

Game_Event.prototype.listRemoveJumpToLabelForActionButton = function(){
    const actionButtonLabels = this.getActionButtonLabels()
    const firstCmd = this.list()[0]
    const label = firstCmd.parameters[0]

    if(firstCmd.code === 1000 && actionButtonLabels.includes(label)){
        this.list().shift()
    }
}

Game_Event.prototype.listInsertJumpToLabelForActionButton = function(label){
    const jumpToLabelPlus = {code: 1000, indent: 0, parameters:[label]}
    const index = 0
    Eli.Array.insertElement(this.list(), index, jumpToLabelPlus)
}

}

/* ---------------------------- GAME_INTERPRETER ---------------------------- */
{

// Erase Event
Alias.Game_Interpreter_command214 = Game_Interpreter.prototype.command214 
Game_Interpreter.prototype.command214 = function() {
    this.listRemoveJumpToLabelForActionButton()
    if(this.needClearPlayerCurrentActionLabel()){
        this.stopActionButtonLabel()
    }
    return Alias.Game_Interpreter_command214.call(this)
}

// Label
Alias.Game_Interpreter_command118 = Game_Interpreter.prototype.command118
Game_Interpreter.prototype.command118 = function(){
    if(this.needExitCommandForActionButtonLabel()){
        this.stopActionButtonLabel()
    }
    return Alias.Game_Interpreter_command118.call(this)
}

Alias.Game_Interpreter_terminate = Game_Interpreter.prototype.terminate
Game_Interpreter.prototype.terminate = function() {
    this.listRemoveJumpToLabelForActionButton()
    if(this.needClearPlayerCurrentActionLabel()){
        this.stopActionButtonLabel()
    }
    Alias.Game_Interpreter_terminate.call(this)
}

// Jump to Label Plus. It uses "startsWith" instead of strictly comparison of the label names.
Game_Interpreter.prototype.command1000 = function(params){
    const labelName = this._params[0]
    for (let i = 0; i < this._list.length; i++) {
        const command = this._list[i]
        if(command.code === 118 && command.parameters[0].startsWith(labelName)){
            this.jumpTo(i)
            break
        }
    }
    return true
}

Game_Interpreter.prototype.needExitCommandForActionButtonLabel = function(){
    const cmdLabel = this.currentCommand().parameters[0]
    const playerLabel = Plugin.playerCurrentActionLabel.name
    const event = $gameMap.event(this._eventId)
    
    return playerLabel !== cmdLabel && event.getActionButtonLabels().some(item => cmdLabel.startsWith(item))
}

Game_Interpreter.prototype.stopActionButtonLabel = function(){
    Plugin.clearPlayerCurrentActionLabel()
    this.command115()
}

Game_Interpreter.prototype.needClearPlayerCurrentActionLabel = function(){
    return this._eventId === Plugin.playerCurrentActionLabel.eventId
}

Game_Interpreter.prototype.listRemoveJumpToLabelForActionButton = function() {
    const event = $gameMap.event(this._eventId)
    if(event && event.canHaveActionButtonLabels()){
        event.listRemoveJumpToLabelForActionButton()
    }
}

}

}
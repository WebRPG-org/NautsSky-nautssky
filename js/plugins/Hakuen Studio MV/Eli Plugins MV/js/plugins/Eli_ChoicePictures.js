//============================================================================
// Eli_ChoicePictures.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Show different pictures for each choice.
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
Plugin Requirements
============================================================================

Need Eli Book
Order After Eli Book
Order Before Eli Easing Picture

Is not compatible with Eli Choice Manager. Use one or another.

============================================================================
Features
============================================================================

● Show different pictures depending on what choice is highlighted.
● Super easy to use with simple plugin command and event interface!

============================================================================
How to use
============================================================================

On the plugin parameters, you can choose a switch that will be responsible 
for enabling/disabling the plugin functionality.

Each choice can have a picture to represent it. For that, you need to 
attach a picture id to each choice.
After that, you need to configure the Select and Unselect behaviors of 
the picture.

• Selected → When a choice is selected, these settings will be applied 
to the picture.

• Unselected → When a choice is unselected, these settings will be 
applied to the picture.

Use the plugin command below to attach a picture to a choice.

◆ Plugin Command: ChoicePic Index PictureId PictureName

Index → Replace with the choice index you will attach the picture.
PictureId → Replace with the picture ID you want to attach to this 
choice.
PictureName → Replace with the filename inside the pictures folder. 
Cannot have spaces.

Setting behaviors

Right after the plugin command, you will need to call the Move 
Picture Event command to configure the Selected and Unselected 
behaviors.
Each Move Picture command will apply their settings to them, 
in that order:

◆Plugin Command：ChoicePic 0 1 Harold
◆Move Picture → Will apply the Unselected Settings
◆Move Picture → Will apply the Selected Settings

The command above will attach picture id 1 to the choice index 0.

NOTE: The picture ID and wait parameter are ignored.

NOTE¹: If you are using Eli_EasingPictures, you can use the plugin 
command to set the easing type by Id before setup each picture.

============================================================================
Update Log
============================================================================

https://tinyurl.com/choicePictures

============================================================================

@param switch
@text Switch to Enable Plugin
@type switch
@desc If this switch is true, the plugin is enabled.
@default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ChoicePictures = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ChoicePictures = {

    version: 5.02,
    url: "https://hakuenstudio.itch.io/eli-choice-pictures-for-rpg-maker-mz",
    parameters: {
        switch: 0,
    },
    alias: {},
    choicePicEventSettings: [{
        index: 0, 
        behaviors:["onUnselect", "onSelect"]
    }],
    oldIndex: -1,
    list: [{
        id: 0,
        name: "",
        onUnselect: {  
            origin: 0, 
            x: 0, y: 0, 
            scaleX: 100, scaleY: 100, 
            opacity: 255, 
            blendMode: 0, 
            duration: 1, 
            easing: 0, 
            tint: [0, 0, 0, 0]
        },
        onSelect: {
            origin: 0, 
            x: 0, y: 0, 
            scaleX: 100, scaleY: 100, 
            opacity: 255, 
            blendMode: 0, 
            duration: 1, 
            easing: 0, 
            tint: [0, 0, 0, 0]
        }
    }],

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.createList()
        this.choicePicEventSettings = []
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_ChoicePictures")
        this.parameters.switch = Number(parameters.switch)
    },

    initPluginCommands(){},

    createList(){
        for(let i = 0; i < 50; i++){
            this.list[i] = this.createInitialSettings()
        }
    },

    clearList(){
        for(let i = 0; i < 50; i++){
            $gameScreen.erasePicture(this.list[i].id)
            this.list[i] = this.createInitialSettings()
        }
    },

    createInitialSettings(){
        return {
            id: 0,
            name: "",
            onUnselect: {  
                origin: 0, 
                x: 0, y: 0, 
                scaleX: 100, scaleY: 100, 
                opacity: 255, 
                blendMode: 0, 
                duration: 1, 
                easing: 0, 
                tint: [0, 0, 0, 0]
            },
            onSelect: {
                origin: 0, 
                x: 0, y: 0, 
                scaleX: 100, scaleY: 100, 
                opacity: 255, 
                blendMode: 0, 
                duration: 1, 
                easing: 0, 
                tint: [0, 0, 0, 0]
            }
        }
    },

    isEnable(){
        const id = this.parameters.switch
        return $gameSwitches.value(id)
    },

    resetAllSettings(){
        if(Imported.Eli_EasingPicture){
            Eli.EasingPicture.resetEasing(this.choiceIndex)
        }
        
        this.clearList()
        this.choicePicEventSettings = []
        this.oldIndex = -1
    },

    getPictureCoordinates(params){
        if(params[3] === 0){  // Direct designation
            return {
                x: params[4], 
                y: params[5]
            }
        }else{  // Designation with variables
            return {
                x: $gameVariables.value(params[4]), 
                y: $gameVariables.value(params[5])
            }
        }
    },

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */

    executePluginCommandMV(command, mvArgs){
        const cmdList = {
            CHOICEPIC: "cmdMV_setPicToChoice",
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]){
            this[cmd](mvArgs)
        }
    },

    cmdMV_setPicToChoice(args){
        const index = Number(args[0])
        const picId = Number(Eli.Utils.processEscapeVarOrFormula(args[1]))
        const name = Eli.Utils.processEscapeVarOrFormula(args[2])
        const behaviors = ["onUnselect", "onSelect"]

        ImageManager.loadPicture(name)

        this.list[index].id = picId
        this.list[index].name = name
        this.choicePicEventSettings[0] = {index: index, behaviors: behaviors}
    },

}

const Plugin = Eli.ChoicePictures
const Alias = Eli.ChoicePictures.alias

Plugin.initialize()

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

// Move Picture
Alias.Game_Interpreter_command232 = Game_Interpreter.prototype.command232
Game_Interpreter.prototype.command232 = function() {
    if(this.isChoicePicturesModeOn()){
        this.setChoicePictureBehaviorSettings()
        return true
    }else{
        return Alias.Game_Interpreter_command232.call(this)
    }
}

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

Game_Interpreter.prototype.setChoicePictureBehaviorSettings = function(){
    const params = this._params
    const choiceIndex = Plugin.choicePicEventSettings[0].index
    const behavior = Plugin.choicePicEventSettings[0].behaviors.shift()
    const choicePic = Plugin.list[choiceIndex]
    const settings = choicePic[behavior]
    const {x, y} = Plugin.getPictureCoordinates(params)

    settings.origin = params[2]
    settings.x = x
    settings.y = y
    settings.scaleX = params[6]
    settings.scaleY = params[7]
    settings.opacity = params[8]
    settings.blendMode = params[9]
    settings.duration = params[10]
    settings.easing = params[12]

    if(Plugin.choicePicEventSettings[0].behaviors.length === 0){
        Plugin.choicePicEventSettings.shift()
    }

}

Game_Interpreter.prototype.isChoicePicturesModeOn = function() {
    return Plugin.choicePicEventSettings.length > 0
}

}

/* --------------------------- WINDOW CHOICE LIST --------------------------- */
{

Alias.Window_ChoiceList_start = Window_ChoiceList.prototype.start
Window_ChoiceList.prototype.start = function() {
    Alias.Window_ChoiceList_start.call(this)

    if(Plugin.isEnable()){
        this.startPictures()
    }
}

Alias.Window_ChoiceList_select = Window_ChoiceList.prototype.select
Window_ChoiceList.prototype.select = function(index) {
    Alias.Window_ChoiceList_select.call(this, index)
    
    if(Plugin.isEnable()){
        this.operatePictureSelection(index)
    }
}

Alias.Window_ChoiceList_close = Window_ChoiceList.prototype.close
Window_ChoiceList.prototype.close = function() {
    Alias.Window_ChoiceList_close.call(this)
    Plugin.resetAllSettings()
}

Window_ChoiceList.prototype.startPictures = function(){
    for(let i = 0; i < this.maxItems(); i++){
        this.showPicture(i)
    }
    if($gameMessage.choiceDefaultType() > -1){
        this.selectPicture($gameMessage.choiceDefaultType())
    }
}

Window_ChoiceList.prototype.operatePictureSelection = function(index){
    if(Plugin.oldIndex > -1){
        this.unselectPicture(Plugin.oldIndex)
    }

    if(index > -1){
        this.selectPicture(index)
        Plugin.oldIndex = index
    }
}

Window_ChoiceList.prototype.showPicture = function(index){
    const choicePic = Plugin.list[index]
    const behavior = choicePic.onUnselect
    const {origin, x, y, scaleX, scaleY, opacity, blendMode} = behavior

    if(choicePic.id > 0){
        $gameScreen.showPicture(choicePic.id, choicePic.name, origin, x, y, scaleX, scaleY, opacity, blendMode)
    }

}

Window_ChoiceList.prototype.unselectPicture = function(index){
    const choicePic = Plugin.list[index]
    const behavior = choicePic.onUnselect
    const {origin, x, y, scaleX, scaleY, opacity, blendMode, duration} = behavior

    $gameScreen.movePicture(choicePic.id, origin, x, y, scaleX, scaleY, opacity, blendMode, duration)
}

Window_ChoiceList.prototype.selectPicture = function(index){
    const choicePic = Plugin.list[index]
    const behavior = choicePic.onSelect
    const {origin, x, y, scaleX, scaleY, opacity, blendMode, duration} = behavior

    $gameScreen.movePicture(choicePic.id, origin, x, y, scaleX, scaleY, opacity, blendMode, duration)
}

}

}
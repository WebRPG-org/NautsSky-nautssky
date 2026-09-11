//==========================================================================
// Eli_WindowSkin.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Can change the window skin of any window mid-game.
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

Need Eli Book.
Order After Eli Book.
Is better if it stays at the bottom of your plugin list.

============================================================================
Features
============================================================================

● Set different window skin for any window.
● Set window skin for all windows.
● Set window skin according to the scene.
● Change window skin through the options scene!

============================================================================
Plugin Parameters
============================================================================

● Window Skins → In the "Window Skin" parameter you will be able to set 
different skins for each window. If you don't choose one, it will take 
the one chosen for Window_Base, on the first parameter. You can't remove 
this one from the plugin, the Window_Base has to be the first always.
• Window Name → Select the Window Name do you want to apply the skin. If 
you don’t find the Window you want, you can write it instead.
• Skin File → The window skin file is under the system folder.
• Use Scene Skin → If you set this to true, it will take the window skin 
from the scene, instead of the one chosen here. This is useful for help 
windows for example since it can be in different scenes.

● Scene Skins → Instead of applying a skin file for each window, you can 
apply a single skin that will be valid for all windows within this scene. 
But, the window skin parameter has priority over this scene.
• Scene Name → The Scene Name you want to apply the skin. If you don’t 
find the Scene you want, you can write it instead.
• Skin File → The window skin file is under the system folder.

● Save Changes → Optionally, if this is set to true, the window skin 
changes will be saved on the save file.

● Options Settings → Here you can customize the settings for the options 
scene.
• Add Command → If set to true, the Options window will now have a 
command to change the window skin on the fly. This command has the 
symbol: “windowSkin”.
• Name → The name of the command.
• Skin List → A list of all window skin files that the command will be 
able to change.
• Position → The index position of this command in the options window.
• Overwrite Settings → If set to true, when changing window skins, the 
changes will be applied to all windows on the game, regardless they have
plugin parameter settings with a specific skin file.

============================================================================
Plugin Commands
============================================================================

The plugin command is a way to change the plugin parameter settings. 
So they intend to replicate the plugin parameter settings through event 
commands. On MZ, you can see the plugin command description when using 
the command.

● WindowSkin [window file] [window name]
• Will change the skin from a specific window.

● SceneSkin [window file] [scene name]
• Change the skins for all the windows available on that specific scene.

● AllSkin [window file] [overwrite]
• Change all window skins for all windows on the game. If “overwrite” 
is set to true, it will overwrite the previous settings on the plugin 
parameters.

Examples:

● WindowSkin Window3 Window_Help 
● SceneSkin Window2 Scene_Item
● AllSkin Window2 false

============================================================================
Update Log
============================================================================

https://tinyurl.com/windowSkin

============================================================================

@param windowList
@text Window Skins
@type struct<allSkins>[]
@desc Select here if you want a custom skin for a window.
@default ["{\"name\":\"Window_Base\",\"skin\":\"Window\"}"]

@param sceneList
@text Scene Skins
@type struct<allSceneSkins>[]
@desc Set a default window skin for a scene.
@default []

@param saveChanges
@text Save changes
@type boolean
@desc Set true if you want to store the changes in the savefile.
@default false

@param options
@text Options Settings
@type struct<optionsStruct>
@desc Set true if you want to create an option command to change the window skin.
@default {"add":"true","name":"Window Skin","values":"[]","index":"auto","overwrite":"true"}

*/

/* -------------------------------- ALL SKINS ------------------------------- */
{

/*~struct~allSkins:

@param name
@text Window name
@type text
@desc Type the name of the window. It is case sensitive.
@default Window_Base

@param skin
@text Skin file
@type file
@dir img/system
@desc Choose a window skin file
@default
@require 1

@param useSceneSkin
@text Use Scene Skin
@type boolean
@desc If true, this window will get the skin from the scene parameters.
@default false

*/

}

/* ----------------------------- ALL SCENE SKINS ---------------------------- */
{
/*~struct~allSceneSkins:

@param name
@text Scene name
@type text
@desc Type the name of the scene. It is case sensitive.
@default Scene_Menu

@param skin
@text Skin file
@type file
@dir img/system
@desc Choose a window skin file to this scene.
@default
@require 1

*/
}

/* --------------------------------- OPTIONS -------------------------------- */
{

/*~struct~optionsStruct:

@param add
@text Add Command
@type boolean
@desc Set true if you want to create an option command to change the window skin.
@default true

@param name
@text Name
@type text
@desc The name of the command on the options scene.
@default Window Skin

@param values
@text Skin List
@type file[]
@dir img/system
@desc A list of all window skins that the command will be able to select.
@default []
@require 1

@param index
@text Position
@type combo
@option auto
@desc Set a number to the position of the command, or leave auto.
@default auto

@param overwrite
@text Overwrite Settings
@type boolean
@desc If true, the selected skin will be applied to all windows, regardless they have a specific skin already.
@default true

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_WindowSkin = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.WindowSkin = {

    version: 5.10,
    url: "https://hakuenstudio.itch.io/eli-change-window-skin-for-rpg-maker",
    parameters: {
        windowList: [{name: '', skin: '', useSceneSkin: false}],
        sceneList: [{name: '', skin: ''}],
        saveChanges: false,
        options: {name: '', add: true, values: [''], index: -1, overwrite: false},
    },
    alias: {},
    needUpdateSkin: [],

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        ConfigManager.windowSkin = this.parameters.windowList[0].skin
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_WindowSkin")
        const windowList = JSON.parse(parameters.windowList)
        const sceneList = JSON.parse(parameters.sceneList)

        const options = JSON.parse(parameters.options)
        options.values = JSON.parse(options.values)
        options.overwrite = options.overwrite === "true"
        options.add = options.add === "true"
        options.index = options.index === "auto" ? -1 : Number(options.index)

        for(let i = 0; i < windowList.length; i++){
            const win = JSON.parse(windowList[i])
            win.useSceneSkin = win.useSceneSkin === "true"
            windowList[i] = win
        }
        
        for(let i = 0; i < sceneList.length; i++){
            const scene = JSON.parse(sceneList[i])
            sceneList[i] = scene
        }

        this.parameters.windowList = windowList
        this.parameters.sceneList = sceneList
        this.parameters.saveChanges = parameters.saveChanges === "true"
        this.parameters.options = options
    },

    initPluginCommands(){
        // const commands = ['changeWindowSkin', 'changeSceneSkin', 'changeForAll']
        // Eli.PluginManager.registerCommands(this, commands)
    },

    param(){
        return this.parameters
    },

    skinData(){
        if(this.parameters.saveChanges){
            return $eliData.windowSkin()
        }else{
            return this.parameters
        }
    },

    changeWindowSkin(args){
        const objArgs = {
            skin: args[0],
            name: args[1],
            useSceneSkin: (args[2] || "false").toLowerCase() === "true"
        }

        const {name, skin, useSceneSkin} = objArgs
        const winData = {name: name, skin: skin, useSceneSkin: useSceneSkin}
        const index = this.skinData().windowList.findIndex(win => win.name === name)

        if(index > -1){
            this.skinData().windowList[index] = winData
        }else{
            this.skinData().windowList.push(winData)
        }

        this.needUpdateSkin.push(name)
    },

    changeSceneSkin(args){
        const objArgs = {
            skin: args[0],
            name: args[1],
            useSceneSkin: true,
        }

        const index = this.skinData().sceneList.findIndex(scene => scene.name === objArgs.name)

        if(index > -1){
            this.skinData().sceneList[index] = objArgs
        }else{
            this.skinData().sceneList.push(objArgs)
        }
    },

    changeForAll(args){
        if(args.constructor.name === "Array"){
            var objArgs = {
                skin: args[0],
                overwrite: String(args[1]) === "true",
            }
        }else{
            var objArgs = args
        }

        const names = this.skinData().windowList.map(item => item.name)
        
        if(objArgs.overwrite){
            this.skinData().windowList = [
                {name: "Window_Base", skin: objArgs.skin, useSceneSkin: false},
            ]
    
            this.skinData().sceneList = []
        }else{
            this.skinData().windowList[0] = {name: "Window_Base", skin: objArgs.skin, useSceneSkin: false}

        }

        ConfigManager.windowSkin = this.skinData().windowList[0].skin
        this.needUpdateSkin.push(...names)
        this.refreshAllWindowsOnScene()
    },

    refreshAllWindowsOnScene(){
        const windowLayer = SceneManager._scene._windowLayer
        if(windowLayer){

            for(const win of windowLayer.children){
                if(win.loadWindowskin){
                    win.loadWindowskin()
                }
            }
        }
    },

    executeCommandMV(command, args){
        const cmdList = {
            WINDOWSKIN: "changeWindowSkin",
            SCENESKIN: "changeSceneSkin",
            ALLSKIN: "changeForAll",
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]){
            this[cmd](args)
        }
    }
    
}

const Plugin = Eli.WindowSkin
const Alias = Eli.WindowSkin.alias

Plugin.initialize()

/* ------------------------------- SCENE BOOT ------------------------------- */
{

Alias.Scene_Boot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage
Scene_Boot.prototype.loadSystemWindowImage = function() {
    Alias.Scene_Boot_loadSystemWindowImage.call(this)
    for(const win of Plugin.parameters.windowList){
        ImageManager.reserveSystem(win.skin)
    }
    for(const scene of Plugin.parameters.sceneList){
        ImageManager.reserveSystem(scene.skin)
    }
    for(const win of Plugin.parameters.options.values){
        ImageManager.reserveSystem(win)
    }
}

}

/* -------------------------------- SAVE DATA ------------------------------- */
{

Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.contents["WindowSkin"] = {
        windowList: Plugin.parameters.windowList,
        sceneList: Plugin.parameters.sceneList,
    }
}

Eli_SavedContents.prototype.windowSkin = function(){
    return this.contents["WindowSkin"]
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executeCommandMV(command, args)
}

}

/* ------------------------------- WINDOW BASE ------------------------------ */
{

Alias.Window_Base_loadWindowskin = Window_Base.prototype.loadWindowskin
Window_Base.prototype.loadWindowskin = function() {
    Alias.Window_Base_loadWindowskin.call(this)
    this.loadNewWindowskin()
}

Window_Base.prototype.loadNewWindowskin = function() {
    const winName = this.constructor.name
    const newSkin = Plugin.skinData().windowList.find(window => window.name === winName)

    if(newSkin){
        
        if(newSkin.useSceneSkin){
            const sceneName = SceneManager._scene.constructor.name
            const sceneSkin = Plugin.skinData().sceneList.find(scene => scene.name === sceneName)

            if(sceneSkin){
                this.windowskin = ImageManager.loadSystem(sceneSkin.skin)
            }

        }else{
            this.windowskin = ImageManager.loadSystem(newSkin.skin)
        }

    }else{
        const skinFile = ConfigManager.windowSkin
        this.windowskin = ImageManager.loadSystem(skinFile || "Window")
    }

    if(Plugin.needUpdateSkin.includes(winName)){
        const index = Plugin.needUpdateSkin.indexOf(winName)
        Plugin.needUpdateSkin.splice(index, 1)
    }

}

Alias.Window_Base_update = Window_Base.prototype.update
Window_Base.prototype.update = function(){
    Alias.Window_Base_update.call(this)
    this.updateNewWindowSkin()
}

Window_Base.prototype.updateNewWindowSkin = function(){
    if(Plugin.needUpdateSkin.includes(this.constructor.name)){
        this.loadNewWindowskin()
    }
}

}

/* ----------------------------- WINDOW OPTIONS ----------------------------- */
{

const SYMBOL = "windowSkin"

Alias.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList
Window_Options.prototype.makeCommandList = function() {
    Alias.Window_Options_makeCommandList.call(this)
    if(Plugin.parameters.options.add){
        this.addWindowSkinCommand()
    }
}

Window_Options.prototype.addWindowSkinCommand = function(){
    this.addCommand(Plugin.parameters.options.name, SYMBOL)

    if(Plugin.parameters.options.index > -1){
        this.changeWindowSkinCommandPosition()
    }
}

Window_Options.prototype.changeWindowSkinCommandPosition = function(){
    const index = this._list.findIndex(item => item.symbol === SYMBOL)
    const command = this._list.splice(index, 1)[0]
    this._list.splice(Plugin.parameters.options.index, 0, command)
}

Alias.Window_Options_cursorRight = Window_Options.prototype.cursorRight
Window_Options.prototype.cursorRight = function() {
    const symbol = this.commandSymbol(this.index())
    
    if(symbol === SYMBOL){
        this.changeWindowSkinCommand(1)
    }else{
        Alias.Window_Options_cursorRight.call(this)
    }
}

Alias.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft
Window_Options.prototype.cursorLeft = function() {
    const symbol = this.commandSymbol(this.index())

    if(symbol === SYMBOL){
        this.changeWindowSkinCommand(-1)
    }else{
        Alias.Window_Options_cursorLeft.call(this)
    }
}

Window_Options.prototype.changeWindowSkinCommand = function(increment){
    const value = this.getNewWindowSkinValue(SYMBOL, increment)
    this.changeValue(SYMBOL, value)
    this.refreshWindowSkin()
}

Window_Options.prototype.getNewWindowSkinValue = function(symbol, increment){
    const skinList = Plugin.parameters.options.values
    const currentIndex = skinList.indexOf(this.getConfigValue(symbol))
    const maxIndex = skinList.length - 1
    const newIndex = (currentIndex + increment).clamp(0, maxIndex)

    return skinList[newIndex]
}

Alias.Window_Options_statusText = Window_Options.prototype.statusText
Window_Options.prototype.statusText = function(index) {
    if(this.commandSymbol(index) === SYMBOL){
        return this.getWindowSkinText()

    }else{
        return Alias.Window_Options_statusText.call(this, index)
    }
}

Window_Options.prototype.getWindowSkinText = function(){
    return this.getConfigValue(SYMBOL)
}

Window_Options.prototype.refreshWindowSkin = function(){
    Plugin.changeForAll({skin: this.getWindowSkinText(), overwrite: Plugin.param().options.overwrite})
}

}

/* ------------------------------ DATA MANAGER ------------------------------ */
{

Alias.DataManager_extractSaveContents = DataManager.extractSaveContents
DataManager.extractSaveContents = function(contents) {
    Alias.DataManager_extractSaveContents.call(this, contents)
    if(Plugin.param().saveChanges){
        ConfigManager.windowSkin = Plugin.skinData().windowList[0].skin
    }
}

}

/* ----------------------------- CONFIG MANAGER ----------------------------- */
{

Alias.ConfigManager_makeData = ConfigManager.makeData
ConfigManager.makeData = function() {
    const config = Alias.ConfigManager_makeData.call(this)
    config.windowSkin = this.windowSkin
    
    return config
}

Alias.ConfigManager_applyData = ConfigManager.applyData
ConfigManager.applyData = function(config) {
    Alias.ConfigManager_applyData.call(this, config)
    this.windowSkin = this.readWindowSkin(config, "windowSkin", Plugin.parameters.windowList[0].skin)
}

ConfigManager.readWindowSkin = function(config, name, defaultValue) {
    if(name in config){
        return config[name]
    }else{
        return defaultValue
    }
}


}

}
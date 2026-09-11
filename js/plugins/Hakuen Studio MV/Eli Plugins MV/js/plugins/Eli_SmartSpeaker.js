//==========================================================================
// EliMZ_SmartSpeaker.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Set message speaker name automatically.
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

Need Eli_NameBox

Order Before Eli_FaceWindow
Order After Eli_NameBox

============================================================================
Features
============================================================================

● Set message speaker name automatically according to the face image 
selected.
● Set message face automatically according to the speaker name chosen.

============================================================================
How to use
============================================================================

You can use this plugin in two ways:

♦ Auto Speaker Mode ♦

This will automatically set a speaker name according to the face image 
selected.
Through the plugin parameters, you can choose the name you want for the 
message box to show when using a specific face file and face indexes.
You can separate the face indexes by comma.

♦ Auto Face Mode ♦

This will do the opposite as above. It will automatically select a face 
image to be on the message box, according to the speaker name chosen.

============================================================================
Update Log
============================================================================

https://tinyurl.com/smartSpeakerLog

============================================================================

@param mode
@text Mode
@type select
@option Auto Speaker
@option Auto Face
@desc Auto Speaker => Speaker name defined automatically. 
Auto Face => Face image defined automatically.
@default Auto Speaker

@param speakerSettings
@text Auto Speaker Settings
@type struct<speakerSettingsSt>[]
@desc A speaker name will be defined according to the face image and index.
@default 

@param faceSettings
@text Auto Face Settings
@type struct<faceSettingsSt>[]
@desc A face image will be defined according to the speaker name.
@default 

*/

/* ---------------------------- SPEAKER SETTINGS ---------------------------- */
{
/*~struct~speakerSettingsSt:

@param name
@text Speaker Name
@type text
@desc The speaker's name will show this face image.
@default

@param file
@text Face Image
@type file
@dir img/faces
@desc Set here the image that will be attached to this speaker's name.
@default

@param index
@text Index
@type text
@desc The indexes of the face file attached to this speaker name. Separate with a comma.
@default

*/
}

/* ------------------------------ FACE SETTINGS ----------------------------- */
{
/*~struct~faceSettingsSt:

@param file
@text Face Image
@type file
@dir img/faces
@desc Set here the face image that will show this speaker's name.
@default

@param index
@text Index
@type number
@desc The index of the face file attached to this speaker name.
@default

@param name
@text Speaker Name
@type text
@desc The speaker's name will be shown in this face file.
@default

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SmartSpeaker = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.SmartSpeaker = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-smart-speaker-for-rpg-maker",
    parameters: {
        mode: 'Auto Speaker',
        speakerSettings: [{name: '', file: '', index: "0"}],
        faceSettings: [{file: '', name: '', index: 0}],
    },
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.formatParameters()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = []
        Eli.PluginManager.registerCommands(this, commands)
    },

    formatParameters(){
        this.formatSpeakerSettings()
        this.formatFaceSettings()
    },

    formatSpeakerSettings(){
        const speakerSettings = this.parameters.speakerSettings
        const formatedSettings = {}

        for(const settings of speakerSettings){
            const name = settings.name
            const indexes = Eli.String.removeSpaces(String(settings.index)).split(",")
            const file = settings.file

            for(const index of indexes){
                formatedSettings[`${file.toLowerCase()}_${index}`] = name
            }
        }
        this.parameters.speakerSettings = formatedSettings
    },

    formatFaceSettings(){
        const faceSettings = this.parameters.faceSettings
        const formatedSettings = {}

        for(const {name, file, index} of faceSettings){
            formatedSettings[name.toLowerCase()] = [file, index]
        }
        this.parameters.faceSettings = formatedSettings
    },

    param(){
        return this.parameters
    },

    isAutoSpeakerNameMode(){
        return this.param().mode === "Auto Speaker"
    },

    isAutoFaceMode(){
        return !this.isAutoSpeakerNameMode()
    },

    getSpeakerName(face, index){
        return this.param().speakerSettings[`${face.toLowerCase()}_${index}`]
    },

    getFaceImage(name){
        return this.param().faceSettings[name.toLowerCase()]
    },
    
}

const Plugin = Eli.SmartSpeaker
const Alias = Eli.SmartSpeaker.alias

Plugin.initialize()

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_command101 = Game_Interpreter.prototype.command101
Game_Interpreter.prototype.command101 = function() {
    this.checkForAutoMessageSettings(this._params)

    return Alias.Game_Interpreter_command101.call(this)
}

Game_Interpreter.prototype.checkForAutoMessageSettings = function(params){
    if(this.canAutoSetMessageSpeaker(params)){
        this.setAutoMessageSpeaker(params)

    }
    // else if(this.canAutoSetMessageFace(params)){
    //     this.setAutoMessageFace(params)
    // }
}

Game_Interpreter.prototype.canAutoSetMessageSpeaker = function(params){
    return  Plugin.isAutoSpeakerNameMode() && params[0] && 
            Plugin.getSpeakerName(params[0], params[1])
}

Game_Interpreter.prototype.canAutoSetMessageFace = function(){
    return Plugin.isAutoFaceMode() && Plugin.getFaceImage($gameMessage.speakerName())
}

Game_Interpreter.prototype.setAutoMessageSpeaker = function(params){
    const name = Plugin.getSpeakerName(params[0], params[1])
    $gameMessage.setSpeakerName(name)
}

Game_Interpreter.prototype.setAutoMessageFace = function(params){
    const [face, index] = Plugin.getFaceImage($gameMessage.speakerName())
    params[0] = face
    params[1] = index
}

if(Imported.Eli_NameBox){

Alias.Game_Interpreter_setSpeakerName = Game_Interpreter.prototype.setSpeakerName
Game_Interpreter.prototype.setSpeakerName = function(){
    Alias.Game_Interpreter_setSpeakerName.call(this)

    if(this.canAutoSetMessageFace()){
        this.setAutoMessageFace(this._params)
    }
}

}





}

}
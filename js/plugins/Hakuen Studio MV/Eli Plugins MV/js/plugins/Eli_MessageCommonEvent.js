//==========================================================================
// EliMZ_MessageCommonEvent.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ Auto add a common event before and after every show text command
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
==============================================================================
Plugin Requirements
==============================================================================

Order After Eli Message Actions

==============================================================================
Features
==============================================================================

● Adds a common event before and after every show text command.
● Control the common event ids through variables values.
● Disable/Enable the plugin with a switch.

==============================================================================
How to use
==============================================================================

You need to set a switch Id on the plugin parameters in order to 
enable/disable the plugin.

After that, just select the variables on the plugin parameters that will 
hold the value of the common events ids.
The plugin will do the rest.

If you do not want to play a common event, just change the 
variable value to 0 or disable the switch.

You use this plugin in two ways :
It will, literally, add a common event before and after any Show text 
command. 
Or, you can set the Smart Behavior parameter to on, that the plugin will 
considera block of text, instead of just the show text command.

============================================================================
Update Log
============================================================================

https://tinyurl.com/messageCommonEventLog

============================================================================

@param enableSwitch
@text Enable Switch
@type switch
@desc If this switch is on, the plugin will add the common event.
@default 1

@param smart
@text Smart behavior
@type boolean
@desc If true, a block of text will be considered. See help file.
@default false

@param openCommonEventId
@text Open common event id
@type variable
@desc The variable that will hold the common event id when open message window.
@default 1

@param closeCommonEventId
@text Close common event id
@type variable
@desc The variable that will hold the common event id when close message window.
@default 2

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MessageCommonEvent = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.MessageCommonEvent = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-message-common-event-for-rpg-maker",
    parameters: {enableSwitch: 0, smart: false, openCommonEventId: 0, closeCommonEventId: 0},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        this.parameters = parameters
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    isEnabled(){
        return $gameSwitches.isMessageCommonEventEnabled()
    },

}

const Plugin = Eli.MessageCommonEvent
const Alias = Eli.MessageCommonEvent.alias

Plugin.initialize()

/* ----------------------------- GAME VARIABLES ----------------------------- */
{

Game_Variables.prototype.openMsgCommonEventId = function(){
    const id = Plugin.param().openCommonEventId
    return this.value(id)
}

Game_Variables.prototype.closeMsgCommonEventId = function(){
    const id = Plugin.param().closeCommonEventId
    return this.value(id)
}

}

/* ------------------------------ GAME SWITCHES ----------------------------- */
{

Game_Switches.prototype.isMessageCommonEventEnabled = function(){
    const id = Plugin.param().enableSwitch
    return this.value(id)
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_setup = Game_Interpreter.prototype.setup
Game_Interpreter.prototype.setup = function(list, eventId) {
    if(this.canChangeListForMessageCommonEvent(list)){
        list = this.createNewListForMessageCommonEvent(list)
    }

    Alias.Game_Interpreter_setup.call(this, list, eventId)
}

Game_Interpreter.prototype.listHasShowTextCommand = function(list){
    return list.some(item => item.code === 101)
}

Game_Interpreter.prototype.canChangeListForMessageCommonEvent = function(list){
    return Plugin.isEnabled() && this.listHasShowTextCommand(list)
}

Game_Interpreter.prototype.isShowTextCommand = function(command){
    return command && command.code === 101
}

Game_Interpreter.prototype.isLineTextCommand = function(command){
    return command && command.code === 401
}

Game_Interpreter.prototype.createMsgCommonEventCommand = function(indent, commonEventId){
    return {
        code: 117,
        indent: indent,
        parameters: [commonEventId]
    }
}

Game_Interpreter.prototype.createCommonEventBeforeMessage = function(previousCommand, command){
    const commands = []
    const commonEventId = $gameVariables.openMsgCommonEventId()

    if(this.isLineTextCommand(previousCommand) && Plugin.param().smart){
        commands.push(command)
    }else{
        commands.push(this.createMsgCommonEventCommand(command.indent, commonEventId))
        commands.push(command)
    }

    return commands
}

Game_Interpreter.prototype.createCommonEventAfterMessage = function(command, nextCommand){
    const commands = [command]
    const commonEventId = $gameVariables.closeMsgCommonEventId()

    if(!this.isLineTextCommand(nextCommand)){

        if(this.isShowTextCommand(nextCommand) && Plugin.param().smart){

        }else{
            commands.push(this.createMsgCommonEventCommand(command.indent, commonEventId))
        }
    }

    return commands
}

Game_Interpreter.prototype.createNewCommands = function(previousCommand, command, nextCommand){
    switch(command.code){
        case 101: return this.createCommonEventBeforeMessage(previousCommand, command)
        case 401: return this.createCommonEventAfterMessage(command, nextCommand)
        default: return [command]
    }
}

Game_Interpreter.prototype.createNewListForMessageCommonEvent = function(list){
    const newList = []

    for(let i = 0; i < list.length; i++){
        const previousCommand = list[i-1]
        const command = list[i]
        const nextCommand = list[i+1]
        const newCommands = this.createNewCommands(previousCommand, command, nextCommand)

        newList.push(...newCommands)
    }

    return newList
}

}

}
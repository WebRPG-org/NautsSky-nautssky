//============================================================================
// Eli_TeleportPlayer.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Teleport the player by clicking/touching the screen!
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
Features
==============================================================================

• Teleport the player clicking on the screen.

==============================================================================
How to use
==============================================================================

You can enable/disable the teleport with the switch provided on the plugin 
parameter

NOTE: It will only work if it is a valid destination. Otherwise, it will 
play a buzzer sound from the database.

============================================================================
Update Log
============================================================================

https://tinyurl.com/teleportPlayerLog

============================================================================

@param switchId
@text Enable/disable switch
@type switch
@desc Select the switch that will enable/disable the teleport feature.
@default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_TeleportPlayer = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.TeleportPlayer = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-teleport-player",
    parameters: {switchId: 0},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){
        const commands = []
        Eli.PluginManager.registerCommands(this, commands)
    },

    param(){
        return this.parameters
    },

    executePluginCommandMV(command, args){
        const cmdList = {
            TELEPORTPLAYER: 'player',
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]) {
            this[cmd](args)
        }
    },
    
    player(args){
        $gameTemp.setTeleportDestination(parseInt(args[0]), parseInt(args[1]))
    },

}

const Plugin = Eli.TeleportPlayer
const Alias = Eli.TeleportPlayer.alias

Plugin.initialize()

/* -------------------------------- GAME TEMP ------------------------------- */
{

Alias.Game_Temp_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function(x, y) {
    if($gameSwitches.isTeleportEnabled()){
        $gamePlayer.teleportToDestination(x, y)
    }else{
        Alias.Game_Temp_setDestination.call(this, x, y)
    }
}

}

/* ------------------------------ GAME SWITCHES ----------------------------- */
{

Game_Switches.prototype.isTeleportEnabled = function(){
    const id = Plugin.param().switchId
    return this.value(id)
}

}

/* ------------------------------- GAME PLAYER ------------------------------ */
{

Game_Player.prototype.teleportToDestination = function(x, y){
    if(this.canTeleportToDestination(x, y)){
        this.locate(x, y)
    }else{
        SoundManager.playBuzzer()
    }
}

Game_Player.prototype.canTeleportToDestination = function(x, y){
    return  $gameMap.isValid(x, y) && $gameMap.isPassable(x, y, this.direction()) && 
            !$gameMap.eventIdXy(x, y)
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

}
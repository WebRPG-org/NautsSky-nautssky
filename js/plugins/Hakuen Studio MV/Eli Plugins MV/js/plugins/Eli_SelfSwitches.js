//==========================================================================
// EliMZ_SelfSwitches.js
//==========================================================================

/*:

@plugindesc ♦1.0.0♦ Enhance the self switch commands and functionality.
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

Order After Eli Self Variables

==============================================================================
Features
==============================================================================

● Turn on/off/toggle self switches of one or more events with a plugin 
command.
● Change self switches value based on a script call.
● Add more self switches to events.
● Change the value of self switches with a delay(frames/seconds/minutes)

==============================================================================
How to use
==============================================================================

To use more self switches than the default ones(A, B, C, D) you have to 
name a regular switch like that: "SS: E"(without quotes, it's not case 
sensitive).
You can use it in page conditions too.

The plugin will auto remove the "SS:" and any white space, leaving only 
the "E".

So, you can check the value like any other self switch in the conditional 
branch script call:
$gameSelfSwitches.value([1, 12, "E"])

Then if you want to activate the new self switch "E", use the plugin 
command and just put "E" in the self switch field.
You can set it ON/OFF/Toggle or use a script call to decide the value.

The plugin command also has a delay argument. If it is greater than zero, 
then the self switch will change its value according to the delay 
set(frames, seconds, or minutes).

============================================================================
Update Log
============================================================================

https://tinyurl.com/selfSwitchesLog

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SelfSwitches = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.SelfSwitches = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-self-switches-for-rpg-maker-mz",
    parameters: {},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){
        const commands = ["changeValue"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    processValue(args, key){
        if(args.value === "toggle"){
            return !$gameSelfSwitches.value(key)

        }else{
            return args.value === "true"
        }
    },

    getTimeOut(args){
        const timeUnit = args.unit
        const timeValue = Number(args.delay)
        switch(timeUnit){
            case "frames": return Eli.Date.framesToMiliSeconds(timeValue)
            case "seconds": return timeValue * 1000
            case "minutes": return timeValue * 60 * 1000
        }
    },

    processEval(scope, str){
        if(Eli.PluginManager.currentEventId > 0){
            scope["funcName"] = new Function(`return ${str}`)

            return scope["funcName"](str)

        }else{
            return eval(str)
        }

    },

    changeValue(args){
        if(Number(args.delay) > 0){
            this.operateWithDelay(args)
        }else{
            this.operateSwitchChange(args)
        }
    },

    operateWithDelay(args){
        const ms = this.getTimeOut(args)
        setTimeout(this.operateSwitchChange.bind(this, args), ms)
    },

    operateSwitchChange(args){
        const mapId = Number(args.mapId) || $gameMap.mapId()
        const events = args.eventId.split(",")
        const sswitch = Eli.String.removeSpaces(args.sswitch.toUpperCase()).split(",")
        let str = args.script ? JSON.parse(args.script) : ""

        for(let eventId of events){
            eventId = Number(eventId) || Eli.PluginManager.currentEventId

            for(const switchKey of sswitch){
                const key = [mapId, eventId, switchKey]
                const scope = $gameMap.event(eventId)
                const value = str ? this.processEval(scope, str) : this.processValue(args, key)
                $gameSelfSwitches.setValue(key, value)
            }

        }
    },

    executePluginCommandMV(rawArgs){
        const [mapId, eventId, switchId, value, delay = "0", unit = "frames"] = rawArgs
        const args = {
            mapId: mapId,
            eventId: eventId,
            sswitch: switchId,
            value: value.toLowerCase(),
            script: "",
            delay: delay,
            unit: {frames: "frames", seconds: "seconds", minutes: "minutes"}[unit.toLowerCase()],
        }
        this.changeValue(args)
    },

}

const Plugin = Eli.SelfSwitches
const Alias = Eli.SelfSwitches.alias

Plugin.initialize()

/* ------------------------------- GAME EVENT ------------------------------- */
{

Alias.Game_Event_meetsConditions = Game_Event.prototype.meetsConditions
Game_Event.prototype.meetsConditions = function(page){
    const alias = Alias.Game_Event_meetsConditions.call(this, page)

    if(this.meetsSelfSwitchConditions(page)){
        return true
    }

    return alias
}

Game_Event.prototype.meetsSelfSwitchConditions = function(page){
    const c = page.conditions
    const dataSwitches = $dataSystem.switches
    const sw1Id = dataSwitches[c.switch1Id].toUpperCase()
    const sw2Id = dataSwitches[c.switch2Id].toUpperCase()

    if(sw1Id.includes("SS:")){
        const letter = Eli.String.removeSpaces(sw1Id.substr(3))
        const key = [this._mapId, this._eventId, letter]
        const ssValue = $gameSelfSwitches.value(key)

        if(ssValue){
            return true
        }
    }

    if(sw2Id.includes("SS:")){
        const letter = Eli.String.removeSpaces(sw2Id.substr(3))
        const key = [this._mapId, this._eventId, letter]
        const ssValue = $gameSelfSwitches.value(key)

        if(ssValue){
            return true
        }
    }

    return false
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    if(command.toUpperCase() === "CHANGESS"){
        Plugin.executePluginCommandMV(args)
    }
    
}

}

}
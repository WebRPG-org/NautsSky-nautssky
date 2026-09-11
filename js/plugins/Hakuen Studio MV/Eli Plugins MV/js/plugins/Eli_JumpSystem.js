//============================================================================
// Eli_JumpSystem.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Adds a jump system to the player when a button is triggered.
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/eli-jump-system-for-rpg-maker-mv/rate?source=game

• Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Plugin Requirements
============================================================================

Need Eli Book.
Order After Eli Book.
Order After DotMoveSystem.

============================================================================
Features
============================================================================

● Add a jump button!
● Can choose a sound to play when jumping.
● Can use a variable value to define how far the player will jump.
● Can set up the conditions that allow the player to jump or not, through 
a list of possible ones in plugin parameters.
● Add impulse feature that changes the jump distance if the player is 
walking or dashing!
● Can block Jump with the region, event note tag, or switch!
● Can use a variable value to define a plus value to the jump height/peak.
● Turn on a switch when the player is jumping.
● Script calls to Jump Forward, Jump into coordinates, and jump on a 
character
● Works with normal directions and diagonals!
● Compatible with DotMoveSystem.js(Pixel Movement)​ from unagi ootoro!

============================================================================
How to use
============================================================================

Plugin Parameters

Keyboard / Gamepad Button → The buttons used on both devices to execute 
the jump.
Overwrite Keys → If true, the buttons above will be able to overwrite the 
default RPG Maker keys.
Jump Distance → A variable that will hold the distance the player can jump, 
measured in tiles.
Jump Height/peak → How high a jump can go. Measure in Pixels.
Enable Diagonal Jump → If true, the player will be able to jump diagonally.
Disable jump Switch → If this switch is true, the player will not be able 
to jump.
Jump Switch → This switch will always be true when the player is jumping.
Jumping Z-Index → The Z index value for the character when they are jumping.
Jump Se → A sound to be played when a character jumps. You can also set a 
Pitch and Pan value.
Block Jump Regions → List here all the region IDs that will prevent the 
player from jumping over them. Separate each one with a comma. Can use 
multiple operators (But variables will not work).

Jump Check
There is a function that will check if the character can land on his jump 
destination, otherwise, it will jump in the closest destination possible 
or in the same place.
This is necessary for the character not to jump outside the screen or in 
places where he cannot move. 

But you still can choose some restrictions about this jumping behavior:

Can Jump → The character will only be able to jump if the following 
conditions are true:
It is not inside a vehicle.
The X and Y land coordinates are valid map coordinates.
The X and Y land coordinates are passable through the direction it is facing.
There is no event on the X and Y land coordinates that is Normal 
priority(Same as characters).

The others below, all include these conditions above, but also, plus ones:
Can jump only to the same regions
Can jump only to higher regions
Can jump only to lower regions
Can jump only to the same terrain tag
Can jump only to higher terrain tag
Can jump only to lower terrain tag

It will check the current region/terrain tag that the character has, 
and if it matches the condition of being equal, higher, or lower, it will 
be able to jump.

Impulse

There is also the Impulse parameter. Once it is enabled, the jump value 
is changed by a value you choose when the player is walking or dashing.
This only works for the player.
How to use
Block/Prevent Jump
You can prevent the character from jumping over things with a region ID or using the event note tag(not case sensitive): <BlockJump>

You can also unblock the block jump with comment commands for specific event pages by writing on any comment:<UnblockJump>(not case sensitive). 
But for the plugin know you want it to search for comments on the event page, you also need to use another note tag: <JumpComment> (It is case sensitive).

You can also disable the jump feature for the player using the block switch specified on the plugin parameter.
Alternatively, can also use the plugin command to change the event block jump condition.
Jump Height
You can change the jump height of the player by changing the variable value with the ID defined on the plugin parameter.

You can also change the Event jump peak/height with the following script call(Or with plugin commands):

$gameMap.event(ID).setPlusJumpPeak(value)

The value will be added to the current and static jump peak value from the player/event (10) defined by the engine.
Activate Player touch events by jump

If you have an event with the trigger Player Touch, you can simulate an effect that will only trigger this event when the player jumps on it.
By default, if you use a conditional branch in this event with the script call $gamePlayer.isJumping() it will not work. Because at the moment the player touches the event while jumping, the default RPG Maker code already “set this function to false”.

But with the Jumping Switch, I provided a feature that allows you to check if the player touches the event by walking on it or jumping on it.
You just need to put a conditional branch using the jumping switch. If it is ON, then the event will notice that it was activated by jumping.

Script Calls

Replace character with:
$gamePlayer → Player
$gameMap.event(ID) → Map event
$gamePlayer.followers()._data[ID] → 0 is the first follower, 1 is the second, etc.
$gameMap.vehicles()[ID] → 0 for boat, 1 for ship, 2 for airship.

Replace charId with:
-1 → Player
-2 → Follower 1 (etc)
1, 2, 3 → Event Id
"ship", "boat", "airship" → Vehicle

Jump to a specific coordinate¹: 
character.jumpTo(x, y)

Jump to a character coordinate¹: 
character.jumpToCharacter(charId)

Jump forward: 
character.jumpForward(value)

Replace "value" with a number.

You can use these scripts on the move route too. There is also an equivalent in plugin commands for MZ.

NOTE 1: These two commands work like the default jump command(from the move route). Meaning that they will not follow the jump-check conditions. Only the jump forward will follow the jump check plugin parameter.
[MV] Plugin Command
EventBlockJump [FLAG] [ID] [ID]...
FLAG → Replace with true, false, or toggle.
ID → Replace with an event id. You can set as many as you want.
And also use the Multiple Operators feature(See at the bottom of the help file). Use 0 for the current event.

============================================================================

@param jumpButtonCode
@text Keyboard Button
@type select
@option none @option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc Add here the keyboard button. Default is space.
@default space

@param jumpButtonCodeGamepad
@text Game pad button
@type select
@option none @option a @option b @option x @option y @option lb @option rb @option lt @option rt @option select @option start @option l3 @option r3 @option up @option down @option left @option right 
@desc Choose the gamepad button. Put none to not use.
Default is none.
@default l3

@param overwrite
@text Overwrite keys
@type boolean
@desc Set to true if you want to overwrite the default keys.
@default true

@param jumpVariable
@text Jump Distance
@type variable
@desc This variable will determine how much tiles the player will be able to jump forward.
@default 0

@param jumpPeakVariable
@text Jump Height/Peak
@type variable
@desc This variable will determine a plus value for the jump height/peak.
@default 0

@param jumpCondition
@text Jump check
@type select
@desc This will determine what function the plugin will use to check if the player is able to jump.
@option Can jump
@value canJump
@option Can jump only to same regions
@value canJumpSameRegion
@option Can jump only to higher Regions
@value canJumpHigherRegion
@option Can jump only to lower Regions
@value canJumpLowerRegion
@option Can jump only to same terrain tag
@value canJumpSameTerrain
@option Can jump only to higher terrain tag
@value canJumpHigherTerrain
@option Can jump only to lower terrain tag
@value canJumpLowerTerrain
@default canJump

@param enableDiagonalJump
@text Enable Diagonal Jump
@type boolean
@desc Set to true if you want to enable diagonal jump.
@default false

@param blockRegion
@text Block Jump Regions 
@type text
@desc Set a region that will prevent the player to jump over it.
@default 10

@param blockSwitch
@text Disable Jump Switch
@type switch
@desc Turn this switch on to prevent the player from jump
@default 0

@param isJumpingSwitch
@text Jump Switch
@type switch
@desc This switch will turn on automatically when player is jumping.
@default 0

@param priorityZindex
@text Jumping Z-Index
@type text
@desc When the character is jumping, it will have this z index value.
@default 1.4

@param impulse
@text Impulse Switch
@type switch
@desc If this switch is on, the jump value can raise if the player is dashing or walking.
@default 0

@param walkPlus
@text Walk impulse
@type variable
@desc Set a variable to hold the value to add to the jump distance when player is walking.
@default 0
@parent impulse

@param dashPlus
@text Dash impulse
@type variable
@desc Set a variable to hold the value to add to the jump distance when player is dashing.
@default 0
@parent impulse

@param jumpSound
@text Jump Se
@type file
@dir audio/se/
@require 1
@desc Add here a sound effect for your jump.
@default

@param jumpPan
@text JumpSound Pan
@type number
@min -100
@max 100
@desc The pan number -100 to 100.
@default 0
@parent jumpSound

@param jumpPitch
@text JumpSound Pitch
@type number
@min -50
@max 150
@desc The pan number -50 to 150.
@default 100
@parent jumpSound

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_JumpSystem = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Parameters {
    constructor(parameters){
        this.keyboardCode = parameters.jumpButtonCode
        this.gamepadCode = parameters.jumpButtonCodeGamepad
        this.condition = parameters.jumpCondition
        this.seFilename = parameters.jumpSound
        this.overwrite = parameters.overwrite === "true"
        this.enableDiagonalJump = parameters.enableDiagonalJump === "true"
        this.distanceVariable = Number(parameters.jumpVariable)
        this.peakVariable = Number(parameters.jumpPeakVariable)
        this.blockSwitch = Number(parameters.blockSwitch)
        this.isJumpingSwitch = Number(parameters.isJumpingSwitch)
        this.priorityZIndex = Number(parameters.priorityZIndex) || 1.4
        this.impulse = Number(parameters.impulse)
        this.walkPlus = Number(parameters.walkPlus)
        this.dashPlus = Number(parameters.dashPlus)
        this.pitch = Number(parameters.jumpPitch)
        this.pan = Number(parameters.jumpPan)
        this.blockRegion = parameters.blockRegion.split(",").map(region => Number(region))
    }
}

Eli.JumpSystem = {

    version: 5.12,
    url: "https://hakuenstudio.itch.io/eli-jump-system-for-rpg-maker-mv",
    alias: {},
    Parameters: Parameters,
    parameters: new Parameters(PluginManager.parameters("Eli_JumpSystem")),
    button: 'jump',

    initialize(){
        this.initPluginCommands()
        this.initButtons()
    },

    initPluginCommands(){},

    initButtons(){
        if(this.parameters.keyboardCode !== "none"){
            this.setKeyboardButton()
        }

        if(this.parameters.gamepadCode !== "none"){
            this.setGamepadButton()
        }
    },

    setKeyboardButton(){
        const keyName = this.parameters.keyboardCode.toLowerCase()
        const keyCode = Eli.KeyCodes.keyboard[keyName]

        if(this.parameters.overwrite){
            Input.keyMapper[keyCode] = this.button

        }else if(!Eli.KeyCodes.isDefaultKeyboard(keyCode)){
            Input.keyMapper[keyCode] = this.button

        }else{
            this.button = Input.keyMapper[keyCode]
        }
    },

    setGamepadButton(){
        const keyName = this.parameters.gamepadCode.toLowerCase()
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

    cmd_jumpForward(args){
        const objArgs = {
            charId: Eli.Utils.processEscapeVarOrFormula(args[0]),
            distance: args[1],
            jumpPeak: args[2] || 0,
        }
        const character = Eli.Utils.getMapCharacter(objArgs.charId)
        const distance = Eli.Utils.processEscapeVarOrFormula(objArgs.distance)
        
        if(this.isEventOrVehicle(character)){
            character.setPlusJumpPeak(Number(objArgs.jumpPeak))
        }
        
        character.jumpForward(Number(distance))
    },

    cmd_jumpToCoordinates(args){
        const objArgs = {
            charId: Eli.Utils.processEscapeVarOrFormula(args[0]),
            coordinates: `${args[1]},${args[2]}`,
            jumpPeak: args[3] || 0
        }
        const character = Eli.Utils.getMapCharacter(objArgs.charId)
        let coordinates = objArgs.coordinates.split(",").map(coord => Number(Eli.Utils.processEscapeVarOrFormula(coord)))

        if(this.isEventOrVehicle(character)){
            character.setPlusJumpPeak(Number(objArgs.jumpPeak))
        }

        character.jumpTo(...coordinates)
    },

    cmd_jumpToCharacter(args){
        const objArgs = {
            jumperCharId: Eli.Utils.processEscapeVarOrFormula(args[0]),
            targetCharId: Eli.Utils.processEscapeVarOrFormula(args[1]),
            jumpPeak: args[2] || 0,
        }

        const character = Eli.Utils.getMapCharacter(objArgs.jumperCharId)

        if(this.isEventOrVehicle(character)){
            character.setPlusJumpPeak(Number(objArgs.jumpPeak))
        }

        character.jumpToCharacter(objArgs.targetCharId)
    },

    cmd_eventBlockJump(args){
        const blockFlag = args.shift().toLowerCase()
        const ids = Eli.PluginManager.createRangeOfNumbers(Eli.String.removeSpaces(args.join(",")))

        for(const id of ids){
            const event = $gameMap.event(id || Eli.PluginManager.currentEventId)

            if(event){
                event.blockJump = blockFlag === "toggle" ? !event.blockJump : blockFlag === "true"
            }
        }
    },

    isEventOrVehicle(character){
        return  character instanceof Game_Event || 
                character instanceof Game_Vehicle
    },

    executePluginCommandMV(command, args){
        const cmdList = {
            JUMPFORWARD: "cmd_jumpForward",
            JUMPTOXY: "cmd_jumpToCoordinates",
            JUMPTOCHAR: "cmd_jumpToCharacter",
            EVENTBLOCKJUMP: "cmd_eventBlockJump"
        }
        const cmd = cmdList[command.toUpperCase()]

        if(this[cmd]){
            this[cmd](args)
        }
    },

}

const Plugin = Eli.JumpSystem
const Alias = Eli.JumpSystem.alias

Plugin.initialize()

/* ------------------------------ SOUND MANAGER ----------------------------- */
SoundManager.playJump = function(){
    const jumpSound = {
        name: Plugin.param().seFilename,
        pan: Plugin.param().pan,
        pitch: Plugin.param().pitch,
        volume: ConfigManager.seVolume
    }
    AudioManager.playSe(jumpSound)
}

/* ------------------------------ GAME VARIABLE ----------------------------- */
Game_Variables.prototype.playerJumpDistance = function(){
    const id = Plugin.param().distanceVariable
    return this.value(id)
}

Game_Variables.prototype.playerJumpPeak = function(){
    const id = Plugin.param().peakVariable
    return this.value(id)
}

Game_Variables.prototype.playerWalkJumpPlus = function(){
    const id = Plugin.param().walkPlus
    return this.value(id)
}

Game_Variables.prototype.playerDashJumpPlus = function(){
    const id = Plugin.param().dashPlus
    return this.value(id)
}

/* ------------------------------ GAME SWITCHES ----------------------------- */
Game_Switches.prototype.isJumping = function(){
    const id = Plugin.param().isJumpingSwitch
    return this.value(id)
}

Game_Switches.prototype.setPlayerJumping = function(value){
    const id = Plugin.param().isJumpingSwitch
    this.setValue(id, value)
}

Game_Switches.prototype.jumpDisabled = function(){
    const id = Plugin.param().blockSwitch
    return this.value(id)
}

Game_Switches.prototype.playerJumpImpulse = function(){
    const id = Plugin.param().impulse
    return this.value(id)
}

/* ----------------------------- CHARACTER BASE ----------------------------- */
Alias.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers
Game_CharacterBase.prototype.initMembers = function() {
    Alias.Game_CharacterBase_initMembers.call(this)
    this._plusJumpPeak = 0
}

Game_CharacterBase.prototype.beforeJump = function() {
    this.setPriorityType(Plugin.param().priorityZIndex)
    this._jumpPeak += this._plusJumpPeak
    this._jumpCount = this._jumpPeak * 2
}

Game_CharacterBase.prototype.afterJump = function() {
    this.setPriorityType(1)
}

Alias.Game_CharacterBase_jump = Game_CharacterBase.prototype.jump
Game_CharacterBase.prototype.jump = function(xPlus, yPlus){
    Alias.Game_CharacterBase_jump.call(this, xPlus, yPlus)
    this.beforeJump()
}

Game_CharacterBase.prototype.jumpTo = function(x, y){
    const plusX = x - this.x
    const plusY = y - this.y

    this.jump(plusX, plusY)
}

Game_CharacterBase.prototype.jumpToCharacter = function(charId){
    const character = Eli.Utils.getMapCharacter(charId)

    this.jumpTo(character.x, character.y)
}

Alias.Game_CharacterBase_updateJump = Game_CharacterBase.prototype.updateJump;
Game_CharacterBase.prototype.updateJump = function(){
    Alias.Game_CharacterBase_updateJump.call(this)
    if(!this.isJumping()){
        this.afterJump()
    }
}

// Replaced this.isMapPassable with gameMap.isPassable
// isFalling is from Move Platform plugin.
Game_CharacterBase.prototype.canJump = function(x, y){
    return this.canPass(x, y)
    return  !this.isCollidedWithCharacters(x, y) &&
            this.isMapLandable(x, y, this.direction()) && 
            $gameMap.isValid(x, y)
}

Game_CharacterBase.prototype.isMapLandable = function(x, y){
    return $gameMap.isPassable(x, y, this.direction())
}

Game_CharacterBase.prototype.canJumpSameRegion = function(x, y){
    return this.canJump(x, y) && this.regionId() === $gameMap.regionId(x, y)
}

Game_CharacterBase.prototype.canJumpHigherRegion = function(x, y){
    return this.canJump(x, y) && this.regionId() <= $gameMap.regionId(x, y)
}

Game_CharacterBase.prototype.canJumpLowerRegion = function(x, y){
    return this.canJump(x, y) && this.regionId() >= $gameMap.regionId(x, y)
}

Game_CharacterBase.prototype.canJumpSameTerrain = function(x, y){
    return this.canJump(x, y) && this.terrainTag() === $gameMap.terrainTag(x, y)
}

Game_CharacterBase.prototype.canJumpHigherTerrain = function(x, y){
    return this.canJump(x, y) && this.terrainTag() <= $gameMap.terrainTag(x, y)
}

Game_CharacterBase.prototype.canJumpLowerTerrain = function(x, y){
    return this.canJump(x, y) && this.terrainTag() >= $gameMap.terrainTag(x, y)
}

Game_CharacterBase.prototype.jumpForward = function(value){
    const jumpDest = this.calculateJumpCoordinates(value)
    SoundManager.playJump()

    this.jump(jumpDest.x, jumpDest.y)
}

Game_CharacterBase.prototype.getJumpImpulse = function(){
    return 0
}

Game_CharacterBase.prototype.calculateJumpCoordinates = function(value){
    const jumpCheck = Plugin.param().condition
    const impulse = this.getJumpImpulse()
    const maxDistance = value + impulse
    let finalX = 0, finalY = 0

    for(let i = 0; i <= maxDistance; i++){
        const distance = this.calculateJumpDistance(i)
        const [destX, destY] = this.makeJumpDestinations(distance)
        const canJump = this[jumpCheck](destX, destY)

        if(this.hasFoundJumpBlockers(destX, destY)){
            break
        }else if(canJump){
            finalX = distance.x
            finalY = distance.y
        }

    }

    return {x: finalX, y: finalY}
}

Game_CharacterBase.prototype.makeJumpDestinations = function(distance){
    return [
        this.x + distance.x,
        this.y + distance.y,
    ]
}

Game_CharacterBase.prototype.hasFoundJumpBlockers = function(x, y){
    return  !this.isThrough() && 
            (this.isCollidedWithJumpBlockRegion(x, y) || this.isCollidedWithEventBlockJump(x, y))
}

Game_CharacterBase.prototype.isCollidedWithJumpBlockRegion = function(x, y){
    return Plugin.param().blockRegion.includes($gameMap.regionId(x, y))
}

Game_CharacterBase.prototype.isCollidedWithEventBlockJump = function(x, y){
    return $gameMap.events().some(event => event.posNt(x, y) && event.canBlockJump())
}

Game_CharacterBase.prototype.makeJumpDistanceTable = function(value){
    return {
        2: [0, value],
        4: [-value, 0],
        6: [value, 0],
        8: [0, -value]
    }
}

Game_CharacterBase.prototype.calculateJumpDistance = function(value){
    const distanceTable = this.makeJumpDistanceTable(value)
    const distance = {
        x: distanceTable[this.direction()][0], 
        y: distanceTable[this.direction()][1]
    }

    return distance
}

/* ------------------------------- GAME PLAYER ------------------------------ */
Alias.Game_Player_canJump = Game_Player.prototype.canJump
Game_Player.prototype.canJump = function(x, y){
    return !this.isFalling && Alias.Game_Player_canJump.call(this, x, y)
}

Alias.Game_Player_beforeJump = Game_Player.prototype.beforeJump
Game_Player.prototype.beforeJump = function() {
    Alias.Game_Player_beforeJump.call(this)
    $gameSwitches.setPlayerJumping(true)
}

Alias.Game_Player_afterJump = Game_Player.prototype.afterJump
Game_Player.prototype.afterJump = function() {
    Alias.Game_Player_afterJump.call(this)
    setTimeout(() => {
        if(!this.isJumping()){
            $gameSwitches.setPlayerJumping(false)
        }
    }, 500)
}

Alias.Game_Player_update = Game_Player.prototype.update
Game_Player.prototype.update = function(sceneActive){
    Alias.Game_Player_update.call(this, sceneActive)
    this.updateJumpForward()
}

Game_Player.prototype.makeJumpDistanceTable = function(value){
    return {
        1: [-value, value   ], // Down Left
        2: [0,      value   ], // Down
        3: [value,  value   ], // Down Right

        4: [-value, 0       ], // Left
        6: [value,  0       ], // Right

        7: [-value, -value  ], // Up Left
        8: [0,      -value  ], // Up
        9: [value,  -value  ], // Up Right
    }
}

Game_Player.prototype.calculateJumpDistance = function(value){
    const distanceTable = this.makeJumpDistanceTable(value)
    const direction = {
        "true": Input.dir8 || this.direction(),
        "false": this.direction(),
    }[Plugin.param().enableDiagonalJump]

    const distance = {
        x: distanceTable[direction][0], 
        y: distanceTable[direction][1]
    }

    return distance
}

Game_Player.prototype.updateJumpForward = function(){
    if(this.isJumpButtonPressed()){
        this._plusJumpPeak = $gameVariables.playerJumpPeak()

        if(this.isJumpAllowed()){
            this.jumpForward(this.jumpValue())
        }
    }
}

Game_Player.prototype.isJumpAllowed = function(){
    const blockSwitch = $gameSwitches.jumpDisabled()

    return !blockSwitch && this.canMove() && !this.isJumping()
}

Game_Player.prototype.isJumpButtonPressed = function(){
    return Input.isTriggered(Plugin.getButton())
}

Game_Player.prototype.jumpValue = function(){
    return $gameVariables.playerJumpDistance()
}

Game_Player.prototype.getJumpImpulse = function(){
    if($gameSwitches.playerJumpImpulse()){
        return this.getJumpImpulseType()
    }else{
        return 0
    }
}

Game_Player.prototype.getJumpImpulseType = function(){
    if(this.isDashing()){
        return $gameVariables.playerDashJumpPlus()

    }else if(!this.checkStop(0)){
        return $gameVariables.playerWalkJumpPlus()
    }else{
        return 0
    }
}

/* ------------------------------ GAME FOLLOWER ----------------------------- */
Alias.Game_Follower_update = Game_Follower.prototype.update
Game_Follower.prototype.update = function() {
    Alias.Game_Follower_update.call(this)
    this._plusJumpPeak = $gameVariables.playerJumpPeak()
}

/* ------------------------------- GAME EVENT ------------------------------- */
Alias.Game_Event_initMembers = Game_Event.prototype.initMembers
Game_Event.prototype.initMembers = function() {
    Alias.Game_Event_initMembers.call(this)
    this.blockJump = false
}

Alias.Game_Event_beforeSetupPage = Game_Event.prototype.beforeSetupPage
Game_Event.prototype.beforeSetupPage = function() {
    Alias.Game_Event_beforeSetupPage.call(this)
    this.blockJump = this.metaEli.BlockJump
}

Alias.Game_Event_afterSetupPage = Game_Event.prototype.afterSetupPage
Game_Event.prototype.afterSetupPage = function() {
    Alias.Game_Event_afterSetupPage.call(this)
    this.needIterateList = true
}

Alias.Game_Event_onListIteration = Game_Event.prototype.onListIteration
Game_Event.prototype.onListIteration = function(index){
    const aliasIndex = Alias.Game_Event_onListIteration.call(this, index)
    this.checkForUnblockJumpComment(aliasIndex)

    return aliasIndex
}

Game_Event.prototype.checkForUnblockJumpComment = function(index){
    const cmd = this.list()[index]

    if(this.canUnblockJumpByComment(cmd)){
        this.blockJump = false
    }
}

Game_Event.prototype.canUnblockJumpByComment = function(cmd){
    const isCommentCmd = cmd && (cmd.code === 108 || cmd.code === 408)
    return isCommentCmd && cmd.parameters[0].toLowerCase().includes("<unblockjump>")
}

Game_Event.prototype.setPlusJumpPeak = function(value){
    this._plusJumpPeak = value
}

Game_Event.prototype.canBlockJump = function(){
    return this.blockJump 
}

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */
Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args){
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}
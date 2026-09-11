//============================================================================
// Eli_BalloonPosition.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Set custom balloon positions for events and players!
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
Order After Eli Book

============================================================================
Features
============================================================================

Changing the position of the balloons:
• Through the file name.
• Through the notes field.
• Through comments on the event pages.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1GLpFmIwQ8MWsdmkLrJIJiN4v0w4ozMrGF2R-t30Ta1Y/edit?usp=sharing

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_BalloonPosition = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.BalloonPosition = {

    alias: {},
    url: "https://hakuenstudio.itch.io/eli-balloon-position-for-rpg-maker-mv",
    parameters: {},

    initialize(){},
    initParameters(){},
    initPluginCommands(){},

    param(){
        return this.parameters
    },

}

const Plugin = Eli.BalloonPosition
const Alias = Eli.BalloonPosition.alias

Plugin.initialize()

const COMMENT_TAG = "<balloonpos:"
const FILE_TAG = "bpos["

/* --------------------------- GAME CHARACTER BASE -------------------------- */
Alias.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers
Game_CharacterBase.prototype.initMembers = function(){
    Alias.Game_CharacterBase_initMembers.call(this)
    this.initBalloonMembers()
}

Game_CharacterBase.prototype.initBalloonMembers = function(){
    this.balloonX = 0
    this.balloonY = 0
}

Alias.Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage
Game_CharacterBase.prototype.setImage = function(characterName, characterIndex){
    Alias.Game_CharacterBase_setImage.call(this, characterName, characterIndex)

    if(this.filenameHasBalloonPosition(characterName)){
        this.setBalloonPositionByString(characterName, FILE_TAG, "]")
    }
}

Game_CharacterBase.prototype.filenameHasBalloonPosition = function(filename){
    return filename.toLowerCase().includes(FILE_TAG)
}   

Game_CharacterBase.prototype.setBalloonPositionByString = function(balloonString, openTag, closeTag) {
    const trimmedBallonString = Eli.String.removeSpaces(balloonString).toLowerCase()
    const start = trimmedBallonString.indexOf(openTag) + openTag.length
    const str = trimmedBallonString.substring(start)
    const end = str.indexOf(closeTag)
    const data = str.substring(0, end)
    const [x, y] = data.split(",")

    this.balloonX = Number(x)
    this.balloonY = Number(y)
}

Game_CharacterBase.prototype.getBalloonX = function(){
    return this.balloonX
}

Game_CharacterBase.prototype.getBalloonY = function(){
    return this.balloonY
}

Game_CharacterBase.prototype.hasBalloonNoteTag = function(note){
    return note.toLowerCase().includes(COMMENT_TAG)
}

/* ------------------------------- GAME PLAYER ------------------------------ */
Alias.Game_Player_startBalloon = Game_Player.prototype.startBalloon
Game_Player.prototype.startBalloon = function() {
    this.setBalloonPosition()
    Alias.Game_Player_startBalloon.call(this)
}

Game_Player.prototype.setBalloonPosition = function() {
    const leader = $gameParty.leader()
    if(leader && !this.filenameHasBalloonPosition(this.characterName())){
        const note = leader.actor().note

        if(this.hasBalloonNoteTag(note)){
            this.setBalloonPositionByString(note, COMMENT_TAG, ">")
        }
    }
}

/* ------------------------------ GAME FOLLOWER ----------------------------- */
Alias.Game_Follower_startBalloon = Game_Follower.prototype.startBalloon
Game_Follower.prototype.startBalloon = function() {
    this.setBalloonPosition()
    Alias.Game_Follower_startBalloon.call(this)
}

Game_Follower.prototype.setBalloonPosition = function() {
    const follower = this.actor()
    if(follower){
        const note = follower.actor().note

        if(this.hasBalloonNoteTag(note)){
            this.setBalloonPositionByString(note, COMMENT_TAG, ">")
        }
    }
}

/* ------------------------------- GAME EVENT ------------------------------- */
Alias.Game_Event_beforeSetupPage = Game_Event.prototype.beforeSetupPage
Game_Event.prototype.beforeSetupPage = function(){
    Alias.Game_Event_beforeSetupPage.call(this)
    this.initBalloonMembers()
}

Alias.Game_Event_afterSetupPage = Game_Event.prototype.afterSetupPage
Game_Event.prototype.afterSetupPage = function(){
    Alias.Game_Event_afterSetupPage.call(this)
    this.setupBalloonPosition()
}

Game_Event.prototype.setupBalloonPosition = function(){
    if(this.needCheckForBalloonPosition()){

        if(this.hasBalloonNoteTag(this.event().note)){
            this.setBalloonPositionByString(this.event().note, COMMENT_TAG, ">")
            this.needIterateList = this.needIterateList || false
    
        }else{
            this.needIterateList = true
        }
    }
}

Game_Event.prototype.needCheckForBalloonPosition = function(){
    return this.getBalloonX() === 0 && this.getBalloonY() === 0
}

Alias.Game_Event_onListIteration = Game_Event.prototype.onListIteration
Game_Event.prototype.onListIteration = function(index){
    const aliasIndex = Alias.Game_Event_onListIteration.call(this, index)
    this.findBalloonPositionComment(aliasIndex)

    return aliasIndex
}

Game_Event.prototype.findBalloonPositionComment = function(index){
    const cmd = this.list()[index]

    if(this.commandHasBalloonPositionComment(cmd, COMMENT_TAG)){
        this.setBalloonPositionByString(cmd.parameters[0], COMMENT_TAG, ">")
    }
}

Game_Event.prototype.commandHasBalloonPositionComment = function(cmd, balloonComment){
    return  cmd && (cmd.code === 108 || cmd.code === 408) && 
            cmd.parameters[0].toLowerCase().includes(balloonComment)
}

/* ---------------------------- SPRITE CHARACTER ---------------------------- */
Alias.Sprite_Character_updateBalloon = Sprite_Character.prototype.updateBalloon
Sprite_Character.prototype.updateBalloon = function() {
    Alias.Sprite_Character_updateBalloon.call(this)
    this.updateBallonPosition()
}

Sprite_Character.prototype.updateBallonPosition = function(){
    if (this._balloonSprite) {
        this._balloonSprite.x += this.getBalloonX()
        this._balloonSprite.y += this.getBalloonY()
    }
}

Sprite_Character.prototype.getBalloonX = function(){
    return this._character.getBalloonX()
}

Sprite_Character.prototype.getBalloonY = function(){
    return this._character.getBalloonY()
}

}
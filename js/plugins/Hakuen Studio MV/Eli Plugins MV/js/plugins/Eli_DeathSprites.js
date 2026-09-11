//============================================================================
// Eli_DeathSprites.js
//============================================================================

/*:
@plugindesc ♦1.0.0♦ Custom animated death sprites for battlers!
@author Hakuen Studio

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Features
==============================================================================

● Add a special Animated Sprite to be used for Actors and Enemies when they 
die/revive in battle!
● Sprite can be of any size!

==============================================================================
How to use
==============================================================================

https://docs.google.com/document/d/1Cgi4HjbhfVMBtZLINRevJqJrI2k5eo26pynTZjZdpQ4/edit?usp=sharing

==============================================================================

@param defaultSize
@text Default Size
@type number
@desc This will be the default size of each frame from the animated sprite.
@default 64

@param defaultDuration
@text Default Duration
@type number
@desc This will be the default time interval between each animation.
@default 20

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_DeathSprites = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Sprite_DeathBattler extends Sprite_Base{

    initialize(baseSprite) {
        super.initialize()
        this._frameCount = 0
        this._baseSprite = baseSprite
        this._maxAnimationCount = 0
        this._patternSize = 0
        this._animationCount = 0
        this._frameIndex = 0
        this._maxFrameIndex = 0
        this._battler = null
        this.visible = false
    }

    setup(bitmap, patternSize, animationInterval, battler){
        this._maxAnimationCount = animationInterval || 20
        this._patternSize = patternSize || 64
        this._battler = battler
        this.createBitmap(bitmap)
    }

    createBitmap(bitmap){
        this._bitmap = ImageManager.loadDeathBattler(bitmap)
        this._bitmap.addLoadListener(() => {
            this._maxFrameIndex = (this._bitmap.width/this.patternWidth()) - 1
            this.setFrame(0, 0, this.patternWidth(), this.patternHeight())
        })
    }

    patternWidth(){
        return this._patternSize
    }

    patternHeight(){
        return this._patternSize
    }

    characterBlockX(){
        return this._frameIndex * this.patternWidth()
    }
    
    characterBlockY(){
        return 0
    }

    update(){
        super.update()
        this.updatePosition()
        if(this._battler){
            this._frameCount = this.findFrameCount()
            
            if(this._frameCount !== 0){
                this.updateAnimation()
            }
        }
    }

    updatePosition(){
        this.x = this._baseSprite.x
        this.y = this._baseSprite.y
        this.anchor.x = this._baseSprite.anchor.x
        this.anchor.y = this._baseSprite.anchor.y
    }

    findFrameCount(){
        if(this._battler._deathAnimationActive){
            return 1

        }else if(this._battler._reviveAnimationActive){
            return -1

        }else{
            return 0
        }
    }

    updateAnimation(){
        this._animationCount++

        if(this.reachInterval()){
            this._animationCount = 0

            if(this.isOnLastIndex()){
                if(this._battler._reviveAnimationActive){
                    this.visible = false
                    this._baseSprite.visible = true
                }

                this._battler._deathAnimationActive = false
                this._battler._reviveAnimationActive = false
                this._frameCount = 0
            }else{
                this._frameIndex += this._frameCount
                this.updateFrame()
            }
        }
        
    }

    reachInterval(){
        return this._animationCount >= this._maxAnimationCount
    }

    isOnLastIndex(){
        if(this._battler._deathAnimationActive){
            return this._frameIndex === this._maxFrameIndex

        }else if(this._battler._reviveAnimationActive){
            return this._frameIndex === 0
        }
    }

    updateFrame(){
        const x = this.characterBlockX()
        const y = this.characterBlockY()
        const width = this.patternWidth()
        const height = this.patternHeight()

        this.setFrame(x, y, width, height)
    }

    updateVisibility(){}
}

Eli.DeathSprites = {

    version: 5.00,
    url: '',
    alias: {},
    parameters: {
        defaultSize: 0,
        defaultDuration: 0,
    },
    target: null,
    regRemoveSpace: /\s/g,
    Sprite_DeathBattler: Sprite_DeathBattler,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_DeathSprites")
        this.parameters.defaultSize = Number(parameters.defaultSize) || 0
        this.parameters.defaultDuration = Number(parameters.defaultDuration) || 1
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    getBattlerSprite(battler){
        if(battler.isActor()){
            return this.getActorBattlerSprite(battler)
        }else{
            return this.getEnemyBattlerSprite(battler)
        }
    },

    getActorBattlerSprite(battler){
        const sprites = SceneManager._scene._spriteset._actorSprites
        return sprites.find(spr => spr._battler === battler)
    },

    getEnemyBattlerSprite(battler){
        const sprites = SceneManager._scene._spriteset._enemySprites
        return sprites.find(spr => spr._battler === battler)
    },

    removeSpaces(str){
        return str.replace(this.regRemoveSpace, "")
    },

}

const Plugin = Eli.DeathSprites
const Alias = Eli.DeathSprites.alias

Plugin.initialize()

const NOTETAG = "DeathSprite"

/* ------------------------------ IMAGE MANAGER ----------------------------- */

ImageManager.loadDeathBattler = function(filename, hue) {
    return this.loadBitmap('img/death_battlers/', filename, hue, false);
}

/* ---------------------------- GAME BATTLER BASE --------------------------- */

Alias.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
    Alias.Game_BattlerBase_initMembers.call(this)
    this._deathAnimationActive = false
    this._reviveAnimationActive = false
    this._needRequestDeath = false
    this._needRequestRevive = false
}

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Game_Actor.prototype.requestDeath = function(){
    const spr = Plugin.getActorBattlerSprite(this)

    if(spr && spr.getDeathSprite()){
        this._needRequestDeath = false
        spr._battler._deathAnimationActive = true
        spr.visible = false
        spr._deathSprite.visible = true
    }
}

Game_Actor.prototype.requestRevive = function(){
    const spr = Plugin.getActorBattlerSprite(this)

    if(spr && spr.getDeathSprite()){
        this._needRequestRevive = false
        spr._battler._reviveAnimationActive = true
        spr.visible = false
        spr._deathSprite.visible = true
    }
}

}

/* ------------------------------- GAME ENEMY ------------------------------- */
{

Game_Enemy.prototype.requestDeath = function(){
    const spr = Plugin.getEnemyBattlerSprite(this)

    if(spr && spr.getDeathSprite()){
        this._needRequestDeath = false
        spr._battler._deathAnimationActive = true
        spr.visible = false
        spr._deathSprite.visible = true
    }
}

Game_Enemy.prototype.requestRevive = function(){
    const spr = Plugin.getEnemyBattlerSprite(this)

    if(spr && spr.getDeathSprite()){
        this._needRequestRevive = false
        spr._battler._reviveAnimationActive = true
        spr.visible = false
        spr._deathSprite.visible = true
    }
}

}

/* ---------------------------- SPRITESET BATTLE ---------------------------- */
{

Alias.Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors
Spriteset_Battle.prototype.createActors = function() {
    Alias.Spriteset_Battle_createActors.call(this)
    this.createBattlerDeathSprites(this._actorSprites)
}

Alias.Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies
Spriteset_Battle.prototype.createEnemies = function() {
    Alias.Spriteset_Battle_createEnemies.call(this)
    this.createBattlerDeathSprites(this._enemySprites)
}

Spriteset_Battle.prototype.createBattlerDeathSprites = function(battlerSprites) {
    for(const sprite of battlerSprites){
        const index = this._battleField.getChildIndex(sprite)
        const deathSprite = sprite._deathSprite
        this._battleField.addChildAt(deathSprite, index+1)
    }
}

}

/* ----------------------------- SPRITE BATTLER ----------------------------- */
{

Alias.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers
Sprite_Battler.prototype.initMembers = function() {
    Alias.Sprite_Battler_initMembers.call(this)
    this.createDeathSprite()
}

Sprite_Battler.prototype.createDeathSprite = function() {
    this._deathSprite = new Sprite_DeathBattler(this)
}

}

/* ------------------------------ SPRITE ACTOR ------------------------------ */
{

Alias.Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler
Sprite_Actor.prototype.setBattler = function(battler) {
    const changed = battler !== this._actor
    Alias.Sprite_Actor_setBattler.call(this, battler)

    if(changed && this.getDeathSprite()){
        const [file, size = Plugin.param().defaultSize, duration = Plugin.param().defaultDuration] = this.getDeathSprite().split(",")
        this._deathSprite.setup(Plugin.removeSpaces(file), Number(size), Number(duration), battler)
    }
}

Sprite_Actor.prototype.getDeathSprite = function() {
    return this._actor.actor().meta[NOTETAG]
}

Alias.Sprite_Actor_startMotion = Sprite_Actor.prototype.startMotion
Sprite_Actor.prototype.startMotion = function(motionType) {
    if(motionType === "dead" && this.getDeathSprite()){
        motionType = "walk"
    }
    Alias.Sprite_Actor_startMotion.call(this, motionType)
}

Alias.Sprite_Actor_updateVisibility = Sprite_Actor.prototype.updateVisibility
Sprite_Actor.prototype.updateVisibility = function(motionType) {
    if(this._deathSprite.visible){
        this.visible = false
    }else{
        Alias.Sprite_Actor_updateVisibility.call(this, motionType)
    }
}

}

/* ------------------------------ SPRITE ENEMY ------------------------------ */
{

Alias.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler
Sprite_Enemy.prototype.setBattler = function(battler) {
    const changed = battler !== this._enemy
    Alias.Sprite_Enemy_setBattler.call(this, battler)

    if(changed && this.getDeathSprite()){
        const [file, size = Plugin.param().defaultSize, duration = Plugin.param().defaultDuration] = this.getDeathSprite().split(",")
        this._deathSprite.setup(Plugin.removeSpaces(file), Number(size), Number(duration), battler)
    }
}

Sprite_Enemy.prototype.getDeathSprite = function() {
    return this._enemy.enemy().meta[NOTETAG]
}

Alias.Sprite_Enemy_updateVisibility = Sprite_Enemy.prototype.updateVisibility
Sprite_Enemy.prototype.updateVisibility = function(motionType) {
    if(this._deathSprite.visible){
        this.visible = false
    }else{
        Alias.Sprite_Enemy_updateVisibility.call(this, motionType)
    }
}

Alias.Sprite_Enemy_updateEffect = Sprite_Enemy.prototype.updateEffect
Sprite_Enemy.prototype.updateEffect = function() {
    if(this._battler && this._battler.isDead() && BattleManager.isAnyDeathAnimationPlaying(this._battler)){

    }else{
        Alias.Sprite_Enemy_updateEffect.call(this)
    }
}

}

/* ----------------------------- BATTLE MANAGER ----------------------------- */
{

BattleManager.isDeathSpriteRequested = function(member){
    return member._deathAnimationActive || member._reviveAnimationActive
}

BattleManager.isAnyDeathAnimationPlaying = function() {
    return  $gameParty.members().some(this.isDeathSpriteRequested) ||
            $gameTroop.members().some(this.isDeathSpriteRequested)
}

Alias.BattleManager_endAction = BattleManager.endAction
BattleManager.endAction = function() {
    Alias.BattleManager_endAction.call(this)
    Plugin.target = null
}

}

/* ---------------------------- WINDOW BATTLE LOG --------------------------- */
{

Alias.Window_BattleLog_updateWait = Window_BattleLog.prototype.updateWait
Window_BattleLog.prototype.updateWait = function() {
    return Alias.Window_BattleLog_updateWait.call(this) || BattleManager.isAnyDeathAnimationPlaying()
}

Window_BattleLog.prototype.requestDeath = function(){
    const spr = Plugin.getBattlerSprite(Plugin.target)
    
    if(spr.startMotion){
        spr.startMotion("damage")
    }

    Plugin.target._needRequestDeath = false
    Plugin.target._deathAnimationActive = true
    spr.visible = false
    spr._deathSprite.visible = true
}

Window_BattleLog.prototype.requestRevive = function(){
    const spr = Plugin.getBattlerSprite(Plugin.target)

    if(spr.startMotion){
        spr.startMotion("walk")
    }

    Plugin.target._needRequestRevive = false
    Plugin.target._reviveAnimationActive = true
    spr.visible = false
    spr._deathSprite.visible = true
}

if(Imported.YEP_BattleEngineCore){

    Alias.Game_Action_apply = Game_Action.prototype.apply
    Game_Action.prototype.apply = function(target) {
        const oldHp = target.hp

        Alias.Game_Action_apply.call(this, target)

        const newHp = target.hp
        const isDead = oldHp > 0 && newHp <= 0
        const isRevived = oldHp <= 0 && newHp > 0
    
        if(Plugin.getBattlerSprite(target).getDeathSprite()){

            if(isDead){
                target._needRequestDeath = true

            }else if(isRevived){
                target._needRequestRevive = true
            }
        }

    }
    
    Alias.Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
    Window_BattleLog.prototype.displayActionResults = function(subject, target) {
        Alias.Window_BattleLog_displayActionResults.call(this, subject, target)
        Plugin.target = target

        if(Plugin.getBattlerSprite(target).getDeathSprite()){

            if(target._needRequestDeath){
                this.push('requestDeath')
                
            }else if(target._needRequestRevive){
                this.push('requestRevive')
                target._needRequestRevive = false
            }
        }
    }

}else{

    Alias.Window_BattleLog_displayRemovedStates = Window_BattleLog.prototype.displayRemovedStates
    Window_BattleLog.prototype.displayRemovedStates = function(target) {
        Plugin.target = target
        const isRevived = target.result().removedStateObjects().some(state => state.id === target.deathStateId())

        Alias.Window_BattleLog_displayRemovedStates.call(this, target)

        if(isRevived && Plugin.getBattlerSprite(target).getDeathSprite()){
            this.push('requestRevive')
        }
    }
    
    Alias.Window_BattleLog_displayAddedStates = Window_BattleLog.prototype.displayAddedStates
    Window_BattleLog.prototype.displayAddedStates = function(target) {
        Plugin.target = target
        const hasDeathState = target.result().addedStateObjects().some(state => state.id === target.deathStateId())

        Alias.Window_BattleLog_displayAddedStates.call(this, target)

        if(hasDeathState && Plugin.getBattlerSprite(target).getDeathSprite()){
            this.push('requestDeath')
        }
    }
}

}

}
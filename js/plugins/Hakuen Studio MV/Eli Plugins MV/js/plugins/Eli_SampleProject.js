//==========================================================================
// Eli_SampleProject.js
//==========================================================================

/*:
@plugindesc ♦1.0.0♦ This is for use only in the sample project.
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
*/

"use strict"

{

const Alias = {}

/* ----------------------------- GAME FOLLOWERS ----------------------------- */
{

Game_Followers.prototype.setup = function() {
    this._data = [];
    for (let i = 1; i < 10; i++) {
        this._data.push(new Game_Follower(i))
    }
}

}

/* ----------------------------- WINDOW MESSAGE ----------------------------- */
{

Alias.Window_Message_initMembers = Window_Message.prototype.initMembers
Window_Message.prototype.initMembers = function() {
    this._x = Eli.Utils.centerXPos(this.windowWidth(), Graphics.width)
    Alias.Window_Message_initMembers.call(this)
}

Window_Message.prototype.windowWidth = function() {
    return 816
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Scene_Map.prototype.updateEncounterEffect = function() {
    if (this._encounterEffectDuration > 0) {
        this._encounterEffectDuration--;
        const speed = this.encounterEffectSpeed();
        const n = speed - this._encounterEffectDuration;
        const p = n / speed;
        const q = ((p - 1) * 20 * p + 5) * p + 1;
        const zoomX = $gamePlayer.screenX();
        const zoomY = $gamePlayer.screenY() - 24;
        if (n === 2) {
            $gameScreen.setZoom(zoomX, zoomY, 1);
            this.snapForBattleBackground();
            //this.startFlashForEncounter(speed / 2);
        }
        $gameScreen.setZoom(zoomX, zoomY, q);
        if (n === Math.floor(speed / 6)) {
            //this.startFlashForEncounter(speed / 2);
        }
        if (n === Math.floor(speed / 2)) {
            BattleManager.playBattleBgm();
            this.startFadeOut(this.fadeSpeed());
        }
    }
}

}

/* ------------------------------- WINDOW BASE ------------------------------ */
{

Alias.Window_Base_initialize = Window_Base.prototype.initialize
Window_Base.prototype.initialize = function(x, y, width, height) {
    Alias.Window_Base_initialize.call(this, x, y, width, height)
    this.backOpacity = 255
}

}

/* ----------------------------- WINDOW MAP NAME ---------------------------- */
{

Window_MapName.prototype.windowWidth = function() {
    const tempText = $gameMap.displayName().substring(0)
    const textWidth = Eli.Utils.getTextWidth(tempText) + this.standardPadding() * 2
    return textWidth
}

Window_MapName.prototype.updateFadeIn = function() {
    this.contentsOpacity += 16
    this.opacity += $gameMap.displayName() ? 16 : 0
}

Window_MapName.prototype.updateFadeOut = function() {
    this.contentsOpacity -= 16
    this.opacity -= $gameMap.displayName() ? 16 : 0
}

Window_MapName.prototype.refresh = function() {
    this.contents.clear()
    if ($gameMap.displayName()) {
        const width = this.textWidth($gameMap.displayName())
        //this.drawBackground(0, 0, width, this.lineHeight());
        this.drawText($gameMap.displayName(), 0, 0, width, "left")
    }
}

}

}
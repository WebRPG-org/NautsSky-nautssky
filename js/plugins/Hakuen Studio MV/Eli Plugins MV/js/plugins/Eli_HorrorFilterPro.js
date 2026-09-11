//==========================================================================
// Eli_HorrorFilter Pro.js
//==========================================================================

/*:

@target MZ
@base EliMZ_Book
@orderAfter EliMZ_PressStart

@plugindesc ♦1.0.0♦ Add a Horror Filter effect on screen and on sprites!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-horror-filter-for-rpg-maker-mv-mz

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
Requirements
============================================================================

Need PIXI Filters above all plugins.
For MV => https://github.com/pixijs/filters/releases/download/v2.5.0/pixi-filters.js

Need Eli Book.
Order After Eli Book.
Order After Eli_PressStart

============================================================================
Features
============================================================================

● Add PIXI Old Film, CRT, and Glitch Filter to create a Horror Filter 
Effect.
● Apply the filter on several game sprites:
• Title screen backgrounds and game title!
• Player, events, followers, vehicles, and pictures!
• Enemy and Actor sprites!
● The entire screen on Map and Battle scene!
● Use plugin commands together with a built-in Filter editor to apply them 
on the fly and see what it looks like on your sprites!
● A custom scene that let the player change the filter configurations! Via 
options menu or plugin command!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1fVjnJVZxZRnfZ2D3tpzWlkX9ZHUvDDOmKNGLc4brULY/edit?usp=sharing

============================================================================
Plugin Commands
============================================================================

● HorrorFilter Operation Target SearchType Id/Index Filter
• Operation → Replace with Add or Remove.
• Target → Replace with one of the following: Character, Picture, Actor, 
Enemy.
• SearchType → Replace with Id or Index.
• Id/Index → Replace with numbers according to the search type.
• Filter → Only works when the operation is “Remove”. Replace with one of 
the following: ALL, OldFilm, CRT, or Glitch.
● HorrorFilter Open Scene → Will open the Screen Filter Editor Scene.

For both MV and MZ, there are some plugin commands that have arguments 
that receive an ID or INDEX.
Those arguments support multiple entries via the multiple operators.
Multiple operators
You can also set multiple entries separating them by comma(,) or double 
trace(--) when you want to get a range of numbers(without any blank space).

Exemple: Selecting multiple ids:
● 1,2,\v[3],4--8,9

The command will be applied for IDs 1, and 2, the value of the variables 3,
and 4,5,6,7,8,9.
As you can see the "--" is like a range operator. It will get all numbers 
between(and including) the 4 and 8.

============================================================================
Update Log
============================================================================

https://docs.google.com/document/d/1KKuU708qX9_jrThSFI_w-DGV0uj_Q6ZSqJwcDu3YyVk/edit?usp=sharing

============================================================================

@command cmd_callScene
@text Call Horror Screen Scene
@desc Open the Horror Screen Editor Scene

@command cmd_addCharacterFilter
@text Add Character Filter
@desc Set here the characters you want to apply the horror filter.

    @arg ids
    @text Character Ids
    @type text
    @desc -2 = First Follower | -1 = Player | 0 = This event 
    1 >= Event Id | 'boat', 'ship', 'airship' Vehicle name
    @default 0

@command cmd_removeCharacterFilter
@text Remove Character Filter
@desc Set here the characters you want to apply the horror filter.

    @arg ids
    @text Character Ids
    @type text
    @desc -2 = First Follower | -1 = Player | 0 = This event 
    1 >= Event Id | 'boat', 'ship', 'airship' Vehicle name.
    @default 0

    @arg filter
    @text The filter to remove
    @type select
    @option All
    @option oldFilm
    @option crt
    @option glitch
    @desc
    @default All

@command cmd_addPictureFilter
@text Add Picture Filter
@desc Set here the pictures you want to apply the horror filter.

    @arg ids
    @text Picture Ids
    @type text
    @desc The picture id.
    @default 1

@command cmd_removePictureFilter
@text Remove Picture Filter
@desc Set here the pictures you want to apply the horror filter.

    @arg ids
    @text Picture Ids
    @type text
    @desc The picture id.
    @default 1

    @arg filter
    @text Filter to remove
    @type select
    @option All
    @option oldFilm
    @option crt
    @option glitch
    @desc The filter you want to remove.
    @default All

@command cmd_addBattlerFilter
@text Add Battler Filter
@desc Set here the characters you want to apply the horror filter.

    @arg target
    @text Target
    @type select
    @option Enemy
    @option Actor
    @desc Select the type of sprite you want to apply the filter.
    @default Enemy

    @arg searchType
    @text Search Type
    @type select
    @option Index
    @option Id
    @desc The method you will use to find the sprites you want to apply the filter.
    @default Index

    @arg ids
    @text Battlers
    @type text
    @desc The ids or battler index, depending on the search type.
    @default 0

@command cmd_removeBattlerFilter
@text Remove Battler Filter
@desc Set here the characters you want to apply the horror filter.

    @arg target
    @text Target
    @type select
    @option Enemy
    @option Actor
    @desc Select the type of sprite you want to apply the filter.
    @default Enemy

    @arg searchType
    @text Search Type
    @type select
    @option Index
    @option Id
    @desc The method you will use to find the sprites you want to apply the filter.
    @default Index

    @arg ids
    @text Battlers
    @type text
    @desc The ids or battler index, depending on the search type.
    @default 0

    @arg filter
    @text Filter to remove
    @type select
    @option All
    @option oldFilm
    @option crt
    @option glitch
    @desc The filter you want to remove.
    @default All

@param editorButton
@text Editor Scene Button
@type select
@option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc When pressed with ALT, this button will call the horror scene. Without ALT, it will hide all windows on the scene.
@default h

@param screenButton
@text Screen Scene Button
@type select
@option a @option b @option c @option d @option e @option f @option g @option h @option i @option j @option k @option l @option m @option n @option o @option p @option q @option r @option s @option t @option u @option v @option w @option x @option y @option z @option 0 @option 1 @option 2 @option 3 @option 4 @option 5 @option 6 @option 7 @option 8 @option 9 @option backspace @option tab @option enter @option shift @option ctrl @option alt @option pausebreak @option capslock @option esc @option space @option pageup @option pagedown @option end @option home @option leftarrow @option uparrow @option rightarrow @option downarrow @option insert @option delete @option leftwindowkey @option rightwindowkey @option selectkey @option numpad0 @option numpad1 @option numpad2 @option numpad3 @option numpad4 @option numpad5 @option numpad6 @option numpad7 @option numpad8 @option numpad9 @option multiply @option add @option subtract @option decimalpoint @option divide @option f1 @option f2 @option f3 @option f4 @option f5 @option f6 @option f7 @option f8 @option f9 @option f10 @option f11 @option f12 @option numlock @option scrolllock @option semicolon @option equalsign @option comma @option dash @option period @option forwardslash @option graveaccent @option openbracket @option backslash @option closebracket @option singlequote
@desc When pressed with ALT, this button will call the screen horror scene. Without ALT, it will hide all windows on the scene.
@default y

@param fixTitleAreaFilter
@text Fix Title Filter Area
@type boolean
@desc Set this to true every time you change your game title and start the game for the first time.
@default true

@param screenFilter
@text Screen Filter
@type struct<screenFilterSt>
@desc Settings related to the screen filter.
@default {"sceneBgm":"","sceneBackground":"","fadeOutAll":"true","layer":"Below Pictures","optionCommandEnable":"true","optionCommandName":"Horror Filter","optionCommandIndex":"0"}

@param oldFilm
@text Old Film Settings
@type struct<oldFilmSt>
@desc Old Film Settings
@default {"commandNames":"{\"isEnabled\":\"Enabled\",\"sepia\":\"Sepia\",\"noise\":\"Noise\",\"noiseSize\":\"Noise Size\",\"autoSeed\":\"Random Seed\",\"seed\":\"Noise Seed\",\"scratch\":\"Scratch\",\"scratchDensity\":\"Scratch Density\",\"scratchWidth\":\"Scratch Width\",\"vignetting\":\"Vignetting\",\"vignettingAlpha\":\"Vignetting Alpha\",\"vignettingBlur\":\"Vignetting Blur\"}","commandHelps":"{\"isEnabled\":\"\\\"Enable or disable this filter.\\\"\",\"sepia\":\"\\\"The amount of saturation of sepia effect, a value of 1 is more saturation and closer to 0 is less,\\\\nand a value of 0 produces no sepia effect\\\"\",\"noise\":\"\\\"Opacity/intensity of the noise effect between 0 and 1\\\"\",\"noiseSize\":\"\\\"The size of the noise particles\\\"\",\"autoSeed\":\"\\\"If true, the seed will keep changing randomly\\\"\",\"seed\":\"\\\"A seed value to apply to the random noise generation\\\"\",\"scratch\":\"\\\"How often scratches appear\\\"\",\"scratchDensity\":\"\\\"The density of the number of scratches\\\"\",\"scratchWidth\":\"\\\"The width of the scratches\\\"\",\"vignetting\":\"\\\"The radius of the vignette effect, smaller values produces a smaller vignette\\\"\",\"vignettingAlpha\":\"\\\"Amount of opacity of vignette\\\"\",\"vignettingBlur\":\"\\\"Blur intensity of the vignette\\\"\"}","commandFlags":"{\"isEnabled\":\"true\",\"sepia\":\"true\",\"noise\":\"true\",\"noiseSize\":\"true\",\"autoSeed\":\"true\",\"seed\":\"true\",\"scratch\":\"true\",\"scratchDensity\":\"true\",\"scratchWidth\":\"true\",\"vignetting\":\"true\",\"vignettingAlpha\":\"true\",\"vignettingBlur\":\"true\"}"}

@param crt
@text Crt Settings
@type struct<crtSt>
@desc Crt Settings
@default {"commandNames":"{\"isEnabled\":\"Enabled\",\"curvature\":\"Curvature\",\"lineWidth\":\"Line Width\",\"lineContrast\":\"Line Contrast\",\"verticalLine\":\"Line Orientation\",\"noise\":\"Noise\",\"noiseSize\":\"Noise Size\",\"autoSeed\":\"Random Seed\",\"seed\":\"Noise Seed\",\"vignetting\":\"Vignetting\",\"vignettingAlpha\":\"Vignetting Alpha\",\"vignettingBlur\":\"Vignetting Blur\",\"time\":\"Time\"}","commandHelps":"{\"isEnabled\":\"\\\"Enable or disable this filter.\\\"\",\"curvature\":\"\\\"Bent of interlaced lines, higher value means more bend\\\"\",\"lineWidth\":\"\\\"Width of the interlaced lines\\\"\",\"lineContrast\":\"\\\"Contrast of interlaced lines\\\"\",\"verticalLine\":\"\\\"Vertical or horizontal lines\\\"\",\"noise\":\"\\\"Opacity/intensity of the noise effect between 0 and 1\\\"\",\"noiseSize\":\"\\\"The size of the noise particles\\\"\",\"autoSeed\":\"\\\"If true, the seed will keep changing randomly\\\"\",\"seed\":\"\\\"A seed value to apply to the random noise generation\\\"\",\"vignetting\":\"\\\"The radius of the vignette effect, smaller values produces a smaller vignette\\\"\",\"vignettingAlpha\":\"\\\"Amount of opacity of vignette\\\"\",\"vignettingBlur\":\"\\\"Blur intensity of the vignette\\\"\",\"time\":\"\\\"For animating interlaced lines\\\"\"}","commandFlags":"{\"isEnabled\":\"true\",\"curvature\":\"true\",\"lineWidth\":\"true\",\"lineContrast\":\"true\",\"verticalLine\":\"true\",\"noise\":\"true\",\"noiseSize\":\"true\",\"autoSeed\":\"true\",\"seed\":\"true\",\"vignetting\":\"true\",\"vignettingAlpha\":\"true\",\"vignettingBlur\":\"true\",\"time\":\"true\"}"}

@param glitch
@text Glitch Commands
@type struct<glitchSt>
@desc Glitch Commands
@default {"commandNames":"{\"isEnabled\":\"Enabled\",\"toggleTime\":\"Toggle Time\",\"toggleRefresh\":\"Toggle Shuffle\",\"slices\":\"Slices\",\"offset\":\"Offset\",\"offsetShakePower\":\"Offset Shake\",\"direction\":\"Direction\",\"fillMode\":\"Fill Mode\",\"autoSeed\":\"Random Seed\",\"seed\":\"Seed\",\"average\":\"Average\",\"minSize\":\"Minimum Size\",\"sampleSize\":\"Sample Size\",\"redX\":\"Red X\",\"redY\":\"Red Y\",\"greenX\":\"Green X\",\"greenY\":\"Green Y\",\"blueX\":\"Blue X\",\"blueY\":\"Blue Y\"}","commandHelps":"{\"isEnabled\":\"\\\"Enable or disable this filter.\\\"\",\"toggleTime\":\"\\\"If higher than zero, it will enable/disable the glitch on this time interval(frames)\\\"\",\"toggleRefresh\":\"\\\"If this is true, when the toggle time enable/disables the filter, it will always enable the filter again\\\\nwith different settings.\\\"\",\"slices\":\"\\\"The maximum number of slices.\\\"\",\"offset\":\"\\\"The maximum offset amount of slices\\\"\",\"offsetShakePower\":\"\\\"If higher than zero, will produce a shake effect\\\"\",\"direction\":\"\\\"The angle in degree of the offset of slices\\\"\",\"fillMode\":\"\\\"The fill mode of the space after the offset. Acceptable values:\\\\nTransparent, Original, Loop, Clamp, Mirror\\\"\",\"autoSeed\":\"\\\"If true, the seed will keep changing randomly\\\"\",\"seed\":\"\\\"A seed value to apply to the random noise generation\\\"\",\"average\":\"\\\"True will divide the bands roughly based on equal amounts where as setting to false will vary the band\\\\nsizes dramatically (more random looking).\\\"\",\"minSize\":\"\\\"Minimum size of individual slice. Segment of total sampleSize\\\"\",\"sampleSize\":\"\\\"The resolution of the displacement map texture\\\"\",\"redX\":\"\\\"Red channel offset X\\\"\",\"redY\":\"\\\"Red channel offset Y\\\"\",\"greenX\":\"\\\"Green channel offset X\\\"\",\"greenY\":\"\\\"Green channel offset Y\\\"\",\"blueX\":\"\\\"Blue channel offset X\\\"\",\"blueY\":\"\\\"Blue channel offset Y\\\"\"}","commandFlags":"{\"isEnabled\":\"true\",\"toggleTime\":\"true\",\"toggleRefresh\":\"true\",\"slices\":\"true\",\"offset\":\"true\",\"offsetShakePower\":\"true\",\"direction\":\"true\",\"fillMode\":\"true\",\"autoSeed\":\"true\",\"seed\":\"true\",\"average\":\"true\",\"minSize\":\"true\",\"sampleSize\":\"true\",\"redX\":\"true\",\"redY\":\"true\",\"greenX\":\"true\",\"greenY\":\"true\",\"blueX\":\"true\",\"blueY\":\"true\"}"}

@param categoryWindow
@text Category Window
@type struct<categoryWinSt>
@desc The category window that shows the commands horizontally.
@default {"commandNames":"{\"target\":\"Targets\",\"oldFilm\":\"Old Film\",\"crt\":\"CRT\",\"glitch\":\"Glitch\",\"quit\":\"Quit\"}","commandHelps":"{\"target\":\"\\\"The Sprites you will apply the current filter.\\\"\",\"oldFilm\":\"\\\"The OldFilmFilter applies a Old film effect to an object.\\\"\",\"crt\":\"\\\"The CRTFilter applies a CRT effect to an object.\\\"\",\"glitch\":\"\\\"The GlitchFilter applies a glitch effect to an object.\\\"\",\"quit\":\"\\\"Quit the Horror Filter Editor.\\\"\"}"}

*/

/* ----------------------- SCREEN HORROR FILTER SCENE ----------------------- */
{

/*~struct~screenFilterSt:

@param separator1
@text Filter Scene

@param sceneBgm
@text Scene Bgm
@type file
@dir audio/bgm
@desc Choose a BGM to play when on the Screen Filter Scene.
@default
@parent separator1

@param sceneBackground
@text Scene Background
@type file
@dir img/system
@desc Choose a image to be used as background of the scene in order to apply the horror filter.
@default
@parent separator1

@param fadeOutAll
@text Fade Out All
@type boolean
@desc If true, when going to the Screen Filter Scene, the screen and currently audios will all fade out.
@default true
@parent separator1

@param optionCommandEnable
@text Add Option Command
@type boolean
@desc Set to true if you want to add a command on the options window to call the scene.
@default true
@parent separator1

@param optionCommandName
@text Command Name
@type text
@desc Choose the name of the options command.
@default Horror Filter
@parent optionCommandEnable

@param optionCommandIndex
@text Command Position
@type text
@desc Set -1 for automatic. Or choose a index position.
@default 0
@parent optionCommandEnable

@param separator2
@text Filter Settings

@param layer
@text Layer
@type select
@option None
@option Below Pictures
@option Above Pictures
@desc Choose the layer of the screen filter.
@default Below Pictures
@parent separator2

@param allMaps
@text Apply on All Maps
@type boolean
@desc If true, the screen filter will be applied on all maps.
@default true
@parent separator2

@param allBattles
@text Apply on All Battles
@type boolean
@desc If true, the screen filter will be applied on all battles.
@default true
@parent separator2

*/

}

/* -------------------------------- OLD FILM -------------------------------- */
{

/*~struct~oldFilmSt:

@param commandNames
@text Command Names
@type struct<oldFilmCommandNamesSt>
@desc The names of the command inside the window.
@default

@param commandHelps
@text Help Texts
@type struct<oldFilmCommandHelpSt>
@desc Help text for each command.
@default

@param commandFlags
@text Command Flags
@type struct<oldFilmCommandFlagsSt>
@desc Choose what commands you want to show/hide.
@default

*/
    
}

/* ------------------------- OLD FILM COMMAND NAMES ------------------------- */
{
/*~struct~oldFilmCommandNamesSt:

@param isEnabled
@text Enabled
@type text
@default Enabled

@param sepia
@text Sepia
@type text
@default Sepia

@param noise
@text Noise
@type text
@default Noise

@param noiseSize
@text Noise Size
@type text
@default Noise Size

@param autoSeed
@text Random Seed
@type text
@default Random Seed

@param seed
@text Noise Seed
@type text
@default Noise Seed

@param scratch
@text Scratch
@type text
@default Scratch

@param scratchDensity
@text Scratch Density
@type text
@default Scratch Density

@param scratchWidth
@text Scratch Width
@type text
@default Scratch Width

@param vignetting
@text Vignetting
@type text
@default Vignetting

@param vignettingAlpha
@text Vignetting Alpha
@type text
@default Vignetting Alpha

@param vignettingBlur
@text Vignetting Blur
@type text
@default Vignetting Blur

*/
}

/* ------------------------------ OLD FILM HELP ----------------------------- */
{
/*~struct~oldFilmCommandHelpSt:

@param isEnabled
@text Enabled
@type note
@default "Enable or disable this filter."

@param sepia
@text Sepia
@type note
@default "The amount of saturation of sepia effect, a value of 1 is more saturation and closer to 0 is less,\nand a value of 0 produces no sepia effect"

@param noise
@text Noise
@type note
@default "Opacity/intensity of the noise effect between 0 and 1"

@param noiseSize
@text Noise Size
@type note
@default "The size of the noise particles"

@param autoSeed
@text Random Seed
@type note
@default "If true, the seed will keep changing randomly"

@param seed
@text Noise Seed
@type note
@default "A seed value to apply to the random noise generation"

@param scratch
@text Scratch
@type note
@default "How often scratches appear"

@param scratchDensity
@text Scratch Density
@type note
@default "The density of the number of scratches"

@param scratchWidth
@text Scratch Width
@type note
@default "The width of the scratches"

@param vignetting
@text Vignetting
@type note
@default "The radius of the vignette effect, smaller values produces a smaller vignette"

@param vignettingAlpha
@text Vignetting Alpha
@type note
@default "Amount of opacity of vignette"

@param vignettingBlur
@text Vignetting Blur
@type note
@default "Blur intensity of the vignette"

*/
}

/* ------------------------- OLD FILM COMMAND FLAGS ------------------------- */
{
/*~struct~oldFilmCommandFlagsSt:

@param isEnabled
@text Enabled
@type boolean
@default true

@param sepia
@text Sepia
@type boolean
@default true

@param noise
@text Noise
@type boolean
@default true

@param noiseSize
@text Noise Size
@type boolean
@default true

@param autoSeed
@text Random Seed
@type boolean
@default true

@param seed
@text Noise Seed
@type boolean
@default true

@param scratch
@text Scratch
@type boolean
@default true

@param scratchDensity
@text Scratch Density
@type boolean
@default true

@param scratchWidth
@text Scratch Width
@type boolean
@default true

@param vignetting
@text Vignetting
@type boolean
@default true

@param vignettingAlpha
@text Vignetting Alpha
@type boolean
@default true

@param vignettingBlur
@text Vignetting Blur
@type boolean
@default true

*/
}

/* ----------------------------------- CRT ---------------------------------- */
{

/*~struct~crtSt:

@param commandNames
@text Command Names
@type struct<crtCommandNamesSt>
@desc The names of the command inside the window.
@default

@param commandHelps
@text Help Texts
@type struct<crtCommandHelpSt>
@desc Help text for each command.
@default

@param commandFlags
@text Command Flags
@type struct<crtCommandFlagsSt>
@desc Choose what commands you want to show/hide.
@default

*/
    
}

/* ---------------------------- CRT COMMAND NAMES --------------------------- */
{
/*~struct~crtCommandNamesSt:

@param isEnabled
@text Enabled
@type text
@default Enabled

@param curvature
@text Curvature
@type text
@default Curvature

@param lineWidth
@text Line Width
@type text
@default Line Width

@param lineContrast
@text Line Contrast
@type text
@default Line Contrast

@param verticalLine
@text Line Orientation
@type text
@default Line Orientation

@param noise
@text Noise
@type text
@default Noise

@param noiseSize
@text Noise Size
@type text
@default Noise Size

@param autoSeed
@text Random Seed
@type text
@default Random Seed

@param seed
@text Noise Seed
@type text
@default Noise Seed

@param vignetting
@text Vignetting
@type text
@default Vignetting

@param vignettingAlpha
@text Vignetting Alpha
@type text
@default Vignetting Alpha

@param vignettingBlur
@text Vignetting Blur
@type text
@default Vignetting Blur

@param time
@text Time
@type text
@default Time

*/
}

/* -------------------------------- CRT HELP -------------------------------- */
{
/*~struct~crtCommandHelpSt:

@param isEnabled
@text Enabled
@type note
@default "Enable or disable this filter."

@param curvature
@text Curvature
@type note
@default "Bent of interlaced lines, higher value means more bend"

@param lineWidth
@text Line Width
@type note
@default "Width of the interlaced lines"

@param lineContrast
@text Line Contrast
@type note
@default "Contrast of interlaced lines"

@param verticalLine
@text Line Orientation
@type note
@default "Vertical or horizontal lines"

@param noise
@text Noise
@type note
@default "Opacity/intensity of the noise effect between 0 and 1"

@param noiseSize
@text Noise Size
@type note
@default "The size of the noise particles"

@param autoSeed
@text Random Seed
@type note
@default "If true, the seed will keep changing randomly"

@param seed
@text Noise Seed
@type note
@default "A seed value to apply to the random noise generation"

@param vignetting
@text Vignetting
@type note
@default "The radius of the vignette effect, smaller values produces a smaller vignette"

@param vignettingAlpha
@text Vignetting Alpha
@type note
@default "Amount of opacity of vignette"

@param vignettingBlur
@text Vignetting Blur
@type note
@default "Blur intensity of the vignette"

@param time
@text Time
@type note
@default "For animating interlaced lines"

*/
}

/* ---------------------------- CRT COMMAND FLAGS --------------------------- */
{
/*~struct~crtCommandFlagsSt:

@param isEnabled
@text Enabled
@type boolean
@default true

@param curvature
@text Curvature
@type boolean
@default true

@param lineWidth
@text Line Width
@type boolean
@default true

@param lineContrast
@text Line Contrast
@type boolean
@default true

@param verticalLine
@text Line Orientation
@type boolean
@default true

@param noise
@text Noise
@type boolean
@default true

@param noiseSize
@text Noise Size
@type boolean
@default true

@param autoSeed
@text Random Seed
@type boolean
@default true

@param seed
@text Noise Seed
@type boolean
@default true

@param vignetting
@text Vignetting
@type boolean
@default true

@param vignettingAlpha
@text Vignetting Alpha
@type boolean
@default true

@param vignettingBlur
@text Vignetting Blur
@type boolean
@default true

@param time
@text Time
@type boolean
@default true

*/
}

/* --------------------------------- GLITCH --------------------------------- */
{

/*~struct~glitchSt:

@param commandNames
@text Command Names
@type struct<glitchCommandNamesSt>
@desc The names of the command inside the window.
@default

@param commandHelps
@text Help Texts
@type struct<glitchCommandHelpSt>
@desc Help text for each command.
@default

@param commandFlags
@text Command Flags
@type struct<glitchCommandFlagsSt>
@desc Choose what commands you want to show/hide.
@default

*/
    
}

/* -------------------------- GLITCH COMMAND NAMES -------------------------- */
{
/*~struct~glitchCommandNamesSt:

@param isEnabled
@text Enabled
@type text
@default Enabled

@param toggleTime
@text Toggle Time
@type text
@default Toggle Time

@param toggleRefresh
@text Toggle Shuffle
@type text
@default Toggle Shuffle

@param slices
@text Slices
@type text
@default Slices

@param offset
@text Offset
@type text
@default Offset

@param offsetShakePower
@text Offset Shake
@type text
@default Offset Shake

@param direction
@text Direction
@type text
@default Direction

@param fillMode
@text Fill Mode
@type text
@default Fill Mode

@param autoSeed
@text Random Seed
@type text
@default Random Seed

@param seed
@text Seed
@type text
@default Seed

@param average
@text Average
@type text
@default Average

@param minSize
@text Minimum Size
@type text
@default Minimum Size

@param sampleSize
@text Sample Size
@type text
@default Sample Size

@param redX
@text Red X
@type text
@default Red X

@param redY
@text Red Y
@type text
@default Red Y

@param greenX
@text Green X
@type text
@default Green X

@param greenY
@text Green Y
@type text
@default Green Y

@param blueX
@text Blue X
@type text
@default Blue X

@param blueY
@text Blue Y
@type text
@default Blue Y

*/
}

/* ------------------------------- GLITCH HELP ------------------------------ */
{
/*~struct~glitchCommandHelpSt:

@param isEnabled
@text Enabled
@type note
@default "Enable or disable this filter."

@param toggleTime
@text Toggle Time
@type note
@default "If higher than zero, it will enable/disable the glitch on this time interval(frames)"

@param toggleRefresh
@text Toggle Shuffle
@type note
@default "If this is true, when the toggle time enable/disables the filter, it will always enable the filter again\nwith different settings."

@param slices
@text Slices
@type note
@default "The maximum number of slices."

@param offset
@text Offset
@type note
@default "The maximum offset amount of slices"

@param offsetShakePower
@text Offset Shake
@type note
@default "If higher than zero, will produce a shake effect"

@param direction
@text Direction
@type note
@default "The angle in degree of the offset of slices"

@param fillMode
@text Fill Mode
@type note
@default "The fill mode of the space after the offset. Acceptable values:\nTransparent, Original, Loop, Clamp, Mirror"

@param autoSeed
@text Random Seed
@type note
@default "If true, the seed will keep changing randomly"

@param seed
@text Seed
@type note
@default "A seed value to apply to the random noise generation"

@param average
@text Average
@type note
@default "True will divide the bands roughly based on equal amounts where as setting to false will vary the band\nsizes dramatically (more random looking)."

@param minSize
@text Minimum Size
@type note
@default "Minimum size of individual slice. Segment of total sampleSize"

@param sampleSize
@text Sample Size
@type note
@default "The resolution of the displacement map texture"

@param redX
@text Red X
@type note
@default "Red channel offset X"

@param redY
@text Red Y
@type note
@default "Red channel offset Y"

@param greenX
@text Green X
@type note
@default "Green channel offset X"

@param greenY
@text Green Y
@type note
@default "Green channel offset Y"

@param blueX
@text Blue X
@type note
@default "Blue channel offset X"

@param blueY
@text Blue Y
@type note
@default "Blue channel offset Y"

*/
}

/* -------------------------- GLITCH COMMAND FLAGS -------------------------- */
{
/*~struct~glitchCommandFlagsSt:

@param isEnabled
@text Enabled
@type boolean
@default true

@param toggleTime
@text Toggle Time
@type boolean
@default true

@param toggleRefresh
@text Toggle Shuffle
@type boolean
@default true

@param slices
@text Slices
@type boolean
@default true

@param offset
@text Offset
@type boolean
@default true

@param offsetShakePower
@text Offset Shake
@type boolean
@default true

@param direction
@text Direction
@type boolean
@default true

@param fillMode
@text Fill Mode
@type boolean
@default true

@param autoSeed
@text Random Seed
@type boolean
@default true

@param seed
@text Seed
@type boolean
@default true

@param average
@text Average
@type boolean
@default true

@param minSize
@text Minimum Size
@type boolean
@default true

@param sampleSize
@text Sample Size
@type boolean
@default true

@param redX
@text Red X
@type boolean
@default true

@param redY
@text Red Y
@type boolean
@default true

@param greenX
@text Green X
@type boolean
@default true

@param greenY
@text Green Y
@type boolean
@default true

@param blueX
@text Blue X
@type boolean
@default true

@param blueY
@text Blue Y
@type boolean
@default true

*/
}

/* ----------------------------- CATEGORY WINDOW ---------------------------- */
{

/*~struct~categoryWinSt:

@param commandNames
@text Command Names
@type struct<categoryWinCommandNamesSt>
@desc The command names.
@default

@param commandHelps
@text Help Texts
@type struct<categoryWinCommandHelpsSt>
@desc Help text for each command.
@default

*/
    
}

/* ----------------------- CATEGORY WIN COMMAND NAMES ----------------------- */
{
/*~struct~categoryWinCommandNamesSt:

@param target
@text Target
@type text
@default Targets

@param oldFilm
@text Old Film
@type text
@default Old Film

@param crt
@text Crt
@type text
@default CRT

@param glitch
@text Glitch
@type text
@default Glitch

@param quit
@text Quit
@type text
@default Quit

*/

}

/* ----------------------- CATEGORY WIN COMMAND HELPS ----------------------- */
{
/*~struct~categoryWinCommandHelpsSt:

@param target
@text Target
@type note
@default "The Sprites you will apply the current filter."

@param oldFilm
@text Old Film
@type note
@default "The OldFilmFilter applies a Old film effect to an object."

@param crt
@text Crt
@type note
@default "The CRTFilter applies a CRT effect to an object."

@param glitch
@text Glitch
@type note
@default "The GlitchFilter applies a glitch effect to an object."

@param quit
@text Quit
@type note
@default "Quit the Horror Filter Editor."

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_HorrorFilter = true

{

let Main_Window_Command = Window_Command
let Main_Window_HorzCommand = Window_HorzCommand

Main_Window_Command = class Window_Command_MV extends Window_Command{

    initialize(rect){
        this.customWindowWidth = rect.width
        this.customWindowHeight = rect.height
        this.isInitializing = true
        super.initialize(rect.x, rect.y)
        this.isInitializing = false
    }

    setHandler(symbol, method){
        if(!this._handlers) this._handlers = {}
        super.setHandler(symbol, method)
    }

    windowHeight(){
        return this.customWindowHeight || super.windowHeight()
    }

    windowWidth(){
        return this.customWindowWidth || super.windowWidth()
    }

    itemLineRect(index){
        return this.itemRectForText(index)
    }

    _updateCursor() {
        super._updateCursor()
        this._windowCursorSprite.visible = this.isOpenAndActive()
    }

}

Main_Window_HorzCommand = class Window_HorzCommand_MV extends Main_Window_Command{}

Scene_Base.prototype.calcWindowHeight = function(lines){
    return Window_Base.prototype.fittingHeight(lines)
}

Sprite.prototype.getFilters = function(){
    return this._filters
}

Sprite.prototype.createFilterArrayIfNeed = function(){
    if(!this.getFilters()){
        this._filters = []
    }
}



/* ========================================================================== */
/*                                  CATEGORY                                  */
/* ========================================================================== */

class WindowHorror_FilterCategory extends Main_Window_HorzCommand{

    helpTexts(){
        return Plugin.param().categoryWindow.command.helps
    }

    drawItem(index){
        this.currentAlign = "center"
        super.drawItem(index)
    }

    makeCommandList(){
        const names = Plugin.param().categoryWindow.command.names
        this.addCommand(names.oldFilm,  "oldFilm",  true, 2)
        this.addCommand(names.crt,      "crt",      true, 3)
        this.addCommand(names.glitch,   "glitch",   true, 4)
        this.addCommand(names.quit,     "quit",     true, 7)
        this._list.sort((a, b) => a.ext - b.ext)
        this.setCommandHandlers()
    }

    setCommandHandlers(){
        this.setHandler("oldFilm",  this.handlerOldFilm.bind(this))
        this.setHandler("crt",      this.handlerCRT.bind(this))
        this.setHandler("glitch",   this.handlerGlitch.bind(this))
        this.setHandler("quit",     this.handlerQuit.bind(this))
    }

    handlerTarget(){
        this.deactivate()
        Plugin.getScene().horrorWindows.target.activate()
    }

    handlerOldFilm(){
        this.deactivate()
        Plugin.getScene().horrorWindows.oldFilm.activate()
    }

    handlerCRT(){
        this.deactivate()
        Plugin.getScene().horrorWindows.crt.activate()
    }

    handlerGlitch(){
        this.deactivate()
        Plugin.getScene().horrorWindows.glitch.activate()
    }

    handlerQuit(){
        this.deactivate()
        Plugin.getScene().terminateHorrorFilterManager()
    }

    select(index){
        super.select(index)
        const symbol = this.currentSymbol()

        if(symbol && SceneManager._scene.isReadyToSelect){

            if(this[`select_${symbol}`]){
                this[`select_${symbol}`]()
            }else{
                this.hideUnselectedWindows(null)
            }
        }
    }

    getSceneWindows(){
        return [
            Plugin.getScene().horrorWindows.target,
            Plugin.getScene().horrorWindows.oldFilm,
            Plugin.getScene().horrorWindows.crt,
            Plugin.getScene().horrorWindows.glitch,
        ]
    }

    hideUnselectedWindows(selectedWin){
        const windows = this.getSceneWindows()

        for(const win of windows){
            win.visible = win === selectedWin
        }
    }

    select_target(){
        this.hideUnselectedWindows(Plugin.getScene().horrorWindows.target)
    }

    select_oldFilm(){
        this.hideUnselectedWindows(Plugin.getScene().horrorWindows.oldFilm)
        Plugin.getScene().horrorWindows.oldFilm.refresh()
    }

    select_crt(){
        this.hideUnselectedWindows(Plugin.getScene().horrorWindows.crt)
        Plugin.getScene().horrorWindows.crt.refresh()
    }

    select_glitch(){
        this.hideUnselectedWindows(Plugin.getScene().horrorWindows.glitch)
        Plugin.getScene().horrorWindows.glitch.refresh()
    }

    updateHelp(){
        super.updateHelp()
        const symbol = this.currentSymbol()
        
        if(symbol){
            const text = this.helpTexts()[symbol]
            this._helpWindow.setText(text)
        }
    }
}

class WindowHorror_FilterCategory_Title extends WindowHorror_FilterCategory{

    maxCols(){
        return 5
    }

    makeCommandList(){
        const names = Plugin.param().categoryWindow.command.names
        this.addCommand(names.target, "target", true, 1)
        super.makeCommandList()
    }

    setCommandHandlers(){
        this.setHandler("target",   this.handlerTarget.bind(this))
        super.setCommandHandlers()
    }

}

class WindowHorror_FilterCategory_Map extends WindowHorror_FilterCategory{

    maxCols(){
        return 7
    }

    makeCommandList(){
        const names = Plugin.param().categoryWindow.command.names
        this.addCommand(names.target,   "target", true, 1)
        this.addCommand(names.copy,     "copy", true, 5)
        this.addCommand(names.paste,    "paste", true, 6)
        super.makeCommandList()
    }

    setCommandHandlers(){
        super.setCommandHandlers()
        this.setHandler("target",   this.handlerTarget.bind(this))
        this.setHandler("copy",     this.handlerCopy.bind(this))
        this.setHandler("paste",    this.handlerPaste.bind(this))
    }

    handlerCopy(){
        const oldFilm = Plugin.param().oldFilm.options
        const crt = Plugin.param().crt.options
        const glitch = Plugin.param().glitch.options

        const filterOptions = {
            oldFilm: oldFilm.isEnabled ? {...oldFilm} : null,
            crt: crt.isEnabled ? {...crt} : null,
            glitch: glitch.isEnabled ? {...glitch} : null,
        }

        const clipBoard = nw.Clipboard.get()
        clipBoard.set(JSON.stringify(filterOptions), 'text')
        this.activate()
    }

    handlerPaste(){
        const clipBoard = nw.Clipboard.get()
        const rawData = clipBoard.get()
        const index = rawData.indexOf("{")
        const validData = rawData.substring(index)
        let filterOptions = null

        try{
            filterOptions = JSON.parse(validData)

            if(filterOptions.oldFilm){
                Plugin.param().oldFilm.options = {...filterOptions.oldFilm}
            }else{
                Plugin.param().oldFilm.options.isEnabled = false
            }

            if(filterOptions.crt){
                Plugin.param().crt.options = {...filterOptions.crt}
            }else{
                Plugin.param().crt.options.isEnabled = false
            }

            if(filterOptions.glitch){
                Plugin.param().glitch.options = {...filterOptions.glitch}
            }else{
                Plugin.param().glitch.options.isEnabled = false
            }

        }catch(e){
            alert(`The content tried to paste is not a valid format for the Horror Filter Setting.
Please, make sure you are copying the comment as a text!`)
        }

        this.activate()
    }

}

class WindowHorror_FilterCategory_Options extends WindowHorror_FilterCategory{

    maxCols(){
        return 4
    }

    handlerQuit(){
        this.deactivate()
        Plugin.getScene().terminateHorrorFilterManager()

        if(Plugin.param().screenFilter.fadeOutAll){
            Plugin.getScene().fadeOutAll()
        }

        if(Plugin.savedBgm){
            setTimeout(() => {
                AudioManager.replayBgm(Plugin.savedBgm)
            }, 500)
        }
        
        SceneManager.pop()
    }
}

/* ========================================================================== */
/*                                   TARGETS                                  */
/* ========================================================================== */

class WindowHorror_FilterTargets extends Main_Window_Command{

    initialize(rect, targets){
        this.initProps(targets)
        super.initialize(rect)
        this.deactivate()
        this.hide()
        this.setHandler("ok", this.applyPermanentFilter.bind(this))
        this.setHandler("cancel", this.activateCategoryWindow.bind(this))
    }

    initProps(targets){
        this.currentTargetSprite = new Sprite()
        this.targets = targets
        this._selectionHandlers = {}
    }

    activateCategoryWindow(){
        Plugin.getScene().horrorWindows.category.activate()
    }

    makeCommandList(){
        for(const target of this.targets){
            const {sprite, name, symbol} = target
            this.addCommand(name, symbol)
            this.setSelectionHandler(symbol, this.onTargetSelection.bind(this))
        }
    }

    onTargetSelection(){
        const currentSymbol = this.currentSymbol()
        for(const target of this.targets){
            const sprite = target.sprite

            if(sprite.getFilters()){
                this.removeTempFilterFromSprite(sprite)
            }

            if(target.symbol === currentSymbol){
                this.addTempFiltersToSprite(sprite)
                this.currentTargetSprite = sprite
            }
        }
    }

    setSelectionHandler(symbol, method){
        this._selectionHandlers[symbol] = method
    }

    update(){
        this.cursorVisible = this.active
        super.update()
    }

    select(index){
        super.select(index)
        const symbol = this.currentSymbol()

        if(symbol && this._selectionHandlers[symbol]){
            this._selectionHandlers[symbol]()
        }
    }

    removeTempFilterFromSprite(sprite){
        sprite.createFilterArrayIfNeed()
 
        const oldFilmIndex = sprite.getFilters().indexOf(Plugin.param().oldFilm.filter)
        if(oldFilmIndex > -1){
            sprite.getFilters().splice(oldFilmIndex, 1)
        }
        
        const crtIndex = sprite.getFilters().indexOf(Plugin.param().crt.filter)
        if(crtIndex > -1){
            sprite.getFilters().splice(crtIndex, 1)
        }

        const glitchIndex = sprite.getFilters().indexOf(Plugin.param().glitch.filter)
        if(glitchIndex > -1){
            sprite.getFilters().splice(glitchIndex, 1)
        }
    }

    addTempFiltersToSprite(sprite){
        sprite.createFilterArrayIfNeed()
        sprite.getFilters().push(Plugin.param().oldFilm.filter)
        sprite.getFilters().push(Plugin.param().crt.filter)
        sprite.getFilters().push(Plugin.param().glitch.filter)
    }

    addHorrorFilterToSprite(sprite){
        sprite.addHorrorFilter("oldFilm", Plugin.createOldFilmFilter(), Plugin.param().oldFilm.options)
        sprite.addHorrorFilter("crt", Plugin.createCRTFilter(), Plugin.param().crt.options)
        sprite.addHorrorFilter("glitch", Plugin.createGlitchFilter(), Plugin.param().glitch.options)
        sprite.hasHorrorFilterMenu = true
    }

    removeHorrorFilterFromSprite(sprite){
        Plugin.removeHorrorFilter([sprite], "All")
        sprite.hasHorrorFilterMenu = false
    }

    applyPermanentFilter(){
        this.activate()

        if(this.currentTargetSprite.hasHorrorFilterMenu){
            this.removeHorrorFilterFromSprite(this.currentTargetSprite)

        }else{
            this.addHorrorFilterToSprite(this.currentTargetSprite)
        }
    }

}

class WindowHorror_FilterTargets_Title extends WindowHorror_FilterTargets{

    makeCommandList(){
        for(const target of this.targets){
            const {sprite, name, symbol} = target
            this.addCommand(name, symbol)
            this.setSelectionHandler(symbol, this.onTargetSelection.bind(this))

            const oldFilmOptions = Plugin.titleFilterOptions[symbol].oldFilm
            const crtOptions = Plugin.titleFilterOptions[symbol].crt
            const glitchOptions = Plugin.titleFilterOptions[symbol].glitch
  
            sprite.addHorrorFilter("oldFilm", Plugin.createOldFilmFilter(), oldFilmOptions)
            sprite.addHorrorFilter("crt", Plugin.createCRTFilter(), crtOptions)
            sprite.addHorrorFilter("glitch", Plugin.createGlitchFilter(), glitchOptions)
        }
    }

    onTargetSelection(){
        const currentSymbol = this.currentSymbol()

        for(const target of this.targets){

            if(target.symbol === currentSymbol){
                target.sprite.alpha = 1
                this.currentTargetSprite = target.sprite

            }else{
                target.sprite.alpha = 0
            }
        }
    }

    applyPermanentFilter(){
        this.activate()
    }

}

class WindowHorror_FilterTargets_Options extends WindowHorror_FilterTargets{

    makeCommandList(){
        for(const target of this.targets){
            const {sprite, name, symbol} = target
            this.addCommand(name, symbol)
            this.setSelectionHandler(symbol, this.onTargetSelection.bind(this))

            const oldFilmOptions = ConfigManager.horrorFilters.oldFilm
            const crtOptions = ConfigManager.horrorFilters.crt
            const glitchOptions = ConfigManager.horrorFilters.glitch
  
            sprite.addHorrorFilter("oldFilm", Plugin.createOldFilmFilter(), oldFilmOptions)
            sprite.addHorrorFilter("crt", Plugin.createCRTFilter(), crtOptions)
            sprite.addHorrorFilter("glitch", Plugin.createGlitchFilter(), glitchOptions)
        }
    }

    onTargetSelection(){}

    applyPermanentFilter(){
        this.activate()
    }

}

/* ========================================================================== */
/*                                  SETTINGS                                  */
/* ========================================================================== */

class WindowHorror_FilterSettings extends Main_Window_Command{

    initialize(rect){
        super.initialize(rect)
        this.initPlus()
    }

    initPlus(){
        this.deactivate()
        this.hide()
        this.setHandler("cancel", this.activateCategoryWindow.bind(this))
    }

    initCommandValues(){
        this.commandValues = {}
    }

    activateCategoryWindow(){
        Plugin.getScene().horrorWindows.category.activate()
    }

    getFilterOptions(){
        return {}
    }

    getFilterParameters(){
        return {}
    }

    getFilterHelp(){
        return this.getFilterParameters().command.helps
    }

    resetFontSettings() {
        super.resetFontSettings()
        this.contents.fontSize -= 4
    }

    drawItem(index) {
        const rect = this.itemLineRect(index)
        const name = this.commandName(index)
        const nameWidth = this.getNameWidth()
        const value = this.valueText(index)
        const statusWidth = this.getStatusWidth()
        const statusX = rect.width - statusWidth
        const enabled = index === 0 ? true : this.isCommandEnabled(index)

        this.resetTextColor()
        this.changePaintOpacity(enabled)
        this.drawText(name, rect.x, rect.y, nameWidth, "left")
        this.drawText(value, statusX, rect.y, statusWidth, "left")
    }

    getStatusWidth(){
        return this.statusWidth
    }

    getNameWidth(){
        return this.nameWidth
    }

    getAutoSeedIndex(){
        return this.autoSeedIndex
    }

    valueText(index) {
        const symbol = this.commandSymbol(index)
        const value = this.getCommandValue(symbol)

        return `${value}`
    }

    canChangeCommandValue(symbol, index){
        return  (this.getFilterOptions().isEnabled && 
                (this.isCommandEnabled(index) || symbol === "autoSeed")) || symbol === "isEnabled"
    }

    cursorRight(){
        const index = this.index()
        const symbol = this.commandSymbol(index)

        if(this.canChangeCommandValue(symbol, index)){
            this.changeValue(symbol, "right")

        }else{
            SoundManager.playBuzzer()
        }
    }
    
    cursorLeft(){
        const index = this.index()
        const symbol = this.commandSymbol(index)

        if(this.canChangeCommandValue(symbol, index)){
            this.changeValue(symbol, "left")

        }else{
            SoundManager.playBuzzer()
        }
    }

    changeValue(symbol, type) {
        const lastValue = this.getCommandValue(symbol)
        const value = this.getNewValue(symbol, type)

        if(lastValue !== value){
            this.redrawItem(this.findSymbol(symbol))
            SoundManager.playCursor()
        }
    }

    getIncrementValue(type){
        const power = this.getIncrementPower()
        const value = {
            left: -1 * power,
            right: 1 * power,
        }
        return value[type]
    }

    getIncrementPower(){
        const power = Input.isPressed("shift") ? 2 : 1
        return power
    }

    calcNewValue(symbol, value){
        return (this.getFilterOptions()[symbol]*10 + value) / 10
    }

    calcNewValueClamp(symbol, value){
        return ((this.getFilterOptions()[symbol]*10 + value)).clamp(0, 10) / 10
    }

    getNewValue(symbol, type){
        if(this[`change_${symbol}`]){
            return this[`change_${symbol}`](symbol, type)

        }else{
            return this.getCommandValue(symbol)
        }
    }

    getCommandValue(symbol){
        return this.commandValues[symbol]
    }

    update(){
        this.cursorVisible = this.active
        super.update()
    }

    updateHelp(){
        super.updateHelp()
        const symbol = this.currentSymbol()

        if(symbol){
            const text = this.getFilterHelp()[symbol]
            this._helpWindow.setText(text)
        }
    }

    refresh(){
        this.initCommandValues()
        super.refresh()
    }

    makeCommandList(){
        /*
            MV creates the contents on a different moment than MZ.
            And in that case it was causing an error here when using "getTextWidth".

        */
        if(this.isInitializing) return

        const isActive = this.getFilterOptions().isEnabled
        const commandSettings = this.getFilterParameters().command
        const names = commandSettings.names
        const flags = commandSettings.flags

        for(const key in names){

            if(flags[key]){
                const name = names[key]
                const symbol = key
                const width = this.getTextWidth(name)

                if(width > this.nameWidth){
                    this.nameWidth = width
                }

                this.addCommand(name, symbol, isActive)
            }
        }

        this.refreshSeedCommand()

        this.statusWidth = this.getTextWidth("Transparent")
    }

    refreshSeedCommand(){
        const index = this._list.findIndex(cmd => cmd.symbol === "seed")
        this.autoSeedIndex = 0

        if(index > -1){
            this.autoSeedIndex = index - 1
            this._list[index].enabled = !this.getFilterOptions().autoSeed && this.getFilterOptions().isEnabled
        }
    }

    setDefaultTextAlignment(){
        this.currentAlign = "left"
    }

    itemTextAlign(){
        return 'left'
    }

}

class WindowHorror_CommonFilterCommands extends WindowHorror_FilterSettings{

    change_isEnabled(symbol, type){
        const value = this.getIncrementValue(type)
        const oldValue = this.getFilterOptions().isEnabled
        const newValue = value > 0
        const autoSeedIndex = this.getAutoSeedIndex()
        const seedIndex = autoSeedIndex + 1
        
        this.getFilterOptions().isEnabled = newValue
        this.commandValues.isEnabled = {true: "True", false: "False"}[newValue]

        if(oldValue !== newValue){

            for(let i = 1; i < this._list.length; i++){
                
                if(i === autoSeedIndex){
                    this._list[i].enabled = this.getFilterOptions().isEnabled && this.getFilterOptions().autoSeed

                }else if(i === seedIndex){
                    this._list[i].enabled = this.getFilterOptions().isEnabled && !this.getFilterOptions().autoSeed

                }else{
                    this._list[i].enabled = this.getFilterOptions().isEnabled
                }

                this.redrawItem(i)
            }
        }
    }

    change_noise(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValueClamp(symbol, value)
        this.getFilterOptions().noise = newValue
        this.commandValues.noise = newValue.toFixed(1)
    }

    change_noiseSize(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValue(symbol, value)
        this.getFilterOptions().noiseSize = Math.max(0, newValue)
        this.commandValues.noiseSize = this.getFilterOptions().noiseSize.toFixed(1)
    }

    change_autoSeed(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = value > 0
        const autoSeedIndex = this.getAutoSeedIndex()
        const seedIndex = autoSeedIndex + 1

        this.getFilterOptions().autoSeed = newValue
        this.commandValues.autoSeed = {true: "True", false: "False"}[newValue]
        this._list[autoSeedIndex].enabled = this.getFilterOptions().autoSeed
        this._list[seedIndex].enabled = !this.getFilterOptions().autoSeed

        this.redrawItem(autoSeedIndex)
        this.redrawItem(seedIndex)
    }

    change_seed(type){
        this.getFilterOptions().seed = Math.random()
        this.commandValues.seed = this.getFilterOptions().seed.toFixed(4)
    }

    change_vignetting(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValueClamp(symbol, value)
        this.getFilterOptions().vignetting = Math.max(0, newValue)
        this.commandValues.vignetting = this.getFilterOptions().vignetting.toFixed(1)
    }

    change_vignettingAlpha(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValueClamp(symbol, value)
        this.getFilterOptions().vignettingAlpha = newValue
        this.commandValues.vignettingAlpha = newValue.toFixed(1)
    }

    change_vignettingBlur(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValueClamp(symbol, value)
        this.getFilterOptions().vignettingBlur = newValue
        this.commandValues.vignettingBlur = newValue.toFixed(1)
    }

}

/* ========================================================================== */
/*                                  OLD FILM                                  */
/* ========================================================================== */

class WindowHorror_OldFilm extends WindowHorror_CommonFilterCommands{

    initCommandValues(){
        const options = this.getFilterOptions()
        this.commandValues = {  
            isEnabled: {true:"True", false:"False"}[options.isEnabled],
            sepia:options.sepia.toFixed(1),
            noise: options.noise.toFixed(1),
            noiseSize: options.noiseSize.toFixed(1),
            scratch: options.scratch.toFixed(1),
            scratchDensity: options.scratchDensity.toFixed(1),
            scratchWidth: options.scratchWidth,
            vignetting: options.vignetting.toFixed(1),
            vignettingAlpha: options.vignettingAlpha.toFixed(1),
            vignettingBlur: options.vignettingBlur.toFixed(1),
            autoSeed: {true:"True", false:"False"}[options.autoSeed],
            seed: options.seed.toFixed(4),
        }
    }

    getFilterOptions(){
        return Plugin.param().oldFilm.options
    }

    getFilterParameters(){
        return Plugin.param().oldFilm
    }

    change_sepia(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValueClamp(symbol, value)
        this.getFilterOptions().sepia = newValue
        this.commandValues.sepia = newValue.toFixed(1)
    }

    change_scratch(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValueClamp(symbol, value)
        this.getFilterOptions().scratch = newValue
        this.commandValues.scratch = newValue.toFixed(1)
    }

    change_scratchDensity(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValue(symbol, value)
        this.getFilterOptions().scratchDensity = Math.max(0, newValue)
        this.commandValues.scratchDensity = this.getFilterOptions().scratchDensity.toFixed(1)
    }

    change_scratchWidth(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().scratchWidth + value
        this.getFilterOptions().scratchWidth = Math.max(0, newValue)
        this.commandValues.scratchWidth = this.getFilterOptions().scratchWidth
    }

}

class WindowHorror_OldFilm_Title extends WindowHorror_OldFilm{

    getFilterOptions(){
        return Plugin.getScene().horrorWindows.target.currentTargetSprite.horrorFilters.oldFilm.options
    }

}

class WindowHorror_OldFilm_Options extends WindowHorror_OldFilm{

    getFilterOptions(){
        return ConfigManager.horrorFilters.oldFilm
    }

}

/* ========================================================================== */
/*                                     CRT                                    */
/* ========================================================================== */

class WindowHorror_CRT extends WindowHorror_CommonFilterCommands{

    initCommandValues(){
        const options = this.getFilterOptions()
        this.commandValues = {  
            isEnabled: {true:"True", false:"False"}[options.isEnabled],
            curvature: options.curvature.toFixed(1),
            lineWidth: options.lineWidth.toFixed(1),
            lineContrast: options.lineContrast.toFixed(2),
            verticalLine: {true: "Vertical", false: "Horizontal"}[options.verticalLine],
            noise: options.noise.toFixed(1),
            noiseSize: options.noiseSize.toFixed(1),
            autoSeed: {true:"True", false:"False"}[options.autoSeed],
            seed: options.seed.toFixed(4),
            vignetting: options.vignetting.toFixed(1),
            vignettingAlpha: options.vignettingAlpha.toFixed(1),
            vignettingBlur: options.vignettingBlur.toFixed(1),
            time: options.time,
        }
    }

    getFilterOptions(){
        return Plugin.param().crt.options
    }

    getFilterParameters(){
        return Plugin.param().crt
    }

    change_curvature(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValue(symbol, value)
        this.getFilterOptions().curvature = newValue
        this.commandValues.curvature = newValue.toFixed(1)
    }

    change_lineWidth(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValue(symbol, value)
        this.getFilterOptions().lineWidth = newValue
        this.commandValues.lineWidth = newValue.toFixed(1)
    }

    change_lineContrast(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.calcNewValue(symbol, value)
        this.getFilterOptions().lineContrast = newValue
        this.commandValues.lineContrast = newValue.toFixed(1)
    }

    change_verticalLine(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = value > 0
        this.getFilterOptions().verticalLine = newValue
        this.commandValues.verticalLine = {true: "Vertical", false: "Horizontal"}[newValue]
    }

    change_time(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = (this.getFilterOptions().time * 10 + value).clamp(0, 200) / 10

        this.getFilterOptions().time = newValue
        this.commandValues.time = newValue
    }

}

class WindowHorror_CRT_Title extends WindowHorror_CRT{

    getFilterOptions(){
        return Plugin.getScene().horrorWindows.target.currentTargetSprite.horrorFilters.crt.options
    }

}

class WindowHorror_CRT_Options extends WindowHorror_CRT{

    getFilterOptions(){
        return ConfigManager.horrorFilters.crt
    }

}

/* ========================================================================== */
/*                                   GLITCH                                   */
/* ========================================================================== */

class WindowHorror_Glitch extends WindowHorror_CommonFilterCommands{

    initCommandValues(){
        const options = this.getFilterOptions()
        this.commandValues = {
            isEnabled: {true:"True", false:"False"}[options.isEnabled],
            toggleTime: options.toggleTime,
            toggleRefresh: {true: "Shuffle", false: "Static"}[options.toggleRefresh],
            slices: options.slices,
            offset: options.offset,
            offsetShakePower: options.offsetShakePower.toFixed(1),
            direction: options.direction,
            fillMode: ["Transparent", "Original", "Loop", "Clamp", "Mirror"][options.fillMode],
            autoSeed: {true:"True", false:"False"}[options.autoSeed],
            seed: options.seed.toFixed(4),
            average: {true: "True", false: "False"}[options.average],
            minSize: options.minSize,
            sampleSize: options.sampleSize,
            redX: options.redX,
            redY: options.redY,
            greenX: options.greenX,
            greenY: options.greenY,
            blueX: options.blueX,
            blueY: options.blueY,
        }
    }

    getFilterOptions(){
        return Plugin.param().glitch.options
    }

    getFilterParameters(){
        return Plugin.param().glitch
    }

    change_toggleTime(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().toggleTime + value
        this.getFilterOptions().toggleTime = Math.max(0, newValue)
        this.commandValues.toggleTime = this.getFilterOptions().toggleTime
    }

    change_toggleRefresh(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = value > 0
        this.getFilterOptions().toggleRefresh = newValue
        this.commandValues.toggleRefresh = {true: "Shuffle", false: "Static"}[newValue]
    }

    change_slices(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().slices + value
        this.getFilterOptions().slices = Math.max(0, newValue)
        this.commandValues.slices = this.getFilterOptions().slices
    }

    change_offset(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().offset + value
        this.getFilterOptions().offset = newValue
        this.commandValues.offset = newValue
    }

    change_offsetShakePower(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = Math.max(0, (this.getFilterOptions().offsetShakePower*10 + value) / 10)
        this.getFilterOptions().offsetShakePower = newValue
        this.commandValues.offsetShakePower = newValue.toFixed(1)
    }

    change_direction(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = (this.getFilterOptions().direction + value).clamp(0, 360)
        this.getFilterOptions().direction = newValue
        this.commandValues.direction = newValue
    }

    change_fillMode(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().fillMode + value
        this.getFilterOptions().fillMode = newValue.clamp(0, 4)
        this.commandValues.fillMode = ["Transparent", "Original", "Loop", "Clamp", "Mirror"][this.getFilterOptions().fillMode]
    }

    change_average(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = value > 0
        this.getFilterOptions().average = newValue
        this.commandValues.average = {true: "True", false: "False"}[newValue]
    }

    change_minSize(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().minSize + value
        this.getFilterOptions().minSize = newValue
        this.commandValues.minSize = newValue
    }

    change_sampleSize(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().sampleSize + value
        this.getFilterOptions().sampleSize = newValue
        this.commandValues.sampleSize = newValue
    }

    change_redX(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().redX + value
        this.getFilterOptions().redX = newValue
        this.commandValues.redX = newValue
    }

    change_redY(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().redY + value
        this.getFilterOptions().redY = newValue
        this.commandValues.redY = newValue
    }

    change_greenX(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().greenX + value
        this.getFilterOptions().greenX = newValue
        this.commandValues.greenX = newValue
    }

    change_greenY(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().greenY + value
        this.getFilterOptions().greenY = newValue
        this.commandValues.greenY = newValue
    }

    change_blueX(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().blueX + value
        this.getFilterOptions().blueX = newValue
        this.commandValues.blueX = newValue
    }

    change_blueY(symbol, type){
        const value = this.getIncrementValue(type)
        const newValue = this.getFilterOptions().blueY + value
        this.getFilterOptions().blueY = newValue
        this.commandValues.blueY = newValue
    }

}

class WindowHorror_Glitch_Title extends WindowHorror_Glitch{

    getFilterOptions(){
        return Plugin.getScene().horrorWindows.target.currentTargetSprite.horrorFilters.glitch.options
    }
}

class WindowHorror_Glitch_Options extends WindowHorror_Glitch{

    getFilterOptions(){
        return ConfigManager.horrorFilters.glitch
    }

}

/* ========================================================================== */
/*                                   OTHERS                                   */
/* ========================================================================== */

class WindowHorror_Layer extends WindowLayer{

    update(){
        for (const child of this.children) {
            if (child.update) {
                child.update()
            }
        }
    }
}

class WindowHorror_Help extends Window_Help{
    
    initialize(rect){
        super.initialize(2)
    }

}

class SpriteHorror_Background extends Sprite{}

class SceneHorror_ScreenFilter extends Scene_Base{

    create(){
        super.create()
        this.createBackground()     
        this.createWindowLayer()
    }

    createBackground(){
        const bitmap = ImageManager.loadSystem(Plugin.param().screenFilter.sceneBackground)
        this.background = new SpriteHorror_Background(bitmap)
        this.addChild(this.background)
    }

    start(){
        super.start()
        if(Plugin.param().screenFilter.sceneBgm){
            const bgm = {
                name: Plugin.param().screenFilter.sceneBgm,
                volume: AudioManager._bgmVolume,
                pitch: 100,
                pan: 0
            }
            AudioManager.playBgm(bgm)
        }
        
        this.startHorrorFilterManager()
    }

    createTargetsForHorrorFilter(){
        const background = {sprite: this.background, name: "Background", symbol: "background"}
    
        return [background]
    }

    update(){
        super.update()
        this.updateAllHorrorFilters()
    }

    terminate(){
        super.terminate()
        ConfigManager.save()
    }

}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

const FOLDER_NAME = "data/HorrorFilter"
const FILENAME = "filter"

Eli.HorrorFilter = {

    version: 5.01,
    url: 'https://hakuenstudio.itch.io/hakuen-studio-horror-filter-for-rpg-maker-mv-mz',
    alias: {},
    pro: true,
    parameters: {
        editorButton: '',
        screenButton: '',
        fixTitleAreaFilter: true,
        screenFilter: {
            optionCommandEnable: true,
            optionCommandName: '',
            optionCommandIndex: -1,
            fadeOutAll: true,
            sceneBgm: '',
            layer: '',
            sceneBackground: '',
            allMaps: true,
            allBattles: true,
        },
        oldFilm: {
            command:{
                names: {
                    isEnabled: "",
                    sepia: "",
                    noise: "",
                    noiseSize: "",
                    scratch: "",
                    scratchDensity: "",
                    scratchWidth: "",
                    vignetting: "",
                    vignettingAlpha: "",
                    vignettingBlur: "",
                    seed: "",
                    autoSeed: "",
                },
                helps: {
                    isEnabled: "",
                    sepia: "",
                    noise: "",
                    noiseSize: "",
                    scratch: "",
                    scratchDensity: "",
                    scratchWidth: "",
                    vignetting: "",
                    vignettingAlpha: "",
                    vignettingBlur: "",
                    seed: "",
                    autoSeed: "",
                },
                flags: {
                    isEnabled: true,
                    sepia: true,
                    noise: true,
                    noiseSize: true,
                    scratch: true,
                    scratchDensity: true,
                    scratchWidth: true,
                    vignetting: true,
                    vignettingAlpha: true,
                    vignettingBlur: true,
                    seed: true,
                    autoSeed: true,
                },
            },
            filter: new PIXI.filters.OldFilmFilter({}, 0),
            options: {
                isEnabled: true,
                sepia: 0.3,
                noise: 0.3,
                noiseSize: 1.0,
                seed: Math.random(),
                autoSeed: true,
                scratch: 0.5,
                scratchDensity: 0.3,
                scratchWidth: 1.0,
                vignetting: 0.3,
                vignettingAlpha: 1.0,
                vignettingBlur: 0.3,
            },
        },
        crt: {
            command: {
                names: {
                    isEnabled: "",
                    curvature: "",
                    lineWidth: "",
                    lineContrast: "",
                    verticalLine: "",
                    noise: "",
                    noiseSize: "",
                    seed: "",
                    autoSeed: "",
                    vignetting: "",
                    vignettingAlpha: "",
                    vignettingBlur: "",
                    time: "",
                },
                helps: {
                    isEnabled: "",
                    curvature: "",
                    lineWidth: "",
                    lineContrast: "",
                    verticalLine: "",
                    noise: "",
                    noiseSize: "",
                    seed: "",
                    autoSeed: "",
                    vignetting: "",
                    vignettingAlpha: "",
                    vignettingBlur: "",
                    time: "",
                },
                flags: {
                    isEnabled: true,
                    curvature: true,
                    lineWidth: true,
                    lineContrast: true,
                    verticalLine: true,
                    noise: true,
                    noiseSize: true,
                    seed: true,
                    autoSeed: true,
                    vignetting: true,
                    vignettingAlpha: true,
                    vignettingBlur: true,
                    time: true,
                },
            },
            filter: new PIXI.filters.CRTFilter({}),
            options: {
                isEnabled: true,
                curvature: 1.0,
                lineWidth: 6.0,
                lineContrast: 0.25,
                verticalLine: false,
                noise: 0,
                noiseSize: 1.0,
                seed: Math.random(),
                autoSeed: true,
                vignetting: 0.3,
                vignettingAlpha: 1.0,
                vignettingBlur: 0.3,
                time: 0.5,
            },
        },
        glitch: {
            command:{
                names: {
                    isEnabled: "",
                    toggleTime: "",
                    toggleRefresh: "",
                    slices: "",
                    offsetShakePower: "",
                    offset: "",
                    direction: "",
                    fillMode: "",
                    seed: "",
                    autoSeed: "",
                    average: "",
                    minSize: "",
                    sampleSize: "",
                    redX: "",
                    redY: "",
                    greenX: "",
                    greenY: "",
                    blueX: "",
                    blueY: "",
                },
                helps: {
                    isEnabled: "",
                    toggleTime: "",
                    toggleRefresh: "",
                    slices: "",
                    offsetShakePower: "",
                    offset: "",
                    direction: "",
                    fillMode: "",
                    seed: "",
                    autoSeed: "",
                    average: "",
                    minSize: "",
                    sampleSize: "",
                    redX: "",
                    redY: "",
                    greenX: "",
                    greenY: "",
                    blueX: "",
                    blueY: "",
                },
                flags: {
                    isEnabled: true,
                    toggleTime: true,
                    toggleRefresh: true,
                    slices: true,
                    offsetShakePower: true,
                    offset: true,
                    direction: true,
                    fillMode: true,
                    seed: true,
                    autoSeed: true,
                    average: true,
                    minSize: true,
                    sampleSize: true,
                    redX: true,
                    redY: true,
                    greenX: true,
                    greenY: true,
                    blueX: true,
                    blueY: true,
                },
            },
            filter: new PIXI.filters.GlitchFilter({}),
            options: {
                isEnabled: true,
                isEnabled2: true,
                toggleTime: 60,
                toggleRefresh: true,
                slices: 5,
                offsetShakePower: 0,
                offset: 100,
                direction: 0,
                fillMode: 0,
                seed: Math.random(),
                autoSeed: true,
                average: false,
                minSize: 8,
                sampleSize: 512,
                red: [0,0],
                green: [0,0],
                blue: [0,0],
                redX: 0,
                redY: 0,
                greenX: 0,
                greenY: 0,
                blueX: 0,
                blueY: 0,
            },
        },
        categoryWindow: {
            command:{
                names: {
                    target: "",
                    oldFilm: "",
                    crt: "",
                    glitch: "",
                    quit: "",
                    copy: "Copy",
                    paste: "Paste"
                },
                helps: {
                    target: "",
                    oldFilm: "",
                    crt: "",
                    glitch: "",
                    quit: "",
                    copy: "Copy the currently Filter settings to the clipboard.",
                    paste: "Paste the filter settings that are on the clipboard."
                }
            },
        },
    },
    titleFilterOptions: {
        title1: {
            oldFilm: {},
            crt: {},
            glitch: {},
        },
        title2: {
            oldFilm: {},
            crt: {},
            glitch: {},
        },
        gameTitle: {
            oldFilm: {},
            crt: {},
            glitch: {},
            rect: null,
        },
    },
    savedBgm: null,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.initExtraTitleFilterOptions()

        if(Utils.isNwjs() && Utils.isOptionValid("test")){
            this.createFilterDataFolder()
        }

        this.requestFilterOptionsFromJson()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_HorrorFilterPro")
        
        this.parameters.editorButton = parameters.editorButton
        this.parameters.screenButton = parameters.screenButton
        this.parameters.fixTitleAreaFilter = parameters.fixTitleAreaFilter === "true"
        this.parameters.screenFilter = this.parseScreenFilterParameters(parameters)
        this.parseFilterParameters(parameters, "oldFilm")
        this.parseFilterParameters(parameters, "crt")
        this.parseFilterParameters(parameters, "glitch")
        this.parseCategoryWindowParameters(parameters)
    },

    parseScreenFilterParameters(parameters){
        const screenFilter = JSON.parse(parameters.screenFilter)
        screenFilter.optionCommandEnable = screenFilter.optionCommandEnable === "true"
        screenFilter.optionCommandName = screenFilter.optionCommandName
        screenFilter.optionCommandIndex = Number(screenFilter.optionCommandIndex)
        screenFilter.fadeOutAll = screenFilter.fadeOutAll === "true"
        screenFilter.allMaps = screenFilter.allMaps === "true"
        screenFilter.allBattles = screenFilter.allBattles === "true"
        screenFilter.sceneBgm = screenFilter.sceneBgm
        screenFilter.layer = screenFilter.layer
        screenFilter.sceneBackground = screenFilter.sceneBackground

        return screenFilter
    },

    parseFilterParameters(parameters, filter){
        const rawParam = JSON.parse(parameters[filter])

        this.parameters[filter].command.names = JSON.parse(rawParam.commandNames)
        this.parameters[filter].command.helps = JSON.parse(rawParam.commandHelps)
        this.parameters[filter].command.flags = JSON.parse(rawParam.commandFlags)

        this.parseFilterCommandHelpsParameters(filter)
        this.parseFilterCommandFlagsParameters(filter)
    },

    parseFilterCommandHelpsParameters(filter){
        const helpTexts = this.parameters[filter].command.helps

        for(const key in helpTexts){
            helpTexts[key] = JSON.parse(helpTexts[key])
        }
    },

    parseFilterCommandFlagsParameters(filter){
        const flags = this.parameters[filter].command.flags

        for(const key in flags){
            flags[key] = flags[key] === "true"
        }
    },

    parseCategoryWindowParameters(parameters){
        const categoryWin = JSON.parse(parameters.categoryWindow)

        const cmd = JSON.parse(categoryWin.commandNames)
        for(const key in cmd){
            this.parameters.categoryWindow.command.names[key] = cmd[key]
        }

        const helps = JSON.parse(categoryWin.commandHelps)
        for(const key in helps){
            this.parameters.categoryWindow.command.helps[key] = JSON.parse(helps[key])
        }

    },

    initPluginCommands(){
        const commands = [
            "cmd_callScene",
            "cmd_addCharacterFilter", "cmd_removeCharacterFilter", 
            "cmd_addPictureFilter", "cmd_removePictureFilter",
            "cmd_addBattlerFilter", "cmd_removeBattlerFilter",
        ]
        Eli.PluginManager.registerCommands(this, commands)
    },

    cmd_callScene(args){
        if(this.param().screenFilter.sceneBgm){
            this.savedBgm = AudioManager.saveBgm()
        }

        if(this.param().screenFilter.fadeOutAll){
            SceneManager._scene.fadeOutAll()
        }
        
        SceneManager.push(SceneHorror_ScreenFilter)
    },

    cmd_addCharacterFilter(args){
        const targets = this.getCharacterTargets(args)
        Eli.PluginManager.currentInterpreter.horrorFilterTargets.push(...targets)
    },

    cmd_removeCharacterFilter(args){
        const targets = this.getCharacterTargets(args)

        if(targets.length > 0){
            this.removeHorrorFilter(targets, args.filter)
        }
    },

    cmd_addPictureFilter(args){
        const targets = this.getPictureTargets(args)
        Eli.PluginManager.currentInterpreter.horrorFilterTargets.push(...targets)
    },

    cmd_removePictureFilter(args){
        const targets = this.getPictureTargets(args)

        if(targets.length > 0){
            this.removeHorrorFilter(targets, args.filter)
        }
    },

    cmd_addBattlerFilter(args){
        const targets = this.getBattlerTargets(args)
        Eli.PluginManager.currentInterpreter.horrorFilterTargets.push(...targets)
    },

    cmd_removeBattlerFilter(args){
        const targets = this.getBattlerTargets(args)

        if(targets.length > 0){
            this.removeHorrorFilter(targets, args.filter)
        }
    },

    getCharacterTargets(args){
        const ids = Eli.PluginManager.createRangeOfNumbers(args.ids)
        const targets = ids.map(id => {
            const character = Eli.Utils.getMapCharacter(id)
            return character.getMapSprite()
        })

        return targets
    },

    getPictureTargets(args){
        const ids = Eli.PluginManager.createRangeOfNumbers(args.ids)
        const targets = ids.map(id => {
            const container = SceneManager._scene._spriteset._pictureContainer
            return container.children[id-1]
        })

        return targets
    },

    getBattlerTargets(args){
        const ids = Eli.PluginManager.createRangeOfNumbers(args.ids)

        if(args.target === "Actor"){
            return this.getActorTargets(args, ids)
        }else{
            return this.getEnemyTargets(args, ids)
        }
    },

    getActorTargets(args, ids){
        const sprites = SceneManager._scene._spriteset._actorSprites
        if(args.searchType === "Index"){
            return sprites.filter((battler, index) => {
                return ids.includes(index)
            })
        }else{
            return sprites.filter(battler => {
                return battler._actor && ids.includes(battler._actor.actorId())
            })
        }
    },

    getEnemyTargets(args, ids){
        const sprites = SceneManager._scene._spriteset._enemySprites
        if(args.searchType === "Index"){
            return sprites.filter((battler, index) => {
                return ids.includes(index)
            })

        }else{
            return sprites.filter(battler => {
                return ids.includes(battler._enemy.enemyId())
            })
        }
    },

    removeHorrorFilter(targets, filterToRemove){
        while(targets.length > 0){
            const target = targets.shift()
    
            if(filterToRemove === "All"){
                target.removeHorrorFilter("oldFilm")
                target.removeHorrorFilter("crt")
                target.removeHorrorFilter("glitch")
    
            }else{
                target.removeHorrorFilter(filterToRemove)
            }
    
        }
    },

    initExtraTitleFilterOptions(){
        if(Imported.Eli_PressStart){
            this.initPressStartTitleFilterOptions()
        }
    },

    initPressStartTitleFilterOptions(){
        this.titleFilterOptions.pressStart = this.createEmptyFilterOption()
    },

    createEmptyFilterOption(){
        return {
            oldFilm: {},
            crt: {},
            glitch: {},
        }
    },

    createAllFilters(){
        this.param().oldFilm.filter = this.createOldFilmFilter()
        this.param().crt.filter = this.createCRTFilter()
        this.param().glitch.filter = this.createGlitchFilter()
    },

    createOldFilmFilter(){
        const options = this.param().oldFilm.options
        const seed = this.param().oldFilm.options.seed
        const filter = new PIXI.filters.OldFilmFilter(options, seed)

        return filter
    },

    createCRTFilter(){
        const options = this.param().crt.options
        const filter = new PIXI.filters.CRTFilter(options)

        return filter
    },

    createGlitchFilter(){
        const options = this.param().glitch.options
        options.red[0] = options.redX
        options.red[1] = options.redY
        options.green[0] = options.greenX
        options.green[1] = options.greenY
        options.blue[0] = options.blueX
        options.blue[1] = options.blueY

        const filter = new PIXI.filters.GlitchFilter(options)

        return filter
    },

    createFilterDataFolder(){
        const fs = require("fs")
        
        if(!fs.existsSync(FOLDER_NAME)){
            fs.mkdirSync(FOLDER_NAME)
        }
    },

    requestFilterOptionsFromJson(){
        const xhr = new XMLHttpRequest()
        const url = `${FOLDER_NAME}/${FILENAME}.json`

        xhr.open("GET", url)
        xhr.overrideMimeType("application/json");
        xhr.onload = () => {
            if(xhr.status < 400){
                const data = JSON.parse(xhr.responseText)
                this.addExtraTitleFilters(data)
                this.titleFilterOptions = data

            }else{
                
            }
        }
        xhr.onerror = this.onRequestFilterError.bind(this)
        xhr.send()
    },

    addExtraTitleFilters(data){
        if(!data.hasOwnProperty("pressStart") && this.titleFilterOptions.hasOwnProperty("pressStart")){
            this.addPressStartTitleFilter(data)
        }
    },

    addPressStartTitleFilter(data){
        data.pressStart = {
            oldFilm: {...this.param().oldFilm.options},
            crt: {...this.param().crt.options},
            glitch: {...this.param().glitch.options},
        }
    },

    onRequestFilterError(){
        for(const key in this.titleFilterOptions){
            this.titleFilterOptions[key].oldFilm = this.param().oldFilm.options
            this.titleFilterOptions[key].crt = this.param().crt.options
            this.titleFilterOptions[key].glitch = this.param().glitch.options
        }

        this.titleFilterOptions.gameTitle.rect = null

        this.saveToJson(this.titleFilterOptions)
        console.log("filterError")
    },

    saveToJson(objectToSave){
        const fs = require('fs')
        const data = JSON.stringify(objectToSave)
        const filename = `${FOLDER_NAME}/${FILENAME}.json`

        fs.writeFile(filename, data, "utf8", (err) => {
            if(err){
                console.log("An error occured while writing JSON Object to File.")
                return console.log(err)
            }else{
                //console.log("DONE")
            }
        })
    },

    param(){
        return this.parameters
    },

    hideWindowsListener(event){
        if(event.key === Plugin.param().editorButton){
            Plugin.getScene()._windowLayer_horror.visible = !Plugin.getScene()._windowLayer_horror.visible
        }
    },

    callSceneListeners(event){
        const scene = SceneManager._scene
        if(!scene) return

        const sceneName = scene.constructor.name
        const isEditorButton = event.key === this.param().editorButton
        const isScreenButton = event.key === this.param().screenButton
        const isOnFilterManager = SceneManager._scene.filterManagerIsOn
        const canCallEditorScene = ["Scene_Map", "Scene_Battle", "Scene_Title"].includes(sceneName)
        
        if(isEditorButton && canCallEditorScene){

            if(isOnFilterManager){
                scene._windowLayer_horror.visible = !scene._windowLayer_horror.visible
            }else{
                scene.startHorrorFilterManager()
            }

        }else if(isScreenButton){
            const isOnScreenFilterScene = scene.constructor.name === "SceneHorror_ScreenFilter"

            if(isOnFilterManager && !isOnScreenFilterScene){
                //

            }else if(isOnScreenFilterScene){
                scene._windowLayer_horror.visible = !scene._windowLayer_horror.visible

            }else{
                this.cmd_callScene()
            }
        }

    },

    getScene(){
        return SceneManager._scene
    },

    previousSceneIsTitle(){
        return SceneManager._stack[0] && SceneManager._stack[0].name === "Scene_Title"
    },

    executeCommand_MV(args){
        const operation = args[0].toLowerCase()
        const targetType = args[1].toLowerCase()
        const mzArgs = {
            ids: args[2],
            target: {actor: "Actor", enemy: "Enemy"}[targetType],
            filter: args[3] || "All",
            searchType: {index: "Index", id: "Id"}[args[3]],
        }

        if(mzArgs.target === "Actor" || mzArgs.target === "Enemy"){
            mzArgs.filter = args[4] || "All"
        }

        const cmd = `${operation.toLowerCase()} ${targetType.toLowerCase()}`
        const method = {
            "add character": "cmd_addCharacterFilter",
            "add picture": "cmd_addPictureFilter",
            "add actor": "cmd_addBattlerFilter",
            "add enemy": "cmd_addBattlerFilter",
            "remove character": "cmd_removeCharacterFilter",
            "remove picture": "cmd_removePictureFilter",
            "remove actor": "cmd_removeBattlerFilter",
            "remove enemy": "cmd_removeBattlerFilter",
            "open scene": "cmd_callScene",
        }[cmd]

        if(this[method]){
            this[method](mzArgs)
        }
    },
    
}

const Plugin = Eli.HorrorFilter
const Alias = Eli.HorrorFilter.alias

Plugin.initialize()

/* ---------------------------------- INPUT --------------------------------- */
{

if(Utils.isNwjs() && Utils.isOptionValid("test")){

    Alias.Input_onKeyDown = Input._onKeyDown
    Input._onKeyDown = function(event) {
        Alias.Input_onKeyDown.call(this, event)
        Plugin.callSceneListeners(event)
    }

}

}

/* ------------------------------ WINDOW LAYER ------------------------------ */
{

Alias.WindowLayer_update = WindowLayer.prototype.update
WindowLayer.prototype.update = function() {
    if(!SceneManager._scene.filterManagerIsOn){
        Alias.WindowLayer_update.call(this)
    }
}

}

/* ----------------------------- CONFIG MANAGER ----------------------------- */
{

ConfigManager.horrorFilters = {
    oldFilm: {...Plugin.param().oldFilm.options},
    crt: {...Plugin.param().crt.options},
    glitch: {...Plugin.param().glitch.options},
}

Alias.ConfigManager_makeData = ConfigManager.makeData
ConfigManager.makeData = function() {
    const config = Alias.ConfigManager_makeData.call(this)
    config.horrorFilters = this.horrorFilters

    return config
}

Alias.ConfigManager_applyData = ConfigManager.applyData
ConfigManager.applyData = function(config) {
    Alias.ConfigManager_applyData.call(this, config)
    this.horrorFilters = this.readHorrorFilter(config)
}

ConfigManager.readHorrorFilter = function(config) {
    const filters = config.horrorFilters

    if(!filters){
        return {
            oldFilm: {...Plugin.param().oldFilm.options},
            crt: {...Plugin.param().crt.options},
            glitch: {...Plugin.param().glitch.options},
        }
    }else{

        return filters
    }
}

}

/* ----------------------------- GAME CHARACTER ----------------------------- */
{

Alias.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers
Game_CharacterBase.prototype.initMembers = function(){
    Alias.Game_CharacterBase_initMembers.call(this)
    this.initHorrorFilters()
}

Game_CharacterBase.prototype.initHorrorFilters = function(){
    this.horrorFilters = {
        oldFilm: null,
        crt: null,
        glitch: null,
    }
}

Game_CharacterBase.prototype.setHorrorFilter = function(name, options){
    this.horrorFilters[name] = options
}

}

/* ------------------------------ GAME PICTURE ------------------------------ */
{

Alias.Game_Picture_initialize = Game_Picture.prototype.initialize
Game_Picture.prototype.initialize = function() {
    Alias.Game_Picture_initialize.call(this)
    this.initHorrorFilters()
}

Game_Picture.prototype.initHorrorFilters = function(){
    this.horrorFilters = {
        oldFilm: null,
        crt: null,
        glitch: null,
    }
}

Alias.Game_Picture_show = Game_Picture.prototype.show
Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
    Alias.Game_Picture_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode)
    this.initHorrorFilters()
}

Game_Picture.prototype.setHorrorFilter = function(name, options){
    this.horrorFilters[name] = options
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_clear = Game_Interpreter.prototype.clear
Game_Interpreter.prototype.clear = function() {
    Alias.Game_Interpreter_clear.call(this)
    this.horrorFilterTargets = []
}

Alias.Game_Interpreter_command108 = Game_Interpreter.prototype.command108
Game_Interpreter.prototype.command108 = function(params){
    const alias = Alias.Game_Interpreter_command108.call(this, params)

    if(this.horrorFilterTargets.length > 0){
        this.startAddHorrorFilter(params)
    }

    return alias
}

Game_Interpreter.prototype.startAddHorrorFilter = function(params = this._params){
    const filterOptions = JSON.parse(params[0])
    const {oldFilm, crt, glitch} = filterOptions

    while(this.horrorFilterTargets.length > 0){
        this.addHorrorFilter(oldFilm, crt, glitch)
    }
}

Game_Interpreter.prototype.addHorrorFilter = function(oldFilm, crt, glitch){
    const target = this.horrorFilterTargets.shift()

    if(oldFilm){
        target.addHorrorFilter("oldFilm", new PIXI.filters.OldFilmFilter({}, 0), oldFilm)
    }

    if(crt){
        target.addHorrorFilter("crt", new PIXI.filters.CRTFilter({}), crt)
    }

    if(glitch){
        target.addHorrorFilter("glitch", new PIXI.filters.GlitchFilter({}), glitch)
    }
    
}

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args){
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    if(command.toUpperCase() === "HORRORFILTER"){
        Plugin.executeCommand_MV(args)
    }
}

}

/* --------------------------------- SPRITE --------------------------------- */
{

Alias.Sprite_initialize = Sprite.prototype.initialize
Sprite.prototype.initialize = function(bitmap){
    Alias.Sprite_initialize.call(this, bitmap)
    this.initHorrorFilter()
}

Sprite.prototype.initHorrorFilter = function(){
    this.hasHorrorFilterMenu = false
    this.horrorFilters = {
        oldFilm: this.createEmptyHorrorFilterSettings(),
        crt: this.createEmptyHorrorFilterSettings(),
        glitch: this.createEmptyHorrorFilterSettings(),
    }
}

Sprite.prototype.createEmptyHorrorFilterSettings = function(){
    return {
        options: null,
        filter: null,
        update: () => {},
    }
}

Sprite.prototype.addHorrorFilter = function(name, filter, options){
    this.createFilterArrayIfNeed()

    if(!this.horrorFilters[name].filter){
        this.setHorrorFilter(name, filter, options)
    }
}

Sprite.prototype.setHorrorFilter = function(name, filter, options){
    this.horrorFilters[name].filter = filter

    if(this.isSpritesetType()){
        this.horrorFilters[name].options = options
    }else{
        this.horrorFilters[name].options = {...options}
    }
    
    this.horrorFilters[name].update = this[`updateHorrorFilter_${name}`].bind(this)
    this.getFilters().push(this.horrorFilters[name].filter)
}

Sprite.prototype.removeHorrorFilter = function(name){
    const index = this.getFilters().indexOf(this.horrorFilters[name].filter)

    if(index > -1){
        this.getFilters().splice(index, 1)
        this.horrorFilters[name] = this.createEmptyHorrorFilterSettings(Plugin.param()[name].options)
    }
}

Alias.Sprite_update = Sprite.prototype.update
Sprite.prototype.update = function(){
    Alias.Sprite_update.call(this)

    if(this.canUpdateHorrorFilters()){
        this.updateAllHorrorFilters()
    }
}

Sprite.prototype.canUpdateHorrorFilters = function(name){
    return true
}

Sprite.prototype.updateAllHorrorFilters = function(){
    const oldFilm = this.horrorFilters.oldFilm
    const crt = this.horrorFilters.crt
    const glitch = this.horrorFilters.glitch

    oldFilm.update(oldFilm.filter, oldFilm.options)
    crt.update(crt.filter, crt.options)
    glitch.update(glitch.filter, glitch.options)
}

Sprite.prototype.isSpritesetType = function(){
    const name = this.constructor.name
    return  this.isSpritesetBaseSprite || name === "Spriteset_Map" || 
            name === "Spriteset_Battle" || name === "SpriteHorror_Background"
}

Sprite.prototype.updateHorrorFilter_oldFilm = function(filter, options){
    filter.enabled = options.isEnabled
    filter.sepia = options.sepia
    filter.noise = options.noise 
    filter.noiseSize = options.noiseSize

    if(options.autoSeed){
        filter.seed = Math.random()
    }else{
        filter.seed = options.seed
    }

    filter.scratch = options.scratch
    filter.scratchDensity = options.scratchDensity
    filter.scratchWidth = options.scratchWidth
    filter.vignetting = options.vignetting
    filter.vignettingAlpha = options.vignettingAlpha
    filter.vignettingBlur = options.vignettingBlur
}

Sprite.prototype.updateHorrorFilter_crt = function(filter, options){
    filter.enabled = options.isEnabled
    filter.curvature = options.curvature
    filter.lineWidth = options.lineWidth 
    filter.lineContrast = options.lineContrast
    filter.verticalLine = options.verticalLine
    filter.noise = options.noise
    filter.noiseSize = options.noiseSize

    if(options.autoSeed){
        filter.seed = Math.random()
    }else{
        filter.seed = options.seed
    }
    
    filter.vignetting = options.vignetting
    filter.vignettingAlpha = options.vignettingAlpha
    filter.vignnetingBlur = options.vignnetingBlur
    filter.time += options.time
}

Sprite.prototype.updateHorrorFilter_glitch = function(filter, options){
    filter.enabled = options.isEnabled && options.isEnabled2
    filter.slices = options.slices
    filter.direction = options.direction
    filter.fillMode = options.fillMode
    filter.average = options.average
    filter.minSize = options.minSize
    filter.sampleSize = options.sampleSize
    filter.red = [options.redX, options.redY]
    filter.green = [options.greenX, options.greenY]
    filter.blue = [options.blueX, options.blueY]

    this.updateHorrorGlitchToggle(filter, options)
    this.updateHorrorGlitchOffset(filter, options)
    this.updateHorrorGlitchSeed(filter, options)
}

Sprite.prototype.updateHorrorGlitchToggle = function(filter, options){
    const time = options.toggleTime

    if(time > 0){
        const maxTime = time-1
        const currentTime = Graphics.frameCount % time

        if(currentTime >= maxTime){

            if(!options.isEnabled2 && options.toggleRefresh){
                filter.refresh()
            }
            
            options.isEnabled2 = !options.isEnabled2
        }
    }
}

Sprite.prototype.updateHorrorGlitchOffset = function(filter, options){
    if(options.offsetShakePower > 0){
        const power = 1 + options.offsetShakePower
        const value = filter.offset + 1
        const maxShake = options.offset + power
        const minShake = options.offset - power

        if(value >= maxShake){
            filter.offset = minShake
        }else{
            filter.offset = value
        }
        
    }else{
        filter.offset = options.offset 
    }
}

Sprite.prototype.updateHorrorGlitchSeed = function(filter, options){
    if(options.autoSeed){
        filter.seed = Math.random()
    }else{
        filter.seed = options.seed
    }
}

}

/* ----------------------------- SPRITE PICTURE ----------------------------- */
{

Sprite_Picture.prototype.canUpdateHorrorFilters = function(){
    return !!this.picture()
}

Alias.Sprite_Picture_setHorrorFilter = Sprite_Picture.prototype.setHorrorFilter
Sprite_Picture.prototype.setHorrorFilter = function(name, filter, options){
    Alias.Sprite_Picture_setHorrorFilter.call(this, name, filter, options)
    this.picture().setHorrorFilter(name, this.horrorFilters[name].options)
}

Alias.Sprite_Picture_removeHorrorFilter = Sprite_Picture.prototype.removeHorrorFilter
Sprite_Picture.prototype.removeHorrorFilter = function(name){
    Alias.Sprite_Picture_removeHorrorFilter.call(this, name)

    if(this.picture()){
        this.picture().horrorFilters[name] = null
    }
}

Alias.Sprite_Picture_onBitmapLoad = Sprite_Picture.prototype.onBitmapLoad
Sprite_Picture.prototype.onBitmapLoad = function(){
    Alias.Sprite_Picture_onBitmapLoad.call(this)
    this.refreshHorrorFilters()
}

Sprite_Picture.prototype.refreshHorrorFilters = function(){
    const {oldFilm, crt, glitch} = this.picture().horrorFilters

    if(this.canAddFilter("oldFilm")){
        this.addHorrorFilter("oldFilm", new PIXI.filters.OldFilmFilter({}, 0), oldFilm)
    }

    if(this.canAddFilter("crt")){
        this.addHorrorFilter("crt", new PIXI.filters.CRTFilter({}), crt)
    }

    if(this.canAddFilter("glitch")){
        this.addHorrorFilter("glitch", new PIXI.filters.GlitchFilter({}), glitch)
    }
}

Sprite_Picture.prototype.canAddFilter = function(name){
   return this.picture().horrorFilters[name] && !this.horrorFilters[name].filter
}

}

/* ---------------------------- SPRITE CHARACTER ---------------------------- */
{

Alias.Sprite_Character_setHorrorFilter = Sprite_Character.prototype.setHorrorFilter
Sprite_Character.prototype.setHorrorFilter = function(name, filter, options){
    Alias.Sprite_Character_setHorrorFilter.call(this, name, filter, options)
    this._character.setHorrorFilter(name, this.horrorFilters[name].options)
}

Alias.Sprite_Character_onTileBitmapLoad = Sprite_Character.prototype.onTileBitmapLoad
Sprite_Character.prototype.onTileBitmapLoad = function(){
    Alias.Sprite_Character_onTileBitmapLoad.call(this)
    this.refreshHorrorFilters()
}

Alias.Sprite_Character_onCharacterBitmapLoad = Sprite_Character.prototype.onCharacterBitmapLoad
Sprite_Character.prototype.onCharacterBitmapLoad = function(){
    Alias.Sprite_Character_onCharacterBitmapLoad.call(this)
    this.refreshHorrorFilters()
}

Alias.Sprite_Character_removeHorrorFilter = Sprite_Character.prototype.removeHorrorFilter
Sprite_Character.prototype.removeHorrorFilter = function(name){
    Alias.Sprite_Character_removeHorrorFilter.call(this, name)

    if(this._character){
        this._character.horrorFilters[name] = null
    }
}

Sprite_Character.prototype.refreshHorrorFilters = function(){
    const {oldFilm, crt, glitch} = this._character.horrorFilters

    if(this.canAddFilter("oldFilm")){
        this.addHorrorFilter("oldFilm", new PIXI.filters.OldFilmFilter({}, 0), oldFilm)
    }

    if(this.canAddFilter("crt")){
        this.addHorrorFilter("crt", new PIXI.filters.CRTFilter({}), crt)
    }

    if(this.canAddFilter("glitch")){
        this.addHorrorFilter("glitch", new PIXI.filters.GlitchFilter({}), glitch)
    }
}

Sprite_Character.prototype.canAddFilter = function(name){
   return this._character.horrorFilters[name] && !this.horrorFilters[name].filter
}

}

/* ----------------------------- SPRITESET BASE ----------------------------- */
{

Spriteset_Base.prototype.checkForHorrorFilter = function(){ 
    const layer = Plugin.param().screenFilter.layer
    
    if(layer === "Below Pictures"){
        this.refreshHorrorFilters(this._baseSprite)

    }else if(layer === "Above Pictures"){
        this.refreshHorrorFilters(this)
    }
}

Spriteset_Base.prototype.refreshHorrorFilters = function(sprite){
    const {oldFilm, crt, glitch} = ConfigManager.horrorFilters

    const OldFilmFilter = new PIXI.filters.OldFilmFilter(oldFilm, oldFilm.seed)
    sprite.addHorrorFilter("oldFilm", OldFilmFilter, oldFilm)
    
    const crtFilter = new PIXI.filters.CRTFilter(crt)
    sprite.addHorrorFilter("crt", crtFilter, crt)
    
    const glitchFilter = new PIXI.filters.GlitchFilter(glitch)
    sprite.addHorrorFilter("glitch", glitchFilter, glitch)
    
}

Alias.Spriteset_Base_createBaseSprite = Spriteset_Base.prototype.createBaseSprite
Spriteset_Base.prototype.createBaseSprite = function() {
    Alias.Spriteset_Base_createBaseSprite.call(this)
    this._baseSprite.isSpritesetBaseSprite = true
}

}

/* ------------------------------ SPRITESET MAP ----------------------------- */
{

Alias.Spriteset_Map_initialize = Spriteset_Map.prototype.initialize
Spriteset_Map.prototype.initialize = function(){
    Alias.Spriteset_Map_initialize.call(this)

    if(Plugin.param().screenFilter.allMaps || $dataMap.meta.hasOwnProperty("HorrorFilter")){
        this.checkForHorrorFilter()
    }
}

}

/* ---------------------------- SPRITESET BATTLE ---------------------------- */
{

Alias.Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize
Spriteset_Battle.prototype.initialize = function(){
    Alias.Spriteset_Battle_initialize.call(this)

    if(Plugin.param().screenFilter.allBattles){
        this.checkForHorrorFilter()
    }
    
}

}

/* ------------------------------- SCENE BASE ------------------------------- */
{

Alias.Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer
Scene_Base.prototype.createWindowLayer = function() {
    Alias.Scene_Base_createWindowLayer.call(this)
    this.createHorrorWindowLayer()
}

Scene_Base.prototype.createHorrorWindowLayer = function() {
    this._windowLayer_horror = new WindowHorror_Layer()
    const x = (Graphics.width - Graphics.boxWidth) / 2
    const y = (Graphics.height - Graphics.boxHeight) / 2
    const width = Graphics.boxWidth
    const height = Graphics.boxHeight

    this._windowLayer_horror.x = x
    this._windowLayer_horror.y = y
    this._windowLayer_horror.width = width
    this._windowLayer_horror.height = height
    this.addChild(this._windowLayer_horror)
}

Scene_Base.prototype.startHorrorFilterManager = function(){
    this._windowLayer.visible = false
    this.filterManagerIsOn = true
    this.createHorrorWindowLayer()
    this.createHorrorFilterWindows()
    this.isReadyToSelect = true
    this.horrorWindows.category.select(0)
}

Scene_Base.prototype.createHorrorFilterWindows = function(){
    this.horrorWindows = {}
    this.createHelpWindow_HorrorFilter()
    this.createCategoryWindow_HorrorFilter()
    this.createTargetWindow_HorrorFilter()
    this.createOldFilmWindow_HorrorFilter()
    this.createCRTWindow_HorrorFilter()
    this.createGlitchWindow_HorrorFilter()
}

Scene_Base.prototype.createHelpWindow_HorrorFilter = function(){
    const rect = this.createHelpWindowRect_HorrorFilter()
    this.horrorWindows.help = new WindowHorror_Help(rect)
    this.addHorrorWindow(this.horrorWindows.help)
}

Scene_Base.prototype.createHelpWindowRect_HorrorFilter = function(){
    const x = 0
    const y = 0
    const width = Graphics.boxWidth
    const height = this.calcWindowHeight(2)

    return new Rectangle(x, y, width, height)
}

Scene_Base.prototype.createCategoryWindow_HorrorFilter = function(){
    const rect = this.categoryWindowRect_HorrorFilter()
    const CategoryWindow = this.getHorrorCategoryWindow()

    this.horrorWindows.category = new CategoryWindow(rect)
    this.horrorWindows.category.setHelpWindow(this.horrorWindows.help)
    this.addHorrorWindow(this.horrorWindows.category)
}

Scene_Base.prototype.getHorrorCategoryWindow = function(){
    const sceneName = this.constructor.name
    const CategoryWindow = {
        "Scene_Title": WindowHorror_FilterCategory_Title,
        "Scene_Map": WindowHorror_FilterCategory_Map,
        "Scene_Battle": WindowHorror_FilterCategory_Map,
        "SceneHorror_ScreenFilter": WindowHorror_FilterCategory_Options,
    }

    return CategoryWindow[sceneName]
}

Scene_Base.prototype.categoryWindowRect_HorrorFilter = function(){
    const x = 0
    const y = this.calcWindowHeight(2)
    const width = Graphics.boxWidth
    const lines = 1
    const height = this.calcWindowHeight(lines, true)

    return new Rectangle(x, y, width, height)
}

Scene_Base.prototype.createTargetWindow_HorrorFilter = function(){
    const rect = this.createHorrorFilterWindowSettingsRect()
    const targets = this.createTargetsForHorrorFilter()
    const TargetWindow = this.getHorrorTargetWindow()

    this.horrorWindows.target = new TargetWindow(rect, targets)
    this.horrorWindows.target.setHelpWindow(this.horrorWindows.help)
    this.addHorrorWindow(this.horrorWindows.target)
}

Scene_Base.prototype.getHorrorTargetWindow = function(){
    const sceneName = this.constructor.name
    const TargetWindow = {
        "Scene_Title": WindowHorror_FilterTargets_Title,
        "Scene_Map": WindowHorror_FilterTargets,
        "Scene_Battle": WindowHorror_FilterTargets,
        "SceneHorror_ScreenFilter": WindowHorror_FilterTargets_Options,
    }

    return TargetWindow[sceneName]
}

Scene_Base.prototype.createTargetsForHorrorFilter = function(){
    return []
}

Scene_Base.prototype.createOldFilmWindow_HorrorFilter = function(){
    const rect = this.createHorrorFilterWindowSettingsRect()
    const OldFilmWindow = this.getHorrorOldFilmWindow()

    this.horrorWindows.oldFilm = new OldFilmWindow(rect)
    this.horrorWindows.oldFilm.setHelpWindow(this.horrorWindows.help)
    this.addHorrorWindow(this.horrorWindows.oldFilm)
}

Scene_Base.prototype.getHorrorOldFilmWindow = function(){
    const sceneName = this.constructor.name
    const OldFilmWindow = {
        "Scene_Title": WindowHorror_OldFilm_Title,
        "Scene_Map": WindowHorror_OldFilm,
        "Scene_Battle": WindowHorror_OldFilm,
        "SceneHorror_ScreenFilter": WindowHorror_OldFilm_Options,
    }

    return OldFilmWindow[sceneName]
}

Scene_Base.prototype.createCRTWindow_HorrorFilter = function(){
    const rect = this.createHorrorFilterWindowSettingsRect()
    const CrtWindow = this.getHorrorCRTWindow()

    this.horrorWindows.crt = new CrtWindow(rect)
    this.horrorWindows.crt.setHelpWindow(this.horrorWindows.help)
    this.addHorrorWindow(this.horrorWindows.crt)
}

Scene_Base.prototype.getHorrorCRTWindow = function(){
    const sceneName = this.constructor.name
    const CrtWindow = {
        "Scene_Title": WindowHorror_CRT_Title,
        "Scene_Map": WindowHorror_CRT,
        "Scene_Battle": WindowHorror_CRT,
        "SceneHorror_ScreenFilter": WindowHorror_CRT_Options,
    }

    return CrtWindow[sceneName]
}

Scene_Base.prototype.createGlitchWindow_HorrorFilter = function(){
    const rect = this.createHorrorFilterWindowSettingsRect()
    const GlitchWindow = this.getHorrorGlitchWindow()

    this.horrorWindows.glitch = new GlitchWindow(rect)
    this.horrorWindows.glitch.setHelpWindow(this.horrorWindows.help)
    this.addHorrorWindow(this.horrorWindows.glitch)
}

Scene_Base.prototype.getHorrorGlitchWindow = function(){
    const sceneName = this.constructor.name
    const GlitchWindow = {
        "Scene_Title": WindowHorror_Glitch_Title,
        "Scene_Map": WindowHorror_Glitch,
        "Scene_Battle": WindowHorror_Glitch,
        "SceneHorror_ScreenFilter": WindowHorror_Glitch_Options,
    }

    return GlitchWindow[sceneName]
}

Scene_Base.prototype.createHorrorFilterWindowSettingsRect = function(){
    const x = 0
    const y = this.horrorWindows.help.height + this.horrorWindows.category.height
    const width = 400
    const height = Graphics.boxHeight - y

    return new Rectangle(x, y, width, height)
}

Scene_Base.prototype.addHorrorWindow = function(win) {
    this._windowLayer_horror.addChild(win)
}

Scene_Base.prototype.terminateAllTargets_Horror = function() {
    for(const target of this.horrorWindows.target.targets){
        this.terminateTarget_Horror(target)
    }
}

Scene_Base.prototype.terminateTarget_Horror = function(target) {
    target.sprite.alpha = 1
}

Scene_Base.prototype.terminateHorrorFilterManager = function(){
    this.terminateAllTargets_Horror()
    //document.removeEventListener("keydown", Plugin.hideWindowsListener)
    
    this.filterManagerIsOn = false
    this.isReadyToSelect = false
    
    for(const child of this._windowLayer_horror.children){
        child.destroy(true)
    }

    this._windowLayer_horror.destroy(true)
    this._windowLayer.visible = true
}

Scene_Base.prototype.updateAllHorrorFilters = function(){
    this.updateHorrorFilter_oldFilm(Plugin.param().oldFilm.filter, Plugin.param().oldFilm.options)
    this.updateHorrorFilter_crt(Plugin.param().crt.filter, Plugin.param().crt.options)
    this.updateHorrorFilter_glitch(Plugin.param().glitch.filter, Plugin.param().glitch.options)
}

Scene_Base.prototype.updateHorrorFilter_oldFilm = function(filter, options){
    filter.enabled = options.isEnabled
    filter.sepia = options.sepia
    filter.noise = options.noise 
    filter.noiseSize = options.noiseSize

    if(options.autoSeed){
        filter.seed = Math.random()
    }else{
        filter.seed = options.seed
    }

    filter.scratch = options.scratch
    filter.scratchDensity = options.scratchDensity
    filter.scratchWidth = options.scratchWidth
    filter.vignetting = options.vignetting
    filter.vignettingAlpha = options.vignettingAlpha
    filter.vignettingBlur = options.vignettingBlur
}

Scene_Base.prototype.updateHorrorFilter_crt = function(filter, options){
    filter.enabled = options.isEnabled
    filter.curvature = options.curvature
    filter.lineWidth = options.lineWidth 
    filter.lineContrast = options.lineContrast
    filter.verticalLine = options.verticalLine
    filter.noise = options.noise
    filter.noiseSize = options.noiseSize

    if(options.autoSeed){
        filter.seed = Math.random()
    }else{
        filter.seed = options.seed
    }
    
    filter.vignetting = options.vignetting
    filter.vignettingAlpha = options.vignettingAlpha
    filter.vignnetingBlur = options.vignnetingBlur
    filter.time += options.time
}

Scene_Base.prototype.updateHorrorFilter_glitch = function(filter, options){
    filter.enabled = options.isEnabled && options.isEnabled2
    filter.slices = options.slices
    filter.direction = options.direction
    filter.fillMode = options.fillMode
    filter.average = options.average
    filter.minSize = options.minSize
    filter.sampleSize = options.sampleSize
    filter.red = [options.redX, options.redY]
    filter.green = [options.greenX, options.greenY]
    filter.blue = [options.blueX, options.blueY]

    this.updateHorrorGlitchToggle(filter, options)
    this.updateHorrorGlitchOffset(filter, options)
    this.updateHorrorGlitchSeed(filter, options)
}

Scene_Base.prototype.updateHorrorGlitchToggle = function(filter, options){
    const time = options.toggleTime

    if(time > 0){
        const maxTime = time-1
        const currentTime = Graphics.frameCount % time

        if(currentTime >= maxTime){

            if(!options.isEnabled2 && options.toggleRefresh){
                filter.refresh()
            }
            
            options.isEnabled2 = !options.isEnabled2
        }
    }
}

Scene_Base.prototype.updateHorrorGlitchOffset = function(filter, options){
    if(options.offsetShakePower > 0){
        const power = 1 + options.offsetShakePower
        const value = filter.offset + 1
        const maxShake = options.offset + power
        const minShake = options.offset - power

        if(value >= maxShake){
            filter.offset = minShake
        }else{
            filter.offset = value
        }
        
    }else{
        filter.offset = options.offset 
    }
}

Scene_Base.prototype.updateHorrorGlitchSeed = function(filter, options){
    if(options.autoSeed){
        filter.seed = Math.random()
    }else{
        filter.seed = options.seed
    }
}

}

/* ------------------------------- SCENE TITLE ------------------------------ */
{

Scene_Title.prototype.createTargetsForHorrorFilter = function(){
    const targets = [
        {sprite: this._backSprite1, name: "Title 1", symbol: "title1"},
        {sprite: this._backSprite2, name: "Title 2", symbol: "title2"},
        {sprite: this._gameTitleSprite, name: "Game Title", symbol: "gameTitle"},
    ]
    
    if(this.startSprite){
        const startSprite = {sprite: this.startSprite, name: "Press Start", symbol: "pressStart"}
        targets.push(startSprite)
    }
    
    return targets
}

Alias.Scene_Title_updateChildren = Scene_Title.prototype.updateChildren
Scene_Title.prototype.updateChildren = function() {
    if(this.filterManagerIsOn){
        this.updateChildrenForHorrorFilterManager()

    }else{
        Alias.Scene_Title_updateChildren.call(this)
    }
}

Scene_Title.prototype.updateChildrenForHorrorFilterManager = function(){
    for(const child of this.children){

        if(this.canUpdateChildrenWithHorrorFilter(child)){
            child.update()
        }
    }
}

Scene_Title.prototype.canUpdateChildrenWithHorrorFilter = function(child){
    return child.update && child !== this._windowLayer
}

Alias.Scene_Title_createBackground = Scene_Title.prototype.createBackground
Scene_Title.prototype.createBackground = function() {
    Alias.Scene_Title_createBackground.call(this)
    this.addHorrorFilterToSprite(this._backSprite1, "title1")
    this.addHorrorFilterToSprite(this._backSprite2, "title2")
}

Alias.Scene_Title_createForeground = Scene_Title.prototype.createForeground
Scene_Title.prototype.createForeground = function() {
    Alias.Scene_Title_createForeground.call(this)
    if($dataSystem.optDrawTitle){
        this.addHorrorFilterToSprite(this._gameTitleSprite, "gameTitle")
        this.setFilterAreaForGameTitle()
    }
}

Scene_Title.prototype.setFilterAreaForGameTitle = function(){
    const canCreateRect = $gameTemp.isPlaytest() && 
        (Plugin.titleFilterOptions.gameTitle.rect === null || Plugin.param().fixTitleAreaFilter)

    if(canCreateRect){
        this._gameTitleSprite.filterArea = this.createGameTitleFilterAreaRect()
        Plugin.titleFilterOptions.gameTitle.rect = this._gameTitleSprite.filterArea

    }else{
        this._gameTitleSprite.filterArea = Plugin.titleFilterOptions.gameTitle.rect
    }
}

Scene_Title.prototype.createGameTitleFilterAreaRect = function(){
    const bitmap = this._gameTitleSprite.bitmap
    const width = Math.ceil(this._gameTitleSprite.bitmap.measureTextWidth($dataSystem.gameTitle))
    const height = this._gameTitleSprite.bitmap.fontSize
    let rectX = null
    let rectY = null
    
    for(let x = 0; x < Graphics.width; x++){

        for(let y = 0; y < Graphics.height; y++){
            const pixel = bitmap.getAlphaPixel(x, y)

            if(pixel !== 0){
                rectX = x
                rectY = y
                break
            }
        }

        if(rectX !== null){
            break
        }
    }

    return new Rectangle(rectX, rectY-height, width, height*2)
}

Scene_Title.prototype.addHorrorFilterToSprite = function(sprite, symbol){
    const oldFilmOptions = Plugin.titleFilterOptions[symbol].oldFilm
    const crtOptions = Plugin.titleFilterOptions[symbol].crt
    const glitchOptions = Plugin.titleFilterOptions[symbol].glitch

    sprite.addHorrorFilter("oldFilm", Plugin.createOldFilmFilter(), oldFilmOptions)
    sprite.addHorrorFilter("crt", Plugin.createCRTFilter(), crtOptions)
    sprite.addHorrorFilter("glitch", Plugin.createGlitchFilter(), glitchOptions)
}

Alias.Scene_Title_terminateAllTargets_Horror = Scene_Title.prototype.terminateAllTargets_Horror
Scene_Title.prototype.terminateAllTargets_Horror = function() {
    Alias.Scene_Title_terminateAllTargets_Horror.call(this)
    if($gameTemp.isPlaytest()){
        Plugin.saveToJson(Plugin.titleFilterOptions)
    }
}

Alias.Scene_Title_terminateTarget_Horror = Scene_Title.prototype.terminateTarget_Horror
Scene_Title.prototype.terminateTarget_Horror = function(target) {
    const {sprite, symbol} = target
    Plugin.titleFilterOptions[symbol].oldFilm = sprite.horrorFilters.oldFilm.options
    Plugin.titleFilterOptions[symbol].crt = sprite.horrorFilters.crt.options
    Plugin.titleFilterOptions[symbol].glitch = sprite.horrorFilters.glitch.options
    Alias.Scene_Title_terminateTarget_Horror.call(this, target)
}

}

/* -------------------------------- SCENE MAP ------------------------------- */
{

Alias.Scene_Map_startHorrorFilterManager = Scene_Map.prototype.startHorrorFilterManager
Scene_Map.prototype.startHorrorFilterManager = function(){
    Plugin.createAllFilters()
    Alias.Scene_Map_startHorrorFilterManager.call(this)
}

Scene_Map.prototype.createTargetsForHorrorFilter = function(){
    const pictures = this.getPicturesForTargetHorrorFilter()
    const events = this.getEventsForTargetHorrorFilter()
    const vehicles = this.getVehiclesForTargetHorrorFilter()
    const party = this.getPartyForTargetHorrorFilter()
    const extras = []

    if(this.startSprite){
        const startSprite = {sprite: this.startSprite, name: "Press Start", symbol: "pressStart"}
        extras.push(startSprite)
    }

    return [...pictures, ...party, ...events, ...vehicles, ...extras]
}

Scene_Map.prototype.getPicturesForTargetHorrorFilter = function(){
    const container = this._spriteset._pictureContainer
    const validPictures = container.children.filter(picSprite => picSprite.picture())
    const pictures = validPictures.map(picSprite => {
        return {sprite: picSprite, name: picSprite.picture().name(), symbol: `Pic:${picSprite.picture()._id}`}
    })

    return pictures
}

Scene_Map.prototype.getPartyForTargetHorrorFilter = function(){
    const player = {sprite: $gamePlayer.getMapSprite(), name: "Player", symbol: "-1"}
    const validFollowers = $gamePlayer.followers()._data.filter(follower => follower.isVisible())
    const followers = validFollowers.map(follower => {
        const index = follower._memberIndex
        const symbol = -(index + 1)
        return {sprite: follower.getMapSprite(), name: `Follower ${index}`, symbol: symbol}
    })

    return [player, ...followers]
}

Scene_Map.prototype.getEventsForTargetHorrorFilter = function(){
    const validEvents = $gameMap.events().filter(event => !!event.characterName())
    const events = validEvents.map(event => {
        return {sprite: event.getMapSprite(), name: event.event().name, symbol: `Event:${event.eventId()}`}
    })

    return events
}

Scene_Map.prototype.getVehiclesForTargetHorrorFilter = function(){
    const validVehicles = $gameMap.vehicles().filter(vehicle => vehicle._mapId === $gameMap.mapId())
    const vehicles = validVehicles.map(vehicle => {
        return {sprite: vehicle.getMapSprite(), name: vehicle._type, symbol: vehicle._type}
    })

    return vehicles
}

Alias.Scene_Map_update = Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
    if(this.filterManagerIsOn){
        this.updateChildrenForHorrorFilterManager()
        this.updateAllHorrorFilters()
    }else{
        Alias.Scene_Map_update.call(this)
    }
}

Scene_Map.prototype.updateChildrenForHorrorFilterManager = function(child) {
    for(const child of this.children){

        if(this.canUpdateChildrenWithHorrorFilter(child)){
            child.update()
        }
    }
}

Scene_Map.prototype.canUpdateChildrenWithHorrorFilter = function(child) {
    return child.update && child !== this._windowLayer
}

Alias.Scene_Map_terminateTarget_Horror = Scene_Map.prototype.terminateTarget_Horror
Scene_Map.prototype.terminateTarget_Horror = function(target) {
    Alias.Scene_Map_terminateTarget_Horror.call(this, target)
    this.horrorWindows.target.removeTempFilterFromSprite(target.sprite) 
}

}

/* ------------------------------ SCENE BATTLE ------------------------------ */
{

Alias.Scene_Battle_startHorrorFilterManager = Scene_Battle.prototype.startHorrorFilterManager
Scene_Battle.prototype.startHorrorFilterManager = function(){
    Plugin.createAllFilters()
    Alias.Scene_Battle_startHorrorFilterManager.call(this)
}

Scene_Battle.prototype.createTargetsForHorrorFilter = function(){
    const actors = this.getActorsForTargetHorrorFilter()
    const enemies = this.getEnemiesForTargetHorrorFilter()
    const pictures = this.getPicturesForTargetHorrorFilter()

    return [...actors, ...enemies, ...pictures,]
}

Scene_Battle.prototype.getPicturesForTargetHorrorFilter = function(){
    const container = this._spriteset._pictureContainer
    const validPictures = container.children.filter(picSprite => picSprite.picture())
    const pictures = validPictures.map(picSprite => {
        return {sprite: picSprite, name: picSprite.picture().name(), symbol: `Pic:${picSprite.picture()._id}`}
    })

    return pictures
}

Scene_Battle.prototype.getActorsForTargetHorrorFilter = function(){
    const validSprites = this._spriteset._actorSprites.filter(sprite => !!sprite._actor)
    const actors = validSprites.map((sprite, index) => {
        const actor = sprite._actor.actor()
        const name = actor.name
        return {sprite: sprite, name: name, symbol: `Actor:${index}`}
    })

    return actors
}

Scene_Battle.prototype.getEnemiesForTargetHorrorFilter = function(){
    const enemies = this._spriteset._enemySprites.map((sprite, index) => {
        const enemy = sprite._enemy.enemy()
        const name = enemy.name
        return {sprite: sprite, name: `${name} ${index}`, symbol: `Enemy:${index}`}
    })

    return enemies
}

Alias.Scene_Battle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
    if(this.filterManagerIsOn){
        this.updateChildrenForHorrorFilterManager()
        this.updateAllHorrorFilters()
    }else{
        Alias.Scene_Battle_update.call(this)
    }
}

Scene_Battle.prototype.updateChildrenForHorrorFilterManager = function(child) {
    for(const child of this.children){

        if(this.canUpdateChildrenWithHorrorFilter(child)){
            child.update()
        }
    }
}

Scene_Battle.prototype.canUpdateChildrenWithHorrorFilter = function(child) {
    return child.update && child !== this._windowLayer
}

Alias.Scene_Battle_terminateTarget_Horror = Scene_Battle.prototype.terminateTarget_Horror
Scene_Battle.prototype.terminateTarget_Horror = function(target) {
    Alias.Scene_Battle_terminateTarget_Horror.call(this, target)
    this.horrorWindows.target.removeTempFilterFromSprite(target.sprite) 
}

}

/* ----------------------------- WINDOW OPTIONS ----------------------------- */
{

Alias.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList
Window_Options.prototype.makeCommandList = function(){
    Alias.Window_Options_makeCommandList.call(this)
    if(Plugin.param().screenFilter.optionCommandEnable){
        this.addCommand(Plugin.param().screenFilter.optionCommandName, "horrorFilter")
    }
}

Alias.Window_Options_drawAllItems = Window_Options.prototype.drawAllItems
Window_Options.prototype.drawAllItems = function() {
    this.sortHorrorCommand()
    Alias.Window_Options_drawAllItems.call(this)
}

Window_Options.prototype.sortHorrorCommand = function(){
    const index = this._list.findIndex(cmd => cmd.symbol === "horrorFilter")

    if(index > -1 && Plugin.param().screenFilter.optionCommandIndex > -1){
        const horrorCommand = this._list.splice(index, 1)
        this._list.splice(Plugin.param().screenFilter.optionCommandIndex, 0, horrorCommand[0])
    }
}

Alias.Window_Options_statusText = Window_Options.prototype.statusText
Window_Options.prototype.statusText = function(index){
    const symbol = this.commandSymbol(index)

    if(symbol === "horrorFilter"){
        return ''

    }else{
        return Alias.Window_Options_statusText.call(this, index)
    }
}

Alias.Window_Options_processOk = Window_Options.prototype.processOk
Window_Options.prototype.processOk = function() {
    const index = this.index()
    const symbol = this.commandSymbol(index)

    if(symbol === "horrorFilter"){
        Plugin.cmd_callScene()

    }else{
        Alias.Window_Options_processOk.call(this)
    }
}

}

/* ----------------------------- ELI PRESS START ---------------------------- */
if(Imported.Eli_PressStart){

    const Sprite_PressStart = Eli.PressStart.Sprite_PressStart

    Alias.Sprite_PressStart_updateGeneral = Sprite_PressStart.prototype.updateGeneral
    Sprite_PressStart.prototype.updateGeneral = function(){
        if(!SceneManager._scene.filterManagerIsOn){
            Alias.Sprite_PressStart_updateGeneral.call(this)
        }
    }

}

}
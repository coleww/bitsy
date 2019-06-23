var TUNES = `
<audio id="crash" src="./audio/crash.wav"></audio>
<audio id="slash" src="./audio/slash.wav"></audio>
<audio id="slicebig" src="./audio/slicebig.wav"></audio>
<audio id="slicesmall" src="./audio/slicesmall.wav"></audio>
<audio id="swoosh" src="./audio/swoosh.wav"></audio>
<audio id="talk1" src="./audio/talk1.wav"></audio>
<audio id="talk2" src="./audio/talk2.wav"></audio>
<audio id="talk3" src="./audio/talk3.wav"></audio>
`


var HACKS = [
	// "avatar-by-room",
	// "basic-sfx",
	// "bitsymuse",
	// "canvas-replacement",
	// "character-portraits-animated",
	// "character-portraits",
	// "close-on-ending",
	// "corrupt",
	// "custom-exit-effects",
	// "custom-text-effect",
	// "dialog-box-transition",
	// "dialog-choices",
	// "dialog-jump",
	// "dialog-pause",
	// "direction-in-dialog",
	// "directional-avatar",
	// "dynamic-background",
	// "edit-dialog-from-dialog",
	// "edit-image-from-dialog",
	// "end-from-dialog",
	// "exit-from-dialog",
	// "external-game-data",
	// "favicon-from-sprite",
	// "follower",
	// "gamepad-input",
	// "itsy-bitsy",
	// "javascript-dialog",
	// "logic-operators-extended",
	// "multi-sprite-avatar",
	// "noclip",
	// "online",
	// "opaque-tiles",
	// "paragraph-break",
	// "permanent-items",
	// "save",
	// "solid-items",
	// "stopwatch",
	// "text-to-speech",
	// "tracery-processing",
	// "transitions",
	// "transparent-dialog",
	// "twine-bitsy-comms",
	// "unique-items"



	// :3
	// "javascript-dialog",

		// CHOPPIE!


	"end-from-dialog",
	"exit-from-dialog",
	"health",
	"falling-movement",
	"step-counter",
	"move-back",
	// "directional-avatar",

// USE THIS to show image for alien thing?
	// "character-portraits",


	"transparent-sprites",
	"edit-image-from-dialog",
	"permanent-items",

	"reset-items",

		// "basic-sfx",

		// playbackRate
	// HOW TO USE:
	// 1. Place your "walk" and "talk" sound files somewhere relative to your bitsy html file
	// 2. Copy-paste `<audio id="walk" src="<relative path to your walk sound file>" preload="auto" volume="1.0"></audio>` into the <body> of your document
	// 3. Copy-paste `<audio id="talk" src="<relative path to your talk sound file>" preload="auto" volume="1.0"></audio>` into the <body> of your document
	// 4. Copy-paste this script into a script tag after the bitsy source
// <audio id="walk" src="<relative path to your walk sound file>" preload="auto" volume="1.0"></audio>
// <audio id="talk" src="<relative path to your talk sound file>" preload="auto" volume="1.0"></audio>

	"bitsymuse",

	//
	// HOW TO USE:
	// 1. Place your audio files somewhere relative to your bitsy html file (in the zip if you're uploading to itch.io)
	// 2. Copy-paste `<audio id="sound ID" src="relative path to sound file"></audio>` into the <head> of your document.
	//    You need to do it once for each sound file you are adding, and each needs a unique sound ID. Add `loop` after the `src=""`
	//    tag if it's music that's going to loop (e.g. `<audio id="sound ID" src="./mySong.mp3" loop></audio>`)
	// 3. Copy-paste this script into a script tag after the bitsy source.
	// 4. Edit hackOptions below to set up the TRACK LIST for rooms you move through.
	//
	// In addition to the track list, which will play audio based on the room number/name,
	// you have access to the following commands you can add to dialogue:
	//
	// 1. (soundeffectNow "<sound ID>") will play a sound without interrupting the music as soon as it is called in the dialogue
	// 2. (soundeffect "<sound ID>") will play a sound without interrupting the music once the dialogue box closes
	// 3. (musicNow "<sound ID>") will change the music as soon as it is called in the dialogue
	// 4. (music "<sound ID>") will change the music once the dialogue box closes
	//
	// You can call both musicNow and music in the same dialogue, to e.g. change the music while you speak to a character
	// and then restart the regular room music once you stop speaking to them.
	// You can also use a special ID ("S" by default) to Silence the music.



	// RAWKIE!
	// "jump"
]

function Exporter() {

var resources = new ResourceLoader();

resources.load("other", "exportTemplate.html");
resources.load("style", "exportStyleFixed.css");
resources.load("style", "exportStyleFull.css");
resources.load("script", "bitsy.js");
resources.load("script", "font.js");
resources.load("script", "dialog.js");
resources.load("script", "script.js");
resources.load("script", "color_util.js");
resources.load("script", "renderer.js");
resources.load("script", "transition.js");


// LOAD HACKS needed for current project
HACKS.forEach(function (hack) {
	resources.load("hacks", `${hack}.js`);
})

/* exporting */
function escapeSpecialCharacters(str) {
	str = str.replace(/\\/g, '\\\\');
	str = str.replace(/"/g, '\\"');
	return str;
}

function replaceTemplateMarker(template, marker, text) {
	var markerIndex = template.indexOf( marker );
	return template.substr( 0, markerIndex ) + text + template.substr( markerIndex + marker.length );
}

this.exportGame = function(gameData, title, pageColor, filename, isFixedSize, size) {
	var html = Resources["exportTemplate.html"].substr(); //copy template
	// console.log(html);

	html = replaceTemplateMarker( html, "@@T", title );

	if( isFixedSize ) {
		html = replaceTemplateMarker( html, "@@C", Resources["exportStyleFixed.css"] );
		html = replaceTemplateMarker( html, "@@Z", size + "px" );
	}
	else {
		html = replaceTemplateMarker( html, "@@C", Resources["exportStyleFull.css"] );
	}

	html = replaceTemplateMarker( html, "@@B", pageColor );

	html = replaceTemplateMarker( html, "@@U", Resources["color_util.js"] );
	html = replaceTemplateMarker( html, "@@X", Resources["transition.js"] );
	html = replaceTemplateMarker( html, "@@F", Resources["font.js"] );
	html = replaceTemplateMarker( html, "@@S", Resources["script.js"] );
	html = replaceTemplateMarker( html, "@@L", Resources["dialog.js"] );
	html = replaceTemplateMarker( html, "@@R", Resources["renderer.js"] );
	html = replaceTemplateMarker( html, "@@E", Resources["bitsy.js"] );

	// export the default font in its own script tag (TODO : remove if unused)
	html = replaceTemplateMarker( html, "@@N", "ascii_small" );
	html = replaceTemplateMarker( html, "@@M", fontManager.GetData("ascii_small") );

	html = replaceTemplateMarker( html, "@@D", gameData );


	var hacks = HACKS.map(function (hack) {
		return resources.get(`${hack}.js`);
	}).join("\n");

	html = replaceTemplateMarker( html, "@@HACKS", hacks );


		html = replaceTemplateMarker( html, "@@TUNES", TUNES );



	// console.log(html);

	ExporterUtils.DownloadFile( filename, html );
}


/* importing */
function unescapeSpecialCharacters(str) {
	str = str.replace(/\\"/g, '"');
	str = str.replace(/\\\\/g, '\\');
	return str;
}

this.importGame = function( html ) {
	console.log("IMPORT!!!");

	// IMPORT : old style
	// find start of game data
	var i = html.indexOf("var exportedGameData");
	if(i > -1) {
		console.log("OLD STYLE");

		while ( html.charAt(i) != '"' ) {
			i++; // move to first quote
		}
		i++; // move past first quote

		// isolate game data
		var gameDataStr = "";
		var isEscapeChar = false;
		while ( html.charAt(i) != '"' || isEscapeChar ) {
			gameDataStr += html.charAt(i);
			isEscapeChar = html.charAt(i) == "\\";
			i++;
		}

		// replace special characters
		gameDataStr = gameDataStr.replace(/\\n/g, "\n"); //todo: move this into the method below
		gameDataStr = unescapeSpecialCharacters( gameDataStr );

		return gameDataStr;
	}

	// IMPORT : new style
	var scriptStart = '<script type="bitsyGameData" id="exportedGameData">\n';
	var scriptEnd = '</script>';
	i = html.indexOf( scriptStart );
	console.log(i);
	if(i > -1) {
		console.log("NEW STYLE");

		i = i + scriptStart.length;
		var gameStr = "";
		var lineStr = "";
		var isDone = false;
		while(!isDone && i < html.length) {

			lineStr += html.charAt(i);

			if(html.charAt(i) === "\n") {
				if(lineStr === scriptEnd) {
					isDone = true;
				}
				else {
					gameStr += lineStr;
					lineStr = "";
				}
			}

			i++;
		}
		return gameStr;
	}

	console.log("FAIL!!!!");

	return "";
}

} // Exporter()

var ExporterUtils = {
	DownloadFile : function(filename, text) {

		if( browserFeatures.blobURL ) {
			// new blob version
			var a = document.createElement('a');
			var blob = new Blob( [text] );
			a.download = filename;
			a.href = makeURL.createObjectURL(blob);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
		else {
			// old version
			var element = document.createElement('a');

			element.setAttribute('href', 'data:attachment/file;charset=utf-8,' + encodeURIComponent(text));

			element.setAttribute('download', filename);
			element.setAttribute('target', '_blank');

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		}
	}
}

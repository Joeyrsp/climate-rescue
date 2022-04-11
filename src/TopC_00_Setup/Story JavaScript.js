// :: Story JavaScript [script @#P9938 @#Fold000] {"position":"125,125"}
/* SCRIPT FOR NEW FUNCTIONS AND MACROS TO USE IN THE ADVISER
=============================================
Advice: All customised functions and variables in this script could be given AddedScript as either a prefix or a suffix to ensure that there is a very low probability of a collision with the Sugarcane js code. 
*/


/* ==========================================*/
/* Day and Night Mode Setting - HiEv */
/* https://qjzhvmqlzvoo5lqnrvuhmg-on.drv.tw/UInv/Sample_Code.html#Day%20and%20Night%20Mode%20Setting */
/* ==========================================*/

setup.settingTheme = function () {
	if (settings.Theme) {
		// Delay is required during initialization.
		setTimeout(function () { $("html").addClass("bleached"); }, 20);
	}	else {
		$("html").removeClass("bleached");
	}
};
Setting.addToggle("Theme", {
	label  : "Light Mode:",
	default: false,
	onInit   : setup.settingTheme,
	onChange : setup.settingTheme
});


/* ==========================================*/
/* SugarCube config - including saving and reloading controls */
/* ==========================================*/

Config.saves.autosave = true;
Config.saves.autoload = true;
Config.history.maxStates = 6;
Config.passages.displayTitles = true;

/* ==========================================*/
/* Turn off the history navigation controls */
/* ==========================================*/

Config.history.controls = false;


//Function to make a pure restart when autosave/autoload is on
//Joeyrsp Jan 2022 - For Twine 2 SugarCube 2

$(document).one(':enginerestart', (event) => {
    Save.autosave.delete();
    storage.delete('remember');
});


/* ==========================================*/
/* MACROS*/
/* ==========================================*/


//Macro <<clearmetadata>> Joeyrsp Jan 2022 - For Twine 2 SugarCube 2
//Clears the metadata cache

Macro.add("clearmetadata", {
  handler: () => State.metadata.clear()
});


//Macro <<clearremember>> Joeyrsp Jan 2022 - For Twine 2 SugarCube 2
//Clears the remember cache by removing it

Macro.add("clearremember", {
  handler: () => storage.delete('remember')
});


//Macro <<clearvariables>> Joeyrsp Jan 2022 - For Twine 2 SugarCube 2
//Clears the state of variables 

Macro.add("clearvariables", {
  handler: () => Object.keys(State.variables).forEach(
        (key) => delete State.variables[key]
    )
});


//Macro <<restart>> Philip Sutton Jan 2022 - For Twine 2 SugarCube 2
//Triggers a restart of the project engine

Macro.add("restart", {
  handler: () => Engine.restart()
});


/* ==========================================*/
/* FUNCTIONS*/
/* ==========================================*/

//Code for the URL link
//Just put this in your JavaScript section:


/* Anchor Link to Passage - modified HiEv code - Start */
$(document).one(':enginerestart', (event) => {
    window.location.hash = "";
});
if ("onhashchange" in window) {  // event supported
	window.onhashchange = function () {
		hashChanged();
	};
} else {  // event not supported
	window.setInterval(function () {
		if (window.location.hash != setup.storedHash) {
			hashChanged();
		}
	}, 100);
}
function hashChanged() {
	if (Engine.isIdle()) {
		if (window.location.hash && (setup.storedHash != window.location.hash)) {
			setup.storedHash = window.location.hash;
			var anchor = decodeURI(window.location.hash.substring(1));
			if (Story.has(anchor) && (passage() !== anchor)) {
				Engine.play(anchor);
			}
		} else {
			// Comment out the following line of code if you don't want the
			// anchor link of the current passage displayed in the URL bar.
			window.location.hash = encodeURI(passage());
		}
		// Comment out the following line of code if you don't want the
		// title of the page set to the passage name.
		document.title = passage();
	} else {
		setTimeout(hashChanged, 100);
	}
}
$(document).on(':passageend', function () { hashChanged(); });
/* Anchor Link to Passage - End */


/*  Current Year  */
prerender.currentYear = function() {
     state.history[0].variables["currentYear"] = new Date().getFullYear();
}


//Array method .without Joeyrsp Jan 2022 - For Twine 2 SugarCube 2
//Returns a modified copy of an array with specified items deleted 

Object.defineProperty(Array.prototype, 'without', {
    configurable : true,
    writable     : true,

    value(...needles) {
        if (this == null) { // lazy equality for null
            throw new TypeError('Array.prototype.without called on null or undefined');
        }

        return this.filter((element) => !needles.includes(element));
    }
});



//Function: Fast favourites Joeyrsp Feb 2022 - For Twine 2 SugarCube 2
//Initialises the array variable for the Fast Favourites system

State.setVar("$favourites", State.getVar("$favourites") || []);



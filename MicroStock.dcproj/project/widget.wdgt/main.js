/* 
 This file was generated by Dashcode.  
 You may edit this file to customize your widget or web page 
 according to the license.txt file included in the project.
 */

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load() {
    dashcode.setupParts();
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove() {
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide() {
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show() {
    refreshMoney();
    /*loop(function () {refreshMoney()});
    var choise =  widget.preferenceForKey("timeInterval");
    
    if (choise == 5)
        choise = 4;
    else if (choise == 10)
        choise = 5;
    
    document.getElementById("timeInterval").selectedIndex = choise - 1; */
    // Restart any timers that were stopped on hide
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync() {
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event) {
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event) {
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

function loop(func) {
    func();
    var mins = widget.preferenceForKey("timeInterval");
    setTimeout(function() { loop(func) }, 1000*60*mins);
}

function refreshMoney() {
    MoneyGet("http://www.istockphoto.com/", "iStockAmount");
    MoneyGet("http://www.dreamstime.com/", "DreamstimeAmount");
    MoneyGet("http://www.fotolia.com/", "FotoliaAmount");
}

function MoneyGet(url, labelID) {
    alert("MoneyGet " + url);
    var status = document.getElementById("status");
    status.object.setValue(2);
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            var response = request.response;
            var rex = new RegExp('([$]|">)[0-9]+[.][0-9][0-9]?<');
            var match = rex.exec(response);
            alert(url + " " + match);
            status.object.setValue(match != null?1:3);
            if(match != null)
                document.getElementById(labelID).innerText = match[0].replace("<", "").replace("\">", "credits: ");  
        }
        if (request.readyState == 0 || request.readyState == 4) {
            setTimeout(function() {
                status.object.setValue(2);
                setTimeout(function() { status.object.setValue(0) }, 100);
                        }, 500);
        }
       
    }
    
    
}


if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}

function timeIntervalChange(event) {
    // Preference code
    widget.setPreferenceForKey(document.getElementById("timeInterval").value, "timeInterval");
}


function openMyWebsite(event) {
    widget.openURL("http://ntrifunovic.github.io/pictures/");
}

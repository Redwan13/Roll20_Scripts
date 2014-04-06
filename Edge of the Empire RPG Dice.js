// Edge of the Empire RPG Dice Mechanics
//

//-------------ORIGINAL AUTHORS COPYRIGHT AND DATA--------------- 
// copyright pug games 2014
// please feel free to use this script, change it, add to it in any way you feel
// Script created by Roll20 user Konrad J.
// help with Dice specs by Roll20 users Alicia G. and Blake the Lake
// dice graphics hosted by Roll20 user Alicia G. at galacticcampaigns.com
// dice graphics borrowed from the awesome google+ hangouts EotE Dice App
// changed to randomInteger()
// added by Jarod: option to have the dice log on one line only (set eedGlobal.diceLogOnOneLine to false to restore old way)
//----------------------------------------------------------------
// Script simplified and refactored by Roll20 user Nickolai Korshunov
// Changes: 
// 1. total refactoring
// 2. resualts are grouped by dice results not dice groups
// 3. blanks can be shown in results
// 4. (temporary) no graphics dice results 
// 5. Error messages are thrown upon command errors
// 6. User can throw more than 9 dice in one pack

// Usage:
// !eed log on|off  // enable or disable debug logging 
// !eed show_blanks on|off // show blanks in results
// !eed #b #g #y #blk #p #r #w
// !eed w #b #g #y #blk #p #r #w  // will roll the dice and whisper them only to the GM, gm can't whisper dice rolls to other players

var eedCONSTANTS = {
    EEDCOMMAND : "!eed"
};

var eedGlobal = {
    showBlanks : false,
    diceLogChat : false,
};

function DiceResult(){
    
        this.blank = 0;
        this.success = 0;
        this.failure = 0;
        this.advantage = 0;
        this.threat = 0;
        this.triumph = 0;
        this.despair = 0;
        this.light = 0;
        this.dark = 0;  
}

function getTextResults(diceResult){

    var text = "";
    if (eedGlobal.showBlanks === true && diceResult.blank > 0) text = text + diceResult.blank + "x(Blank) "; //no string.format... damn you js
    if (diceResult.success > 0) text = text + diceResult.success + "x(Success) "; 
    if (diceResult.failure > 0) text = text + diceResult.failure + "x(Failure) ";
    if (diceResult.advantage > 0) text = text + diceResult.advantage + "x(Advantage) ";
    if (diceResult.threat > 0) text = text + diceResult.threat + "x(Threat) ";
    if (diceResult.triumph > 0) text = text + diceResult.triumph + "x(Triumph) ";
    if (diceResult.despair > 0) text = text + diceResult.despair + "x(Despair) "; //it is always time for good old zetsubou shita!
    if (diceResult.light > 0) text = text + diceResult.light + "x(Light) ";
    if (diceResult.dark > 0) text = text + diceResult.dark + "x(Dark) ";
    return text;
}

function logDiceResult(diceName, diceResult){
    if (eedGlobal.diceLogChat === true) {
        var textLog = getTextResults(diceResult);
        log("Threw '"+diceName+"' dice with results: "+textLog);
    }
}

function rollBoost(diceQty, who){
    //Blue "Boost" die (d6)
    //1 Blank
    //2 Blank
    //3 Success
    //4 Advantage
    //5 Advantage + Advantage
    //6 Success + Advantage
    var roll = 0;
    var diceResult = new DiceResult();
    var i = 0;


    for (i=1;i<=diceQty;i++) {

        roll = randomInteger(6);

        switch(roll) {
            case 1:
                diceResult.blank = diceResult.blank + 1;
                break;
            case 2:
                diceResult.blank = diceResult.blank + 1;
                break;
            case 3:
                diceResult.success = diceResult.success + 1;
                break;
            case 4:
                diceResult.advantage = diceResult.advantage + 1;
                break;
            case 5:
                diceResult.advantage = diceResult.advantage + 2;
                break;
            case 6:
                diceResult.success = diceResult.success + 1;
                diceResult.advantage = diceResult.advantage + 1;
                break;
        }
    }

    logDiceResult("Boost", diceResult);

    return diceResult;
}

function rollAbility(diceQty, who){
    //Green "Ability" die (d8)
    //1 Blank
    //2 Success
    //3 Success
    //4 Advantage
    //5 Advantage
    //6 Success + Advantage
    //7 Advantage + Advantage
    //8 Success + Success
    var roll = 0;

    var diceResult = new DiceResult();
    
    var i = 0;

    for (i=1;i<=diceQty;i++) {

        roll = randomInteger(8);
        
        switch(roll) {
            case 1:
                diceResult.blank = diceResult.blank + 1;
                break;
            case 2:
                diceResult.success = diceResult.success + 1;
                break;
            case 3:
                diceResult.success = diceResult.success + 1;
                break;
            case 4:
                diceResult.advantage = diceResult.advantage + 1;
                break;
            case 5:
                diceResult.advantage = diceResult.advantage + 1;
                break;
            case 6:
                diceResult.success = diceResult.success + 1;
                diceResult.advantage = diceResult.advantage + 1;
                break;
            case 7:
                diceResult.advantage = diceResult.advantage + 2;
                break;
            case 8:
                diceResult.success = diceResult.success + 2;
                break;
        }
    }

    logDiceResult("Ability", diceResult);

    return diceResult;
}

function rollProficiency(diceQty, who){
    //Yellow "Proficiency" die (d12)
    //1 Blank
    //2 Triumph
    //3 Success
    //4 Success
    //5 Advantage
    //6 Success + Advantage
    //7 Success + Advantage
    //8 Success + Advantage
    //9 Success + Success
    //10 Success + Success
    //11 Advantage + Advantage
    //12 Advantage + Advantage
    var roll = 0;
    var diceResult = new DiceResult();
    var i = 0;


    for (i=1;i<=diceQty;i++) {
        
        roll = randomInteger(12);

        switch(roll) {
            case 1:
                diceResult.blank = diceResult.blank + 1;
                break;
            case 2:
                diceResult.triumph = diceResult.triumph + 1;
                diceResult.success = diceResult.success + 1;
                break;
            case 3:
                diceResult.success = diceResult.success + 1;
                break;
            case 4:
                diceResult.success = diceResult.success + 1;
                break;
            case 5:
                diceResult.advantage = diceResult.advantage + 1;
                break;
            case 6:
                diceResult.success = diceResult.success + 1;
                diceResult.advantage = diceResult.advantage + 1;
                break;
            case 7:
                diceResult.success = diceResult.success + 1;
                diceResult.advantage = diceResult.advantage + 1;
                break;
            case 8:
                diceResult.success = diceResult.success + 1;
                diceResult.advantage = diceResult.advantage + 1;
                break;
            case 9:
                diceResult.success = diceResult.success + 2;
                break;
            case 10:
                diceResult.success = diceResult.success + 2;
                break;
            case 11:
                diceResult.advantage = diceResult.advantage + 2;
                break;
            case 12:
                diceResult.advantage = diceResult.advantage + 2;
                break;
        }
    }

    logDiceResult("Proficiency", diceResult);
    return diceResult;
}

function rollSetBack(diceQty, who){
    //Black "Setback" die (d6)
    //1 Blank
    //2 Blank
    //3 Failure
    //4 Failure
    //5 Threat
    //6 Threat
    var roll = 0;
    var diceResult = new DiceResult();
    var i = 0;

    for (i=1;i<=diceQty;i++) {

        roll = randomInteger(6);
        
        switch(roll) {
            case 1:
                diceResult.blank = diceResult.blank + 1;
                break;
            case 2:
                diceResult.blank = diceResult.blank + 1;
                break;
            case 3:
                diceResult.failure = diceResult.failure + 1;
                break;
            case 4:
                diceResult.failure = diceResult.failure + 1;
                break;
            case 5:
                diceResult.threat = diceResult.threat + 1;
                break;
            case 6:
                diceResult.threat = diceResult.threat + 1;
                break;
        }
    }

    logDiceResult("SetBack", diceResult);

    return diceResult;
}

function rollDifficulty(diceQty, who){
    //Purple "Difficulty" die (d8)
    //1 Blank
    //2 Failure
    //3 Threat
    //4 Threat
    //5 Threat
    //6 Failure + Failure
    //7 Failure + Threat
    //8 Threat + Threat
    var roll = 0;
    var diceResult = new DiceResult();
    var i = 0;


    for (i=1;i<=diceQty;i++) {

        roll = randomInteger(8);


        switch(roll) {
            case 1:
                diceResult.blank = diceResult.blank + 1;
                break;
            case 2:
                diceResult.failure = diceResult.failure + 1;
                break;
            case 3:
                diceResult.threat = diceResult.threat + 1;
                break;
            case 4:
                diceResult.threat = diceResult.threat + 1;
                break;
            case 5:
                diceResult.threat = diceResult.threat + 1;
                break;
            case 6:
                diceResult.failure = diceResult.failure + 2;
                break;
            case 7:
                diceResult.failure = diceResult.failure + 1;
                diceResult.threat = diceResult.threat + 1;
                break;
            case 8:
                diceResult.threat = diceResult.threat + 2;
                break;
        }
    }

    logDiceResult("Difficulty", diceResult);
    return diceResult;
}

function rollChallenge(diceQty, who){
    //Red "Challenge" die (d12)
    //1 Blank
    //2 Despair
    //3 Failure
    //4 Failure
    //5 Threat
    //6 Threat
    //7 Failure + Failure
    //8 Failure + Failure
    //9 Threat + Threat
    //10 Threat + Threat
    //11 Failure + Threat
    //12 Failure + Threat
    var roll = 0;

    var diceResult = new DiceResult();

    var i = 0;

    for (i=1;i<=diceQty;i++) {

        roll = randomInteger(12);

        switch(roll) {
            case 1:
                diceResult.blank = diceResult.blank + 1;
                break;
            case 2:
                diceResult.despair = diceResult.despair + 1;
                break;
            case 3:
                diceResult.failure = diceResult.failure + 1;
                break;
            case 4:
                diceResult.failure = diceResult.failure + 1;
                break;
            case 5:
                diceResult.threat = diceResult.threat + 1;
                break;
            case 6:
                diceResult.threat = diceResult.threat + 1;
                break;
            case 7:
                diceResult.failure = diceResult.failure + 2;
                break;
            case 8:
                diceResult.failure = diceResult.failure + 2;
                break;
            case 9:
                diceResult.threat = diceResult.threat + 2;
                break;
            case 10:
                diceResult.threat = diceResult.threat + 2;
                break;
            case 11:
                diceResult.failure = diceResult.failure + 1;
                diceResult.threat = diceResult.threat + 1;
                break;
            case 12:
                diceResult.failure = diceResult.failure + 1;
                diceResult.threat = diceResult.threat + 1;
                break;
        }
    }
    logDiceResult("Challenge", diceResult);
    return diceResult;
}

function rollForce(diceQty, who){
    //White "Force" die (d12)
    //1 Light
    //2 Light
    //3 Light + Light
    //4 Light + Light
    //5 Light + Light
    //6 Dark
    //7 Dark
    //8 Dark
    //9 Dark
    //10 Dark
    //11 Dark
    //12 Dark + Dark
    var roll = 0;
    var diceResult = new DiceResult();
    var i = 0;

    for (i=1;i<=diceQty;i++) {

        roll = randomInteger(12);


        switch(roll) {
            case 1:
                diceResult.light = diceResult.light + 1;
                break;
            case 2:
                diceResult.light = diceResult.light + 1;
                break;
            case 3:
                diceResult.light = diceResult.light + 2;
                break;
            case 4:
                diceResult.light = diceResult.light + 2;
                break;
            case 5:
                diceResult.light = diceResult.light + 2;
                break;
            case 6:
                diceResult.dark = diceResult.dark + 1;
                break;
            case 7:
                diceResult.dark = diceResult.dark + 1;
                break;
            case 8:
                diceResult.dark = diceResult.dark + 1;
                break;
            case 9:
                diceResult.dark = diceResult.dark + 1;
                break;
            case 10:
                diceResult.dark = diceResult.dark + 1;
                break;
            case 11:
                diceResult.dark = diceResult.dark + 1;
                break;
            case 12:
                diceResult.dark = diceResult.dark + 2;
                break;
        }
    }
    logDiceResult("Force", diceResult);
    return diceResult;
}


function diceAddition(diceTotals, diceResult){
    diceTotals.blank = diceTotals.blank + diceResult.blank;
    diceTotals.success = diceTotals.success + diceResult.success;
    diceTotals.failure = diceTotals.failure + diceResult.failure;
    diceTotals.advantage = diceTotals.advantage + diceResult.advantage;
    diceTotals.threat = diceTotals.threat + diceResult.threat;
    diceTotals.triumph = diceTotals.triumph + diceResult.triumph;
    diceTotals.despair = diceTotals.despair + diceResult.despair;
    diceTotals.light = diceTotals.light + diceResult.light;
    diceTotals.dark = diceTotals.dark + diceResult.dark;
    return diceTotals;
}

function diceTotalsSummed(diceTotals) {

    var diceTS = new DiceResult();
    
    var i = 0;

    i = diceTotals.success - diceTotals.failure;
    if (i >= 0) {
        diceTS.success = i;
    }
    else {
        diceTS.failure = Math.abs(i);
    }

    i = diceTotals.advantage - diceTotals.threat;
    if (i >= 0) {
        diceTS.advantage = i;
    }
    else {
        diceTS.threat = Math.abs(i);
    }
    diceTS.blank = diceTotals.blank;
    diceTS.triumph = diceTotals.triumph;
    diceTS.despair = diceTotals.despair;
    diceTS.light = diceTotals.light;
    diceTS.dark = diceTotals.dark;
    return diceTS;
}

function processEdgeEmpireDiceScript(diceToRoll, who, whisper){
    var diceQty = "";
    var diceColor = "";
    var diceTotals = new DiceResult();

    var i = 0;
    var j = diceToRoll.length;

    if (whisper === true) {
        sendChat(who, "/w gm " + diceToRoll);
        sendChat(who, "/w " + who + " " + diceToRoll);
    }
    else {
        sendChat(who, "/em " + diceToRoll);
    }

    var diceExpr = /^(\d+)([a-z]+)$/i;

    var error = false;
    var errorDice = "";
    for (i=0, j;i<j;i++){
        var match = diceExpr.exec (diceToRoll[i]);
        diceQty = match[1];
        diceColor=match[2];
        
        switch(diceColor) {
        //Blue "Boost" die (d6)
            case 'b':
                myresults = rollBoost(diceQty, who);
                diceTotals = diceAddition(diceTotals, myresults);
                break;
        //Green "Ability" die (d8)
            case 'g':
                myresults = rollAbility(diceQty, who);
                diceTotals = diceAddition(diceTotals, myresults);
                break;
        //Yellow "Proficiency" die (d12)
            case 'y':
                myresults = rollProficiency(diceQty, who);
                diceTotals = diceAddition(diceTotals, myresults);
                break;
        //Black "Setback" die (d6)
            case 'blk':
                myresults = rollSetBack(diceQty, who);
                diceTotals = diceAddition(diceTotals, myresults);
                break;
        //Purple "Difficulty" die (d8)
            case 'p':
                myresults = rollDifficulty(diceQty, who);
                diceTotals = diceAddition(diceTotals, myresults);
                break;
        //Red "Challenge" die (d12)
            case 'r':
                myresults = rollChallenge(diceQty, who);
                diceTotals = diceAddition(diceTotals, myresults);
                break;
        //White "Force" die (d12)
            case 'w':
                myresults = rollForce(diceQty, who);
                diceTotals = diceAddition(diceTotals, myresults);
                break;
            default: 
                error = true;
                errorDice = diceColor;
                break;
        }
        if (error === true)
            break;
    }
    
    if (error === true) {
        var errorMessage = "Invalid dice '" + errorDice+"'";
        if (whisper === true){
            sendChat("Error:", "/w gm " + errorMessage);
            sendChat("Error:", "/w " + who + " " + errorMessage);  
        }
        else {
            sendChat("Error:", errorMessage);
        }
    }
    else {
        diceTotals = diceTotalsSummed(diceTotals);

        var diceTextResults = getTextResults(diceTotals);

        if (whisper === true) {
            sendChat("Roll:", "/w gm " + diceTextResults);
            sendChat("Roll:", "/w " + who + " " + diceTextResults);
        }
        else {
            sendChat("Roll:", "/em " + diceTextResults);
        }
    }
}

var processScriptTabs = function(argv, who) {
    // this will run the various other scripts depending upon the chat
    // window command.  Just add another Case statement to add a new command.
    var tmpLogChat = false;
    var tmpGraphicsChat = false;

    var script = argv.shift();

    switch(script) {
        case eedCONSTANTS.EEDCOMMAND:
            switch(argv[0]) {
                case "log":
                    switch(argv[1]) {
                        case "on":
                            eedGlobal.diceLogChat = true;
                            sendChat("EED","Debug logging is on");
                            break;
                        case "off":
                            eedGlobal.diceLogChat = false;
                            sendChat("EED","Debug logging is off");
                            break;
                        default: 
                            sendChat("Error","'log' command goes with 'on' or 'off' value, not with '"+argv[1]+"'");
                            break;
                    }
                    break;
                case "show_blanks":
                    switch(argv[1]){
                        case "on":
                            eedGlobal.showBlanks = true;
                            sendChat("EED","Blanks will be showed in results");
                            break;
                        case "off":
                            eedGlobal.showBlanks = false;
                            sendChat("EED","Blanks won't be showed in results");
                            break;
                        default: 
                            sendChat("Error","'showBlanks' command goes with 'on' or 'off' value, not with '"+argv[1]+"'");
                            break;   
                    }
                    break;
                case "w":
                    argv.shift();
                    processEdgeEmpireDiceScript(argv, who, true);
                    break;
                default:
                    processEdgeEmpireDiceScript(argv, who, false);
            }
            break;
    }
};

on("chat:message", function(msg) {
    // returns the chat window command entered, all in lowercase.
    
    var chatCommand = msg.content;
    chatCommand = chatCommand.toLowerCase(); //make all characters lowercase

    var argv = chatCommand.split(' ');
    if (msg.type != 'api') {
        return;
    }
    return processScriptTabs(argv, msg.who);
});
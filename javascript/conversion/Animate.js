import infixToPostfixStack from "./Animation/infixToPostfix.js"
import postfixToInfixStack from "./Animation/postfixToInfix.js"
import postfixToPrefixStack from "./Animation/postfixToPrefix.js"
import {reverseAnimation, reverseAnimationOutput} from "./Animation/reverseAnimation.js"
import infixDisplay from "../../constants/infixDisplay.js"
import toInfixDisplay from "../../constants/toInfixDisplay.js"
import postfixToInfixPseudocode from "../../psudocode/postfixToInfix.js"
import prefixToInfixPseudocode from "../../psudocode/prefixToInfix.js"
import postfixToPrefixPseudocode from "../../psudocode/postfixToPrefix.js"
import prefixToPostfixPseudocode from "../../psudocode/prefixToPostfix.js"
import infixToPostfixPseudocode from "../../psudocode/infixToPostfix.js"
import infixToPrefixPseudocode from "../../psudocode/infixToPrefix.js"

var dropdownMenuButton = document.getElementById("dropdownMenuButtonConvert")
var dropdownMenuSelector = document.getElementById("dropdownMenuButtonType")

export function animate() {
    if(invalidEquationCheck()) {
        renderScene()
        expressionToInput()
    }
}

async function expressionToInput() {
    const expressionPlaceholder = document.getElementById("expressionPlaceholder").value

    const timer = ms => new Promise(res => setTimeout(res, ms))

    $("#inputDisp").html("");
    $("#inputDisp").append("<div id='bottomPanelIn'></div>");

    var duration = 200

    for (var i = 0; i < expressionPlaceholder.length; i++) {
        var expressionChar = expressionPlaceholder.charAt(i);
        $('#inputDisp').append("<div class='dispExpression scale-up-left'>" + expressionChar + "</div>");
        await timer(duration)
    }
    await infixToOthers();
    await postfixToOthers();
    await prefixToOthers();
}

async function postfixToOthers() {
    // postfix to prefix
    if (dropdownMenuButton.classList.contains("prefixConvert") && dropdownMenuSelector.classList.contains("postfixType")) {
        await postfixToPrefixStack()
        $('#visualizeBtn').removeClass('btn-outline-secondary');
        $('#visualizeBtn').prop("disabled", false);
    }

    // postfix to infix
    if (dropdownMenuButton.classList.contains("infixConvert") && dropdownMenuSelector.classList.contains("postfixType")) {
        await postfixToInfixStack()
        $('#visualizeBtn').removeClass('btn-outline-secondary');
        $('#visualizeBtn').prop("disabled", false);
    }
}

async function prefixToOthers() {
    if (dropdownMenuButton.classList.contains("postfixConvert") && dropdownMenuSelector.classList.contains("prefixType")) {
        $( "#reverse" ).addClass( "pseudocodeActive" );
        await reverseAnimation()
        $( "#reverse" ).removeClass( "pseudocodeActive" );

        await postfixToPrefixStack()

        $( "#reverseAgain" ).addClass( "pseudocodeActive" );
        await reverseAnimationOutput()
        $( "#reverseAgain" ).removeClass( "pseudocodeActive" );
        
        $('#visualizeBtn').removeClass('btn-outline-secondary');
        $('#visualizeBtn').prop("disabled", false);
    }

    if (dropdownMenuButton.classList.contains("infixConvert") && dropdownMenuSelector.classList.contains("prefixType")) {
        $( "#reverse" ).addClass( "pseudocodeActive" );
        await reverseAnimation()
        $( "#reverse" ).removeClass( "pseudocodeActive" );

        await postfixToInfixStack()

        $( "#reverseAgain" ).addClass( "pseudocodeActive" );
        await reverseAnimationOutput()
        $( "#reverseAgain" ).removeClass( "pseudocodeActive" );

        $('#visualizeBtn').removeClass('btn-outline-secondary');
        $('#visualizeBtn').prop("disabled", false);
    }
}

async function infixToOthers() {
    if (dropdownMenuButton.classList.contains("prefixConvert") && dropdownMenuSelector.classList.contains("infixType")) {
        $( "#reverse" ).addClass( "pseudocodeActive" );
        await reverseAnimation()
        $( "#reverse" ).removeClass( "pseudocodeActive" );

        await infixToPostfixStack()

        $( "#reverseAgain" ).addClass( "pseudocodeActive" );
        await reverseAnimation()
        $( "#reverseAgain" ).removeClass( "pseudocodeActive" );

        $('#visualizeBtn').removeClass('btn-outline-secondary');
        $('#visualizeBtn').prop("disabled", false);
    }

    if (dropdownMenuButton.classList.contains("postfixConvert") && dropdownMenuSelector.classList.contains("infixType")) {
        await infixToPostfixStack()
        $('#visualizeBtn').removeClass('btn-outline-secondary');
        $('#visualizeBtn').prop("disabled", false);
    }
}

function invalidEquationCheck() {
    // infix to infix
    if (dropdownMenuButton.classList.contains("infixConvert") && dropdownMenuSelector.classList.contains("infixType")) {
        invalidEquation(1)
        $('#visualizeBtn').prop("disabled", false);
        return false
    }

    if (dropdownMenuButton.classList.contains("prefixConvert") && dropdownMenuSelector.classList.contains("prefixType")) {
        invalidEquation(2)
        $('#visualizeBtn').prop("disabled", false);
        return false
    }

    if (dropdownMenuButton.classList.contains("postfixConvert") && dropdownMenuSelector.classList.contains("postfixType")) {
        invalidEquation(3)
        $('#visualizeBtn').prop("disabled", false);
        return false
    }

    return true
}

function renderScene() {
    $("#sideout").html("");

    if ((dropdownMenuButton.classList.contains("postfixConvert") && dropdownMenuSelector.classList.contains("infixType")) 
        || (dropdownMenuButton.classList.contains("prefixConvert") && dropdownMenuSelector.classList.contains("infixType"))) {
        $("#display").html("");
        $("#display").append(infixDisplay);
    }

    if ((dropdownMenuButton.classList.contains("infixConvert") && dropdownMenuSelector.classList.contains("postfixType")) 
        || (dropdownMenuButton.classList.contains("infixConvert") && dropdownMenuSelector.classList.contains("prefixType"))
        || (dropdownMenuButton.classList.contains("prefixConvert") && dropdownMenuSelector.classList.contains("postfixType"))
        || (dropdownMenuButton.classList.contains("postfixConvert") && dropdownMenuSelector.classList.contains("prefixType"))) {
        $("#display").html("");
        $("#display").append(toInfixDisplay);
    }

    if(dropdownMenuButton.classList.contains("infixConvert") && dropdownMenuSelector.classList.contains("postfixType")){
        if ($("#sideout").hasClass("displayNone")) {
            $('#sidebutton').trigger('click');
        }
        $("#sideout").append(postfixToInfixPseudocode);
    }

    if(dropdownMenuButton.classList.contains("infixConvert") && dropdownMenuSelector.classList.contains("prefixType")){
        if ($("#sideout").hasClass("displayNone")) {
            $('#sidebutton').trigger('click');
        }
        $("#sideout").append(prefixToInfixPseudocode);
    }

    if(dropdownMenuButton.classList.contains("prefixConvert") && dropdownMenuSelector.classList.contains("postfixType")){
        if ($("#sideout").hasClass("displayNone")) {
            $('#sidebutton').trigger('click');
        }
        $("#sideout").append(postfixToPrefixPseudocode);
    }

    if(dropdownMenuButton.classList.contains("postfixConvert") && dropdownMenuSelector.classList.contains("prefixType")){
        if ($("#sideout").hasClass("displayNone")) {
            $('#sidebutton').trigger('click');
        }
        $("#sideout").append(prefixToPostfixPseudocode);
    }

    if(dropdownMenuButton.classList.contains("postfixConvert") && dropdownMenuSelector.classList.contains("infixType")){
        if ($("#sideout").hasClass("displayNone")) {
            $('#sidebutton').trigger('click');
        }
        $("#sideout").append(infixToPostfixPseudocode);
    }

    if(dropdownMenuButton.classList.contains("prefixConvert") && dropdownMenuSelector.classList.contains("infixType")){
        if ($("#sideout").hasClass("displayNone")) {
            $('#sidebutton').trigger('click');
        }
        $("#sideout").append(infixToPrefixPseudocode);
    }
}

function invalidEquation(choice) {
    let visualizeBtn = document.getElementById("visualizeBtn")
    switch(choice) {
        case 1:
            visualizeBtn.innerHTML = "Can't convert infix to infix"
            break;
        case 2:
            visualizeBtn.innerHTML = "Can't convert prefix to prefix"
            break;
        case 3:
            visualizeBtn.innerHTML = "Can't convert postfix to postfix"
            break;
        case 4:
            visualizeBtn.innerHTML = "Currently developing"
            break;
        default:
            visualizeBtn.innerHTML = "invalid"
    }
    
    visualizeBtn.classList.remove("btn-outline-secondary");
    visualizeBtn.classList.add("btn-outline-warning");
}
import infixToPostfixStack from "./Animation/infixToPostfix.js"

export function animate() {
    expressionToInput()
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

    var dropdownMenuButton = document.getElementById("dropdownMenuButtonConvert")

    if (dropdownMenuButton.classList.contains("infixConvert")) {
        $('#visualizeBtn').removeClass('disabled')
    }

    if (dropdownMenuButton.classList.contains("prefixConvert")) {
        $('#visualizeBtn').removeClass('disabled')
    }

    if (dropdownMenuButton.classList.contains("postfixConvert")) {
        await infixToPostfixStack()
        $('#visualizeBtn').removeClass('disabled')
    }
}


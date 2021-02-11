export function retrieveFunction() {
    var visualizeBtn = document.getElementById("visualizeBtn")
    
    visualizeBtn.onclick = function () {
      const expressionPlaceholder = document.getElementById("expressionPlaceholder").value
      if(checkExpressionValid(expressionPlaceholder)){
          console.log("conversion began")
      }
    }
}

function checkExpressionValid(expressionPlaceholder) {
    var expression = expressionPlaceholder;
    var dropdownMenuButton = document.getElementById("dropdownMenuButtonType")
    var visualizeBtn = document.getElementById("visualizeBtn")
    var noOperators = 0;
    var noOperands = 0;
    var openBrackets = 0;
    var closeBrackets = 0;

    visualizeBtn.innerHTML = "Visualize"
    visualizeBtn.classList.add("btn-outline-secondary");
    visualizeBtn.classList.remove("btn-outline-warning");

    for (var i = 0; i < expression.length; i++) {
        var expressionChar = expression.charAt(i);

        if(expressionChar.match(/[A-Z]/i)){
            noOperands++;
        }

        if(expressionChar.match(/[+|-|*|\/]/i)){
            noOperators++;
        }

        if(expressionChar.match(/[(]/i)){
            openBrackets++;
        }

        if(expressionChar.match(/[)]/i)){
            closeBrackets++;
        }
    }

    if(noOperands - noOperators !== 1 || closeBrackets != [openBrackets]){
        visualizeBtn.innerHTML = "Invalid Equation"
        visualizeBtn.classList.remove("btn-outline-secondary");
        visualizeBtn.classList.add("btn-outline-warning");
        return false
    }

    if(dropdownMenuButton.classList.contains("infixType")){
        console.log("infix")
    }

    if(dropdownMenuButton.classList.contains("prefixType")){
        console.log("prefix")
    }

    if(dropdownMenuButton.classList.contains("postfixType")){
        console.log("postfix")
    }

    return true
}
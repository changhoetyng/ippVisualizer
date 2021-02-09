export function retrieveFunction() {
    var visualizeBtn = document.getElementById("visualizeBtn")
    
    visualizeBtn.onclick = function () {
        console.log(document.getElementById("dropdownMenuButton").innerHTML)
      const expressionPlaceholder = document.getElementById("expressionPlaceholder").value
      checkExpressionValid(expressionPlaceholder)  
    }
}

function checkExpressionValid(expressionPlaceholder) {
    var expression = expressionPlaceholder;
    var noOperators = 0;
    var noOperands = 0;

    for (var i = 0; i < expression.length; i++) {
        var expressionChar = expression.charAt(i);

        if(expressionChar.match(/[A-Z]/i)){
            noOperands++;
        }

        if(expressionChar.match(/[+|-|*|\/]/i)){
            noOperators++;
        }
    }
}
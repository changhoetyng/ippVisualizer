import { animate } from "./conversion/Animate.js";
var visualizeBtn = document.getElementById("visualizeBtn");
var sidebutton = document.getElementById("sidebutton");

export async function retrieveFunction() {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  sidebutton.onclick = async function () {
    if(!($("#sideout").hasClass("moving"))){
    if ($("#sideout").hasClass("displayNone")) {
      $( "#sideout" ).addClass( "moving" );
      $( "#sideout" ).removeClass( "slideOutRight displayNone" );
      $( "#sideout" ).addClass( "slideInRight" );
      $("#sideout").css("width", "500px");
      $( ".arrow" ).addClass( "right" );
      $( ".arrow" ).removeClass( "left" )
      $( "#sideout" ).removeClass( "moving" );
    } else {
      $( "#sideout" ).addClass( "moving" );
      $( "#sideout" ).addClass( "slideOutRight" );
      $( ".arrow" ).addClass( "left" );
      $( ".arrow" ).removeClass( "right" )
      await timer(1000)
      $("#sideout").css("width", "0");
      $( "#sideout" ).addClass( "displayNone" );
      $( "#sideout" ).removeClass( "moving" );
    }
  }
  };
  visualizeBtn.onclick = function () {
    const expressionPlaceholder = document.getElementById(
      "expressionPlaceholder"
    ).value;
    if (checkExpressionValid(expressionPlaceholder)) {
      $("#visualizeBtn").prop("disabled", true);
      animate();
    }
  };
}

function dropdownCheck() {
  var dropdownMenuButton = document.getElementById("dropdownMenuButtonType");
  var dropdownMenuButtonConvert = document.getElementById(
    "dropdownMenuButtonConvert"
  );

  if (
    !dropdownMenuButton.classList.contains("infixType") &&
    !dropdownMenuButton.classList.contains("prefixType") &&
    !dropdownMenuButton.classList.contains("postfixType")
  ) {
    visualizeBtn.innerHTML = "Please select expression type";
    visualizeBtn.classList.remove("btn-outline-secondary");
    visualizeBtn.classList.add("btn-outline-warning");
    return false;
  }

  if (
    !dropdownMenuButtonConvert.classList.contains("infixConvert") &&
    !dropdownMenuButtonConvert.classList.contains("prefixConvert") &&
    !dropdownMenuButtonConvert.classList.contains("postfixConvert")
  ) {
    visualizeBtn.innerHTML = "Please select convert expression type";
    visualizeBtn.classList.remove("btn-outline-secondary");
    visualizeBtn.classList.add("btn-outline-warning");
    return false;
  }

  return true;
}

function checkExpressionValid(expressionPlaceholder) {
  var expression = expressionPlaceholder;
  var dropdownMenuButton = document.getElementById("dropdownMenuButtonType");
  var visualizeBtn = document.getElementById("visualizeBtn");
  var noOperators = 0;
  var noOperands = 0;
  var openBrackets = 0;
  var closeBrackets = 0;

  visualizeBtn.innerHTML = "Visualize";
  visualizeBtn.classList.add("btn-outline-secondary");
  visualizeBtn.classList.remove("btn-outline-warning");

  if (!dropdownCheck()) {
    return false;
  }

  for (var i = 0; i < expression.length; i++) {
    var expressionChar = expression.charAt(i);

    if (expressionChar.match(/[A-Z]/i)) {
      noOperands++;
    } else if (expressionChar.match(/[+|\-|*|^|\/]/i)) {
      noOperators++;
    } else if (expressionChar.match(/[(]/i)) {
      openBrackets++;
    } else if (expressionChar.match(/[)]/i)) {
      closeBrackets++;
    } else {
      invalidEquation();
      return false;
    }
  }

  if (
    noOperands - noOperators !== 1 ||
    closeBrackets != [openBrackets] ||
    noOperands > 10
  ) {
    invalidEquation();
    return false;
  }

  if (dropdownMenuButton.classList.contains("infixType")) {
    var infix = checkInfix(expression);
    if (!infix) {
      invalidEquation();
      return false;
    }
  }

  if (dropdownMenuButton.classList.contains("prefixType")) {
    var prefix = checkPrefix(expression);
    if (!prefix) {
      invalidEquation();
      return false;
    }
  }

  if (dropdownMenuButton.classList.contains("postfixType")) {
    var postfix = checkPostfix(expression);
    if (!postfix) {
      invalidEquation();
      return false;
    }
  }

  return true;
}

function invalidEquation() {
  visualizeBtn.innerHTML = "Invalid Equation";
  visualizeBtn.classList.remove("btn-outline-secondary");
  visualizeBtn.classList.add("btn-outline-warning");
}

function checkInfix(expression) {
  var check = true;
  for (var i = 0; i < expression.length; i++) {
    var expressionChar = expression.charAt(i);

    if (expressionChar.match(/[A-Z]/i)) {
      if (check == true) check = false;
      else return false;
    }

    if (expressionChar.match(/[+|\-|*|^|\/]/i)) {
      if (check == false) check = true;
      else return false;
    }

    if (expressionChar.match(/[(]/i)) {
      if (check != true) return false;
    }

    if (expressionChar.match(/[)]/i)) {
      if (check != false) return false;
    }
  }
  return true;
}

function checkPrefix(expression) {
  var expressionChar = expression.charAt(0);
  if (expressionChar.match(/[+|\-|*|^|\/]/i)) {
    return true;
  } else {
    return false;
  }
}

function checkPostfix(expression) {
  for (var i = 0; i < expression.length; i++) {
    var expressionChar = expression.charAt(i);

    if (expressionChar.match(/[A-Z]/i)) {
      break;
    }

    if (expressionChar.match(/[(]/i)) {
      continue;
    }

    if (expressionChar.match(/[)]/i)) {
      continue;
    }

    if (expressionChar.match(/[+|\-|*|^|\/]/i)) {
      return false;
    }
  }

  var j = expression.length - 1;

  while (j != 0) {
    var expressionChar = expression.charAt(j);

    if (expressionChar.match(/[A-Z]/i)) {
      return false;
    }

    if (expressionChar.match(/[+|\-|*|^|\/]/i)) {
      break;
    }

    j--;
  }
  return true;
}

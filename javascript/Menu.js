function closeModal() {
    var instructions = document.getElementById("instructions")
    var instructionsBtn = document.getElementById("instructionsBtn")
    var nav = document.getElementById("nav")

    instructionsBtn.onclick = function () {
        instructions.style.opacity = 0;
        nav.style.pointerEvents = 'auto';
    }
}

function selectorType() {
    var infix = document.getElementById("infixSelectType")
    var prefix = document.getElementById("prefixSelectType")
    var postfix = document.getElementById("postfixSelectType")
    var dropdownMenuButton = document.getElementById("dropdownMenuButtonType")
    
    infix.onclick = function () {
        dropdownMenuButton.innerHTML ="Convert Infix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
        dropdownMenuButton.classList.add("infixType");
        dropdownMenuButton.classList.remove("prefixType");
        dropdownMenuButton.classList.remove("postfixType");
    }

    prefix.onclick = function () {
        dropdownMenuButton.innerHTML ="Convert Prefix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
        dropdownMenuButton.classList.add("prefixType");
        dropdownMenuButton.classList.remove("infixType");
        dropdownMenuButton.classList.remove("postfixType");
    }

    postfix.onclick = function () {
        dropdownMenuButton.innerHTML ="Convert Postfix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
        dropdownMenuButton.classList.add("postfixType");
        dropdownMenuButton.classList.remove("prefixType");
        dropdownMenuButton.classList.remove("infixType");
    }
}

function selectorConvert() {
    var infix = document.getElementById("infixSelectConvert")
    var prefix = document.getElementById("prefixSelectConvert")
    var postfix = document.getElementById("postfixSelectConvert")
    var dropdownMenuButton = document.getElementById("dropdownMenuButtonConvert")
    infix.onclick = function () {
        dropdownMenuButton.innerHTML ="To Infix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
        dropdownMenuButton.classList.add("infixConvert");
        dropdownMenuButton.classList.add("prefixConvert");
        dropdownMenuButton.classList.add("postfixConvert");
    }

    prefix.onclick = function () {
        dropdownMenuButton.innerHTML ="To Prefix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
        dropdownMenuButton.classList.add("prefixConvert");
        dropdownMenuButton.classList.add("infixConvert");
        dropdownMenuButton.classList.add("postfixConvert");
    }

    postfix.onclick = function () {
        dropdownMenuButton.innerHTML ="To Postfix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
        dropdownMenuButton.classList.add("postfixConvert");
        dropdownMenuButton.classList.add("infixConvert");
        dropdownMenuButton.classList.add("prefixConvert");
    }
}

export function menu(){
    closeModal()
    selectorType()
    selectorConvert()
}
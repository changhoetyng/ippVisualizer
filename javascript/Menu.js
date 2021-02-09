function closeModal() {
    var instructions = document.getElementById("instructions")
    var instructionsBtn = document.getElementById("instructionsBtn")
    var nav = document.getElementById("nav")

    instructionsBtn.onclick = function () {
        instructions.style.opacity = 0;
        nav.style.pointerEvents = 'auto';
    }
}

function selector() {
    var infix = document.getElementById("infixSelect")
    var prefix = document.getElementById("prefixSelect")
    var postfix = document.getElementById("postfixSelect")

    infix.onclick = function () {
        document.getElementById("dropdownMenuButton").innerHTML ="Infix Expression";
    }

    prefix.onclick = function () {
        document.getElementById("dropdownMenuButton").innerHTML ="Prefix Expression";
    }

    postfix.onclick = function () {
        document.getElementById("dropdownMenuButton").innerHTML ="Postfix Expression";
    }
}

export function menu(){
    closeModal()
    selector()
}
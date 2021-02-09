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
    var dropdownMenuButton = document.getElementById("dropdownMenuButton")
    
    infix.onclick = function () {
        dropdownMenuButton.innerHTML ="Infix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
    }

    prefix.onclick = function () {
        dropdownMenuButton.innerHTML ="Prefix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
    }

    postfix.onclick = function () {
        dropdownMenuButton.innerHTML ="Postfix Expression";
        dropdownMenuButton.classList.remove("btn-secondary");
        dropdownMenuButton.classList.add("btn-success");
    }
}

export function menu(){
    closeModal()
    selector()
}
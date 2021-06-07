export default async function infixToPostfixStack() {
    var inputStack = document.getElementsByClassName("dispExpression")

    var index = 0
    var duration = 2000

    var yValueInputToStack = 451
    var xValueInputToStack = 0

    var yValueStackToOutput = 451
    var xValueStackToOutput = 0

    var yValueInputToOutput = 40
    var xValueInputToOutput = 41
    var xValueInputToOutput2 = 0
    var yValueInputToOutput2 = 523


    const timer = ms => new Promise(res => setTimeout(res, ms))

    // REPORT
    let stack = []
    let top = 0
    let output = []

    function push(element) {
        stack[top] = element;
        top = top + 1;
    }

    function pop() {
        top = top - 1;
        return data.pop();
    }

    function peek() {
        return data[top - 1];
    }

    function isEmpty() {
        return this.items.length == 0;
    }

    function prec(x){ 
        if(c == '^') 
        return 3; 
        else if(c == '*' || c == '/') 
        return 2; 
        else if(c == '+' || c == '-') 
        return 1; 
        else
        return -1; 
    } 

    for (const input of inputStack) {
        if (input.innerHTML.match(/[A-Z]/i)) {
            //  operands moving color
            input.style.color = "var(--main-color)"
            input.style.backgroundColor = "#E56B6B"
            input.animate([
                { transform: 'translateX(0px)', offset: 0.0 },
                { transform: 'translateY(' + yValueInputToOutput + 'px) translateX(' + 0 + 'px)', offset: 0.1 },
                { transform: 'translateY(' + yValueInputToOutput + 'px) translateX(' + xValueInputToOutput + 'px)', offset: 0.3 },
                { transform: 'translateY(' + yValueInputToOutput2 + 'px) translateX(' + xValueInputToOutput + 'px)', offset: 0.9 },
                { transform: 'translateY(' + yValueInputToOutput2 + 'px) translateX(' + xValueInputToOutput2 + 'px)', offset: 1.0 }
            ], {
                duration: 2000,
                fill: "forwards"
            })
            yValueInputToOutput = 0
            xValueInputToOutput = 0
            xValueInputToOutput2 -= 40
            xValueInputToStack -= 40
            await timer(duration)
            input.style.color = "black"
            input.style.backgroundColor = "var(--main-color)"
        }

        if (input.innerHTML.match(/[+|\-|*|\/]/i)) {
            if(isEmpty){
                push(input.innerHTML)
            } else {
                let inputPrec = prec(input.innerHTML)
                let peekPrec = prec(peek())
                if(inputPrec > peekPrec){
                    push(input.innerHTML)
                } else {
                    while(inputPrec <= peekPrec && !isEmpty){
                        const popElement = pop()
                        output.push(popElement)
                        peekPrec = prec(peek())
                    }
                }
            }
            
            // operators moving color
            input.style.color = "var(--main-color)" 
            input.style.backgroundColor = "var(--caret-color)"
            input.animate([
                { transform: 'translateX(0px)', offset: 0.0 },
                { transform: 'translateY(0px) translateX(' + xValueInputToStack + 'px)', offset: 0.3 },
                { transform: 'translateY(' + yValueInputToStack + 'px) translateX(' + xValueInputToStack + 'px)', offset: 1.0 }
            ], {
                duration: 2000,
                fill: "forwards"
            })
            xValueInputToStack -= 40
            yValueInputToStack -= 40
            await timer(duration)
            input.style.color = "black"
            input.style.backgroundColor = "var(--main-color)"
            console.log(stack)
        }

        index += 1
    }
}
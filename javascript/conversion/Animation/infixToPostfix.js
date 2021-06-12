export default async function infixToPostfixStack() {
    var inputStack = document.getElementsByClassName("dispExpression")

    var index = 0
    var duration = 2000

    var yValueInputToStack = 451
    var xValueInputToStack = 0

    var yValueInputToOutput = 40
    var xValueInputToOutput = 41
    var xValueInputToOutput2 = 0
    var yValueInputToOutput2 = 523


    const timer = ms => new Promise(res => setTimeout(res, ms))

    // REPORT
    let firstOps = true
    let stackIndex = []
    let stack = []
    let top = 0
    let output = []

    async function inStackAnimation(input) {
        // operators moving color
        input.style.color = "black"
        input.style.backgroundColor = "var(--sub-color)"
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

    async function outStackAnimation(axis) {
        var indexJson = stackIndex[stackIndex.length - 1]
        console.log(xValueInputToOutput2)
        var test = axis + xValueInputToOutput2
        // operators moving color
        let input = inputStack[indexJson.index]
        input.style.transform = "none"
        input.style.color = "black"
        input.style.backgroundColor = "var(--sub-color)"
        input.animate([
            { transform: 'translateY(' + indexJson.yValueInputToStack + 'px) translateX(' + indexJson.xValueInputToStack + 'px)', offset: 0.0 },
            { transform: 'translateY(' + 48 + 'px) translateX(' + indexJson.xValueInputToStack + 'px)', offset: 0.3 },
            { transform: 'translateY(' + 48 + 'px) translateX(' + 0 + 'px)', offset: 0.6 },
            { transform: 'translateY(' + yValueInputToOutput2 + 'px) translateX(' + test + 'px)', offset: 1.0 },
        ], {
            duration: 2000,
            fill: "forwards"
        })
        yValueInputToOutput = 0
        xValueInputToOutput = 0
        xValueInputToOutput2 += 40
        xValueInputToStack += 40
        await timer(duration)
        input.style.color = "black"
        input.style.backgroundColor = "var(--main-color)"
        stackIndex.pop()
    }

    function push(element) {
        stack[top] = element;
        top = top + 1;
    }

    function pop() {
        top = top - 1;
        return stack.pop();
    }

    function peek() {
        return stack[top - 1];
    }

    function isEmpty() {
        return stack.length == 0;
    }

    function prec(c) {
        if (c == '^')
            return 3;
        else if (c == '*' || c == '/')
            return 2;
        else if (c == '+' || c == '-')
            return 1;
        else
            return -1;
    }

    var axis = 0

    for (const input of inputStack) {
        if (input.innerHTML.match(/[A-Z]/i)) {
            firstOps = false
            //  operands moving color
            input.style.color = "black"
            input.style.backgroundColor = "var(--sub-color)"
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

        if (input.innerHTML.match(/[+|\-|*|\/|\(]/i)) {
            if (firstOps) {
                // Reset if first is bracket
                yValueInputToOutput = 0
                xValueInputToOutput = 0
                xValueInputToOutput2 -= 40
            }

            if (isEmpty()) {
                push(input.innerHTML)
                stackIndex.push({ index, yValueInputToStack, xValueInputToStack })
                await inStackAnimation(input)
            } else {
                console.log("mom")
                let inputPrec = prec(input.innerHTML)
                let peekPrec = prec(peek())
                console.log(inputPrec)
                console.log(peekPrec)
                if (inputPrec > peekPrec) {
                    console.log(input.innerHTML)
                    console.log("hewwo")
                    push(input.innerHTML)
                    stackIndex.push({ index, yValueInputToStack, xValueInputToStack })
                    await inStackAnimation(input)
                } else {
                    while (inputPrec <= peekPrec && !isEmpty()) {
                        axis += 120
                        await outStackAnimation(axis)
                        const popElement = pop()
                        output.push(popElement)
                        peekPrec = prec(peek())
                    }
                }
            }
        }

        if (input.innerHTML.match(/[\(]/i)) {
            while (!isEmpty()) {
                axis += 120
                await outStackAnimation(axis)
                pop()
            }
        }

        if (input.innerHTML.match(/[\)]/i)) {
            while (!isEmpty()) {
                axis += 120
                await outStackAnimation(axis)
                pop()
            }
        }

        index += 1
    }



    while (!isEmpty()) {
        axis += 120
        await outStackAnimation(axis)
        pop()
    }
}
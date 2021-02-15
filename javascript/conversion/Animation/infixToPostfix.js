export default async function infixToPostfixStack() {
    var inputStack = document.getElementsByClassName("dispExpression")

    var duration = 2000
    var yValue = 451   
    var xValue = 0

    const timer = ms => new Promise(res => setTimeout(res, ms))

    for (const input of inputStack) {
            input.style.color = "white"
            input.style.backgroundColor = "#E56B6B"
            input.animate([
                { transform: 'translateX(0px)', offset: 0.0 },
                { transform: 'translateY(0px) translateX(' + xValue + 'px)', offset: 0.3 },
                { transform: 'translateY(' + yValue + 'px) translateX(' + xValue + 'px)', offset: 1.0 }
            ], {
                duration: 2000,
                fill: "forwards"
            })
            xValue -= 40
            yValue -= 40
        await timer(duration)
        input.style.color = "black"
        input.style.backgroundColor = "#A0A0A0"
    }
}
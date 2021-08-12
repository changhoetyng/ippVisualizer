const timer = (ms) => new Promise((res) => setTimeout(res, ms));
export async function reverseAnimation() {
    var inputStack = document.getElementsByClassName("dispExpression");

    var testStack = []

    $('.dispExpression').each(function(){
        if($(this).text() === ")") {
            testStack.push("(")
        } else if($(this).text() === "(") {
            testStack.push(")")
        } else {
            testStack.push($(this).text())
        }
    })

    testStack.reverse()

    testStack.forEach(async (element, index) => {
        inputStack[index].innerHTML = element
    });
    await timer(1000)
}
export async function reverseAnimationOutput() {
    var inputStack = document.getElementsByClassName("outExpression");

    var testStack = []

    $('.outExpression').each(function(){
        if($(this).text() === ")") {
            testStack.push("(")
        } else if($(this).text() === "(") {
            testStack.push(")")
        } else {
            testStack.push($(this).text())
        }
    })

    testStack.reverse()

    testStack.forEach((element, index) => {
        inputStack[index].innerHTML = element
    });
    await timer(1000)
}
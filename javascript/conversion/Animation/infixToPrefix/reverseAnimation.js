export default async function reverseAnimation() {
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

    testStack.forEach((element, index) => {
        inputStack[index].innerHTML = element
    });

    console.log(testStack)
}
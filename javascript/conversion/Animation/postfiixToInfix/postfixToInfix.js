export default async function postfixToInfix() {

    var duration = 2000;

    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    var inputStack = document.getElementsByClassName("dispExpression");
    for (var indexStack = 0; indexStack < inputStack.length; indexStack++) {
        let input = inputStack[indexStack]

        if (input.innerHTML.match(/[A-Z]/i)) {
            //  operands moving color
            input.style.color = "black";
            input.style.backgroundColor = "var(--sub-color)";
            input.animate(
              [
                { transform: "translateX(0px)", offset: 0.0 },
                {
                  transform:
                    "translateY(" +
                    0 +
                    "px) translateX(" +
                    0 +
                    "px)",
                  offset: 0.5,
                },
                {
                  transform:
                    "translateY(" +
                    96 +
                    "px) translateX(" +
                    0 +
                    "px)",
                  offset: 1.0,
                },
              ],
              {
                duration: 2000,
                fill: "forwards",
              }
            );
            await timer(duration);
            input.style.color = "black";
            input.style.backgroundColor = "var(--main-color)";
          }
    }
}
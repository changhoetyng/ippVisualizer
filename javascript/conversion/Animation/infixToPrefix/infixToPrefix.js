export default async function infixToPostfixStack() {
    var inputStack = document.getElementsByClassName("dispExpression");
  
    var index = 0;
    var duration = 2000;
  
    var yValueInputToStack = 451;
    var xValueInputToStack = 0;
  
    var yValueInputToOutput = 40;
    var xValueInputToOutput = 41;
    var xValueInputToOutput2 = 0;
    var yValueInputToOutput2 = 523;
  
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  
    // REPORT
    let firstOps = true;
    let bracketStackIndex = []
    let stackIndex = [];
    let stack = [];
    let top = 0;
    let output = [];
  
  
    async function inStackAnimation(input) {
      // operators moving color
      input.style.color = "black";
      input.style.backgroundColor = "var(--sub-color)";
      input.animate(
        [
          { transform: "translateX(0px)", offset: 0.0 },
          {
            transform: "translateY(0px) translateX(" + xValueInputToStack + "px)",
            offset: 0.3,
          },
          {
            transform:
              "translateY(" +
              yValueInputToStack +
              "px) translateX(" +
              xValueInputToStack +
              "px)",
            offset: 1.0,
          },
        ],
        {
          duration: 2000,
          fill: "forwards",
        }
      );
      xValueInputToStack -= 40;
      yValueInputToStack -= 40;
      await timer(duration);
      input.style.color = "black";
      input.style.backgroundColor = "var(--main-color)";
    }
  
    async function outStackAnimation(axis, ap) {
      var indexJson = stackIndex[stackIndex.length - 1];
      let input = inputStack[indexJson.index];
  
      var test = axis + ap + indexJson.stackMove;
      // operators moving color
      input.style.transform = "none";
      input.style.color = "black";
      input.style.backgroundColor = "var(--sub-color)";
      input.animate(
        [
          {
            transform:
              "translateY(" +
              indexJson.yValueInputToStack +
              "px) translateX(" +
              indexJson.xValueInputToStack +
              "px)",
            offset: 0.0,
          },
          {
            transform:
              "translateY(" +
              48 +
              "px) translateX(" +
              indexJson.xValueInputToStack +
              "px)",
            offset: 0.3,
          },
          {
            transform: "translateY(" + 48 + "px) translateX(" + 0 + "px)",
            offset: 0.6,
          },
          {
            transform:
              "translateY(" +
              yValueInputToOutput2 +
              "px) translateX(" +
              test +
              "px)",
            offset: 1.0,
          },
        ],
        {
          duration: 2000,
          fill: "forwards",
        }
      );
      yValueInputToOutput = 0;
      xValueInputToOutput = 0;
      xValueInputToOutput2 += 40;
      yValueInputToStack += 40;
      await timer(duration);
      input.style.color = "black";
      input.style.backgroundColor = "var(--main-color)";
      stackIndex.pop();
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
      if (c == "^") return 3;
      else if (c == "*" || c == "/") return 2;
      else if (c == "+" || c == "-") return 1;
      else return -1;
    }
  
    function calcStackMove(input) {
      if (!isEmpty() && prec(peek()) === prec(input)) {
  
        for (var i = stack.length - 1; i >= 0; i--) {
          if (prec(stack[i]) !== prec(input)) {
            stackIndex[i].stackMove += 80;
          }
        }
      }
    }
  
    for (const input of inputStack) {
      let axis = 0;
      if (input.innerHTML.match(/[A-Z]/i)) {
  
        firstOps = false;
        //  operands moving color
        input.style.color = "black";
        input.style.backgroundColor = "var(--sub-color)";
        input.animate(
          [
            { transform: "translateX(0px)", offset: 0.0 },
            {
              transform:
                "translateY(" +
                yValueInputToOutput +
                "px) translateX(" +
                0 +
                "px)",
              offset: 0.1,
            },
            {
              transform:
                "translateY(" +
                yValueInputToOutput +
                "px) translateX(" +
                xValueInputToOutput +
                "px)",
              offset: 0.3,
            },
            {
              transform:
                "translateY(" +
                yValueInputToOutput2 +
                "px) translateX(" +
                xValueInputToOutput +
                "px)",
              offset: 0.9,
            },
            {
              transform:
                "translateY(" +
                yValueInputToOutput2 +
                "px) translateX(" +
                xValueInputToOutput2 +
                "px)",
              offset: 1.0,
            },
          ],
          {
            duration: 2000,
            fill: "forwards",
          }
        );
        yValueInputToOutput = 0;
        xValueInputToOutput = 0;
        xValueInputToOutput2 -= 40;
        xValueInputToStack -= 40;
        await timer(duration);
        input.style.color = "black";
        input.style.backgroundColor = "var(--main-color)";
      }
  
      if (input.innerHTML.match(/[+|\-|*|^|\/]/i)) {
        if (firstOps) {
          // Reset if first is bracket
          yValueInputToOutput = 0;
          xValueInputToOutput = 0;
          xValueInputToOutput2 -= 40;
        }
  
        if (isEmpty()) {
          calcStackMove(input.innerHTML)
          push(input.innerHTML);
          stackIndex.push({ index, yValueInputToStack, xValueInputToStack, stackMove: 0 });
          await inStackAnimation(input);
        } else {
          let inputPrec = prec(input.innerHTML);
          let peekPrec = prec(peek());
          if (inputPrec > peekPrec) {
            calcStackMove(input.innerHTML)
            push(input.innerHTML);
            stackIndex.push({ index, yValueInputToStack, xValueInputToStack, stackMove: 0 });
            await inStackAnimation(input);
          } else {
            var ap = xValueInputToOutput2
            calcStackMove(input.innerHTML)
            while (inputPrec <= peekPrec && !isEmpty()) {
              axis += 120;
              await outStackAnimation(axis, ap);
              const popElement = pop();
              output.push(popElement);
              peekPrec = prec(peek());
  
            }
            push(input.innerHTML);
            stackIndex.push({ index, yValueInputToStack, xValueInputToStack, stackMove: 0 });
            await inStackAnimation(input);
          }
        }
      }
  
      if (input.innerHTML.match(/[\(]/i)) {
        let tempArray = []
        let tempStackIndex = []
  
        // OPEN BRACKET
        while (!isEmpty()) {
          tempArray.push(pop())
          tempStackIndex.push(stackIndex.pop());
        }
  
        bracketStackIndex.push({ tempArray: tempArray, tempStackIndex: tempStackIndex })
  
  
  
        $("#bracketDisp").append("<div class='brackets scale-up-left'>(</div>");
        input.classList.remove("scale-up-left");
        input.classList.add("scale-out-left");
        yValueInputToOutput = 0;
        xValueInputToOutput = 0;
        xValueInputToOutput2 -= 40;
        xValueInputToStack -= 40;
        await timer(duration);
      }
  
      if (input.innerHTML.match(/[\)]/i)) {
        var closeBracket = document.getElementsByClassName("brackets");
        input.classList.remove("scale-up-left");
        input.classList.add("scale-out-left");
        closeBracket[0].classList.remove("scale-up-left");
        closeBracket[0].classList.add("scale-out-left");
        let axis = 0;
        var ap = xValueInputToOutput2
        var outInBracketAlignment = 0
  
        while (!isEmpty()) {
          axis += 120
          await outStackAnimation(axis, ap)
          pop()
          outInBracketAlignment -= 40
        }
        let pushBackStackIndex = bracketStackIndex.pop()
  
  
        for (var i = pushBackStackIndex.tempStackIndex.length; i > 0; i--) {
          stackIndex.push(pushBackStackIndex.tempStackIndex.pop())
        }
  
        for (var i = pushBackStackIndex.tempArray.length; i > 0; i--) {
          push(pushBackStackIndex.tempArray.pop())
          outInBracketAlignment += 40
        }
  
        await timer(duration);
        closeBracket[0].remove();
        var ap = xValueInputToOutput2 + outInBracketAlignment
  
        while (!isEmpty()) {
          axis += 120;
          await outStackAnimation(axis, ap);
          pop();
        }
        yValueInputToOutput = 0;
        xValueInputToOutput = 0;
        xValueInputToOutput2 -= 40;
        xValueInputToStack -= 40;
      }
  
      index += 1;
    }
    let axis = 0;
    var ap = xValueInputToOutput2
    while (!isEmpty()) {
      axis += 120
      await outStackAnimation(axis, ap)
      pop()
    }
  }
  
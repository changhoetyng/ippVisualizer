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
  let numberOfPops = 0;
  let numOfOpenBrac = 0;
  let totalOpsEndBrac = 0;
  let numOfOps = 0;
  let prevNumOps = 0;
  let gotOutBrac = false

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
    gotOutBrac = false
    var indexJson = stackIndex[stackIndex.length - 1];
    let input = inputStack[indexJson.index];

    var test = axis + ap + indexJson.stackMove + indexJson.bracOffset;
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

  for (var indexStack = 0; indexStack < inputStack.length; indexStack++) {
    let input = inputStack[indexStack]

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
      numOfOps += 1
      if (isEmpty()) {
        calcStackMove(input.innerHTML)
        push(input.innerHTML);
        stackIndex.push({ index, yValueInputToStack, xValueInputToStack, stackMove: 0, bracOffset: prevNumOps * -80});
        await inStackAnimation(input);
      } else {
        let inputPrec = prec(input.innerHTML);
        let peekPrec = prec(peek());
        let peekPrecBefore = prec(peek())
        if (inputPrec > peekPrec) {
          calcStackMove(input.innerHTML)
          push(input.innerHTML);
          if (gotOutBrac) {
            stackIndex.push({ index, yValueInputToStack, xValueInputToStack, stackMove: 0, bracOffset:  0});
          } else {
            stackIndex.push({ index, yValueInputToStack, xValueInputToStack, stackMove: 0, bracOffset: prevNumOps * -80});
          }
          await inStackAnimation(input);
        } else {
          var ap = xValueInputToOutput2
          let outBr = gotOutBrac
          calcStackMove(input.innerHTML)
          while (inputPrec <= peekPrec && !isEmpty()) {
            numberOfPops += 1;
            axis += 120;
            await outStackAnimation(axis, ap);
            const popElement = pop();
            output.push(popElement);
            peekPrec = prec(peek());

          }
          push(input.innerHTML);
          if(outBr && inputPrec === peekPrecBefore) {
            stackIndex.push({ index, yValueInputToStack, xValueInputToStack, stackMove: 0, bracOffset: (prevNumOps * -80) + 80});
          } else {
            stackIndex.push({ index, yValueInputToStack, xValueInputToStack, stackMove: 0, bracOffset: prevNumOps * -80});
          }
          
          await inStackAnimation(input);
        }
      }
    }

    if (input.innerHTML.match(/[\(]/i)) {
      numOfOpenBrac += 1;

      let tempArray = []
      let tempStackIndex = []
      // OPEN BRACKET
      while (!isEmpty()) {
        tempArray.push(pop())
        tempStackIndex.push(stackIndex.pop());
      }

      bracketStackIndex.push({ tempArray: tempArray, tempStackIndex: tempStackIndex, numberOfPops: numberOfPops, numOfOps: numOfOps })
      indexStack--;
      numberOfPops = 0;
      numOfOps = 0;

      $("#bracketDisp").append("<div class='brackets scale-up-left'>(</div>");
      input.classList.remove("scale-up-left");
      input.classList.add("scale-out-left");
      input.remove();
      continue;
    }

    if (input.innerHTML.match(/[\)]/i)) {
      var closeBracket = document.getElementsByClassName("brackets");
      input.classList.remove("scale-up-left");
      input.classList.add("scale-out-left");
      input.remove();
      closeBracket[0].classList.remove("scale-up-left");
      closeBracket[0].classList.add("scale-out-left");
      let axis = 0;
      var ap = xValueInputToOutput2 + (prevNumOps * 80);
      var outInBracketAlignment = 0
      totalOpsEndBrac = 0;

      while (!isEmpty()) {
        totalOpsEndBrac += 1
        axis += 120
        await outStackAnimation(axis, ap)
        pop()
        outInBracketAlignment -= 40
      }
      let pushBackStackIndex = bracketStackIndex.pop()

      prevNumOps += numOfOps
      numOfOps = pushBackStackIndex.numOfOps;

      numberOfPops = bracketStackIndex.numberOfPops

      if(!inputStack[indexStack] || inputStack[indexStack].innerHTML === ")") {
        for (var i = pushBackStackIndex.tempStackIndex.length; i > 0; i--) {
          let tempPop = pushBackStackIndex.tempStackIndex.pop();
          stackIndex.push(tempPop);
        }
  
        for (var i = pushBackStackIndex.tempArray.length; i > 0; i--) {
          push(pushBackStackIndex.tempArray.pop())
          outInBracketAlignment += 40
        }
      } else {
        for (var i = pushBackStackIndex.tempStackIndex.length; i > 0; i--) {
          let tempPop = pushBackStackIndex.tempStackIndex.pop();
          tempPop.bracOffset += prevNumOps*80
          stackIndex.push(tempPop);
        }
  
        for (var i = pushBackStackIndex.tempArray.length; i > 0; i--) {
          push(pushBackStackIndex.tempArray.pop())
          outInBracketAlignment += 40
        }
      }

      closeBracket[0].remove();
      indexStack--;
      gotOutBrac = true
      continue;
    }

    index += 1;
  }

  let loop = 0;

  while (!isEmpty()) {
    let axis = 0;
    var ap = xValueInputToOutput2 + (prevNumOps * 80) + loop;
    loop += 80;
    axis += 120
    await outStackAnimation(axis, ap)
    pop()

  }
}

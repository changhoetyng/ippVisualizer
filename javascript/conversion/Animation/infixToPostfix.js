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
  let bracketStackIndex = [];
  let stackIndex = [];
  let stack = [];
  let top = 0;
  let output = [];
  let numberOfPops = 0;
  let numOfOpenBrac = 0;
  let totalOpsEndBrac = 0;
  let numOfOps = 0;
  let prevNumOps = 0;
  let gotOutBrac = false;
  let insideStack = [];

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
    gotOutBrac = false;
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

  $("#sideout").animate({ scrollTop: $("#lineOne").height() - 80 }, 250);
  $("#lineOne").addClass("conditionalActive");
  await timer(250);

  for (var indexStack = 0; indexStack < inputStack.length; indexStack++) {
    let input = inputStack[indexStack];

    let axis = 0;
    if (input.innerHTML.match(/[A-Z]/i)) {
      await $("#sideout").animate(
        { scrollTop: $("#lineTwentyOne").height() + 200 },
        500
      );
      $("#lineTwentyOne").addClass("conditionalActive");
      $("#lineTwentyTwo").addClass("pseudocodeActive");
      await timer(500);

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
      $("#lineTwentyOne").removeClass("conditionalActive");
      $("#lineTwentyTwo").removeClass("pseudocodeActive");
    }

    if (input.innerHTML.match(/[+|\-|*|^|\/]/i)) {
      $("#sideout").animate({ scrollTop: $("#lineOne").height() - 80 }, 500);
      $("#lineTwo").addClass("conditionalActive");
      await timer(500);
      numOfOps += 1;
      if (isEmpty()) {
        $("#sideout").animate({ scrollTop: $("#lineOne").height() - 80 }, 500);
        $("#lineThree").addClass("conditionalActive");
        $("#lineFour").addClass("pseudocodeActive");
        await timer(500);

        calcStackMove(input.innerHTML);
        push(input.innerHTML);
        stackIndex.push({
          index,
          yValueInputToStack,
          xValueInputToStack,
          stackMove: 0,
          bracOffset: prevNumOps * -80,
        });
        insideStack.push(input.innerHTML);
        await inStackAnimation(input);
        $("#lineThree").removeClass("conditionalActive");
        $("#lineFour").removeClass("pseudocodeActive");
      } else {
        $("#sideout").animate({ scrollTop: $("#lineOne").height() - 80 }, 500);
        $("#lineFive").addClass("conditionalActive");
        await timer(500);
        let inputPrec = prec(input.innerHTML);
        let peekPrec = prec(peek());
        let peekPrecBefore = prec(peek());
        if (inputPrec > peekPrec) {
          $("#lineSix").addClass("conditionalActive");
          $("#lineSeven").addClass("pseudocodeActive");
          calcStackMove(input.innerHTML);
          push(input.innerHTML);
          if (gotOutBrac) {
            stackIndex.push({
              index,
              yValueInputToStack,
              xValueInputToStack,
              stackMove: 0,
              bracOffset: 0,
            });
          } else {
            stackIndex.push({
              index,
              yValueInputToStack,
              xValueInputToStack,
              stackMove: 0,
              bracOffset: prevNumOps * -80,
            });
          }
          insideStack.push(input.innerHTML);
          await inStackAnimation(input);
          $("#lineSix").removeClass("conditionalActive");
          $("#lineSeven").removeClass("pseudocodeActive");
        } else {
          $("#lineNine").addClass("conditionalActive");
          var ap = xValueInputToOutput2;
          let outBr = gotOutBrac;
          calcStackMove(input.innerHTML);
          $("#lineTen").addClass("conditionalActive");
          $("#lineEleven").addClass("pseudocodeActive");
          while (inputPrec <= peekPrec && !isEmpty()) {
            numberOfPops += 1;
            axis += 120;
            insideStack.pop();
            await outStackAnimation(axis, ap);
            const popElement = pop();
            output.push(popElement);
            peekPrec = prec(peek());
          }
          $("#lineTen").removeClass("conditionalActive");
          $("#lineEleven").removeClass("pseudocodeActive");
          push(input.innerHTML);
          if (outBr && inputPrec === peekPrecBefore) {
            stackIndex.push({
              index,
              yValueInputToStack,
              xValueInputToStack,
              stackMove: 0,
              bracOffset: prevNumOps * -80 + 80,
            });
          } else {
            stackIndex.push({
              index,
              yValueInputToStack,
              xValueInputToStack,
              stackMove: 0,
              bracOffset: prevNumOps * -80,
            });
          }
          insideStack.push(input.innerHTML);
          await inStackAnimation(input);
          $("#lineNine").removeClass("conditionalActive");
        }
        $("#lineFive").removeClass("conditionalActive");
      }
      $("#lineTwo").removeClass("conditionalActive");
    }

    if (input.innerHTML.match(/[\(]/i)) {
      numOfOpenBrac += 1;
      await $("#sideout").animate(
        { scrollTop: $("#lineFourteen").height() + 200 },
        500
      );
      $("#lineFourteen").addClass("conditionalActive");
      $("#lineFifteen").addClass("pseudocodeActive");
      await timer(500);
      let tempArray = [];
      let tempStackIndex = [];
      // OPEN BRACKET
      while (!isEmpty()) {
        tempArray.push(pop());
        tempStackIndex.push(stackIndex.pop());
      }

      bracketStackIndex.push({
        tempArray: tempArray,
        tempStackIndex: tempStackIndex,
        numberOfPops: numberOfPops,
        numOfOps: numOfOps,
      });

      numberOfPops = 0;
      numOfOps = 0;

      const appendHtml = `
      <div class="bracketWrapper">
        <div class='brackets scale-up-left'>(</div>
        <div class='positionInStack scale-up-left mt-3'>${
          insideStack[insideStack.length - 1]
            ? insideStack[insideStack.length - 1]
            : "0"
        }</div>
      </div>
      `;

      $("#bracketDisp").append(appendHtml);
      input.classList.remove("scale-up-left");
      input.classList.add("scale-out-left");
      console.log(indexStack);
      indexStack--;
      input.remove();
      await timer(500);
      $("#lineFourteen").removeClass("conditionalActive");
      $("#lineFifteen").removeClass("pseudocodeActive");
      continue;
    }

    if (input.innerHTML.match(/[\)]/i)) {
      await $("#sideout").animate(
        { scrollTop: $("#lineSeventeen").height() + 200 },
        500
      );
      $("#lineSeventeen").addClass("conditionalActive");
      $("#lineEighteen").addClass("pseudocodeActive");
      await timer(500);
      var closeBracket = document.getElementsByClassName("brackets");
      var closeLength = document.getElementsByClassName("positionInStack");
      var bracketWrapper = document.getElementsByClassName("bracketWrapper");

      let axis = 0;
      var ap = xValueInputToOutput2 + prevNumOps * 80;
      var outInBracketAlignment = 0;
      totalOpsEndBrac = 0;

      while (!isEmpty()) {
        totalOpsEndBrac += 1;
        axis += 120;
        insideStack.pop();
        await outStackAnimation(axis, ap);
        pop();
        outInBracketAlignment -= 40;
      }

      let pushBackStackIndex = bracketStackIndex.pop();

      prevNumOps += numOfOps;
      numOfOps = pushBackStackIndex.numOfOps;

      numberOfPops = bracketStackIndex.numberOfPops;

      if (!inputStack[indexStack] || inputStack[indexStack].innerHTML === ")") {
        for (var i = pushBackStackIndex.tempStackIndex.length; i > 0; i--) {
          let tempPop = pushBackStackIndex.tempStackIndex.pop();
          stackIndex.push(tempPop);
        }

        for (var i = pushBackStackIndex.tempArray.length; i > 0; i--) {
          push(pushBackStackIndex.tempArray.pop());
          outInBracketAlignment += 40;
        }
      } else {
        for (var i = pushBackStackIndex.tempStackIndex.length; i > 0; i--) {
          let tempPop = pushBackStackIndex.tempStackIndex.pop();
          tempPop.bracOffset += prevNumOps * 80;
          stackIndex.push(tempPop);
        }

        for (var i = pushBackStackIndex.tempArray.length; i > 0; i--) {
          push(pushBackStackIndex.tempArray.pop());
          outInBracketAlignment += 40;
        }
      }
      await timer(150);
      closeBracket[closeBracket.length - 1].classList.remove("scale-up-left");
      closeBracket[closeBracket.length - 1].classList.add("scale-out-left");
      closeLength[closeLength.length - 1].classList.remove("scale-up-left");
      closeLength[closeLength.length - 1].classList.add("scale-out-left");
      await timer(500);

      indexStack--;
      input.classList.remove("scale-up-left");
      input.classList.add("scale-out-left");
      input.remove();
      closeBracket[closeBracket.length - 1].remove();
      closeLength[closeLength.length - 1].remove();
      bracketWrapper[bracketWrapper.length - 1].remove();

      gotOutBrac = true;
      $("#lineSeventeen").addClass("conditionalActive");
      $("#lineEighteen").addClass("pseudocodeActive");
      continue;
    }

    index += 1;
  }
  $("#lineOne").removeClass("conditionalActive");
  let loop = 0;

  if (!isEmpty()) {
    await $("#sideout").animate(
      { scrollTop: $("#lineTwentyFive").height() + 500 },
      500
    );
    $("#lineTwentyFive").addClass("conditionalActive");
    $("#lineTwentySix").addClass("pseudocodeActive");
    await timer(500);
  }

  while (!isEmpty()) {
    let axis = 0;
    var ap = xValueInputToOutput2 + prevNumOps * 80 + loop;
    loop += 80;
    axis += 120;
    insideStack.pop();
    await outStackAnimation(axis, ap);
    pop();
  }

  $("#lineTwentyFive").removeClass("conditionalActive");
  $("#lineTwentySix").removeClass("pseudocodeActive");
}

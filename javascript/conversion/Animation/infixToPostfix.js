export default async function infixToPostfixStack() {
  let stack = [];
  let top = 0;
  let firstOps = true;
  var yValueInputToOutput = 40;
  var xValueInputToOutput = 41;
  var yValueInputToOutput2 = 604;
  var xValueInputToOutput2 = 0;
  var xValueInputToStack = 0;
  var yValueInputToStack = 532;
  const duration = 2000;

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  async function outStackAnimation() {
    pop();
    let outStack = document
      .getElementById("outputDisp")
      .getElementsByClassName("dispExpression");

    let stack = document
      .getElementById("stackPos")
      .getElementsByClassName("dispExpression");

    let inStack = stack[0];

    inStack.style.color = "black";
    inStack.style.backgroundColor = "var(--sub-color)";
    inStack.animate(
      [
        { transform: "translateX(0px)", offset: 0.0 },
        {
          transform:
            "translateY(" + -yValueInputToStack + "px) translateX(" + 0 + "px)",
          offset: 0.3,
        },
        {
          transform:
            "translateY(" +
            -yValueInputToStack +
            "px) translateX(" +
            outStack.length * 40 +
            "px)",
          offset: 0.7,
        },
        {
          transform:
            "translateY(" +
            ((stack.length - 1) * 40 + 74) +
            "px) translateX(" +
            outStack.length * 40 +
            "px)",
          offset: 1.0,
        },
      ],
      {
        duration: 2000,
        fill: "forwards",
      }
    );
    yValueInputToStack += 40;
    xValueInputToOutput2 += 40;
    await timer(duration);
    inStack.style.color = "black";
    inStack.style.backgroundColor = "var(--main-color)";
    $("#outputDisp").append(
      `<div class='dispExpression'>${inStack.innerHTML}</div>`
    );
    inStack.remove();
  }

  async function openBracket(input) {
    // Close Brackets
    xValueInputToStack -= 40;

    // Open Brackets
    pop();
    let stack = document
      .getElementById("stackPos")
      .getElementsByClassName("dispExpression");

    let inStack = stack[0];
    inStack.classList.add("scale-down-bl");
    input.classList.add("scale-down-bl");
    await timer(400);
    $("#bottomPanelIn").after(`<div class='dispExpressionEmpty'></div>`);
    inStack.remove();
  }

  async function inStackAnimation(input) {
    push(input.innerHTML);
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
    xValueInputToOutput2 -= 40;
    await timer(duration);
    input.style.color = "black";
    input.style.backgroundColor = "var(--main-color)";
    $("#stackPos").prepend(
      `<div class='dispExpression'>${input.innerHTML}</div>`
    );
    $("#bottomPanelIn").after(`<div class='dispExpressionEmpty'></div>`);
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

  var inputStack = document
    .getElementById("inputDisp")
    .getElementsByClassName("dispExpression");

  $("#sideout").animate({ scrollTop: $("#lineOne").height() - 80 }, 250);
  $("#lineOne").addClass("conditionalActive");
  await timer(250);

  for (var indexStack = 0; indexStack < inputStack.length; indexStack++) {
    let input = inputStack[indexStack];

    if (input.innerHTML.match(/[A-Z]/i)) {
      await $("#sideout").animate(
        { scrollTop: $("#lineTwentyOne").height() + 200 },
        500
      );
      $("#lineTwentyOne").addClass("conditionalActive");
      $("#lineTwentyTwo").addClass("pseudocodeActive");
      await timer(500);
      firstOps = false;
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
      await timer(duration);
      input.style.color = "black";
      input.style.backgroundColor = "var(--main-color)";
      yValueInputToOutput = 0;
      xValueInputToOutput = 0;
      xValueInputToStack -= 40;

      $("#outputDisp").append(
        `<div class='dispExpression'>${input.innerHTML}</div>`
      );
      $("#bottomPanelIn").after(`<div class='dispExpressionEmpty'></div>`);
      input.remove();
      indexStack--;
      $("#lineTwentyOne").removeClass("conditionalActive");
      $("#lineTwentyTwo").removeClass("pseudocodeActive");
      continue;
    }

    if (input.innerHTML.match(/[+|\-|*|^|\/]/i)) {
      $("#sideout").animate({ scrollTop: $("#lineOne").height() - 80 }, 500);
      $("#lineTwo").addClass("conditionalActive");
      await timer(500);
      let inputPrec = prec(input.innerHTML);
      if (isEmpty()) {
        $("#sideout").animate({ scrollTop: $("#lineOne").height() - 80 }, 500);
        $("#lineThree").addClass("conditionalActive");
        $("#lineFour").addClass("pseudocodeActive");
        await inStackAnimation(input);
        input.remove();
        indexStack--;
        $("#lineThree").removeClass("conditionalActive");
        $("#lineFour").removeClass("pseudocodeActive");
      } else {
        $("#sideout").animate({ scrollTop: $("#lineOne").height() - 80 }, 500);
        $("#lineFive").addClass("conditionalActive");
        await timer(500);
        if (inputPrec > prec(peek())) {
          $("#lineSix").addClass("conditionalActive");
          $("#lineSeven").addClass("pseudocodeActive");
          await inStackAnimation(input);
          input.remove();
          indexStack--;
          $("#lineSix").removeClass("conditionalActive");
          $("#lineSeven").removeClass("pseudocodeActive");
        } else {
          $("#lineNine").addClass("conditionalActive");
          $("#lineTen").addClass("conditionalActive");
          $("#lineEleven").addClass("pseudocodeActive");
          while (inputPrec <= prec(peek()) && !isEmpty()) {
            await outStackAnimation();
          }
          $("#lineEleven").removeClass("pseudocodeActive");
          $("#lineTen").removeClass("conditionalActive");

          $("#lineTwelveA").addClass("pseudocodeActive");
          await inStackAnimation(input);
          $("#lineTwelveA").removeClass("pseudocodeActive");

          $("#lineNine").removeClass("conditionalActive");
          input.remove();
          indexStack--;
        }
        $("#lineFive").removeClass("conditionalActive");
      }
      $("#lineTwo").removeClass("conditionalActive");
      continue;
    }

    if (input.innerHTML.match(/[\(]/i)) {
      await $("#sideout").animate(
        { scrollTop: $("#lineFourteen").height() + 200 },
        500
      );
      $("#lineFourteen").addClass("conditionalActive");
      $("#lineFifteen").addClass("pseudocodeActive");
      yValueInputToOutput = 0;
      xValueInputToOutput = 0;
      await inStackAnimation(input);
      input.remove();
      indexStack--;
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
      while (!isEmpty() && peek() !== "(") {
        await outStackAnimation();
      }
      await openBracket(input);
      input.remove();
      indexStack--;
      $("#lineSeventeen").removeClass("conditionalActive");
      $("#lineEighteen").removeClass("pseudocodeActive");
      continue;
    }
  }
  $("#lineOne").removeClass("conditionalActive");
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
    await outStackAnimation();
  }
  $("#lineTwentyFive").removeClass("conditionalActive");
  $("#lineTwentySix").removeClass("pseudocodeActive");
}

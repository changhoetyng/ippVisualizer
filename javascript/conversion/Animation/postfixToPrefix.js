export default async function postfixToPrefix() {
  var duration = 2000;
  var shortDuration = 1200;
  var scaleDuration = 500;

  var numOfAppend = 0;
  var numDiv = 0;

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  var inputStack = document.getElementsByClassName("dispExpression");
  $("#lineOne").addClass("conditionalActive");
  for (var indexStack = 0; indexStack < inputStack.length; indexStack++) {
    let input = inputStack[indexStack];

    if (input.innerHTML.match(/[A-Z]/i)) {
      //  operands moving color
      $("#lineTwo").addClass("conditionalActive");
      $("#lineThree").addClass("pseudocodeActive");
      input.style.color = "black";
      input.style.backgroundColor = "var(--sub-color)";
      input.animate(
        [
          { transform: "translateX(0px)", offset: 0.0 },
          {
            transform: "translateY(" + 46 + "px) translateX(" + 0 + "px)",
            offset: 0.3,
          },
          {
            transform:
              "translateY(" + 46 + "px) translateX(" + numOfAppend * 40 + "px)",
            offset: 0.6,
          },
          {
            transform:
              "translateY(" + 96 + "px) translateX(" + numOfAppend * 40 + "px)",
            offset: 1.0,
          },
        ],
        {
          duration: 2000,
          fill: "forwards",
        }
      );

      await timer(duration);

      input.remove();
      indexStack -= 1;

      numOfAppend += 1;
      numDiv += 1;

      $("#output").append(
        `<div class='outExpression numAppended${numOfAppend}'>` +
          input.innerHTML +
          `</div>`
      );
      $(`.numAppended${numOfAppend}`).wrapAll(
        `<div class='d-flex flex-row outerAppend${numDiv}'/>`
      );

      input.style.color = "black";
      input.style.backgroundColor = "var(--main-color)";
      $("#lineTwo").removeClass("conditionalActive");
      $("#lineThree").removeClass("pseudocodeActive");
    }

    if (input.innerHTML.match(/[+|\-|*|^|\/]/i)) {
      $("#lineFour").addClass("conditionalActive");
      $("#lineFive").addClass("pseudocodeActive");
      input.style.color = "black";
      input.style.backgroundColor = "var(--main-color)";

      $(`.outerAppend${numDiv - 1}`)
        .children()
        .css("background-color", "#fdaaaa");
      $(`.outerAppend${numDiv}`).children().css("background-color", "#A8C69F");
      await timer(duration);
      $("#lineFive").removeClass("pseudocodeActive");
      $("#lineSix").addClass("pseudocodeActive");
      indexStack -= 1;

      numOfAppend += 1;

      input.classList.add("scale-out-left");
      $(`.outerAppend${numDiv - 1}`).prepend(
        `<div class='outExpression numAppended${numOfAppend} scale-up-left'>` +
          input.innerHTML +
          `</div>`
      );
      $(`.outerAppend${numDiv}`)
        .children()
        .appendTo(`.outerAppend${numDiv - 1}`);
      $(`.outerAppend${numDiv}`).remove();

      await timer(shortDuration);
      $(`.outerAppend${numDiv - 1}`)
        .children()
        .css("background-color", "var(--main-color)");
      $(`.outerAppend${numDiv}`)
        .children()
        .css("background-color", "var(--main-color)");

      input.remove();
      $("#lineFour").removeClass("conditionalActive");
      $("#lineSix").removeClass("pseudocodeActive");
      numDiv -= 1;
    }
  }
  $("#lineOne").removeClass("conditionalActive");
}

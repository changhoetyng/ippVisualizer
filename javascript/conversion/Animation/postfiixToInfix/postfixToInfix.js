export default async function postfixToInfix() {

  var duration = 2000;
  var duration2 = 1000;
  var alphabetStack = [];

  var xInputToOutput = 40
  var yInputToOutput = 0

  var numOfAppend = 0
  var numDiv = 0

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  var inputStack = document.getElementsByClassName("dispExpression");
  var lengthStack = inputStack.length;

  for (var indexStack = 0; indexStack < lengthStack; indexStack++) {
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
              46 +
              "px) translateX(" +
              0 +
              "px)",
            offset: 0.3,
          },
          {
            transform:
              "translateY(" +
              46 +
              "px) translateX(" +
              yInputToOutput +
              "px)",
            offset: 0.6,
          },
          {
            transform:
              "translateY(" +
              96 +
              "px) translateX(" +
              yInputToOutput +
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

      numOfAppend+= 1
      numDiv+= 1

      $("#output").append(`<div class='outExpression numAppended${numOfAppend}'>` + input.innerHTML + `</div>`);
      // $('.dispExpression').first().hide();
      $( `.numAppended${numDiv}` ).wrapAll( `<div class='d-flex flex-row outerAppend${numDiv}'/>`);

      input.style.color = "black";
      input.style.backgroundColor = "var(--main-color)";
    }

    if (input.innerHTML.match(/[+|\-|*|^|\/]/i)) {
      console.log(numDiv)
      var output = document.getElementsByClassName(`outerAppend${numDiv}`);

      output[0].animate(
        [
          {
            transform:
              "translateY(" +
              0 +
              "px) translateX(" +
              0 +
              "px)",
            offset: 0.0,
          },
          {
            transform:
              "translateY(" +
              0 +
              "px) translateX(" +
              40 +
              "px)",
            offset: 1.0,
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
        }
      );
      await timer(duration2);
      //  operands moving color
      // $(`outerAppend${numDiv}`).children().css({"color": "black", "backgroundColor": "var(--sub-color)", "transform": "translateX(-40px);"});
      // output[0].style.color = "black";
      // output[0].style.backgroundColor = "var(--sub-color)";
      // output[0].style.transform = "translateX(-40px);"

      input.animate(
        [
          {
            transform:
              "translateY(" +
              0 +
              "px)",
            offset: 0.0,
          },
          {
            transform:
              "translateY(" +
              0 +
              "px) translateX(" +
              -40 +
              "px)",
            offset: 0.2,
          },
          {
            transform:
              "translateY(" +
              46 +
              "px) translateX(" +
              -40 +
              "px)",
            offset: 0.5,
          },
          {
            transform:
              "translateY(" +
              96 +
              "px) translateX(" +
              -40 +
              "px)",
            offset: 1.0,
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
        }
      );
      await timer(duration2);

      input.style.color = "black";
      input.style.backgroundColor = "var(--main-color)";
      
      
      numOfAppend+= 1
      $(`.outerAppend${numDiv - 1}`).before(`<div class='outExpression numAppended${numOfAppend} scale-up-left'>(</div>`);
      $(`.outerAppend${numDiv - 1}`).after(`<div class='outExpression numAppended${numOfAppend}'>` + input.innerHTML + `</div>`);
      $(`.outerAppend${numDiv}`).after(`<div class='outExpression numAppended${numOfAppend} scale-up-left'>)</div>`);
      	
      numDiv -= 1
      // $( `.numAppended${numOfAppend}` ).wrapAll( `<div class='d-flex flex-row outerAppend${numOfAppend}'/>`);

      // $('.dispExpression').first().hide();

      yInputToOutput += 120;
    }
  }
}
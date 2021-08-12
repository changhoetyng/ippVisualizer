var postfixToInfix = `<div class="col pseudocode" id="lineOne">
            while(scanCharacterFromLeftToRight)
          </div> 
          <div class="col pseudocode paddingFirstIndent" id="lineTwo">
            if(isOperand)
          </div>
          <div class="col pseudocode paddingSecondIndent" id="lineThree">
            Push into the stack
          </div>
          <div class="col pseudocode paddingFirstIndent " id="lineFour"> 
            if(isOperator)
          </div>
          <div class="col pseudocode paddingSecondIndent " id="lineFive">
            Pop two values from stack
          </div>
          <div class="col pseudocode paddingSecondIndent" id="lineSix">
            Concat: "(" + {secondValue} + {operator} + {firstValue} + ")"
          </div>`;

export default postfixToInfix
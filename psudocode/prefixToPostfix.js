var prefixToPostfix = ` <div class="col pseudocode" id="reverse">
reverseTheEquation(input)
</div> 
<div class="col pseudocode" id="lineOne">
while(scanCharacterFromLeftToRight)
</div> 
<div class="col pseudocode paddingFirstIndent" id="lineTwo">
if(isOperand(inputLetter))
</div>
<div class="col pseudocode paddingSecondIndent" id="lineThree">
Push operand into the stack.
</div>
<div class="col pseudocode paddingFirstIndent " id="lineFour"> 
if(isOperator(inputLetter))
</div>
<div class="col pseudocode paddingSecondIndent " id="lineFive">
Pop two values from stack.
</div>
<div class="col pseudocode paddingSecondIndent" id="lineSix">
Concat: {operator} + {inputLetter} + {firstValue}
</div>
<div class="col pseudocode" id="reverseAgain">
reverseTheEquation(input)
</div> `;

export default prefixToPostfix
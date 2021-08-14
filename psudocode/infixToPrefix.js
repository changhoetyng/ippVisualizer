var infixToPrefix = `
<div class="col pseudocode" id="reverse">
            reverseTheEquation(input)
          </div> 
<div class="col pseudocode" id="lineOne">
	while(scanCharacterFromLeftToRight){
</div> 
<div class="col pseudocode paddingFirstIndent" id="lineTwo">
	if(operator){
</div> 
<div class="col pseudocode paddingSecondIndent" id="lineThree">
		if(stackEmpty){
</div> 
<div class="col pseudocode paddingThirdIndent" id="lineFour">
			Push operator into the stack.
</div>
<div class="col pseudocode paddingSecondIndent" id="lineFive">
		} else {
</div>
<div class="col pseudocode paddingThirdIndent" id="lineSix">
			if(precedence(inputLetter) > precedence(stackPop())){
</div>
<div class="col pseudocode paddingFourthIndent" id="lineSeven">
				Push operator into the stack.
</div>
<div class="col pseudocode paddingThirdIndent" id="lineEight">
			}
</div>
<div class="col pseudocode paddingThirdIndent" id="lineNine">
			if(precedence(inputLetter) <= precedence(stackPop())){
</div>
<div class="col pseudocode paddingFourthIndent" id="lineTen">
				while(precedence(inputLetter) <= precedence(stackPop()) && !stackIsEmpty()){
</div>
<div class="col pseudocode paddingFifthIndent" id="lineEleven">
					Pop operator out from stack into output.
</div>
<div class="col pseudocode paddingFourthIndent" id="lineTwelve">
				}
</div>
<div class="col pseudocode paddingFourthIndent" id="lineTwelveA">
				Push operator into the stack.
</div>
<div class="col pseudocode paddingThirdIndent" id="lineThirteen">
			}
</div>
<div class="col pseudocode paddingThirdIndent" id="lineFourteen">
			if(isOpenBracket(inputLetter)){
</div>
<div class="col pseudocode paddingFourthIndent" id="lineFifteen">
				Push open bracket into stack.
</div>
<div class="col pseudocode paddingThirdIndent" id="lineSixteen">
			}
</div>
<div class="col pseudocode paddingThirdIndent" id="lineSeventeen">
			if(isCloseBracket(inputLetter)){
</div>
<div class="col pseudocode paddingFourthIndent" id="lineEighteen">
				Pop all operator out until it reaches opening bracket.
</div>
<div class="col pseudocode paddingThirdIndent" id="lineNineteen">
			}
</div>
<div class="col pseudocode paddingSecondIndent" id="lineTwenty">
		}
</div>
<div class="col pseudocode paddingFirstIndent" id="lineTwenty">
		}
</div>
<div class="col pseudocode paddingFirstIndent" id="lineTwentyOne">
	if(operand){
</div>
<div class="col pseudocode paddingSecondIndent" id="lineTwentyTwo">
		pushToOutput()
</div>
<div class="col pseudocode paddingFirstIndent" id="lineTwentyThree">
	}
</div>
<div class="col pseudocode" id="lineTwentyFour">
	}
</div>

<div class="col pseudocode" id="lineTwentyFive">
while(!stackEmpty){
</div>
<div class="col pseudocode paddingFirstIndent" id="lineTwentySix">
	Pop operator out from stack into output.
</div>	
<div class="col pseudocode" id="lineTwentySeven">
}
</div>
<div class="col pseudocode" id="reverseAgain">
            reverseTheEquation(input)
          </div> 
`

export default infixToPrefix
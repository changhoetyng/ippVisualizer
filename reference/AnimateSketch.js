//  setTimeout(function(){
//         inputStack[0].animate([
//             { transform: 'translateX(0px)', offset: 0.0 },
//             { transform: 'translateY(0px) translateX(' + xValue + 'px)', offset: 0.3 },
//             { transform: 'translateY(' + yValue + 'px) translateX(' + xValue + 'px)', offset: 1.0 }
//         ],{
//             duration: 2000
//         })
//         inputStack[0].style.transform = 'translateY(' + yValue + 'px) translateX(' + xValue + 'px)'
//         xValue -= 40
//         yValue -= 40
//     },duration)
//     duration += 2000




//     setTimeout(function(){
//         inputStack[1].animate([
//             { transform: 'translateX(0px)', offset: 0.0 },
//             { transform: 'translateY(0px) translateX(' + xValue + 'px)', offset: 0.3 },
//             { transform: 'translateY(' + yValue + 'px) translateX(' + xValue + 'px)', offset: 1.0 }
//         ],{
//             duration: 2000
//         })
//         inputStack[1].style.transform = 'translateY(' + yValue + 'px) translateX(' + xValue + 'px)'
//     },duration)

//     inputStack[0].animate([
//         { transform: 'translateX(0px)', offset: 0.0},
//         { transform: 'translateY(0px) translateX(0px)', offset: 0.3},
//         { transform: 'translateY(425px) translateX(0px)',offset: 1.0}
//     ],{
//         duration: 2000
//     })
//     inputStack[0].style.transform = 'translateY(' + 425 + 'px) translateX(' + 0 + 'px)'

//     setTimeout(function(){
//         inputStack[1].animate([
//             { transform: 'translateX(0px)', offset: 0.0},
//             { transform: 'translateY(0px) translateX(-40px)', offset: 0.3},
//             { transform: 'translateY(385px) translateX(-40px)',offset: 1.0}
//         ],{
//             duration: 2000
//         })
//         inputStack[1].style.transform = 'translateY(385px) translateX(-40px)'
//     },2000)


/*
** INPUT TO OUTPUT 
*/

    // // for (const input of inputStack) {
    //     inputStack[0].style.color = "white"
    //     inputStack[0].style.backgroundColor = "#E56B6B"
    //     inputStack[0].animate([
    //         { transform: 'translateX(0px)', offset: 0.0 },
    //         { transform: 'translateY(40px) translateX(0px)', offset: 0.1 },
    //         { transform: 'translateY(40px) translateX(41px)', offset: 0.3 },
    //         { transform: 'translateY(523px) translateX(41px)', offset: 0.9 },
    //         { transform: 'translateY(523px) translateX(0px)', offset: 1.0 }
    //     ], {
    //         duration: 2000,
    //         fill: "forwards"
    //     })
    //     await timer(duration)
    //     inputStack[0].style.color = "black"
    //     inputStack[0].style.backgroundColor = "#A0A0A0"
    //     // }
    
    //     inputStack[1].style.color = "white"
    //     inputStack[1].style.backgroundColor = "#E56B6B"
    //     inputStack[1].animate([
    //         { transform: 'translateX(0px)', offset: 0.0 },
    //         { transform: 'translateY(0px) translateX(0px)', offset: 0.1 },
    //         { transform: 'translateY(40px) translateX(0px)', offset: 0.3 },
    //         { transform: 'translateY(523px) translateX(0px)', offset: 0.9 },
    //         { transform: 'translateY(523px) translateX(0px)', offset: 1.0 }
    //     ], {
    //         duration: 2000,
    //         fill: "forwards"
    //     })
    //     // await timer(duration)
    //     inputStack[1].style.color = "black"
    //     inputStack[1].style.backgroundColor = "#A0A0A0"
    //     // }
    
    //     inputStack[2].style.color = "white"
    //     inputStack[2].style.backgroundColor = "#E56B6B"
    //     inputStack[2].animate([
    //         { transform: 'translateX(0px)', offset: 0.0 },
    //         { transform: 'translateY(0px) translateX(0px)', offset: 0.1 },
    //         { transform: 'translateY(40px) translateX(0px)', offset: 0.3 },
    //         { transform: 'translateY(523px) translateX(0px)', offset: 0.9 },
    //         { transform: 'translateY(523px) translateX(0px)', offset: 1.0 }
    //     ], {
    //         duration: 2000,
    //         fill: "forwards"
    //     })
    //     // await timer(duration)
    //     inputStack[2].style.color = "black"
    //     inputStack[2].style.backgroundColor = "#A0A0A0"
    //     // }
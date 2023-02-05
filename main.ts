// wisselt van richting
input.onButtonPressed(Button.A, function () {
    Counter = -1
    if (state != 1) {
        state = 1
    } else {
        state = 0
    }
})
function draw (PixelNr: number, showPixel: boolean) {
    xPos = PixelNr % 5
    yPos = Math.idiv(PixelNr, 5)
    if (showPixel) {
        led.plot(xPos, yPos)
    } else {
        led.unplot(xPos, yPos)
    }
}
input.onButtonPressed(Button.AB, function () {
    state = 2
})
function fadeInNumber () {
    bright = 0
    led.setBrightness(bright)
    drawNumber(currentNum)
    // fades in number
    for (let index = 0; index < 10; index++) {
        bright += 25
        basic.pause(10)
        led.setBrightness(bright)
    }
}
input.onButtonPressed(Button.B, function () {
    Counter = 1
    if (state != 1) {
        state = 1
    } else {
        state = 0
    }
})
input.onGesture(Gesture.Shake, function () {
    state = 3
})
function drawNumber (NumberToDraw: number) {
    // Deze loop loopt door alle pixels heen
    for (let PixelPos2 = 0; PixelPos2 <= pixels; PixelPos2++) {
        if (Math.idiv(NumberToDraw, 2 ** PixelPos2) % 2 == 1) {
            draw(PixelPos2, true)
        } else {
            draw(PixelPos2, false)
        }
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    state = 1
    currentNum = randint(0, MaxNum)
})
let currentNum = 0
let bright = 0
let yPos = 0
let xPos = 0
let state = 0
let Counter = 0
let MaxNum = 0
let pixels = 0
let PixelPos = 0
let numberShown = false
// we hebben 25 leds
pixels = 25
MaxNum = 2 ** pixels
// Aantal 'frames' per seconde.
let fps = 25
// De wachttijd is 1 seconde (of 1000 millisecondes) gedeeld door het aantal frames dat je per seconde wil
let fpsFraction = 1000 / fps
Counter = 1
state = 0
basic.forever(function () {
    while (currentNum >= 0 && currentNum <= MaxNum && state == 0) {
        currentNum += Counter
        drawNumber(currentNum)
        basic.pause(fpsFraction)
        if (currentNum < 1) {
            currentNum = 1
        } else if (currentNum == MaxNum) {
            currentNum = MaxNum - 2
        }
    }
    if (state == 1) {
        drawNumber(currentNum)
    } else if (state == 2) {
        basic.clearScreen()
        basic.showNumber(currentNum)
        fadeInNumber()
        state = 1
    } else if (state == 3) {
        // If working on a large number start from zero
        if (currentNum > MaxNum / 2) {
            currentNum = 0
            Counter = 1
            state = 0
        } else {
            currentNum = MaxNum
            Counter = -1
            state = 0
        }
    }
})

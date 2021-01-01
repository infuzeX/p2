function scratch(){

    'use strict';

    var canvas = document.getElementById('scratch'),
        context = canvas.getContext('2d');

    // default value
    context.globalCompositeOperation = 'source-over';

    //----------------------------------------------------------------------------

    var x, y, radius;

    x = y = radius = 300 / 2;

    /*image*/
    const image = new Image();
    image.onload = suru;
    image.src = "scratch-v2.png"
    function suru(){
        context.drawImage(image, 0, 0, 400, 300)
        getImage();
    }

    var isDrag = false;

    function clearArc(x, y) {
        console.log(x ,y)
        context.globalCompositeOperation = 'destination-out';
        context.beginPath();
        context.arc(x, y, 20, 0, Math.PI * 2, false);
        context.fill();
    }

    canvas.addEventListener('mousedown', function (event) {
        isDrag = true;
        clearArc(event.offsetX, event.offsetY);
        judgeVisible();
    }, false);

    canvas.addEventListener('mousemove', function (event) {
        if (!isDrag) {
            return;
        }

        clearArc(event.offsetX, event.offsetY);
        judgeVisible();
    }, false);

    canvas.addEventListener('mouseup', function (event) {
        isDrag = false;
    }, false);

    canvas.addEventListener('mouseleave', function (event) {
        isDrag = false;
    }, false);

    //----------------------------------------------------------------------------
    canvas.addEventListener('touchstart', function (event) {
        if (event.targetTouches.length !== 1) {
            return;
        }

        event.preventDefault();

        isDrag = true;
        let rect = event.target.getBoundingClientRect(),
            x = event.touches[0].clientX - rect.left,
            y = event.touches[0].clientY - rect.top;

        clearArc(x, y);
        judgeVisible();
    }, false);

    canvas.addEventListener('touchmove', function (event) {
        console.log('hello -i m, moved')
        if (!isDrag || event.targetTouches.length !== 1) {
            return;
        }

        event.preventDefault();
        let rect = event.target.getBoundingClientRect(),
            x = event.touches[0].clientX - rect.left,
            y = event.touches[0].clientY - rect.top;

        clearArc(x, y);
        judgeVisible();
    }, false);

    canvas.addEventListener('touchend', function (event) {
        isDrag = false;
    }, false);

    //----------------------------------------------------------------------------

    function judgeVisible() {
        var imageData = context.getImageData(0, 0, 300, 300),
            pixels = imageData.data,
            result = {},
            i, len;

        // count alpha values
        for (i = 3, len = pixels.length; i < len; i += 4) {
            result[pixels[i]] || (result[pixels[i]] = 0);
            result[pixels[i]]++;
        }
    }

    document.addEventListener('DOMContentLoaded', judgeVisible, false);

}

function getImage(){
    const img = document.querySelector('.base');
    img.src = getQuote(); 
}

function getQuote(){
    const index = Math.floor(Math.random()*3);
    return ['q1.png' , 'q2.png' , 'q3.png'][index];
}
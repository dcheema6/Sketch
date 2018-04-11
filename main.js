$(document).ready(function () {
    var getById = function (id) { return document.getElementById(id) };

    var canvas = this.__canvas = new fabric.Canvas('canvas', {
        isFreehandMode: true,
        isLineMode: false,
        isRectangleMode: false,
        isEllipseMode: false,
    });

    var buttonChange = $('input[type=radio][name=options]'),
        drawingColor = getById('brush-color'),
        clear = getById('clear-screen');

    clear.onclick = function () { canvas.clear() };

    buttonChange.change(function () {
        if (this.value == "freehand-drawing") {

        }
        else if(this.value == "line"){

        }
        else if (this.value == "rectangle") {

        }
        else if (this.value == "ellipse") {

        }
        if (canvas.isFreehandMode) {
            
            drawingOptionsEl.style.display = '';
        }
        else {
            drawingOptionsEl.style.display = 'none';
        }
    });

    drawingColor.onchange = function () {
        canvas.freeDrawingBrush.color = this.value;
    };
});
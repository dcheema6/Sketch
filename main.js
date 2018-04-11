$(document).ready(function () {
    var getById = function (id) { return document.getElementById(id) };

    var canvas = this.__canvas = new fabric.Canvas('canvas', {
        selection: true,
        isDrawingMode: true,
        isLineMode: false,
        isRectangleMode: false,
        isEllipseMode: false,
        isCircleMode: false,
        isSquareMode: false,
        isOpenPolygonMode: false,
        isClosePolygonMode: false
    });

    var buttonChange = $('input[type=radio][name=options]'),
        drawingColor = getById('brush-color'),
        clear = getById('clear-screen');

    clear.onclick = function () { canvas.clear() };

    function makeLine(coords) {
        return new fabric.Line(coords, {
            fill: canvas.freeDrawingBrush.color,
            stroke: canvas.freeDrawingBrush.color,
            strokeWidth: 1,
            selectable: true
        });
    }

    function makeRectangle(coords){
        return new fabric.Rect({
            left: coords[0],
            top: coords[1],
            width: coords[2] - coords[0],
            height: coords[3] - coords[1],
            stroke: canvas.freeDrawingBrush.color,
            fill: canvas.backgroundColor,
            strokeWidth: 1,
            selectable: true
        });
    }

    function makeSquare(coords) {
        return new fabric.Rect({
            left: coords[0],
            top: coords[1],
            width: coords[2] - coords[0],
            height: coords[2] - coords[0],
            stroke: canvas.freeDrawingBrush.color,
            fill: canvas.backgroundColor,
            strokeWidth: 1,
            selectable: true
        });
    }

    function makeEllipse(coords) {
        return new fabric.Rect({
            left: coords[0],
            top: coords[1],
            width: coords[2] - coords[0],
            height: coords[3] - coords[1],
            stroke: canvas.freeDrawingBrush.color,
            fill: canvas.backgroundColor,
            strokeWidth: 1,
            selectable: true
        });
    }

    function makeCircle(coords) {
        return new fabric.Rect({
            left: coords[0],
            top: coords[1],
            radius: coords[2] - coords[0],
            stroke: canvas.freeDrawingBrush.color,
            fill: canvas.backgroundColor,
            strokeWidth: 1,
            selectable: true
        });
    }

    var draw = [];
    var line = null;

    buttonChange.change(function () {
        if (this.value == "freehand") {
            canvas.isDrawingMode = true;
            canvas.isLineMode = false;
            canvas.isRectangleMode = false;
            canvas.isEllipseMode = false;
            canvas.selection = false;
            canvas.isSquareMode = false;
            canvas.isCircleMode = false;
            draw = [];
            line = null;
        }
        else if (this.value == "line") {
            canvas.isDrawingMode = false;
            canvas.isLineMode = true;
            canvas.isRectangleMode = false;
            canvas.isEllipseMode = false;
            canvas.selection = false;
            canvas.isSquareMode = false;
            canvas.isCircleMode = false;
            draw = [];
            line = null;
        }
        else if (this.value == "rectangle") {
            canvas.isDrawingMode = false;
            canvas.isLineMode = false;
            canvas.isRectangleMode = true;
            canvas.isEllipseMode = false;
            canvas.selection = false;
            canvas.isSquareMode = false;
            canvas.isCircleMode = false;
            draw = [];
            line = null;
        }
        else if (this.value == "ellipse") {
            canvas.isDrawingMode = false;
            canvas.isLineMode = false;
            canvas.isRectangleMode = false;
            canvas.isEllipseMode = true;
            canvas.selection = false;
            canvas.isSquareMode = false;
            canvas.isCircleMode = false;
            draw = [];
            line = null;
        }
        else if (this.value == "select") {
            canvas.isDrawingMode = false;
            canvas.isLineMode = false;
            canvas.isRectangleMode = false;
            canvas.isEllipseMode = false;
            canvas.selection = true;
            canvas.isSquareMode = false;
            canvas.isCircleMode = false;
            draw = [];
            line = null;
        }
        else if (this.value == "square") {
            canvas.isDrawingMode = false;
            canvas.isLineMode = false;
            canvas.isRectangleMode = false;
            canvas.isEllipseMode = false;
            canvas.selection = false;
            canvas.isSquareMode = true;
            canvas.isCircleMode = false;
            draw = [];
            line = null;
        }
        else if (this.value == "circle") {
            canvas.isDrawingMode = false;
            canvas.isLineMode = false;
            canvas.isRectangleMode = false;
            canvas.isEllipseMode = false;
            canvas.selection = false;
            canvas.isSquareMode = false;
            canvas.isCircleMode = true;
            draw = [];
            line = null;
        }
        console.log(canvas.selection);
    });

    drawingColor.onchange = function () {
        canvas.freeDrawingBrush.color = this.value;
    };

    canvas.on('mouse:down', function (e) {
        if (canvas.isLineMode) {
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                line = null;
            }
        }
        else if(canvas.isRectangleMode){
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                line = null;
            }
        }
        else if (canvas.isEllipseMode) {
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                line = null;
            }
        }
        else if (canvas.isCircleMode) {
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                line = null;
            }
        }
        else if (canvas.isSquareMode) {
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                line = null;
            }
        }
    });

    canvas.on('mouse:move', function (e) {
        if (canvas.isLineMode) {
            if (draw.length == 0) {
                return;
            }
            else if (draw.length == 4) {
                draw = [];
                return;
            }
            else {
                if (line == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    line = makeLine(draw);
                    canvas.add(line);

                    draw.pop();
                    draw.pop();
                }
                else {
                    line.set({ 'x2': e.e.layerX, 'y2': e.e.layerY });
                    canvas.renderAll();
                }
            }
        }
        else if (canvas.isRectangleMode) {
            if (draw.length == 0) {
                return;
            }
            else if (draw.length == 4) {
                draw = [];
                return;
            }
            else {
                if (line == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    line = makeRectangle(draw);
                    canvas.add(line);

                    draw.pop();
                    draw.pop();
                }
                else {
                    line.set({ width: e.e.layerX - draw[0], height: e.e.layerY - draw[1] });
                    canvas.renderAll();
                }
            }
        }
        else if (canvas.isEllipseMode) {
            if (draw.length == 0) {
                return;
            }
            else if (draw.length == 4) {
                draw = [];
                return;
            }
            else {
                if (line == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    line = makeRectangle(draw);
                    canvas.add(line);

                    draw.pop();
                    draw.pop();
                }
                else {
                    line.set({ width: e.e.layerX - draw[0], height: e.e.layerY - draw[1] });
                    canvas.renderAll();
                }
            }
        }
        else if (canvas.isCircleMode) {
            if (draw.length == 0) {
                return;
            }
            else if (draw.length == 4) {
                draw = [];
                return;
            }
            else {
                if (line == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    line = makeRectangle(draw);
                    canvas.add(line);

                    draw.pop();
                    draw.pop();
                }
                else {
                    line.set({ width: e.e.layerX - draw[0], height: e.e.layerY - draw[1] });
                    canvas.renderAll();
                }
            }
        }
    });
});
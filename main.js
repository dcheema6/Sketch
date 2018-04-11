$(document).ready(function () {
    var getById = function (id) { return document.getElementById(id) };

    //Initializes the fabric canvas
    var canvas = this.__canvas = new fabric.Canvas('canvas', {
        selection: true, //built in field ro enable/disable selection
        isDrawingMode: true, //built in field for free hand drawing
        isLineMode: false,
        isRectangleMode: false,
        isEllipseMode: false,
        isCircleMode: false,
        isSquareMode: false,
        isOpenPolygonMode: false,
        isClosePolygonMode: false
    });

    var buttonChange = $('input[type=radio][name=options]'),    //gets the radio button pressed
        drawingColor = getById('brush-color'),  //gets the color from color selector
        cut = getById('cut'),
        paste = getById('paste'),
        clear = getById('clear-screen');

    //clears the canvas
    clear.onclick = function () { canvas.clear() };

    //copies and removes the selectes object.
    //Please note only one object should be slected at a time when using this function
    cut.onclick = function () {
        canvas.getActiveObject().clone(function (cloned) {
            _clipboard = cloned;
        });
        canvas.remove(canvas.getActiveObject());
    };

    //pastes the copied object can be used multiple times for same object
    paste.onclick = function () {
        _clipboard.clone(function (clonedObj) {
            canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = canvas;
                clonedObj.forEachObject(function (obj) {
                    canvas.add(obj);
                });
                clonedObj.setCoords();
            } else {
                canvas.add(clonedObj);
            }
            _clipboard.top += 10;
            _clipboard.left += 10;
            canvas.setActiveObject(clonedObj);
            canvas.requestRenderAll();
        });
    };

    //builds a line based on coords provided
    function makeLine(coords) {
        return new fabric.Line(coords, {
            fill: canvas.freeDrawingBrush.color,
            stroke: canvas.freeDrawingBrush.color,
            strokeWidth: 1,
            selectable: true
        });
    };

    //builds a rectangle based on coords provided
    function makeRectangle(coords) {
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
    };

    //builds a square based on coords provided
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
    };

    //Is supposed builds a ellipce based on coords provided: under construction
    function makeEllipse(coords) {
        return new fabric.Ellipse({
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

    //builds a circle based on coords provided
    function makeCircle(coords) {
        return new fabric.Circle({
            left: coords[0],
            top: coords[1],
            radius: coords[2] - coords[0],
            stroke: canvas.freeDrawingBrush.color,
            fill: canvas.backgroundColor,
            strokeWidth: 1,
            selectable: true
        });
    };

    //some helper variables
    var draw = [];
    var object = null;

    //when a shape slector is clicked
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
            object = null;
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
            object = null;
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
            object = null;
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
            object = null;
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
            object = null;
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
            object = null;
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
            object = null;
        }
        console.log(canvas.selection);
    });

    //when color is changed
    drawingColor.onchange = function () {
        canvas.freeDrawingBrush.color = this.value;
    };

    //triggred by mouse down left click event
    //on first click it pushes down the co-ords to draw array.
    //object is rendered in nect function when user moves the cursor
    //on second click clears the array and the object.
    canvas.on('mouse:down', function (e) {
        if (canvas.isLineMode) {
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                object = null;
            }
        }
        else if(canvas.isRectangleMode){
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                object = null;
            }
        }
        else if (canvas.isEllipseMode) {
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                object = null;
            }
        }
        else if (canvas.isCircleMode) {
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                object = null;
            }
        }
        else if (canvas.isSquareMode) {
            draw.push(e.e.layerX);
            draw.push(e.e.layerY);
            if (draw.length == 4) {
                draw = [];
                object = null;
            }
        }
    });

    /**
    *triggred when user moves the cursor
    *only renders an object when user has pressed mouse left key once after selecting a shape
    *first it second pushes the coords to draw array and adds the rendered object to the canvas
    *if user moves the mouse without pressing left click. it keeps re rendering the object to the new location.
    **/
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
                if (object == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    object = makeLine(draw);
                    canvas.add(object);

                    draw.pop();
                    draw.pop();
                }
                else {
                    object.set({ 'x2': e.e.layerX, 'y2': e.e.layerY });
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
                if (object == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    object = makeRectangle(draw);
                    canvas.add(object);

                    draw.pop();
                    draw.pop();
                }
                else {
                    object.set({ width: e.e.layerX - draw[0], height: e.e.layerY - draw[1] });
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
                if (object == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    object = makeEllipse(draw);
                    canvas.add(object);

                    draw.pop();
                    draw.pop();
                }
                else {
                    object.set({ width: e.e.layerX - draw[0], height: e.e.layerY - draw[1] });
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
                if (object == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    object = makeCircle(draw);
                    canvas.add(object);

                    draw.pop();
                    draw.pop();
                }
                else {
                    object.set({ radius: e.e.layerX - draw[0]});
                    canvas.renderAll();
                }
            }
        }
        else if (canvas.isSquareMode) {
            if (draw.length == 0) {
                return;
            }
            else if (draw.length == 4) {
                draw = [];
                return;
            }
            else {
                if (object == null) {
                    draw.push(e.e.layerX);
                    draw.push(e.e.layerY);

                    object = makeSquare(draw);
                    canvas.add(object);

                    draw.pop();
                    draw.pop();
                }
                else {
                    object.set({ width: e.e.layerX - draw[0], height: e.e.layerX - draw[0] });
                    canvas.renderAll();
                }
            }
        }
    });
});
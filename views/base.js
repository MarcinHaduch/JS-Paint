export const elements = {
    grid: document.querySelector('.grid'),
    buttonsSection: document.querySelector('.coloring-buttons'),
    clearButton: document.querySelector('.button-clear'),
    undoButton: document.querySelector('.button-undo'),
    redoUndoButton: document.querySelector('.button-redo-undo'),
    canvasContainer: document.querySelector('.canvas-container'),
    canvas: document.querySelector('.canvas'),
    resolutionSelect: document.getElementById("singleSelectTextDDJS"),
}

export const getCell = (index) =>{
    return document.getElementById(index);
};
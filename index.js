/*
Program uses ECMAScript 2017, so it won't work on IE, to solve this problem it has to be transpiled to ES5
*/

import Sandbox from './models/Sandbox';
import * as gridView from './views/gridView';
import { elements } from './views/base';

const state = {}

/**
 * Sandbox CONTROLLER
 */

const controlSandbox = (resolution='64x64') => {
      // 1. init Sandbox object with resolution
      state.sandbox = new Sandbox(resolution);
      state.sandbox.parseResolution();
      // 2. set default color for grid
      state.sandbox.initGrid();
      //console.table(state.sandbox.getGrid());
      gridView.printGrid(state.sandbox.getGrid());
      gridView.initCanvas(state.sandbox.getGrid(),state.sandbox.resolutionArr);


}

// Testing and event listeners
window.addEventListener('load', e => {
      e.preventDefault();
      controlSandbox(singleSelectChangeText());
});

elements.grid.addEventListener('mouseover', e => {
      e.preventDefault();
      if(e.buttons===1){
            if (e.target.className === 'grid__element') {
                  const colorPrev = getComputedStyle(e.target).backgroundColor;
                  const colorAdded = state.sandbox.getDrawingColor()
                        if(colorPrev!==colorAdded)
                        state.sandbox.addEdit(colorPrev,e.target.id, colorAdded);                  
                        gridView.addStep(e,colorAdded);                  
                  }
      }
});

elements.grid.addEventListener('mousedown', e => {
      e.preventDefault();
      if (e.target.className === 'grid__element') {
            const colorPrev = getComputedStyle(e.target).backgroundColor;
            const colorAdded = state.sandbox.getDrawingColor()
                  if(colorPrev!==colorAdded)
                  state.sandbox.addEdit(colorPrev,e.target.id, colorAdded);
                  gridView.addStep(e,colorAdded);                      
            }
});

elements.buttonsSection.addEventListener('click', e => {
      if (e.target.className.includes('button-color')) {
            const style = getComputedStyle(e.target);
            state.sandbox.setColor(style.backgroundColor);
      }
});

elements.undoButton.addEventListener('mousedown', e => {
      e.preventDefault();
            if(state.sandbox.prevArr.length>0){
                  let previous = state.sandbox.removeEdit();
                  gridView.editStep(previous);
                  refreshCanvas();
             }
});

elements.redoUndoButton.addEventListener('mousedown', e => {
      e.preventDefault();
      if (state.sandbox.nextArr.length > 0) {
            let next = state.sandbox.redo();
            gridView.editStep(next);
            refreshCanvas();
      }
})

elements.clearButton.addEventListener('click', e => {
      state.sandbox.clearInput();
      gridView.printGrid(state.sandbox.getGrid());
      gridView.printCanvas(state.sandbox.getGrid());
});



window.addEventListener('keydown', e => {
      if ((e.key === 'z' && e.ctrlKey) && state.sandbox.prevArr.length > 0) {

            let previous = state.sandbox.removeEdit();
            gridView.editStep(previous);
            refreshCanvas();

      } else if (e.key === 'y' && e.ctrlKey && (state.sandbox.nextArr.length > 0)) {
            let next = state.sandbox.redo();
            gridView.editStep(next);
            refreshCanvas();

      }
});

elements.resolutionSelect.addEventListener('change',(e) => controlSandbox(e.target.options[e.target.selectedIndex].text));

elements.grid.addEventListener('click',e =>{
      e.preventDefault();
      refreshCanvas();
});

const singleSelectChangeText = () => elements.resolutionSelect.options[elements.resolutionSelect.selectedIndex].text;

const refreshCanvas = () => {
      gridView.printCanvas(state.sandbox.getGrid());
      gridView.updateCanvas(state.sandbox.currArr);
}
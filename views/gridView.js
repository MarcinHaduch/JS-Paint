import { elements, getCell } from './base';

export const printGrid = (grid) => {
    let markup = '';
    let row = ''
    for (let i = 0; i < grid.length; i++) {
        for(let j = 0; j< grid[0].length;j++){
            row += `<td class="grid__element" id="${i},${j}"></td>`;
        }
        markup += `<tr id="row:${i}">${row}</tr>`;
        row=''
    }
    elements.grid.innerHTML = markup;
};

export const addStep = (event, color) => {
    event.target.style.backgroundColor = color;
};

export const editStep = (element) => {
    let cell = getCell(element.index);
    cell.style.backgroundColor = element.color;
};

export const initCanvas = (grid,resolution) => {
    const markup = `<canvas class="canvas" id="canvas" width="${resolution[1]}" height="${resolution[0]}"></canvas>`;
    elements.canvasContainer.innerHTML = markup;
    printCanvas(grid)
};

export const updateCanvas = (current) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    current.forEach(element => {
        let x = element.index.split(',');
       fillCanvas(x[1],x[0],element.color,ctx);                
   });
};

export const printCanvas = (grid) => {
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');
    grid.forEach((row)=>{row.forEach((element)=>{
        let x = element.index.split(',');
        fillCanvas(x[1],x[0],element.color,ctx);           
    })});
};


const fillCanvas = (x,y,rgb,ctx) => {
    ctx.fillStyle = rgb;
    ctx.fillRect(x, y, 1, 1);
};
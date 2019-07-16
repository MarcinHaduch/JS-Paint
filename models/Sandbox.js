import {getCell} from '../views/base';

export default class Sandbox {
    prevArr = [];
    nextArr = [];
    currArr = [];
    constructor(resolution, drawingColor = 'rgb(85, 85, 85)', cellColor = 'rgb(245, 245, 220)') {
        this.resolution = resolution;
        this.drawingColor = drawingColor;
        this.cellColor = cellColor;
    }

    parseResolution() {
        this.resolutionArr = this.resolution.split('x').reverse();
        this.resolutionArr = this.resolutionArr.map(e => parseInt(e));
    }

    initGrid() {
        this.grid = [];
        for(let i = 0; i<this.resolutionArr[0];i++){
            let x = [];
            for(let j=0; j<this.resolutionArr[1];j++){
                x.push({
                    color:this.cellColor,
                    index:`${i},${j}`
                });
            }
            this.grid.push(x);
        }
       
    }

    setColor(color) {
        this.drawingColor = color;
    }

    getDrawingColor(){
        return this.drawingColor;
    }

    getGrid() {
        return this.grid;
    }
    
    addEdit(color, index, colorAdded) {
        this.nextArr = [];
        this.prevArr.push({
            color:color,
            index
        });

        this.currArr.push({
            color:colorAdded,
            index
        }); 
    };

    removeEdit(){
        let x = this.currArr.pop();
        this.nextArr.push(x);

        return this.prevArr.pop();
    }

    redo(){
        const x = this.nextArr.pop()
        this.currArr.push(x)
        this.prevArr.push({
            color: getCell(x.index).style.backgroundColor,
            index:x.index
        });

        return x;
    }

    clearInput(){
        this.initGrid();
        this.nextArr = [];
        this.currArr = [];
        this.prevArr = [];
    }

    
}
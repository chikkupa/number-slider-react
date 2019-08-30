import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={this.props.onClick}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            numbers : [
            [1, 2, 3],
            [4, 5, 6], 
            [7, 8, 0],
            ],
            zeroPos : [2, 2]
        };

        const noShifts = getRandom(50, 100);
        for(let i = 0; i < noShifts; i++){
            this.randomShift();
        }
    }

    renderSquare(i, j) {
      return <Square value={this.state.numbers[i][j]} 
                    onClick={() => this.handleShift(i, j)} />;
    }
  
    handleShift(x, y){
        const possibleShifts = [
            [x, y-1],
            [x, y+1],
            [x-1, y],
            [x+1, y]
        ];
        
        const numbers = this.state.numbers;

        for(let i = 0; i < possibleShifts.length; i++){
            let [indexX, indexY] = possibleShifts[i];
            if(indexX >=0 && indexX <=2 && indexY >=0 && indexY <= 2){
                if(numbers[indexX][indexY] === 0){
                    const temp = numbers[x][y];
                    numbers[x][y] = numbers[indexX][indexY];
                    numbers[indexX][indexY] = temp;

                    this.setState({
                        numbers : numbers,
                        zeroPos: [indexX, indexY]
                    });

                }
            }
        }
    }

    randomShift(){
        let [x, y] = this.state.zeroPos;
        let possibleShifts = [];

        let shiftsAvailable = [
            [x, y-1],
            [x, y+1],
            [x-1, y],
            [x+1, y]
        ];

        for(let i=0; i < shiftsAvailable.length; i++){
            let [indexX, indexY] = shiftsAvailable[i];
            if(indexX >=0 && indexX <=2 && indexY >=0 && indexY <= 2){
                possibleShifts[possibleShifts.length] = shiftsAvailable[i]
            }
        }

        let [indexX, indexY] = possibleShifts[getRandom(0, possibleShifts.length)];
        const numbers = this.state.numbers;
        const temp = numbers[x][y];
        numbers[x][y] = numbers[indexX][indexY];
        numbers[indexX][indexY] = temp;

        this.setState({
            numbers : numbers,
            zeroPos: [indexX, indexY]
        });
    }

    render() {  
      return (
        <div>
          <div className="status">Number Slider: Game</div>
          <div className="board-row">
            <Square value={this.state.numbers[0][0]} 
                    onClick={() => this.handleShift(0, 0)} />
            {this.renderSquare(0, 1)}
            {this.renderSquare(0, 2)}
          </div>
          <div className="board-row">
            {this.renderSquare(1, 0)}
            {this.renderSquare(1, 1)}
            {this.renderSquare(1, 2)}
          </div>
          <div className="board-row">
            {this.renderSquare(2, 0)}
            {this.renderSquare(2, 1)}
            {this.renderSquare(2, 2)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  

function getRandom(min, max){
    const rand = min + Math.random() * (max - min);

    return Math.floor(rand);
}
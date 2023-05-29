import { useState } from "react";
import "./App.css";

//각각의 정사각형 버튼이 담겨져 있는 Square 컴포넌트
function Square({ value, onSquaresClick }) {
  return (
    <button className="square" onClick={onSquaresClick}>
      {value}
    </button>
  );
}

//보드판 컴포넌트
function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    //클릭했을 때 발생하는 이벤트
    //i는 버튼을 클릭했을 때 자식 컴포넌트에게서 인자로 받아옴
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //복사한 배열
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      //false일 때는
      nextSquares[i] = "O";
    }
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //이차원 배열 돌기 ->for문 사용
    for (let i = 0; i < lines.length; i++) {
      //행의 개수 -> i
      const [a, b, c] = lines[i];
      //line[i] - 특정 행에서 3개의 요소를 꺼내오기
      //0번째 열이라면 0, 1, 2
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquaresClick={() => {
              handleClick(0);
            }}
          />
          <Square
            value={squares[1]}
            onSquaresClick={() => {
              handleClick(1);
            }}
          />
          <Square
            value={squares[2]}
            onSquaresClick={() => {
              handleClick(2);
            }}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquaresClick={() => {
              handleClick(3);
            }}
          />
          <Square
            value={squares[4]}
            onSquaresClick={() => {
              handleClick(4);
            }}
          />
          <Square
            value={squares[5]}
            onSquaresClick={() => {
              handleClick(5);
            }}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[6]}
            onSquaresClick={() => {
              handleClick(6);
            }}
          />
          <Square
            value={squares[7]}
            onSquaresClick={() => {
              handleClick(7);
            }}
          />
          <Square
            value={squares[8]}
            onSquaresClick={() => {
              handleClick(8);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    //TODO
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    console.log(nextHistory);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    //ToDo
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    //html 렌더링
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

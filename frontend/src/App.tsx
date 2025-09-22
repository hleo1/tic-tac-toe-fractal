import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {
  const [squares, setSquares] = useState<any[]>(Array(9).fill(""))
  const [turn, setTurn] = useState<string>("X");
  const [gameResult, setGameResult] = useState("");
  const [gameDone, setGameDone] = useState(false);


  const reset = () => {
    setSquares([...squares].fill(""))
    setTurn("X");
    setGameResult("");
    setGameDone(false);

  }


  const changeTurn = () => {
    if (turn === "X") {
      setTurn("O")
    } else if (turn === "O") {
      setTurn("X")
    }
  }

  const checkWinner = () => {
    //top, middle, bottom

    console.log(squares.slice(0, 3))
    if (squares[0] === turn && squares[1] === turn && squares[2] === turn) {
      return true;
    }

    if (squares[3] === turn && squares[4] === turn && squares[5] === turn) {
      return true;
    }

    if (squares[6] === turn && squares[7] === turn && squares[8] === turn) {
      return true;
    }

    //left, middle, bottom
    if (squares[0] === turn && squares[3] === turn && squares[6] === turn) {
      return true;
    }

    if (squares[1] === turn && squares[4] === turn && squares[7] === turn) {
      return true;
    }

    if (squares[2] === turn && squares[5] === turn && squares[8] === turn) {
      return true;
    }


    //top left to bottom right
    if (squares[0] === turn && squares[4] === turn && squares[8] === turn) {
      return true;
    }
    //bottom left to top right
    if (squares[2] === turn && squares[4] === turn && squares[6] === turn) {
      return true;
    }
    return false;
  }

  const checkState = () => {
    //check for a winner
    if (checkWinner()) {
       //annoucne the results
       setGameResult("Winner is " + turn)
      //reset the board
      // setSquares([...squares].fill(""))
      setGameDone(true);
    };
    //check for a tie
    if (squares.every((elem) => elem != "")) {
      //annoucne the results

      setGameResult("It is a tie!")

      setGameDone(true);

    //reset the board

    // setSquares([...squares].fill(""))
  }

   

    
  }

  useEffect(() => {
    checkState();
    changeTurn();
  }, [squares])

  const clickButton = (index: number) => {
    if (!squares[index] && !gameDone) {
      const newSquares = [...squares];
    newSquares[index] = (turn)
    setSquares(newSquares);

    }
  }




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Tic Tac Toe
        </h1>
        <p className="text-gray-600 text-lg">Player {turn}'s turn</p>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-2xl shadow-2xl border-4 border-gray-200">
        {squares.map((elem, i) => (
          <button
            key={i}
            className="w-20 h-20 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-xl font-bold text-2xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
            onClick={() => clickButton(i)}
            disabled={gameDone}
          >
            <span className={`${elem === 'X' ? 'text-red-500' : 'text-blue-500'}`}>
              {elem}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center h-24 flex flex-col justify-center">
        {gameResult && (
          <div className="mb-4">
            <p className={`text-2xl font-bold ${gameResult.includes('Winner') ? 'text-green-600' : 'text-yellow-600'}`}>
              {gameResult}
            </p>
          </div>
        )}
        
        {gameDone && (
          <button
            onClick={() => reset()}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  )
}

export default App

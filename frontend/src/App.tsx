import { useState , useEffect} from 'react'
import './App.css'




function App() {
  const [squares, setSquares] = useState(null)
  const [turn, setTurn] = useState(null);
  const [gameResult, setGameResult] = useState("");
  const [gameDone, setGameDone] = useState(null);
  const [gameTied, setGameTied] = useState(null);

  const [id, setGameID] = useState(null);

  const [joinID, setJoinID] = useState("");

  const newGame = async () => {
    const response = await fetch("http://localhost:3000/new-game");
    const data : any = await response.json();
    if (data) {
      setTurn(data.playerTurn);
      setSquares(data.board);
      setGameDone(data.gameDone);
      setGameTied(data.tie);
      setGameID(data.id);
    }
  }

  const joinGame = async () => {
    const response = await fetch("http://localhost:3000/get-game-id/" + joinID);
    const data : any = await response.json();
    if (data) {
      setTurn(data.playerTurn);
      setSquares(data.board);
      setGameDone(data.gameDone);
      setGameTied(data.tie);
      setGameID(data.id);
    }
  }


  const clickButton = async (i: number) => {
    const response = await fetch("http://localhost:3000/make-move/" + id + "/" + i);
    const data: any = await response.json();
    if (data) {
      setTurn(data.playerTurn);
      setSquares(data.board);
      setGameDone(data.gameDone);
      setGameTied(data.tie);
    }
  }

  const reset = async () => {
    const response = await fetch("http://localhost:3000/reset/" + id);
    const data: any = await response.json();
    if (data) {
      setTurn(data.playerTurn);
      setSquares(data.board);
      setGameDone(data.gameDone);
      setGameTied(data.tie);
    }
  }



  return (
    <>

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">

    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
      <button
        onClick={newGame}
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        New Game
      </button>
      <div className="flex items-center gap-2 bg-white rounded-xl shadow-md px-4 py-2">
        <label className="text-gray-700 font-medium mr-2" htmlFor="join-id">
          Join Game ID
        </label>
        <input
          id="join-id"
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          value={joinID}
          onChange={e => setJoinID(e.target.value)}
          placeholder="Enter ID"
        />
        <button
          onClick={joinGame}
          className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200"
        >
          JOIN
        </button>
      </div>
    </div>

{id && (
    <div className="flex flex-col items-center justify-center">
    <div>To share the Game ID is : {id}</div>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Tic Tac Toe
        </h1>
        <p
          className="text-gray-600 text-lg"
          style={{ opacity: gameDone ? 0 : 1 }}
        >
          {!gameDone && `Player ${turn}'s turn`}
        </p>

      </div>

      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-2xl shadow-2xl border-4 border-gray-200">
        {squares?.map((elem, i) => (
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
    )}

   
      
    </div>
    
    

    </>
  )
}

export default App

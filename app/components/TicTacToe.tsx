import { use, useEffect, useState } from "react"
import { useLocalStorage } from "~/hooks/useLocalStorage"

type TTicOrTac = 'O' | 'X' | ''

type TPlayerHistory = {
    player1: {
        playerName: string,
        wins: number
    },
    player2: {
        playerName: string,
        wins: number
    }
}

type TGrid = [TTicOrTac, TTicOrTac, TTicOrTac,
    TTicOrTac, TTicOrTac, TTicOrTac,
    TTicOrTac, TTicOrTac, TTicOrTac]

type TTicTacToeModel = {
    player1Name: string,
    player2Name: string,
    turn: 'PLAYER1' | 'PLAYER2',
    player1Cross: boolean,
    grid: TGrid,
    winner: 'PLAYER1' | 'PLAYER2' | 'DRAW' | null
}

const mockModel: TTicTacToeModel = {
    player1Name: 'Player 1',
    player2Name: 'Player 2',
    turn: 'PLAYER1',
    player1Cross: true,
    grid: ['', '', '', '', '', '', '', '', ''],
    winner: null
}

const Cell = ({ cell, index, handleCellClick }: { cell: TTicOrTac, index: number, handleCellClick: (index: number, cell: TTicOrTac) => void }) => {
    return (
        <div className='border-l-2 border-t-2  min-h-24 flex items-center justify-center' onClick={() => handleCellClick(index, cell)}>
            {cell}
        </div>
    )
}

const checkWinner = (grid: TGrid): 'X' | 'O' | '' | null => {
    if (grid[0] === grid[1] && grid[1] === grid[2] && grid[0] !== '') {
        return grid[0];
    }
    if (grid[3] === grid[4] && grid[4] === grid[5] && grid[3] !== '') {
        return grid[3];
    }
    if (grid[6] === grid[7] && grid[7] === grid[8] && grid[6] !== '') {
        return grid[6];
    }
    if (grid[0] === grid[3] && grid[3] === grid[6] && grid[0] !== '') {
        return grid[0];
    }
    if (grid[1] === grid[4] && grid[4] === grid[7] && grid[1] !== '') {
        return grid[1];
    }
    if (grid[2] === grid[5] && grid[5] === grid[8] && grid[2] !== '') {
        return grid[2];
    }
    if (grid[0] === grid[4] && grid[4] === grid[8] && grid[0] !== '') {
        return grid[0];
    }
    if (grid[2] === grid[4] && grid[4] === grid[6] && grid[2] !== '') {
        return grid[2];
    }

    if (grid[0] !== '' && grid[1] !== '' && grid[2] !== '' && grid[3] !== '' && grid[4] !== '' && grid[5] !== '' && grid[6] !== '' && grid[7] !== '' && grid[8] !== '') {
        return '';
    }

    return null;
}

const Grid = ({ setModel, model }: { setModel: (model: TTicTacToeModel) => void, model: TTicTacToeModel }) => {

    const handleCellClick = (index: number, cell: TTicOrTac) => {
        const validCell = model.grid[index] === '';
        if (!validCell) {
            return;
        }
        const grid = model.grid.map((gr, i) => {
            if (i === index && gr === '') {
                return model.turn === 'PLAYER1' ? model.player1Cross ? 'X' : 'O' : model.player1Cross ? 'O' : 'X';
            }
            return gr;
        }) as TGrid;
        setModel({
            ...model,
            turn: model.turn === 'PLAYER1' ? 'PLAYER2' : 'PLAYER1',
            grid: grid,
            winner: checkWinner(grid) === 'O' ? (model.player1Cross ? 'PLAYER2' : "PLAYER1") : checkWinner(grid) === 'X' ? (model.player1Cross ? 'PLAYER1' : "PLAYER2") : checkWinner(grid) === '' ? 'DRAW' : null
        })


    }
    return (

        <div className='grid grid-cols-3 border-r-2 border-b-2'>
            {
                model.grid.map((cell, index) => {
                    return (

                        <Cell cell={cell} index={index} handleCellClick={handleCellClick} />

                    )
                })
            }

        </div>

    )

}

const Prompt = ({ model }: { model: TTicTacToeModel }) => {
    return (
        <div className="text-center mt-10">
            {
                model.winner === 'DRAW' && <div>Draw</div>
            }
            {
                model.winner === 'PLAYER1' && <div>Player 1 wins</div>
            }
            {
                model.winner === 'PLAYER2' && <div>Player 2 wins</div>
            }
        </div>
    )

}

const PlayerChoice = ({ onChoice }: { onChoice: (player1Cross: boolean) => void }) => {
    return (
        <div className="text-center ">
            <p>Player 1 chooses:</p>
            <div className="flex gap-4 justify-center mt-2">
                <button onClick={() => onChoice(true)} className="border p-2">X</button>
                <button onClick={() => onChoice(false)} className="border p-2">O</button>
            </div>
        </div>
    )
}

const whosTurn = (model: TTicTacToeModel) => {
    if (model.winner === 'DRAW' || model.winner === 'PLAYER1' || model.winner === 'PLAYER2') {
        return null;
    }
    return model.turn === 'PLAYER1' ? model.player1Cross ? 'X' : 'O' : model.player1Cross ? 'O' : 'X';
}

export const MainGrid = () => {
    const [mainModel, setModel] = useState(mockModel);
    const [playerWins, setPlayerWins] = useLocalStorage<TPlayerHistory>('playerWins', { player1: { playerName: 'Player 1', wins: 0 }, player2: { playerName: 'Player 2', wins: 0 } });
    const [showPrompt, setShowPrompt] = useState(false);
    const [showChoice, setShowChoice] = useState(true);

    const handleChoice = (player1Cross: boolean) => {
        setModel({ ...mockModel, player1Cross });
        setShowChoice(false);
    };

    const handleReset = () => {
        if (mainModel.winner === 'PLAYER1') {
            setPlayerWins({ ...playerWins, player1: { playerName: mainModel.player1Name, wins: playerWins.player1.wins + 1 } });
        }
        if (mainModel.winner === 'PLAYER2') {
            setPlayerWins({ ...playerWins, player2: { playerName: mainModel.player2Name, wins: playerWins.player2.wins + 1 } });
        }
        setModel(mockModel);
        setShowChoice(true);
    }

    useEffect(() => {
        if (mainModel.winner === 'DRAW' || mainModel.winner === 'PLAYER1' || mainModel.winner === 'PLAYER2') {
            setShowPrompt(true);
            setTimeout(() => {
                handleReset();
            }, 3000);
        }
    }, [mainModel.winner]);

 

    return (<>
    {showChoice && <PlayerChoice onChoice={handleChoice} />}
        <div className='m-auto w-1/4 mt-10'>
            <div className='flex justify-between mb-4'>
                <div className='text-center'>{playerWins.player1.playerName} wins: {playerWins.player1.wins}</div>
                <div className='text-center'>{playerWins.player2.playerName} wins: {playerWins.player2.wins}</div>
            </div>

          
           {
            !showChoice && <>
              <div className='relative'>
                <div className='text-center'>Lets go!</div>
                <button className='absolute top-0 right-0 bg-red-500 text-white p-2 rounded-md' onClick={() => handleReset()}> Reset</button>
            </div>
             {mainModel.winner === null && <div className='text-center mb-8'>{mainModel.turn} {whosTurn(mainModel)}</div>}
            <Grid model={mainModel} setModel={setModel} />
            {showPrompt && <Prompt model={mainModel} />}
            </>
           }
        </div></>
     
    )
}
import React, { useState } from 'react';
import HandOfCards from './HandOfCards';
import Button from './Buttons';

type card = {
    kind: string,
    value: number,
    url: string
}

const Board: React.FC = () => {
    const [dealerCards, setDealerCards] = useState<card[]>([]);
    const [playerCards, setPlayerCards] = useState<card[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [deckLengh,setLength] = useState<number>(52);


    const newSession = async () => {
        const response = await fetch('http://localhost:3000/new-session');
        const data = await response.json();
        setDealerCards([]);
        setPlayerCards([]);
        setGameOver(false);
        setMessage('');
        setLength(data.Length);
        return;
    };

    const newGame = async () => {
        const response = await fetch('http://localhost:3000/new-game');
        const data = await response.json();
        if(data.bkackjack)
        {
            setDealerCards(data.dealerCards);
            setPlayerCards(data.playerCards);
            setLength(data.deckLength);
            setMessage('blackjack ! player wins ');
            setGameOver(true);
            return;
        }
        else{
            setDealerCards(data.dealerCards);
            setPlayerCards(data.playerCards);
            setLength(data.deckLength);
            setGameOver(false);
            setMessage('');
        }
    };

    const hit = async () => {
        if (gameOver) return;
        const response = await fetch('http://localhost:3000/hit');
        const data = await response.json();
        setPlayerCards(playerCards => { 
            const updatedPlayerCards = [...playerCards, data.HitCard];
            if (calculateHandValue(updatedPlayerCards) > 21) {
                setMessage('Player busts! Dealer wins.');
                setGameOver(true);
            }
            return updatedPlayerCards;
        });
        setLength(data.deckLength);
    };
  
    const stand = async () => {
        if (gameOver) return;
        const response = await fetch('http://localhost:3000/stand');
        const data = await response.json();
        setDealerCards(data.DealerCards);

        const dealerValue = calculateHandValue(data.DealerCards);
        const playerValue = calculateHandValue(playerCards);

        if (dealerValue > 21 || playerValue > dealerValue) {
            setMessage('Player wins!');
        } else if (playerValue < dealerValue) {
            setMessage('Dealer wins!');
        } else {
            setMessage('It\'s a tie!');
        }
        setGameOver(true);
        setLength(data.deckLength);

    };

    const calculateHandValue = (cards: card[]): number => {
        let value = cards.reduce((sum, card) => sum + card.value, 0);
        let numOfAces = cards.filter(card => card.value === 11).length;
        while (value > 21 && numOfAces > 0) {
            value -= 10;
            numOfAces--;
        }
        return value;
    };

    return (
        <div  className="container">
            <h1>Blackjack Game</h1>
            <div>
                <Button OnClickFunction={newSession} TextContent='New Session' Disabled={false}/>
                <h2 id='deck'>{"deck :  " + deckLengh}</h2>
                <h2>{'Dealer Cards:   ' + calculateHandValue(dealerCards)}</h2>
                <HandOfCards cards={dealerCards} />
                
                <h2>{'Player Cards:   ' + calculateHandValue(playerCards)}</h2>
                <HandOfCards cards={playerCards} />
                <h2 className='message'>{message}</h2>
            </div>
            <div>
                <Button OnClickFunction={newGame} TextContent='New Game' Disabled={false} />
                <Button OnClickFunction={hit} TextContent='Hit' Disabled={gameOver} />
                <Button OnClickFunction={stand} TextContent='Stand' Disabled={gameOver} />
            </div>
        </div>
    );
};

export default Board;

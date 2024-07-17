import React, { useState } from 'react';

type card = {
    kind: string,
    value: number,
    url: string
}
type HandOfCardsProps = {
    cards: card[];
}
const HandOfCards: React.FC<HandOfCardsProps> = ({ cards }) => {
    return (
        <div>
            {cards.map((card, index) => (
                <img key={index} src={`http://localhost:3000${card.url}`} alt={`${card.kind} ${card.value}`} />
            ))}
        </div>
    );
};
export default HandOfCards;

import React from "react";

const Players = (props) => (
    <div className="playerSelectContainer">
        {
            props.players.map(player => (
                <div key={player.playerNum}>
                    <p className="centeredText">P{player.playerNum}</p>
                    <img 
                        className="selectedCat"
                        src={`/cats/${player.cat.name}-cat.png`} 
                        alt={player.cat.name}
                    />
                </div>
            ))
        }
    </div>
);

export default Players;
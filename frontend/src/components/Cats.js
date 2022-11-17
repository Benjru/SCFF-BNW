import React from "react";

const Cats = (props) => (
    <div className="selectedCatContainer">
        {
            props.cats.map(cat => (
                <div key={cat.catNum}>
                    <p className="centeredText">SELECTED CAT</p>
                    <img 
                        className="selectedCat"
                        src={`/cats/${cat.name}-cat.png`} 
                        alt={cat.name}
                    />
                </div>
            ))
        }
    </div>
);

export default Cats;
import React from "react";

const NewlineText = (props) => { 

    const text = props.text;
    const newText = text.split('\n').map(str => <p>{str}</p>);

    return(
        newText
    )
}

export default NewlineText;
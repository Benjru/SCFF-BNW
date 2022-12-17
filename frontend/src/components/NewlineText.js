import React from "react";

const NewlineText = (props) => { // with backend: remove planets from state variable and then in componentDidMount make API call to get planets, add to setState

    const text = props.text;
    const newText = text.split('\n').map(str => <p>{str}</p>);

    return(
        newText
    )
}

export default NewlineText;
import { useState, useEffect } from "react";

import "./App.css";

function App() {
    const [words, setWords] = useState([]);
    useEffect(() => {
        fetch("/api/spanish/words")
            .then((res) => res.json())
            .then(setWords);
    }, []);
    return (
        <>
            {words.map((word) => {
                return <p>{`${word.spanish}`}</p>;
            })}
        </>
    );
}

export default App;

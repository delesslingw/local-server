import { useState, useEffect } from "react";

import "./App.css";

function App() {
    const [loading, setLoading] = useState(true);
    const [words, setWords] = useState([]);
    const [index, setIndex] = useState(0);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        fetch("/api/spanish/words")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setWords(data);

                // Build options after setting words
                const initialIndex = 0;
                const correctOption = data[initialIndex];
                const distractors = getRandomItemsExcludingIndex(data, initialIndex);
                const allOptions = shuffleArray([correctOption, ...distractors]);

                setIndex(initialIndex);
                setOptions(allOptions);
                setLoading(false);
            });
    }, []);
    const handleAnswer = (_id) => {
        if (_id !== words[index]._id) {
            console.log("WRONG");
        } else {
            console.log("CORRECT");
        }
        if (index >= words.length) {
            console.log("DONE");
        } else {
            setLoading(true);
            setIndex((i) => i + 1);
            const correctOption = words[index];
            const distractors = getRandomItemsExcludingIndex(words, index);
            const allOptions = shuffleArray([correctOption, ...distractors]);
            setOptions(allOptions);
            setLoading(false);
        }
        return;
    };
    return loading ? null : (
        <>
            <h1>{words[index].spanish}</h1>
            <div>
                {options.map((opt) => {
                    const gloss = shuffleArray(opt.english.glosses)[0].text;

                    return (
                        <div
                            style={{ border: "2px solid black", padding: "8px 12px", borderRadius: "2px" }}
                            onClick={() => handleAnswer(opt._id)}
                        >
                            {gloss}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
function shuffleArray(arr) {
    const array = arr.slice(); // Make a shallow copy to avoid mutating original
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function getRandomItemsExcludingIndex(arr, excludeIndex, count = 3) {
    if (excludeIndex < 0 || excludeIndex >= arr.length) {
        throw new Error("excludeIndex is out of range.");
    }

    // Filter out the item at the excludeIndex
    const filtered = arr.filter((_, index) => index !== excludeIndex);

    if (filtered.length < count) {
        throw new Error("Not enough items to select from after excluding the index.");
    }

    // Shuffle and pick `count` items
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export default App;

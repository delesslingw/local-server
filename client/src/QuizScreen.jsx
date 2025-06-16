import { useQuizGame } from "./useQuizGame";

export default function QuizScreen() {
    const { current, handleAnswer, isLoading, isDone, quizWords } = useQuizGame();
    if (isLoading) return <p>Loading Quiz...</p>;
    if (!current) return <p>No quiz loaded</p>;
    if (isDone) return <p>Quiz Complete</p>;
    const distractors = quizWords.filter((w) => w._id !== current._id).slice(0, 3);
    const options = shuffleArray([current, ...distractors]);

    return (
        <div>
            <h2>{current.spanish}</h2>
            <div>
                {options.map((opt) => {
                    const gloss = opt.english.glosses[0]?.text;
                    return (
                        <button key={opt._id} onClick={() => handleAnswer(opt._id)}>
                            {gloss}
                        </button>
                    );
                })}
            </div>
        </div>
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

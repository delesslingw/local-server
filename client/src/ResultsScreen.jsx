import { useQuizGame } from "../hooks/useQuizGame";

export default function ResultsScreen() {
    const { results, startNewQuiz } = useQuizGame();
    const correct = results.filter((r) => r.isCorrect).length;

    return (
        <div>
            <h2>Quiz Complete!</h2>
            <p>
                You got {correct} out of {results.length} correct.
            </p>
            <button onClick={startNewQuiz}>Start New Quiz</button>
        </div>
    );
}

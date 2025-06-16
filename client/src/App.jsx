import "./App.css";
import QuizScreen from "./QuizScreen";

function App() {
    return <QuizScreen />;
}
// function shuffleArray(arr) {
//     const array = arr.slice(); // Make a shallow copy to avoid mutating original
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]]; // Swap elements
//     }
//     return array;
// }

// function getRandomItemsExcludingIndex(arr, excludeIndex, count = 3) {
//     if (excludeIndex < 0 || excludeIndex >= arr.length) {
//         throw new Error("excludeIndex is out of range.");
//     }

//     // Filter out the item at the excludeIndex
//     const filtered = arr.filter((_, index) => index !== excludeIndex);

//     if (filtered.length < count) {
//         throw new Error("Not enough items to select from after excluding the index.");
//     }

//     // Shuffle and pick `count` items
//     const shuffled = filtered.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
// }

export default App;

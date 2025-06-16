// src/api/quizApi.ts
export const fetchQuizWords = async () => {
    const res = await fetch("/api/quiz/words");
    if (!res.ok) throw new Error("Failed to fetch quiz");
    return await res.json(); // returns Entry[]
};

export const submitAnswer = async ({ entryId, isCorrect }) => {
    console.log(isCorrect);
    const res = await fetch("/api/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId, isCorrect }),
    });
    if (!res.ok) throw new Error("Failed to submit answer");
    return await res.json();
};

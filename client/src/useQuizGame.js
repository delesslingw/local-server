import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchQuizWords, submitAnswer } from "./quizApi";
import { useState } from "react";

export function useQuizGame() {
    // const queryClient = useQueryClient()
    const {
        data: quizWords = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["quizWords"],
        queryFn: fetchQuizWords,
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState([]);
    const mutation = useMutation({
        mutationFn: submitAnswer,
    });
    const current = quizWords[currentIndex];
    const isDone = currentIndex >= quizWords.length;
    const handleAnswer = async (selectId) => {
        const isCorrect = selectId === current._id;
        await mutation.mutateAsync({ entryId: current._id, isCorrect });
        setResults((prev) => [...prev, { id: current._id, isCorrect }]);
        setCurrentIndex((i) => i + 1);
    };
    const startNewQuiz = async () => {
        setResults([]);
        setCurrentIndex(0);
        await refetch();
    };
    return {
        isLoading,
        isError,
        quizWords,
        current,
        handleAnswer,
        isDone,
        results,
        startNewQuiz,
    };
}

import { useCallback, useState } from "react";

import QUESTIONS from "../questions.js";
import Summary from "./Summary.jsx";
import Question from "./Question.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return (
            <Summary userAnswers={userAnswers} />
        );
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex} //Enfim, pus a key aqui porque o que defe ser refeito é a questão inteira, não as respostas e o tempo separadamente!
                onSelectedAnswer={handleSelectAnswer}
                index={activeQuestionIndex}
                onSkipAnswer={handleSkipAnswer} />
        </div>

    );
}
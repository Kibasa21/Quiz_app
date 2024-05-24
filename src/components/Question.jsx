import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answer from "./Answer";
import QUESTIONS from "../questions.js";

export default function Question({index, onSelectedAnswer, onSkipAnswer}) {
//desestruturando o key prop para pegar o indice da questão
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null,
    });

    let timer = 10000;
    const answeredTimer = 1000;
    const showAnswerTimer = 2000;

    if(answer.selectedAnswer && answer.isCorrect === null) {
        timer = answeredTimer;
    }
    
    if(answer.isCorrect !== null) {
        timer = showAnswerTimer;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null,
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: answer === QUESTIONS[index].answers[0] ? true : false,
            });

            setTimeout(() => {
                onSelectedAnswer(answer);
            }, showAnswerTimer);
        }, answeredTimer);
    }

    let answerState = '';

    if(answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? "correct" : "wrong";
    } else if (answer.selectedAnswer) {
        answerState = "answered";
    }

    return (
        <div id="question">
                <QuestionTimer
                    key={timer} //Usei essa key porque eu preciso que esse componente seja recriado toda vez que o estado de Quiz mude, ou seja, se não precisar de nenhuma estado, o componente não muda
                    timeout={timer}
                    onTimeout={answer.selectedAnswer ? null : onSkipAnswer}
                    mode={answerState} />
                <h2>{QUESTIONS[index].text}</h2>
                <Answer
                    // key={activeQuestionIndex} //o react não gosta de componentes irmãos com as mesmas keys, dá erro, então criei outro componente
                    answers={QUESTIONS[index].answers}
                    selectedAnswer={answer.selectedAnswer}
                    answerState={answerState}
                    onSelect={handleSelectAnswer} />
            </div>
    );
}
import quizCompleteImage from "../assets/quiz-logo.png";
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {

    const skippedAnswers = userAnswers.filter(answer => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    return (
        <div id="summary">
            <img src={quizCompleteImage} />
            <h2>Quiz completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{`${Math.round((skippedAnswers.length/QUESTIONS.length)*100)}%`}</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{`${Math.round((correctAnswers.length/QUESTIONS.length)*100)}%`}</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{`${100 - Math.round((skippedAnswers.length/QUESTIONS.length)*100) - Math.round((correctAnswers.length/QUESTIONS.length)*100)}%`}</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => { //index é dado automaticamente pelo map

                    let cssClass = 'user-answer';

                    if(answer === null){
                        cssClass += ' skipped';
                    } else if(answer === QUESTIONS[index].answers[0]){
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }

                    return (
                        <li key={index}>
                            <h3>{index+1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'skipped'}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
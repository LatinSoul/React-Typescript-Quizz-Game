import React from "react";
import {AnswerObject} from '../App';
import {Wrapper, ButtonWrapper} from './QuestionCard.styles'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions
}) => (
    <Wrapper>
        <p>Question: {questionNr}/{totalQuestions}</p>
        <p dangerouslySetInnerHTML={{__html:question}} />
        <div>
            {answers.map(answer=>(
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                >
                    {/* disable should receive a boolean but the type defines the value as AnswerObject or undefined. Solution would be to place a !! in front of the value, or use a turnary op to provide the boolean value */}
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html: answer}} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);



export default QuestionCard;
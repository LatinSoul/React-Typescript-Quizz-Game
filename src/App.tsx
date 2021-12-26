import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions} from './API';
import { QuestionState, Difficulty } from './API';
// Style
import { Wrapper, GlobalStyle } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions)
  
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //get user Answer
      const answer = e.currentTarget.value;
      //check for right answer
      const correct = questions[number].correct_answer === answer;
      // increment score
      if(correct) setScore((prev) => prev + 1);
      //create an answer object to place in the answers arr
      const answerObject = {
        question: questions[number].question,
        answer, 
        correct,
        correctAnswer: questions[number].correct_answer
      };
      //add to arr
      setUserAnswers((prev) => [...prev,answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };
  
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quizz</h1>
        { gameOver || userAnswers.length===TOTAL_QUESTIONS ? (
            <button className='start' onClick={startTrivia}>Start</button>
          ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading && <p>Loading question...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            totalQuestions={TOTAL_QUESTIONS}
            questionNr={number +1}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers?userAnswers[number]:undefined}
            callback={checkAnswer}
          />
        )}
        {!loading && !gameOver && userAnswers.length=== number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>Next Question</button>
          ) : null
        }
      </Wrapper>
    </>
  );
}

export default App;

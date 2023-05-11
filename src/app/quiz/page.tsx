'use client'
import { useState } from "react"
import questionData from "../util/questions.json"
import Timer from "./timer"
import ConfettiExplosion from "react-confetti-explosion"

const Quiz: React.FC<QuizProps> = () => {
	// pick 5 objects from questionData
	const questions = questionData.sort(() => 0.5 - Math.random()).slice(0, 5);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false)
  
	const handleAnswerOptionClick = (isCorrect: boolean) => {
	  if (isCorrect) {
		setScore(score + 1);
	  }
  
	  handleNext();
	};

	const handleNext = () => {
		const nextQuestion = currentQuestion + 1;
	  if (nextQuestion < questions.length) {
		setCurrentQuestion(nextQuestion)
	  } else {
		setShowScore(true)
	  }
	}

	const handleTimeExpired = () => {
		handleNext()
	}
  
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
		  <div className="w-96 rounded-lg shadow-lg overflow-hidden">
			{!showScore ? <Timer timeInSeconds={15} onTimeExpired={handleTimeExpired} index={currentQuestion} /> : null}
			{showScore ? (
			  <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
				{score === 5 ? <ConfettiExplosion /> : null}
				<h1 className="text-3xl font-bold text-gray-800 mb-8">
				  Your Score: {score} / {questions.length}
				</h1>
				<button
				  className="px-6 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
				  onClick={() => {
					setCurrentQuestion(0);
					setScore(0);
					setShowScore(false);
				  }}
				>
				  Play Again
				</button>
			  </div>
			) : (
			  <div className="bg-white">
				<div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
				  <h2 className="text-2xl font-bold text-gray-800 mb-8">
					{questions[currentQuestion].question}
				  </h2>
				  <div className="grid grid-cols-2 gap-6">
					{questions[currentQuestion].options.map(
					  (answerOption) => (
						<button
						  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
						  key={answerOption}
						  onClick={() =>
							handleAnswerOptionClick(answerOption === questions[currentQuestion].answer)
						  }
						>
						  {answerOption}
						</button>
					  )
					)}
				  </div>
				</div>
			  </div>
			)}
		  </div>
		</div>
	  );	  
  };
  
  export default Quiz;

  const styles = {
	container: {
		background: "linear-gradient(to right, #3b5998, #90ee90)"

	}
  }

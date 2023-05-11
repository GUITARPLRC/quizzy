interface QuizProps {
	questions: Question[]
}

interface Question {
	question: string
	answer: string
	options: string[]
}

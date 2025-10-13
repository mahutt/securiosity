import { useState } from 'react'
import { Button } from '../ui/button'

// No helper functions needed at the top level

export default function EuclideanAlgorithm() {
  // Generate two random numbers between 10 and 100
  const [numbers] = useState(() => [
    Math.floor(Math.random() * 91) + 10,
    Math.floor(Math.random() * 91) + 10,
  ])
  const [userAnswer, setUserAnswer] = useState('')
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const calculateGCD = (a: number, b: number): number => {
    while (b) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  const checkAnswer = () => {
    const solution = calculateGCD(numbers[0], numbers[1])
    const userNum = parseInt(userAnswer, 10)

    // Check if the user's answer matches the GCD
    const isValid = userNum === solution

    setIsCorrect(isValid)
    setIsAnswerChecked(true)
  }

  return (
    <div className="space-y-4">
      <div
        className={`space-y-2 ${isAnswerChecked && isCorrect ? 'text-green-500' : ''}`}
      >
        <div className="text-md">
          GCD({numbers[0]}, {numbers[1]}) = ?
        </div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value)
            setIsAnswerChecked(false)
          }}
          placeholder="Enter your answer"
          className="border rounded px-2 py-1 w-32"
        />
        <Button
          onClick={checkAnswer}
          variant={
            isAnswerChecked ? (isCorrect ? 'ghost' : 'destructive') : 'default'
          }
        >
          Check Answer
        </Button>
      </div>

      {isAnswerChecked && (
        <div className={isCorrect ? 'text-green-500' : 'text-red-500'}>
          {isCorrect ? 'Correct!' : 'Try again'}
        </div>
      )}
    </div>
  )
}

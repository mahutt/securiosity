import { useState } from 'react'
import { Button } from '../ui/button'

function performSquareAndMultiply(
  base: number,
  exponent: number,
  modulus: number
): number {
  let result = 1
  base = base % modulus // Update base if it is more than or equal to modulus

  while (exponent > 0) {
    // If exponent is odd, multiply base with result
    if (exponent % 2 === 1) {
      result = (result * base) % modulus
    }
    // exponent must be even now
    exponent = Math.floor(exponent / 2) // Divide exponent by 2
    base = (base * base) % modulus // Square the base
  }
  return result
}

export default function SquareAndMultiply() {
  // base should be between 2 and 10
  // exponent should be between 10 and 100
  // modulus should be between base and 20

  const [base, setBase] = useState<number>(
    Math.floor(Math.random() * (10 - 2 + 1)) + 2
  )
  const [exponent, setExponent] = useState<number>(
    Math.floor(Math.random() * (100 - 10 + 1)) + 10
  )
  const [modulus, setModulus] = useState<number>(
    Math.floor(Math.random() * (20 - base + 1)) + base
  )

  const [result, setResult] = useState<number>(
    performSquareAndMultiply(base, exponent, modulus)
  )

  const [userInput, setUserInput] = useState<string>('')
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  const checkAnswer = () => {
    const userResult = parseInt(userInput, 10)
    if (!isNaN(userResult)) {
      setIsAnswerChecked(true)
      setIsCorrect(userResult === result)
    }
  }

  return (
    <div
      className={`flex flex-row items-center justify-center gap-4 ${isAnswerChecked ? (isCorrect ? 'text-green-500' : 'text-red-500') : ''}`}
    >
      <div className="text-center text-lg font-medium">
        {base}^{exponent} mod {modulus} =
      </div>
      <input
        type="number"
        value={userInput}
        className={`ml-2 w-32 rounded border p-2 text-center text-lg font-mono outline-none focus:border-blue-500 ${
          isAnswerChecked
            ? isCorrect
              ? 'border-green-500 text-green-500'
              : 'border-red-500 text-red-500'
            : 'border-gray-300'
        }`}
        onClick={(e) => (e.target as HTMLInputElement).select()}
        onChange={(e) => {
          setUserInput(e.target.value)
          setIsAnswerChecked(false)
        }}
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
  )
}

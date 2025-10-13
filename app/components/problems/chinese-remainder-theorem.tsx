import { useState } from 'react'
import { Button } from '../ui/button'

function generateCoprimeModuli(
  count: number,
  min: number,
  max: number
): number[] {
  const isCoprime = (a: number, b: number): boolean => {
    while (b) {
      const temp = b
      b = a % b
      a = temp
    }
    return a === 1
  }

  const moduli: number[] = []
  while (moduli.length < count) {
    const candidate = Math.floor(Math.random() * (max - min + 1)) + min
    if (moduli.every((m) => isCoprime(m, candidate))) {
      moduli.push(candidate)
    }
  }
  return moduli
}

function findSolution(moduli: number[], remainders: number[]): number {
  // Calculate product of all moduli
  const N = moduli.reduce((a, b) => a * b, 1)

  // Calculate Ni = N/ni
  const Ni = moduli.map((ni) => N / ni)

  // Calculate yi (modular multiplicative inverse of Ni modulo ni)
  const yi = moduli.map((ni, i) => {
    let y = 1
    while ((Ni[i] * y) % ni !== 1) {
      y++
    }
    return y
  })

  // Calculate x = sum(ai * Ni * yi) mod N
  const x = remainders.reduce((sum, ai, i) => {
    return (sum + ai * Ni[i] * yi[i]) % N
  }, 0)

  return x
}

export default function ChineseRemainderTheorem() {
  // We will use exactly 3 moduli for simplicity
  // Each modulus should be between 3 and 10
  // The moduli should be pairwise coprime
  // The remainders should be between 0 and modulus-1
  const [userAnswer, setUserAnswer] = useState('')
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [moduli] = useState(generateCoprimeModuli(3, 3, 10))
  const [remainders] = useState(
    moduli.map((m) => Math.floor(Math.random() * m))
  )

  const checkAnswer = () => {
    const solution = findSolution(moduli, remainders)
    const userNum = parseInt(userAnswer, 10)

    // Check if the user's answer gives the same remainders
    const isValid = moduli.every((m, i) => {
      return userNum >= 0 && userNum % m === remainders[i]
    })

    setIsCorrect(isValid)
    setIsAnswerChecked(true)
  }

  return (
    <div className="space-y-4">
      <div
        className={`space-y-2 ${isAnswerChecked && isCorrect ? 'text-green-500' : ''}`}
      >
        <h3 className="text-lg font-bold">Find x such that:</h3>
        {moduli.map((m, i) => (
          <div key={i} className="text-md">
            x ≡ {remainders[i]} (mod {m})
          </div>
        ))}
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

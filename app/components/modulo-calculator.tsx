import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function ModuloCalculator() {
  const [leftOperand, setLeftOperand] = useState(1)
  const [rightOperand, setRightOperand] = useState(2)
  const [result, setResult] = useState(1 % 2)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modulo Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-12 text-3xl font-mono">
          <input
            value={leftOperand}
            onChange={(e) => {
              const newLeftOperand = Number(e.target.value)
              setLeftOperand(newLeftOperand)
              setResult(newLeftOperand % rightOperand)
            }}
            className="w-16 text-center"
          />
          <p className="text-gray-500">mod</p>

          <input
            value={rightOperand}
            onChange={(e) => {
              const newRightOperand = Number(e.target.value)
              setRightOperand(newRightOperand)
              setResult(leftOperand % newRightOperand)
            }}
            className="w-16 text-center"
          />

          <p className="text-gray-500">=</p>
          <p className="text-gray-500">{result}</p>
        </div>
      </CardContent>
    </Card>
  )
}

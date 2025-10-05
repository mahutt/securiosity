import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function ModuloCalculator() {
  const [leftOperand, setLeftOperand] = useState('1')
  const [rightOperand, setRightOperand] = useState('1')
  const [remainder, setRemainder] = useState('0')

  const calculateRemainder = () => {
    const left = Number(leftOperand)
    const right = Number(rightOperand)
    if (!isNaN(left) && !isNaN(right) && right !== 0) {
      setRemainder((left % right).toString())
    } else {
      setRemainder('NaN')
    }
  }

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
              setLeftOperand(e.target.value)
              calculateRemainder()
            }}
            className="w-16 text-center"
            onClick={() => setLeftOperand('')}
          />
          <p className="text-gray-500">mod</p>

          <input
            value={rightOperand}
            onChange={(e) => {
              setRightOperand(e.target.value)
              calculateRemainder()
            }}
            className="w-16 text-center"
            onClick={() => setRightOperand('')}
          />

          <p className="text-gray-500">=</p>
          <p className="text-gray-500">{remainder}</p>
        </div>
      </CardContent>
    </Card>
  )
}

import { ProblemType } from '~/types'
import ProblemTypeDropdown from './problem-type-dropdown'
import React from 'react'
import SquareAndMultiply from './problems/square-and-multiply'

export default function ProblemBox({
  problemType,
}: {
  problemType: ProblemType
}) {
  let problem: React.ReactElement | null = null

  switch (problemType) {
    case ProblemType.ChineseRemainderTheorem:
      problem = <div></div>
      break
    case ProblemType.SquareAndMultiply:
      problem = SquareAndMultiply()
      break
    default:
      problem = null
  }

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <ProblemTypeDropdown correctValue={problemType} />
      {problem}
    </div>
  )
}

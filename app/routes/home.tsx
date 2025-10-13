import ProblemBox from '~/components/problem-box'
import type { Route } from './+types/home'
import ModuloCalculator from '~/components/modulo-calculator'
import { ProblemType } from '~/types'
import { useState } from 'react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  // Randomize order of ProblemType enum
  const [problemTypes, setProblemTypes] = useState<ProblemType[]>(
    Object.values(ProblemType).sort(() => Math.random() - 0.5)
  )

  return (
    <main className="flex max-w-3xl flex-col items-center justify-center gap-4 p-8 mx-auto">
      <ModuloCalculator />
      {problemTypes.map((type) => (
        <ProblemBox key={type} problemType={type} />
      ))}
    </main>
  )
}

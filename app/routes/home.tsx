import type { Route } from './+types/home'
import ModuloCalculator from '~/components/modulo-calculator'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  return (
    <main className="flex max-w-3xl flex-col items-center justify-center gap-4 p-8 mx-auto">
      <ModuloCalculator />
    </main>
  )
}

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { ProblemType } from '~/types'

export default function ProblemTypeDropdown({
  correctValue,
}: {
  correctValue: ProblemType
}) {
  const [value, setValue] = useState<ProblemType | null>(null)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={
            !value
              ? 'text-gray-500'
              : value === correctValue
                ? 'text-green-500'
                : 'text-red-500'
          }
        >
          {value ?? (
            <>
              <span>Select the problem type</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {Object.values(ProblemType).map((problemType) => (
          <DropdownMenuItem
            key={problemType}
            onSelect={() => setValue(problemType)}
          >
            {problemType}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

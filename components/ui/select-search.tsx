"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from './input'


type Props = {
  onChange: (value: string) => void
  data: string[]
}

export function SelectSearch({ data, onChange }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [inputValue, setInputValue] = React.useState("")
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])


  const handleSelect = (framework: string) => {
    if (selectedValues.includes(framework)) {
      setSelectedValues(selectedValues.filter((value) => value !== framework))
    } else {
      setSelectedValues([...selectedValues, framework])
    }
    if(inputValue.length > 0){
      setSelectedValues([...selectedValues, framework])
    }
  }

  React.useMemo(() => {
    onChange(selectedValues.join(', '))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues])

  const filtredData = data.filter((framework) =>
    framework.toLowerCase().includes(value.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className='w-full'>
          <Input className="text-base flex-1 px-2 py-4 rounded-r-none" 
            value={selectedValues.join(', ')}
            placeholder="Spring Boot, Next.js" />
          </div>
        </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className='w-full rounded-md grid'>
          <div className='p-2'>
            <Input
              className="text-base flex-1 px-2 py-4 rounded-r-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search frameworks"
            />
          </div>
          <div className='w-full grid gap-1 max-h-60 pb-4 px-4 overflow-y-auto'>
            {
               filtredData.map((framework: string) => (
                <button
                  key={framework}
                  onClick={() => handleSelect(framework)}
                  className={cn(
                    "w-full flex items-center justify-between px-2 py-1 rounded-md",
                    selectedValues.includes(framework) && "bg-foreground text-background",
                  )}
                >
                  {framework}
                  {selectedValues.includes(framework) && <Check size={16} />}
                </button>
              ))
            }
          </div>
        </div>

      </PopoverContent>
    </Popover>
  )
}

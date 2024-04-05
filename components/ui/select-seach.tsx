"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from './input'

const data = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

type SelectSearchProps = {
  defaultValue?: string
  onChange?: any
  placeholder?: string
  notFoundContent?: string
  [key: string]: any
}
export function SelectSearch(
  { defaultValue, onChange, 
    placeholder = "Search...",
    notFoundContent="No data found", ...props }: SelectSearchProps
) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleChange = (value:any) => {
    setValue(value)
    onChange && onChange(value)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Input placeholder="Software Development" {...props} type='hidded' value={value}/>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {value
            ? data.find((object) => object.value === value)?.label
            : "Search..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
      
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>{notFoundContent}</CommandEmpty>
          <CommandGroup>
            {data.map((object) => (
              <CommandItem
                key={object.value}
                value={object.value}
                onSelect={(currentValue:any) => {
                  handleChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === object.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {object.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

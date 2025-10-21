
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getPlacePredictions } from "@/app/actions"

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  currentLocation: string;
}

type PlacePrediction = {
  id: string;
  name: string;
}

export default function LocationSearch({ onLocationSelect, currentLocation }: LocationSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(currentLocation)
  const [predictions, setPredictions] = React.useState<PlacePrediction[]>([])
  const [loading, setLoading] = React.useState(false)
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // When popover closes, reset the input to the currently selected location
      setInputValue(currentLocation);
      setPredictions([]);
    }
  };

  const handleInputChange = async (value: string) => {
    setInputValue(value)
    if (value.length > 2) {
      setLoading(true)
      const newPredictions = await getPlacePredictions(value);
      setPredictions(newPredictions);
      setLoading(false)
    } else {
      setPredictions([])
    }
  }
  
  const handleSelect = (value: string) => {
    const selected = predictions.find(p => p.name.toLowerCase() === value.toLowerCase())
    if (selected) {
      onLocationSelect(selected.name)
      setInputValue(selected.name)
    }
    handleOpenChange(false);
  }


  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between sm:w-[250px]"
        >
          <span className="truncate">{currentLocation}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 sm:w-[250px]">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search for a city..."
            value={inputValue}
            onValueChange={handleInputChange}
          />
           <CommandList>
            {loading && (
              <div className="p-2 flex justify-center items-center">
                <LoaderCircle className="h-4 w-4 animate-spin"/>
              </div>
            )}
            {!loading && predictions.length === 0 && inputValue.length > 2 && <CommandEmpty>No place found.</CommandEmpty>}
            <CommandGroup>
              {predictions.map((prediction) => (
                <CommandItem
                  key={prediction.id}
                  value={prediction.name}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentLocation === prediction.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {prediction.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

"use client"

import * as React from 'react'
import { Check, Search } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '../ui/input'
import type { Location } from '@/lib/types'
import { searchLocations } from '@/lib/location-data'

interface LocationSearchProps {
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
}

export default function LocationSearch({ selectedLocation, onLocationSelect }: LocationSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<Location[]>([])

  React.useEffect(() => {
    if (searchQuery.length > 0) {
      const results = searchLocations(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelect = (locationName: string) => {
    onLocationSelect(locationName);
    setSearchQuery('');
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between sm:w-[200px]"
        >
          {selectedLocation}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0 sm:w-[200px]">
        <div className="p-2">
           <Input 
              placeholder="Search location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
        </div>
        <div className="max-h-60 overflow-auto">
            {searchResults.length > 0 ? (
                searchResults.map((location) => (
                    <div
                        key={`${location.name}-${location.country}`}
                        onClick={() => handleSelect(location.name)}
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent"
                    >
                         <Check
                            className={cn(
                                'mr-2 h-4 w-4',
                                selectedLocation === location.name ? 'opacity-100' : 'opacity-0'
                            )}
                        />
                        {location.name}, {location.country}
                    </div>
                ))
            ) : (
                searchQuery && <p className="p-2 text-center text-sm text-muted-foreground">No location found.</p>
            )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

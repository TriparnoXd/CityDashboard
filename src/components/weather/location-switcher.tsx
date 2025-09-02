'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LocationSwitcherProps {
  location: string;
  setLocation: (location: string) => void;
  locations: string[];
}

const LocationSwitcher: React.FC<LocationSwitcherProps> = ({ location, setLocation, locations }) => {
  return (
    <Select value={location} onValueChange={setLocation}>
      <SelectTrigger className="w-[140px] sm:w-[180px]">
        <SelectValue placeholder="Select location" />
      </SelectTrigger>
      <SelectContent>
        {locations.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {loc}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationSwitcher;

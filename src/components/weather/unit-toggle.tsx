'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Unit } from '@/lib/types';

interface UnitToggleProps {
  unit: Unit;
  setUnit: (unit: Unit) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, setUnit }) => {
  return (
    <Tabs value={unit} onValueChange={(value) => setUnit(value as Unit)} className="w-[100px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="C">°C</TabsTrigger>
        <TabsTrigger value="F">°F</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default UnitToggle;

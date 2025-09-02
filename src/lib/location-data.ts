export interface Location {
  name: string; // e.g., "London"
  country: string; // e.g., "United Kingdom"
}

// A simplified list of global locations for the search dropdown.
const locations: Location[] = [
    { name: 'London', country: 'United Kingdom' },
    { name: 'New York', country: 'United States' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Paris', country: 'France' },
    { name: 'Sydney', country: 'Australia' },
    { name: 'Dubai', country: 'United Arab Emirates' },
    { name: 'Moscow', country: 'Russia' },
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Rio de Janeiro', country: 'Brazil' },
    { name: 'Beijing', country: 'China' },
    { name: 'Los Angeles', country: 'United States' },
    { name: 'Mumbai', country: 'India' },
    { name: 'Berlin', country: 'Germany' },
    { name: 'Toronto', country: 'Canada' },
    { name: 'Singapore', country: 'Singapore' },
    { name: 'Lagos', country: 'Nigeria' },
    { name: 'Buenos Aires', country: 'Argentina' },
    { name: 'Istanbul', country: 'Turkey' },
    { name: 'Mexico City', country: 'Mexico' },
    { name: 'Seoul', country: 'South Korea' },
];

export function searchLocations(query: string): Location[] {
  if (!query) {
    return [];
  }
  const lowerCaseQuery = query.toLowerCase();
  return locations.filter(
    (loc) =>
      loc.name.toLowerCase().startsWith(lowerCaseQuery) ||
      loc.country.toLowerCase().startsWith(lowerCaseQuery)
  );
}

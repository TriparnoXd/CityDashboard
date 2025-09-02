import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloudy,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudLightning,
  Wind,
  type LucideProps,
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  condition: string;
  isDay?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, isDay = true, ...props }) => {
  const getIcon = () => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('sunny')) return <Sun {...props} />;
    if (lowerCaseCondition.includes('clear')) return isDay ? <Sun {...props} /> : <Moon {...props} />;
    if (lowerCaseCondition.includes('partly cloudy')) return isDay ? <CloudSun {...props} /> : <CloudMoon {...props} />;
    if (lowerCaseCondition.includes('cloudy')) return <Cloudy {...props} />;
    if (lowerCaseCondition.includes('overcast')) return <Cloudy {...props} />;
    if (lowerCaseCondition.includes('light rain') || lowerCaseCondition.includes('drizzle')) return <CloudDrizzle {...props} />;
    if (lowerCaseCondition.includes('heavy rain')) return <CloudRainWind {...props} />;
    if (lowerCaseCondition.includes('rain')) return <CloudRain {...props} />;
    if (lowerCaseCondition.includes('snow')) return <CloudSnow {...props} />;
    if (lowerCaseCondition.includes('thunderstorm')) return <CloudLightning {...props} />;
    if (lowerCaseCondition.includes('wind')) return <Wind {...props} />;
    return <Cloudy {...props} />;
  };

  return getIcon();
};

export default WeatherIcon;

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import worldMaps from '../data/world-maps.ts';
import continentMaps from '../data/continent-maps.ts';
import countryMaps from '../data/country-maps.ts';
import categories from '../data/categories.ts';

type MapResult = {
  id: number;
  name: string;
  probability: number;
  url: string;
  gameSettings: {
    mode: string;
    duration: number;
    probability: number;
  }[];
};

type GameSettings = {
  mode: string;
  duration: number;
  probability: number;
}[];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getRandomMap = (items: typeof worldMaps) => {
  const totalProbability = items.reduce((acc, item) => acc + item.probability, 0);
  const randomValue = Math.random() * totalProbability;

  let cumulativeProbability = 0;

  let result;

  for (const item of items) {
    cumulativeProbability += item.probability;
    if (randomValue <= cumulativeProbability) {
      result = item;
    }
  }

  return result;
};

const getRandomCategory = (items: typeof categories) => {
  const totalProbability = items.reduce((acc, item) => acc + item.probability, 0);
  const randomValue = Math.random() * totalProbability;

  let cumulativeProbability = 0;

  let result;

  for (const item of items) {
    cumulativeProbability += item.probability;
    if (randomValue <= cumulativeProbability) {
      result = item;
    }
  }

  return result;
};

const getRandomGameSetting = (items: GameSettings) => {
  const totalProbability = items.reduce((acc, item) => acc + item.probability, 0);
  const randomValue = Math.random() * totalProbability;

  let cumulativeProbability = 0;

  let result;

  for (const item of items) {
    cumulativeProbability += item.probability;
    if (randomValue <= cumulativeProbability) {
      result = item;
    }
  }

  return result;
};

export const selectMap = () => {
  const category = getRandomCategory(categories)!;
  let map: MapResult;

  switch (category.name) {
    case 'world':
      map = getRandomMap(worldMaps) as MapResult;
      break;
    case 'continent':
      map = getRandomMap(continentMaps) as MapResult;
      break;
    case 'country':
      map = getRandomMap(countryMaps) as MapResult;
      break;
    default:
      map = getRandomMap(countryMaps) as MapResult;
      break;
  }

  const gameSetting = getRandomGameSetting(map.gameSettings)!;

  const result = {
    category: category.name,
    mapName: map.name,
    map: map.url,
    mode: gameSetting.mode,
    timeLimit: gameSetting.duration,
  };

  return result;
};

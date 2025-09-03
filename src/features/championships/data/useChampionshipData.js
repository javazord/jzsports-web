import { useState } from "react";

export function useChampionshipData() {
  const [type, setType] = useState(null);
  const types = [
    { description: "FPS" },
    { description: "FIGHT" },
    { description: "RACING" },
    { description: "SPORT" },
    { description: "MOBA" },
  ];

  const getRandomType = () => {
    const index = Math.floor(Math.random() * types.length);
    return types[index].description;
  };
  return { types, type, setType, getRandomType };
}

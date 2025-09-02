import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

export default function SelectPlayerList() {
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const tempPlayers = [];
    for (let i = 1; i <= 5; i++) {
      tempPlayers.push({
        key: i,
        data: {
          name: `Player ${i}`,
          nickname: `Nick ${i}`,
        },
      });
    }
    setPlayers(tempPlayers);

    if (tempPlayers.length > 0) {
      setPlayer(tempPlayers[0]);
    }
  }, []);

  return (
    <Dropdown
      value={player}
      options={players}
      optionLabel="data.nickname"
      className="w-full"
    />
  );
}

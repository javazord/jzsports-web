export default function ChampionshipChart({ phase }) {
  if (!phase || !phase.matches) return <p>Nenhuma fase encontrada.</p>;

  // Agrupar partidas por tipo de fase
  const rounds = {};
  phase.matches.forEach((m) => {
    const round = phase.phaseType || "Round"; // se vier phaseType no DTO
    if (!rounds[round]) rounds[round] = [];
    rounds[round].push(m);
  });

  // Transformar em array ordenado de rounds
  const roundKeys = Object.keys(rounds);

  const CustomMatch = ({ match }) => {
    return (
      <div className="flex flex-col gap-3">
        {matches.map((match) => {
          if (!match.participants || match.participants.length < 2) return null;

          const [home, away] = match.participants;

          return (
            <div
              key={match.id}
              className="flex items-center justify-center gap-3 p-2 rounded border"
            >
              {/* Foto + Nome time da esquerda */}
              <img
                src={
                  home.team?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/813/813789.png"
                }
                alt={home.team ? home.team.teamName : home.player?.username}
                style={{ width: "52px", borderRadius: "50%" }}
              />
              <p>{home.team ? home.team.teamName : home.player?.username}</p>

              {/* Placar */}
              <h2>
                {home.score ?? 0} x {away.score ?? 0}
              </h2>

              {/* Nome time + Foto da direita */}
              <p>{away.team ? away.team.teamName : away.player?.username}</p>
              <img
                src={
                  away.team?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/813/813789.png"
                }
                alt={away.team ? away.team.teamName : away.player?.username}
                style={{ width: "52px", borderRadius: "50%" }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex justify-content-center gap-2 overflow-x-auto">
      {roundKeys.map((roundKey, idx) => (
        <div key={idx} className="flex flex-col items-center">
          {rounds[roundKey].map((m) => (
            <CustomMatch key={m.id} match={m} />
          ))}
        </div>
      ))}
    </div>
  );
}

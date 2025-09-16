import React, { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";

export default function ChampionshipChart({ phase }) {
  console.log(phase);
  const data = [
    {
      label: phase.phase,
      expanded: true,
      children: phase.matchesList.map((match) => ({
        label: `${match.teamOne?.teamName} ${match.scoreTeamOne} vs ${match.teamTwo?.teamName}`,
        expanded: true,
      })),
    },
  ];
  return <OrganizationChart value={data} />;
}

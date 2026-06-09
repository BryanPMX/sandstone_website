"use client";

import { useState } from "react";
import Final from "./Final";

type BracketPick = {
  match: number;
  team1: string;
  team2: string;
  winner: string;
};

type Props = {
  teams: string[];
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  groupPicks: Record<string, unknown>;
  topThirdPlaceTeams: string[];
  roundOf32Picks: BracketPick[];
  round16Picks: BracketPick[];
  quarterFinalPicks: BracketPick[];
};

export default function SemiFinals({
  teams,
  formData,
  groupPicks,
  topThirdPlaceTeams,
  roundOf32Picks,
  round16Picks,
  quarterFinalPicks,
}: Props) {
  const [winners, setWinners] = useState<Record<number, string>>({});

  const semiFinalPicks = Array.from({ length: 2 }).map((_, index) => ({
    match: index + 1,
    team1: teams[index * 2],
    team2: teams[index * 2 + 1],
    winner: winners[index] || "",
  }));

  const finalTeams = semiFinalPicks
    .map((match) => match.winner)
    .filter(Boolean);

  return (
    <div className="mt-12">
      <h2 className="mb-3 text-center text-4xl font-black uppercase text-white">
        Semifinals
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => {
          const team1 = teams[index * 2];
          const team2 = teams[index * 2 + 1];
          const winner = winners[index];

          return (
            <div key={index} className="rounded-2xl bg-white p-4 shadow-xl">
              <p className="mb-3 text-sm font-bold text-gray-500">
                Match {index + 1}
              </p>

              {[team1, team2].map((team, teamIndex) => (
                <button
                  key={`${index}-${team}`}
                  onClick={() =>
                    setWinners((current) => ({
                      ...current,
                      [index]: team,
                    }))
                  }
                  className={`${
                    teamIndex === 0 ? "mb-2" : ""
                  } w-full rounded-xl border p-3 text-left font-bold transition ${
                    winner === team
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-900 hover:bg-blue-50"
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {finalTeams.length === 2 && (
        <Final
          teams={finalTeams}
          formData={formData}
          groupPicks={groupPicks}
          topThirdPlaceTeams={topThirdPlaceTeams}
          roundOf32Picks={roundOf32Picks}
          round16Picks={round16Picks}
          quarterFinalPicks={quarterFinalPicks}
          semiFinalPicks={semiFinalPicks}
        />
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import QuarterFinals from "./QuarterFinals";

type RoundOf32Pick = {
  match: number;
  team1: string;
  team2: string;
  winner: string;
};

type Round16Props = {
  teams: string[];
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  groupPicks: Record<string, unknown>;
  topThirdPlaceTeams: string[];
  roundOf32Picks: RoundOf32Pick[];
};

const round16Matchups = [
  [0, 2],
  [1, 4],
  [3, 5],
  [6, 7],
  [10, 11],
  [8, 9],
  [13, 15],
  [12, 14],
];

export default function Round16({
  teams,
  formData,
  groupPicks,
  topThirdPlaceTeams,
  roundOf32Picks,
}: Round16Props) {
  const [winners, setWinners] = useState<Record<number, string>>({});

  const round16Picks = round16Matchups.map(
    ([team1Index, team2Index], index) => ({
      match: index + 1,
      team1: teams[team1Index],
      team2: teams[team2Index],
      winner: winners[index] || "",
    })
  );

  const quarterFinalTeams = round16Picks
    .map((match) => match.winner)
    .filter(Boolean);

  return (
    <div className="mt-12">
      <h2 className="mb-3 text-center text-4xl font-black uppercase text-white">
        Round of 16
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {round16Matchups.map(([team1Index, team2Index], index) => {
          const team1 = teams[team1Index];
          const team2 = teams[team2Index];
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

      {quarterFinalTeams.length === 8 && (
        <QuarterFinals
          teams={quarterFinalTeams}
          formData={formData}
          groupPicks={groupPicks}
          topThirdPlaceTeams={topThirdPlaceTeams}
          roundOf32Picks={roundOf32Picks}
          round16Picks={round16Picks}
        />
      )}
    </div>
  );
}
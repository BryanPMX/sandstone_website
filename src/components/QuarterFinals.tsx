"use client";

import { useState } from "react";

type Props = {
  teams: string[];
};

type SemiFinalsProps = {
  teams: string[];
};

const quarterFinalMatchups = [
  [0, 1], // RD16 W1 vs RD16 W2
  [4, 5], // RD16 W5 vs RD16 W6
  [2, 3], // RD16 W3 vs RD16 W4
  [6, 7], // RD16 W7 vs RD16 W8
];

function SemiFinals({ teams }: SemiFinalsProps) {
  const semiFinalMatchups = [
    [0, 1],
    [2, 3],
  ];

  return (
    <div className="mt-12">
      <h2 className="mb-3 text-center text-4xl font-black uppercase text-white">
        Semifinals
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {semiFinalMatchups.map(([team1Index, team2Index], index) => {
          const team1 = teams[team1Index];
          const team2 = teams[team2Index];

          return (
            <div key={index} className="rounded-2xl bg-white p-4 shadow-xl">
              <p className="mb-3 text-sm font-bold text-gray-500">
                Match {index + 1}
              </p>
              <div className="space-y-2">
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-gray-900">
                  {team1}
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-3 text-gray-900">
                  {team2}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function QuarterFinals({ teams }: Props) {
  const [winners, setWinners] = useState<Record<number, string>>({});

  const semiFinalTeams = Array.from({ length: 4 })
    .map((_, index) => winners[index])
    .filter(Boolean);

  return (
    <div className="mt-12">
      <h2 className="mb-3 text-center text-4xl font-black uppercase text-white">
        Quarterfinals
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quarterFinalMatchups.map(([team1Index, team2Index], index) => {
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
                  key={team}
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

      {semiFinalTeams.length === 4 && <SemiFinals teams={semiFinalTeams} />}
    </div>
  );
}
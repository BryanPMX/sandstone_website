"use client";

import { useState } from "react";
import SemiFinals from "./SemiFinals";

type Props = {
  teams: string[];
};

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
        {Array.from({ length: 4 }).map((_, index) => {
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
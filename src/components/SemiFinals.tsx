"use client";

import { useState } from "react";

type Props = {
  teams: string[];
};

type FinalProps = {
  teams: string[];
};

function Final({ teams }: FinalProps) {
  return (
    <div className="mt-12 rounded-2xl bg-white p-4 shadow-xl">
      <h2 className="mb-3 text-center text-3xl font-black uppercase text-gray-900">
        Final
      </h2>
      {teams.map((team) => (
        <p
          key={team}
          className="mb-2 rounded-xl border p-3 text-center font-bold text-gray-900"
        >
          {team}
        </p>
      ))}
    </div>
  );
}

export default function SemiFinals({ teams }: Props) {
  const [winners, setWinners] = useState<Record<number, string>>({});

  const finalTeams = Array.from({ length: 2 })
    .map((_, index) => winners[index])
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

      {finalTeams.length === 2 && <Final teams={finalTeams} />}
    </div>
  );
}
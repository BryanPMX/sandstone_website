"use client";

import { useState } from "react";

type Props = {
  teams: string[];
};

export default function Final({ teams }: Props) {
  const [champion, setChampion] = useState("");

  return (
    <div className="mt-12">
      <h2 className="mb-3 text-center text-4xl font-black uppercase text-white">
        Final
      </h2>

      <div className="mx-auto max-w-xl rounded-2xl bg-white p-5 shadow-xl">
        <p className="mb-3 text-sm font-bold text-gray-500">
          Championship Match
        </p>

        {teams.map((team, index) => (
          <button
            key={team}
            onClick={() => setChampion(team)}
            className={`${
              index === 0 ? "mb-2" : ""
            } w-full rounded-xl border p-4 text-left text-lg font-black transition ${
              champion === team
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-900 hover:bg-blue-50"
            }`}
          >
            {team}
          </button>
        ))}
      </div>

      {champion && (
        <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-6 text-center shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Champion
          </p>

          <h3 className="mt-3 text-4xl font-black text-gray-900">
            🏆 {champion}
          </h3>
        </div>
      )}
    </div>
  );
}
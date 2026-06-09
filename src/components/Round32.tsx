"use client";

import { useState } from "react";
import Round16 from "./Round16";

type GroupPick = {
  first?: string;
  second?: string;
  third?: string;
  fourth?: string;
};

type Round32Props = {
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  groupPicks: Record<string, GroupPick>;
  topThirdPlaceTeams: string[];
};

const matchups = [
  ["2A", "2B"],
  ["1C", "2F"],
  ["1E", "3RD #1"],
  ["1F", "2C"],
  ["2E", "2I"],
  ["1I", "3RD #2"],
  ["1A", "3RD #3"],
  ["1L", "3RD #4"],
  ["1G", "3RD #5"],
  ["1D", "3RD #6"],
  ["1H", "2J"],
  ["2K", "2L"],
  ["1B", "3RD #7"],
  ["2D", "2G"],
  ["1J", "2H"],
  ["1K", "3RD #8"],
];

function getTeamFromCode(
  code: string,
  groupPicks: Record<string, GroupPick>,
  topThirdPlaceTeams: string[]
) {
  if (code.startsWith("3RD #")) {
    const index = Number(code.replace("3RD #", "")) - 1;
    return topThirdPlaceTeams[index] || code;
  }

  const placementNumber = code[0];
  const groupLetter = code[1];
  const picks = groupPicks[`Group ${groupLetter}`];

  if (!picks) return code;
  if (placementNumber === "1") return picks.first || code;
  if (placementNumber === "2") return picks.second || code;

  return code;
}

export default function Round32({
  formData,
  groupPicks,
  topThirdPlaceTeams,
}: Round32Props) {
  const [winners, setWinners] = useState<Record<number, string>>({});

  function pickWinner(matchIndex: number, team: string) {
    setWinners((current) => ({
      ...current,
      [matchIndex]: team,
    }));
  }

  const round16Teams = matchups
    .map(([, ,], index) => winners[index])
    .filter(Boolean) as string[];

  return (
    <div>
      <h2 className="mb-3 text-center text-4xl font-black uppercase text-white">
        Round of 32
      </h2>

      <p className="mb-8 text-center font-bold text-white/80">
        Pick the winner of each matchup.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {matchups.map(([code1, code2], index) => {
          const team1 = getTeamFromCode(code1, groupPicks, topThirdPlaceTeams);
          const team2 = getTeamFromCode(code2, groupPicks, topThirdPlaceTeams);
          const winner = winners[index];

          return (
            <div key={index} className="rounded-2xl bg-white p-4 shadow-xl">
              <p className="mb-3 text-sm font-bold text-gray-500">
                Match {index + 1}
              </p>

              {[team1, team2].map((team, teamIndex) => (
                <button
                  key={team}
                  onClick={() => pickWinner(index, team)}
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

      {round16Teams.length === 16 && (
        <Round16
          teams={round16Teams}
          formData={formData}
          groupPicks={groupPicks}
          topThirdPlaceTeams={topThirdPlaceTeams}
        />
      )}
    </div>
  );
}
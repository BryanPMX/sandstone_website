"use client";

import { useState } from "react";

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
  semiFinalPicks: BracketPick[];
};

export default function Final({
  teams,
  formData,
  groupPicks,
  topThirdPlaceTeams,
  roundOf32Picks,
  round16Picks,
  quarterFinalPicks,
  semiFinalPicks,
}: Props) {
  const [champion, setChampion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitBracket() {
    if (!champion) return;

    setIsSubmitting(true);

    try {
      const finalPick = {
        match: 1,
        team1: teams[0],
        team2: teams[1],
        winner: champion,
      };

      const response = await fetch("/api/submit-bracket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          champion,
          groupPicks,
          topThirdPlaceTeams,
          roundOf32Picks,
          round16Picks,
          quarterFinalPicks,
          semiFinalPicks,
          finalPick,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit bracket");
      }

      alert("Bracket submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("There was a problem submitting your bracket.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            key={`${index}-${team}`}
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
        <>
          <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-6 text-center shadow-xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Champion
            </p>

            <h3 className="mt-3 text-4xl font-black text-gray-900">
              🏆 {champion}
            </h3>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={submitBracket}
              disabled={isSubmitting}
              className="rounded-xl bg-orange-500 px-10 py-4 text-lg font-black uppercase text-white shadow-xl transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Bracket"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
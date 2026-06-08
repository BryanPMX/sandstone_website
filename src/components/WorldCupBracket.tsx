"use client";

import { useState } from "react";

const matches = [
  {
    id: 1,
    round: "Round of 32",
    team1: "Winner Group A",
    team2: "Runner-up Group B",
    date: "TBD",
    location: "TBD",
  },
  {
    id: 2,
    round: "Round of 32",
    team1: "Winner Group C",
    team2: "Runner-up Group D",
    date: "TBD",
    location: "TBD",
  },
  {
    id: 3,
    round: "Round of 16",
    team1: "Winner Match 1",
    team2: "Winner Match 2",
    date: "TBD",
    location: "TBD",
  },
  {
    id: 4,
    round: "Quarterfinals",
    team1: "TBD",
    team2: "TBD",
    date: "TBD",
    location: "TBD",
  },
  {
    id: 5,
    round: "Semifinals",
    team1: "TBD",
    team2: "TBD",
    date: "TBD",
    location: "TBD",
  },
  {
    id: 6,
    round: "Final",
    team1: "TBD",
    team2: "TBD",
    date: "TBD",
    location: "TBD",
  },
];

export default function WorldCupBracket() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [picks, setPicks] = useState<Record<number, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const rounds = [...new Set(matches.map((match) => match.round))];

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    console.log("Customer signed up:", formData);

    setHasSignedUp(true);
  }

  function handlePick(matchId: number, team: string) {
    const updatedPicks = {
      ...picks,
      [matchId]: team,
    };

    setPicks(updatedPicks);

    console.log("Customer picks:", {
      customer: formData,
      picks: updatedPicks,
    });
  }

  return (
    <>
      <div className="fixed right-8 top-28 z-50 hidden max-w-[230px] md:block">
  <button
    onClick={() => setIsOpen(true)}
    className="overflow-hidden rounded-2xl border border-white/40 bg-white shadow-2xl transition hover:-translate-y-1 hover:shadow-3xl"
  >
    <img
        src="/uploads/WhatsApp%20Image%202026-06-08%20at%2011.01.08%20AM.jpeg"
        alt="Sandstone World Cup Bracket Challenge"
        className="h-[130px] w-full object-cover"
    />

    <div className="p-3 text-left">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
        World Cup Challenge
      </p>

      <p className="mt-1 text-sm font-bold text-gray-900">
        Build Your Bracket
      </p>

      <p className="mt-1 text-xs text-gray-600">
        Sign up and make your picks.
      </p>
    </div>
  </button>
</div>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
          <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-blue-200 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-200"
            >
              ✕
            </button>

            {!hasSignedUp ? (
              <div className="mx-auto max-w-xl py-10">
                <div className="mb-8 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
                    Sandstone World Cup
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
                    Sign Up to Make Your Picks
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                    Enter your information first so Sandstone can keep track of
                    your World Cup bracket picks.
                  </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-blue-200 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                  />

                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-xl border border-blue-200 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                  />

                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-blue-200 px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
                  >
                    Continue to Bracket
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
                    Sandstone World Cup
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
                    Make Your 2026 World Cup Bracket
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                    Click a matchup, then choose which team you think will win.
                  </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                  <div className="overflow-x-auto rounded-2xl border border-blue-200 bg-blue-50 p-6">
                    <div className="flex min-w-[900px] gap-6">
                      {rounds.map((round) => (
                        <div
                          key={round}
                          className="flex min-w-[180px] flex-col gap-4"
                        >
                          <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-blue-600">
                            {round}
                          </h3>

                          {matches
                            .filter((match) => match.round === round)
                            .map((match) => (
                              <button
                                key={match.id}
                                onClick={() => setSelectedMatch(match)}
                                className="rounded-xl border border-blue-200 bg-white p-4 text-left transition hover:border-blue-500 hover:shadow-md"
                              >
                                <p className="text-sm font-semibold text-gray-900">
                                  {match.team1}
                                </p>

                                <p className="my-2 text-xs text-gray-400">
                                  vs
                                </p>

                                <p className="text-sm font-semibold text-gray-900">
                                  {match.team2}
                                </p>

                                {picks[match.id] && (
                                  <p className="mt-3 rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                                    Pick: {picks[match.id]}
                                  </p>
                                )}
                              </button>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                    <p className="text-sm uppercase tracking-wide text-blue-600">
                      Make Your Pick
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-gray-900">
                      {selectedMatch.round}
                    </h3>

                    <div className="mt-6 space-y-4 text-sm">
                      <div>
                        <p className="text-gray-500">Matchup</p>
                        <p className="font-semibold text-gray-900">
                          {selectedMatch.team1} vs {selectedMatch.team2}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handlePick(selectedMatch.id, selectedMatch.team1)
                        }
                        className="w-full rounded-xl bg-white px-4 py-3 text-left font-semibold text-gray-900 transition hover:bg-blue-100"
                      >
                        Pick {selectedMatch.team1}
                      </button>

                      <button
                        onClick={() =>
                          handlePick(selectedMatch.id, selectedMatch.team2)
                        }
                        className="w-full rounded-xl bg-white px-4 py-3 text-left font-semibold text-gray-900 transition hover:bg-blue-100"
                      >
                        Pick {selectedMatch.team2}
                      </button>

                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="text-gray-900">{selectedMatch.date}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="text-gray-900">
                          {selectedMatch.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
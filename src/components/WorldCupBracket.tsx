"use client";

import { useState } from "react";
import Round32 from "./Round32";

const groups = [
  {
    name: "Group A",
    teams: ["Mexico", "South Africa", "South Korea", "Czechia"],
  },
  {
    name: "Group B",
    teams: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  },
  {
    name: "Group C",
    teams: ["Brazil", "Morocco", "Haiti", "Scotland"],
  },
  {
    name: "Group D",
    teams: ["USA", "Paraguay", "Australia", "Turkiye"],
  },
  {
    name: "Group E",
    teams: ["Germany", "Curaçao", "Cote d'Ivoire", "Ecuador"],
  },
  {
    name: "Group F",
    teams: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  },
  {
    name: "Group G",
    teams: ["Belgium", "Egypt", "IR Iran", "New Zealand"],
  },
  {
    name: "Group H",
    teams: ["Spain", "Cabo Verde", "Saudi Arabia", "Uruguay"],
  },
  {
    name: "Group I",
    teams: ["France", "Senegal", "Iraq", "Norway"],
  },
  {
    name: "Group J",
    teams: ["Argentina", "Algeria", "Austria", "Jordan"],
  },
  {
    name: "Group K",
    teams: ["Portugal", "Congo DR", "Uzbekistan", "Colombia"],
  },
  {
    name: "Group L",
    teams: ["England", "Croatia", "Ghana", "Panama"],
  },
];

type Placement = "first" | "second" | "third" | "fourth";

type GroupPick = {
  first?: string;
  second?: string;
  third?: string;
  fourth?: string;
};

const placements: { key: Placement; label: string }[] = [
  { key: "first", label: "1st Place" },
  { key: "second", label: "2nd Place" },
  { key: "third", label: "3rd Place" },
  { key: "fourth", label: "4th Place" },
];

export default function WorldCupBracket() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [step, setStep] = useState<"groups" | "thirdPlace" | "round32">(
    "groups"
  );

  const [groupPicks, setGroupPicks] = useState<Record<string, GroupPick>>({});
  const [topThirdPlaceTeams, setTopThirdPlaceTeams] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const thirdPlaceTeams = groups
    .map((group) => groupPicks[group.name]?.third)
    .filter(Boolean) as string[];

  const knockoutTeams = [
    ...groups.map((group) => groupPicks[group.name]?.first),
    ...groups.map((group) => groupPicks[group.name]?.second),
    ...topThirdPlaceTeams,
  ].filter(Boolean) as string[];

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setHasSignedUp(true);
  }

  function handleTeamPick(groupName: string, team: string) {
    setGroupPicks((current) => {
      const currentGroup = current[groupName] || {};

      if (Object.values(currentGroup).includes(team)) {
        return current;
      }

      const nextSlot = placements.find(
        (placement) => !currentGroup[placement.key]
      )?.key;

      if (!nextSlot) {
        alert("You already selected all 4 teams. Press Reset to make changes.");
        return current;
      }

      return {
        ...current,
        [groupName]: {
          ...currentGroup,
          [nextSlot]: team,
        },
      };
    });
  }

  function resetGroup(groupName: string) {
    setGroupPicks({
      ...groupPicks,
      [groupName]: {},
    });

    setTopThirdPlaceTeams([]);
  }

  function handleSubmitPicks() {
    const missingGroups = groups.filter((group) => {
      const picks = groupPicks[group.name];

      return !picks?.first || !picks?.second || !picks?.third || !picks?.fourth;
    });

    if (missingGroups.length > 0) {
      alert(
        "Please finish picking 1st, 2nd, 3rd, and 4th place for every group."
      );
      return;
    }

    setTopThirdPlaceTeams([]);
    setStep("thirdPlace");
  }

  function toggleThirdPlaceTeam(team: string) {
    setTopThirdPlaceTeams((current) => {
      if (current.includes(team)) {
        return current.filter((t) => t !== team);
      }

      if (current.length >= 8) {
        alert("You can only pick 8 third-place teams.");
        return current;
      }

      return [...current, team];
    });
  }

  function handleTopThirdSubmit() {
    if (topThirdPlaceTeams.length !== 8) {
      alert("Please select exactly 8 third-place teams.");
      return;
    }

    setStep("round32");
  }

  return (
    <>
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-[999] w-[220px] md:w-[300px]">
        <button
          onClick={() => setIsOpen(true)}
          className="overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <img
            src="/uploads/world-cup-challenge.jpeg"
            alt="Sandstone World Cup Bracket Challenge"
            className="w-full object-contain bg-white p-1"
          />

          <div className="p-3 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-600">
              World Cup Challenge
            </p>

            <p className="mt-1 text-sm font-bold text-gray-900">
              Build Your Bracket ⚽
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Sign up and make your picks.
            </p>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
          <div className="relative max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-3xl bg-[#1557ff] p-5 shadow-2xl md:p-8">
            <button
              onClick={() => setIsOpen(false)}
              className="overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              ✕
            </button>

            {!hasSignedUp ? (
              <div className="mx-auto max-w-xl rounded-2xl bg-white px-6 py-10 shadow-xl">
                <div className="mb-8 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
                    Sandstone World Cup
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
                    Sign Up to Make Your Picks
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                    Enter your information first so Sandstone can keep track of
                    your World Cup predictions.
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
                    Continue to Group Stage
                  </button>
                </form>
              </div>
            ) : step === "groups" ? (
              <>
                <div className="mb-8 flex flex-col gap-3 pr-12 text-white md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.35em] md:text-sm">
                      Sandstone World Cup
                    </p>

                    <h2 className="mt-2 text-3xl font-black uppercase leading-none md:text-6xl">
                      Bracket Challenge
                    </h2>
                  </div>

                  <h3 className="text-2xl font-black uppercase md:text-5xl">
                    Group Stage
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {groups.map((group) => {
                    const picks = groupPicks[group.name] || {};

                    return (
                      <div
                        key={group.name}
                        className="overflow-hidden rounded-2xl bg-[#061a5f] shadow-xl"
                      >
                        <div className="p-4">
                          <div className="mb-5 border-b border-white/10 pb-3">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className="text-xl font-black uppercase tracking-wide text-white">
                                {group.name}
                              </h3>

                              <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                                Pick 1–4
                              </p>
                            </div>

                            <p className="mt-2 text-xs font-semibold text-white/70">
                              Tap teams in the order you think they will finish.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {group.teams.map((team) => {
                              const selected = Object.values(picks).includes(
                                team
                              );

                              return (
                                <button
                                  key={team}
                                  onClick={() =>
                                    handleTeamPick(group.name, team)
                                  }
                                  title={team}
                                  className={`flex min-h-[82px] items-center justify-center rounded-xl px-2 py-3 text-center text-xs font-black leading-tight transition ${
                                    selected
                                      ? "bg-orange-500 text-white shadow-md"
                                      : "bg-[#354a86] text-white hover:bg-blue-500"
                                  }`}
                                >
                                  <span className="line-clamp-3 break-words">
                                    {team}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-white p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between rounded-lg bg-gray-50 px-3 py-2">
                              <span className="font-bold text-blue-700">
                                🥇 1st
                              </span>
                              <span className="font-black text-gray-900">
                                {picks.first || "-"}
                              </span>
                            </div>

                            <div className="flex justify-between rounded-lg bg-gray-50 px-3 py-2">
                              <span className="font-bold text-blue-700">
                                🥈 2nd
                              </span>
                              <span className="font-black text-gray-900">
                                {picks.second || "-"}
                              </span>
                            </div>

                            <div className="flex justify-between rounded-lg bg-gray-50 px-3 py-2">
                              <span className="font-bold text-blue-700">
                                🥉 3rd
                              </span>
                              <span className="font-black text-gray-900">
                                {picks.third || "-"}
                              </span>
                            </div>

                            <div className="flex justify-between rounded-lg bg-gray-50 px-3 py-2">
                              <span className="font-bold text-blue-700">
                                4️⃣ 4th
                              </span>
                              <span className="font-black text-gray-900">
                                {picks.fourth || "-"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-[#061a5f] p-4">
                          <p className="text-xs font-semibold text-white/70">
                            Tap 4 teams. Use reset to change.
                          </p>

                          <button
                            onClick={() => resetGroup(group.name)}
                            className="rounded-full bg-white px-4 py-2 text-xs font-black text-gray-700 hover:bg-gray-100"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={handleSubmitPicks}
                    className="rounded-xl bg-orange-500 px-10 py-4 text-lg font-black uppercase text-white shadow-xl transition hover:bg-orange-400"
                  >
                    Continue to Top 8 Third Place
                  </button>
                </div>
              </>
            ) : step === "thirdPlace" ? (
              <>
                <div className="mb-8 pr-12 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.35em] md:text-sm">
                    Sandstone World Cup
                  </p>

                  <h2 className="mt-2 text-3xl font-black uppercase leading-none md:text-6xl">
                    Pick Top 8 Third Place Teams
                  </h2>

                  <p className="mt-3 text-white/80">
                    Choose the 8 third-place teams you think will advance.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {thirdPlaceTeams.map((team) => {
                    const selected = topThirdPlaceTeams.includes(team);

                    return (
                      <button
                        key={team}
                        onClick={() => toggleThirdPlaceTeam(team)}
                        className={`rounded-2xl px-5 py-6 text-lg font-black transition ${
                          selected
                            ? "bg-orange-500 text-white shadow-xl"
                            : "bg-white text-gray-900 hover:bg-blue-100"
                        }`}
                      >
                        {team}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-center font-bold text-white">
                  {topThirdPlaceTeams.length}/8 selected
                </p>

                <div className="mt-8 flex flex-col gap-3 text-center md:flex-row md:justify-center">
                  <button
                    onClick={() => setStep("groups")}
                    className="rounded-xl bg-white px-8 py-4 font-black uppercase text-blue-700"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleTopThirdSubmit}
                    disabled={topThirdPlaceTeams.length !== 8}
                    className="rounded-xl bg-orange-500 px-10 py-4 text-lg font-black uppercase text-white shadow-xl transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue to Round of 32
                  </button>
                </div>
              </>
            ) : (
              <Round32
                formData={formData}
                groupPicks={groupPicks}
                topThirdPlaceTeams={topThirdPlaceTeams}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
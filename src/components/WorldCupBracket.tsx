"use client";

import { useState } from "react";

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
    teams: ["Brazil", "Saudi Arabia", "Mexico", "Poland"],
  },
  {
    name: "Group D",
    teams: ["USA", "Australia", "Denmark", "Tunisia"],
  },
  {
    name: "Group E",
    teams: ["Spain", "Costa Rica", "Germany", "Japan"],
  },
  {
    name: "Group F",
    teams: ["Belgium", "Canada", "Morocco", "Croatia"],
  },
  {
    name: "Group G",
    teams: ["Brazil", "Serbia", "Switzerland", "Cameroon"],
  },
  {
    name: "Group H",
    teams: ["Portugal", "Ghana", "Uruguay", "South Korea"],
  },
  {
    name: "Group I",
    teams: ["Argentina", "Saudi Arabia", "Mexico", "Poland"],
  },
  {
    name: "Group J",
    teams: ["France", "Australia", "Denmark", "Tunisia"],
  },
  {
    name: "Group K",
    teams: ["Spain", "Costa Rica", "Germany", "Japan"],
  },
  {
    name: "Group L",
    teams: ["Belgium", "Canada", "Morocco", "Croatia"],
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
  const [groupPicks, setGroupPicks] = useState<Record<string, GroupPick>>({});
  const [activeSlots, setActiveSlots] = useState<Record<string, Placement>>({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setHasSignedUp(true);
  }

  function handleTeamPick(groupName: string, team: string) {
    const activeSlot = activeSlots[groupName] || "first";

    setGroupPicks((current) => {
      const currentGroup = current[groupName] || {};

      const cleanedGroup = Object.fromEntries(
        Object.entries(currentGroup).filter(([, value]) => value !== team)
      ) as GroupPick;

      return {
        ...current,
        [groupName]: {
          ...cleanedGroup,
          [activeSlot]: team,
        },
      };
    });
  }

  function resetGroup(groupName: string) {
    setGroupPicks({
      ...groupPicks,
      [groupName]: {},
    });

    setActiveSlots({
      ...activeSlots,
      [groupName]: "first",
    });
  }

  function handleSubmitPicks() {
    console.log("World Cup group picks:", {
      customer: formData,
      picks: groupPicks,
    });

    alert("Your World Cup group picks have been submitted!");
  }

  return (
    <>
      <div className="fixed right-8 top-40 z-50 hidden max-w-[200px] md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <img
            src="/uploads/world-cup-challenge.jpeg"
            alt="Sandstone World Cup Bracket Challenge"
            className="h-[100px] w-full object-cover"
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
              className="absolute right-5 top-5 z-10 rounded-full bg-white px-3 py-1 text-sm font-bold text-blue-700 hover:bg-blue-100"
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
            ) : (
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
                    const activeSlot = activeSlots[group.name] || "first";
                    const picks = groupPicks[group.name] || {};

                    return (
                      <div
                        key={group.name}
                        className="overflow-hidden rounded-2xl bg-[#061a5f] shadow-xl"
                      >
                        <div className="p-4">
                          <div className="mb-5 border-b border-white/10 pb-3">
                            <h3 className="text-xl font-black uppercase tracking-wide text-white">
                              {group.name}
                            </h3>

                            <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                              Pick 1–4
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

                        <div className="bg-white">
                          {placements.map((placement) => {
                            const isActive = activeSlot === placement.key;

                            return (
                              <button
                                key={placement.key}
                                onClick={() =>
                                  setActiveSlots({
                                    ...activeSlots,
                                    [group.name]: placement.key,
                                  })
                                }
                                className={`flex w-full items-center justify-between border-b px-4 py-3 text-left transition ${
                                  isActive
                                    ? "bg-blue-50"
                                    : "bg-white hover:bg-gray-50"
                                }`}
                              >
                                <span
                                  className={`text-sm font-bold ${
                                    isActive
                                      ? "text-blue-700"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {placement.label}
                                </span>

                                <span className="ml-4 max-w-[150px] truncate text-sm font-black text-gray-900">
                                  {picks[placement.key] || "-"}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex items-center justify-between bg-[#061a5f] p-4">
                          <p className="text-xs font-semibold text-white/70">
                            Select a place, then tap a team.
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
                    Submit All Picks
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
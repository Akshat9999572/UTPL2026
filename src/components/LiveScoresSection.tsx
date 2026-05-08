import { motion } from 'framer-motion';
import { ExternalLink, Trophy, CalendarDays } from 'lucide-react';

const tournamentUrl = 'https://chshare.link/tournament/lOnAYW';

const liveMatch = {
  team1: 'Madhyamik Lions',
  team2: 'SK Warriors',
  score: '128/4',
  overs: '14.2 Overs',
  status: 'LIVE',
};

const fixtures = [
  {
    match: 'Wisdom Warriors vs Rising Star',
    time: '7:00 PM',
  },
  {
    match: 'Unnao Super Kings vs Madhyamik Lions',
    time: '9:00 PM',
  },
];

const results = [
  {
    match: 'SK Warriors beat Rising Star by 18 Runs',
  },
  {
    match: 'Wisdom Warriors beat USK by 5 Wickets',
  },
];

const points = [
  ['SK Warriors', 6],
  ['Wisdom Warriors', 4],
  ['Madhyamik Lions', 4],
  ['Rising Star', 2],
  ['Unnao Super Kings', 0],
];

export default function LiveScoresSection() {
  return (
    <section className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="uppercase tracking-[0.3em] text-primary text-sm font-bold">Live Tournament Center</p>
            <h2 className="text-5xl font-display">LIVE SCORES</h2>
          </div>
          <a
            href={tournamentUrl}
            target="_blank"
            className="bg-primary text-secondary px-5 py-3 font-bold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            CricHeroes Tournament <ExternalLink size={18} />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/5 border border-primary/20 p-8 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="bg-red-500 text-white px-4 py-1 text-sm font-bold animate-pulse">
                {liveMatch.status}
              </span>
              <span className="text-primary font-semibold">Rotary Club of Unnao Royal Teachers Championship</span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold">{liveMatch.team1}</h3>
                <div className="text-right">
                  <div className="text-4xl font-display text-primary">{liveMatch.score}</div>
                  <div className="text-white/70">{liveMatch.overs}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{liveMatch.team2}</h3>
                <div className="text-primary font-semibold">Batting Second</div>
              </div>
            </div>

            <a
              href={tournamentUrl}
              target="_blank"
              className="inline-flex mt-8 bg-primary text-secondary px-6 py-3 font-bold items-center gap-2 hover:opacity-90"
            >
              View Full Scorecard <ExternalLink size={18} />
            </a>
          </motion.div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <CalendarDays className="text-primary" />
                <h3 className="text-2xl font-display">Fixtures</h3>
              </div>
              <div className="space-y-4">
                {fixtures.map((fixture) => (
                  <div key={fixture.match} className="border-b border-white/10 pb-3">
                    <p className="font-semibold">{fixture.match}</p>
                    <p className="text-primary text-sm">{fixture.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5">
                <Trophy className="text-primary" />
                <h3 className="text-2xl font-display">Results</h3>
              </div>
              <div className="space-y-4">
                {results.map((result) => (
                  <div key={result.match} className="border-b border-white/10 pb-3 text-white/80">
                    {result.match}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white/5 border border-white/10 p-6 overflow-x-auto">
          <h3 className="text-3xl font-display mb-6">Points Table</h3>
          <table className="w-full min-w-[500px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-primary uppercase text-sm tracking-wider">
                <th className="py-3">Team</th>
                <th className="py-3">Points</th>
              </tr>
            </thead>
            <tbody>
              {points.map((team, idx) => (
                <tr key={team[0]} className="border-b border-white/5">
                  <td className="py-4 font-semibold">#{idx + 1} {team[0]}</td>
                  <td className="py-4">{team[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

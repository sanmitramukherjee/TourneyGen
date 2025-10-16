import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Loader2, Crown } from "lucide-react";

function Tournament() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tournament/${id}`);
        setTournament(res.data);
      } catch (err) {
        setError("Failed to load tournament.");
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();
  }, [id]);

  const submitWinner = async (roundIndex, matchIndex, winner) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/tournament/${id}/winner`,
        { roundIndex, matchIndex, winner }
      );
      setTournament(res.data);
    } catch (err) {
      console.error("Error submitting winner:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <Loader2 className="animate-spin mr-2" />
        Loading tournament...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-400 text-lg">
        {error}
      </div>
    );

  if (!tournament)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-400 text-lg">
        No tournament found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <Trophy className="h-14 w-14 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">{tournament.name}</h1>
          <p className="text-gray-400 mt-2">
            {tournament.rounds?.length} {tournament.rounds?.length === 1 ? "Round" : "Rounds"}
          </p>
        </div>

        {/* Bracket Tree */}
        {tournament.rounds && tournament.rounds.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="flex items-start gap-12 min-w-max pb-8">
              {tournament.rounds.map((round, roundIndex) => (
                <motion.div
                  key={roundIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: roundIndex * 0.2 }}
                  className="flex flex-col items-center gap-8"
                >
                  <h2 className="text-xl font-bold text-green-400 mb-2">Round {roundIndex + 1}</h2>

                  {round.matches.map((match, matchIndex) => (
                    <div key={matchIndex} className="relative flex flex-col items-center">
                      {/* Match Card */}
                      <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 w-56 text-center shadow hover:shadow-lg transition-all">
                        <p className="font-semibold text-gray-100">
                          {match.player1} <span className="text-gray-400">vs</span> {match.player2}
                        </p>

                        {!match.winner ? (
                          <div className="flex justify-center mt-3 gap-2">
                            <button
                              onClick={() =>
                                submitWinner(roundIndex, matchIndex, match.player1)
                              }
                              disabled={match.player1 === "BYE"}
                              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm font-medium transition disabled:opacity-40"
                            >
                              {match.player1}
                            </button>
                            <button
                              onClick={() =>
                                submitWinner(roundIndex, matchIndex, match.player2)
                              }
                              disabled={match.player2 === "BYE"}
                              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm font-medium transition disabled:opacity-40"
                            >
                              {match.player2}
                            </button>
                          </div>
                        ) : (
                          <div className="mt-3 flex items-center justify-center gap-2 text-green-400 font-semibold">
                            <Crown className="w-4 h-4 text-yellow-300" />
                            {match.winner}
                          </div>
                        )}
                      </div>

                      {/* Connecting Line */}
                      {roundIndex < tournament.rounds.length - 1 && (
                        <div className="hidden md:block absolute right-[-4rem] top-1/2 w-16 h-[2px] bg-gray-600"></div>
                      )}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No matchups created yet.</p>
        )}
      </motion.div>
    </div>
  );
}

export default Tournament;

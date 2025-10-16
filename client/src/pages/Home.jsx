import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
      
      {/* Floating sparkle background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center z-10"
      >
        <div className="flex justify-center mb-4">
          <Trophy className="h-16 w-16 text-yellow-400 drop-shadow-md" />
        </div>
        <h1 className="text-5xl font-extrabold mb-3 tracking-tight">
          TourneyGen
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
          Create massive tournaments with no participant limits. Randomize, organize, and conquer the brackets — all online.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/create"
            className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            Create a Tournament
          </Link>
          <Link
            to="/view"
            className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            View Existing
          </Link>
        </div>

        <div className="mt-10 flex justify-center items-center text-gray-400 text-sm gap-2">
          <Users className="h-5 w-5" />
          <span>No limits. Infinite players. Pure chaos.</span>
          <Sparkles className="h-5 w-5 text-yellow-300" />
        </div>
      </motion.div>
    </div>
  );
}

export default Home;

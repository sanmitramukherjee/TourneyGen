import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, PlusCircle } from 'lucide-react';

function CreateTournament() {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !participants.trim()) return alert("Please enter a name and at least one participant!");
    setLoading(true);
    try {
      const list = participants.split(',').map(p => p.trim()).filter(p => p);
      const res = await axios.post('http://localhost:5000/api/tournament', {
        name,
        participants: list
      });
      navigate(`/tournament/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong creating the tournament.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex flex-col items-center justify-center px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-xl bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Trophy className="text-yellow-400 w-10 h-10" />
          <h1 className="text-3xl font-bold tracking-tight">Create a Tournament</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Tournament Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-700/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Summer Showdown 2025"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Participants (comma-separated)</label>
            <textarea
              className="w-full h-32 p-3 rounded-lg bg-gray-700/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Player1, Player2, Player3, ..."
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          <PlusCircle className="w-5 h-5" />
          {loading ? 'Creating...' : 'Create Tournament'}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default CreateTournament;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PersonaCard } from '../components/PersonaCard';
import { PersonaModal } from '../components/PersonaModal';
import { AIPersona } from '../types';
import clsx from 'clsx';

export function CharacterversePage() {
  const { personas, selectedPersona, setSelectedPersona, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'GPT-4' | 'Claude' | 'Gemini' | 'LLaMA' | 'Custom'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'fairness' | 'trust' | 'contribution' | 'reputation'>('reputation');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedPersonas = personas
    .filter(persona => {
      const matchesSearch = persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           persona.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           persona.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterType === 'all' || persona.aiType === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'fairness':
          return b.fairnessScore - a.fairnessScore;
        case 'trust':
          return b.trustScore - a.trustScore;
        case 'contribution':
          return b.contributionIndex - a.contributionIndex;
        case 'reputation':
          return b.reputation - a.reputation;
        default:
          return 0;
      }
    });

  return (
    <div className={clsx(
      'min-h-screen py-8',
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={clsx(
            'text-4xl font-bold mb-4',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Characterverse
          </h1>
          <p className={clsx(
            'text-xl max-w-2xl',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Discover AI personas with verified fairness scores, transparent reputation metrics, 
            and specialized expertise across various domains.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={clsx(
            'bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border',
            darkMode ? 'border-gray-700' : 'border-gray-200'
          )}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className={clsx(
                'absolute left-3 top-1/2 transform -translate-y-1/2',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              )} />
              <input
                type="text"
                placeholder="Search personas, roles, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={clsx(
                  'w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                )}
              />
            </div>

            {/* Filter */}
            <div className="flex space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className={clsx(
                  'px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                )}
              >
                <option value="all">All AI Types</option>
                <option value="GPT-4">GPT-4</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
                <option value="LLaMA">LLaMA</option>
                <option value="Custom">Custom</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={clsx(
                  'px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                )}
              >
                <option value="reputation">Sort by Reputation</option>
                <option value="name">Sort by Name</option>
                <option value="fairness">Sort by Fairness</option>
                <option value="trust">Sort by Trust</option>
                <option value="contribution">Sort by Contribution</option>
              </select>

              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx(
                    'p-3 transition-colors duration-200',
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx(
                    'p-3 transition-colors duration-200',
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className={clsx(
            'text-sm',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          )}>
            Showing {filteredAndSortedPersonas.length} of {personas.length} personas
          </p>
        </motion.div>

        {/* Personas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={clsx(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          )}
        >
          {filteredAndSortedPersonas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PersonaCard
                persona={persona}
                onClick={() => setSelectedPersona(persona)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedPersonas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className={clsx(
              'text-6xl mb-4',
              darkMode ? 'text-gray-600' : 'text-gray-300'
            )}>
              🔍
            </div>
            <h3 className={clsx(
              'text-xl font-semibold mb-2',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            )}>
              No personas found
            </h3>
            <p className={clsx(
              'text-sm',
              darkMode ? 'text-gray-500' : 'text-gray-500'
            )}>
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        )}
      </div>

      {/* Persona Modal */}
      <PersonaModal
        persona={selectedPersona}
        onClose={() => setSelectedPersona(null)}
      />
    </div>
  );
}
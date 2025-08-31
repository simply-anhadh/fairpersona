import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { CharacterversePage } from './pages/CharacterversePage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { MintPage } from './pages/MintPage';
import { CommunityPage } from './pages/CommunityPage';
import { SkillTestingPage } from './pages/SkillTestingPage';
import { TestInterface } from './pages/TestInterface';
import { TestResultsPage } from './pages/TestResultsPage';
import { AdminPanel } from './pages/AdminPanel';
import { useStore } from './store/useStore';
import { AuthService } from './services/authService';
import { mockPersonas, generateAdditionalPersonas, mockLeaderboard, mockProposals } from './utils/mockData';

type Page = 'home' | 'characterverse' | 'chat' | 'profile' | 'leaderboard' | 'mint' | 'community' | 'skills' | 'test' | 'test-results' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [testSkillId, setTestSkillId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const { 
    setPersonas, 
    setLeaderboard, 
    setProposals, 
    setUser, 
    setIsAuthenticated,
    darkMode 
  } = useStore();

  useEffect(() => {
    // Initialize mock data
    const allPersonas = [...mockPersonas, ...generateAdditionalPersonas()];
    setPersonas(allPersonas);
    setLeaderboard(mockLeaderboard);
    setProposals(mockProposals);

    // Check authentication state
    const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userProfile = await AuthService.getCurrentUser();
          if (userProfile) {
            setUser(userProfile);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error getting user profile:', error);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    // Handle URL-based navigation for test pages
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('test/')) {
        const skillId = hash.split('/')[1];
        setTestSkillId(skillId);
        setCurrentPage('test');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [setPersonas, setLeaderboard, setProposals, setUser, setIsAuthenticated]);

  const handleTestComplete = (result: any) => {
    setTestResult(result);
    setCurrentPage('test-results');
    window.location.hash = '';
  };

  const handleTestExit = () => {
    setCurrentPage('skills');
    setTestSkillId(null);
    window.location.hash = '';
  };

  const handleRetakeTest = () => {
    // In a real app, you'd check if retake is allowed (7 days cooldown)
    setCurrentPage('test');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    // Clear any test-related state when navigating away
    if (page !== 'test' && page !== 'test-results') {
      setTestSkillId(null);
      setTestResult(null);
      window.location.hash = '';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'characterverse':
        return <CharacterversePage />;
      case 'chat':
        return <ChatPage />;
      case 'profile':
        return <ProfilePage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'mint':
        return <MintPage />;
      case 'community':
        return <CommunityPage />;
      case 'skills':
        return <SkillTestingPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPanel />;
      case 'test':
        return testSkillId ? (
          <TestInterface
            skillId={testSkillId}
            onComplete={handleTestComplete}
            onExit={handleTestExit}
          />
        ) : (
          <SkillTestingPage onNavigate={handleNavigate} />
        );
      case 'test-results':
        return testResult ? (
          <TestResultsPage
            testResult={testResult}
            onRetake={handleRetakeTest}
            onHome={() => handleNavigate('skills')}
          />
        ) : (
          <SkillTestingPage onNavigate={handleNavigate} />
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        <div className="relative">
          {/* Navigation for non-landing pages */}
          {currentPage !== 'home' && currentPage !== 'test' && currentPage !== 'test-results' && (
            <div className="bg-transparent">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex space-x-8 py-4">
                  {[
                    { id: 'home', label: 'Home' },
                    { id: 'characterverse', label: 'Characterverse' },
                    { id: 'chat', label: 'AI Chat' },
                    { id: 'skills', label: 'Skill Testing' },
                    { id: 'profile', label: 'Profile' },
                    { id: 'leaderboard', label: 'Leaderboard' },
                    { id: 'mint', label: 'Mint Avatar' },
                    { id: 'community', label: 'Community' },
                    { id: 'admin', label: 'Admin' },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigate(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        currentPage === item.id
                          ? 'bg-indigo-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Page Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Layout>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#374151' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
          },
        }}
      />
    </div>
  );
}

export default App;
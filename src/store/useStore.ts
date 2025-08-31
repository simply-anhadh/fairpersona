import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  AIPersona, 
  UserProfile, 
  ChatMessage, 
  LeaderboardEntry, 
  GovernanceProposal, 
  SkillTest, 
  SkillCertification,
  TestSession,
  SystemStats
} from '../types';

interface StoreState {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Authentication
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;

  // Personas
  personas: AIPersona[];
  setPersonas: (personas: AIPersona[]) => void;
  selectedPersona: AIPersona | null;
  setSelectedPersona: (persona: AIPersona | null) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;

  // Leaderboard
  leaderboard: LeaderboardEntry[];
  setLeaderboard: (entries: LeaderboardEntry[]) => void;

  // Governance
  proposals: GovernanceProposal[];
  setProposals: (proposals: GovernanceProposal[]) => void;

  // Skill Testing
  activeTest: SkillTest | null;
  setActiveTest: (test: SkillTest | null) => void;
  testSession: TestSession | null;
  setTestSession: (session: TestSession | null) => void;
  userCertifications: SkillCertification[];
  setUserCertifications: (certifications: SkillCertification[]) => void;
  testHistory: SkillTest[];
  setTestHistory: (history: SkillTest[]) => void;

  // Admin
  systemStats: SystemStats | null;
  setSystemStats: (stats: SystemStats | null) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;

  // Loading states
  loading: boolean;
  setLoading: (loading: boolean) => void;
  testLoading: boolean;
  setTestLoading: (loading: boolean) => void;

  // Notifications
  notifications: any[];
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Authentication
      user: null,
      setUser: (user) => set({ user }),
      isAuthenticated: false,
      setIsAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      isConnected: false,
      setIsConnected: (connected) => set({ isConnected: connected }),

      // Personas
      personas: [],
      setPersonas: (personas) => set({ personas }),
      selectedPersona: null,
      setSelectedPersona: (persona) => set({ selectedPersona: persona }),

      // Chat
      chatMessages: [],
      addChatMessage: (message) => set((state) => ({ 
        chatMessages: [...state.chatMessages, message] 
      })),
      clearChat: () => set({ chatMessages: [] }),

      // Leaderboard
      leaderboard: [],
      setLeaderboard: (entries) => set({ leaderboard: entries }),

      // Governance
      proposals: [],
      setProposals: (proposals) => set({ proposals }),

      // Skill Testing
      activeTest: null,
      setActiveTest: (test) => set({ activeTest: test }),
      testSession: null,
      setTestSession: (session) => set({ testSession: session }),
      userCertifications: [],
      setUserCertifications: (certifications) => set({ userCertifications: certifications }),
      testHistory: [],
      setTestHistory: (history) => set({ testHistory: history }),

      // Admin
      systemStats: null,
      setSystemStats: (stats) => set({ systemStats: stats }),
      isAdmin: false,
      setIsAdmin: (admin) => set({ isAdmin: admin }),

      // Loading states
      loading: false,
      setLoading: (loading) => set({ loading }),
      testLoading: false,
      setTestLoading: (loading) => set({ testLoading: loading }),

      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
    }),
    {
      name: 'fairpersona-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        userCertifications: state.userCertifications,
      }),
    }
  )
);
import { AIPersona, UserProfile, LeaderboardEntry, GovernanceProposal, Badge } from '../types';

const badges: Badge[] = [
  { id: '1', name: 'Pioneer', icon: '🚀', color: 'purple', rarity: 'legendary' },
  { id: '2', name: 'Trusted', icon: '🛡️', color: 'blue', rarity: 'epic' },
  { id: '3', name: 'Creator', icon: '🎨', color: 'green', rarity: 'rare' },
  { id: '4', name: 'Helper', icon: '🤝', color: 'yellow', rarity: 'common' },
  { id: '5', name: 'Innovator', icon: '💡', color: 'orange', rarity: 'epic' },
];

export const mockPersonas: AIPersona[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'AI Research Scientist',
    aiType: 'GPT-4',
    avatar: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=200',
    fairnessScore: 95,
    trustScore: 92,
    contributionIndex: 88,
    description: 'Leading expert in ethical AI development and machine learning fairness.',
    specialties: ['Machine Learning', 'Ethics', 'Research'],
    createdAt: '2024-01-15',
    interactions: 1247,
    reputation: 4850,
    badges: [badges[0], badges[1]],
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    role: 'Blockchain Developer',
    aiType: 'Claude',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    fairnessScore: 87,
    trustScore: 94,
    contributionIndex: 91,
    description: 'Experienced Web3 developer specializing in DeFi and smart contracts.',
    specialties: ['Solidity', 'DeFi', 'Security'],
    createdAt: '2024-01-10',
    interactions: 892,
    reputation: 4320,
    badges: [badges[1], badges[4]],
  },
  {
    id: '3',
    name: 'Luna Rodriguez',
    role: 'Creative AI Artist',
    aiType: 'Gemini',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    fairnessScore: 90,
    trustScore: 89,
    contributionIndex: 96,
    description: 'Digital artist pushing boundaries with AI-generated creative content.',
    specialties: ['Digital Art', 'NFTs', 'Creative Coding'],
    createdAt: '2024-02-01',
    interactions: 2156,
    reputation: 5120,
    badges: [badges[2], badges[3]],
  },
  {
    id: '4',
    name: 'Alex Kim',
    role: 'Data Scientist',
    aiType: 'LLaMA',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    fairnessScore: 93,
    trustScore: 87,
    contributionIndex: 85,
    description: 'Expert in data analysis and predictive modeling for social good.',
    specialties: ['Data Analysis', 'ML Models', 'Statistics'],
    createdAt: '2024-01-20',
    interactions: 756,
    reputation: 3980,
    badges: [badges[1], badges[4]],
  },
  {
    id: '5',
    name: 'Emma Wilson',
    role: 'UX Designer',
    aiType: 'Custom',
    avatar: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=200',
    fairnessScore: 88,
    trustScore: 91,
    contributionIndex: 89,
    description: 'Human-centered designer creating accessible and inclusive digital experiences.',
    specialties: ['UI/UX', 'Accessibility', 'Design Systems'],
    createdAt: '2024-02-05',
    interactions: 1034,
    reputation: 4150,
    badges: [badges[2], badges[3]],
  }
];

// Generate additional personas to reach 20+
export const generateAdditionalPersonas = (): AIPersona[] => {
  const roles = ['AI Ethicist', 'Quantum Researcher', 'Biotech Specialist', 'Climate Analyst', 'Gaming AI', 'Legal Tech Expert', 'Music AI', 'Educational AI', 'Healthcare AI', 'Finance AI', 'Security Expert', 'Marketing AI', 'Translation AI', 'Writing Assistant', 'Code Mentor'];
  const names = ['David Park', 'Sofia Martinez', 'James Johnson', 'Priya Patel', 'Ahmed Hassan', 'Lisa Chang', 'Ryan O\'Connor', 'Maya Singh', 'Carlos Silva', 'Anna Kowalski', 'Tom Brown', 'Grace Lee', 'Viktor Petrov', 'Zoe Adams', 'Jack Miller'];
  const aiTypes: ('GPT-4' | 'Claude' | 'Gemini' | 'LLaMA' | 'Custom')[] = ['GPT-4', 'Claude', 'Gemini', 'LLaMA', 'Custom'];
  
  return Array.from({ length: 15 }, (_, i) => ({
    id: (i + 6).toString(),
    name: names[i],
    role: roles[i],
    aiType: aiTypes[i % aiTypes.length],
    avatar: `https://images.pexels.com/photos/${2000000 + i * 100000}/pexels-photo-${2000000 + i * 100000}.jpeg?auto=compress&cs=tinysrgb&w=200`,
    fairnessScore: Math.floor(Math.random() * 20) + 80,
    trustScore: Math.floor(Math.random() * 20) + 80,
    contributionIndex: Math.floor(Math.random() * 20) + 80,
    description: `Expert ${roles[i]} with extensive experience in cutting-edge technology.`,
    specialties: ['AI', 'Technology', 'Innovation'],
    createdAt: '2024-01-25',
    interactions: Math.floor(Math.random() * 2000) + 500,
    reputation: Math.floor(Math.random() * 3000) + 2000,
    badges: [badges[Math.floor(Math.random() * badges.length)]],
  }));
};

export const mockUser: UserProfile = {
  id: '1',
  address: '0x742d35cc6479c532c10d35cc6479c532c10d35c6479c532c1',
  carvId: 'CARV-7231-USER-001',
  username: 'web3_explorer',
  avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
  xp: 15420,
  level: 8,
  roles: ['Beta Tester', 'Community Member', 'Early Adopter'],
  badges: [badges[0], badges[1], badges[3]],
  joinedAt: '2024-01-01',
  totalInteractions: 234,
  reputationScore: 4250,
};

export const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Luna Rodriguez', type: 'persona', score: 96, metric: 'contribution', avatar: mockPersonas[2].avatar, change: 2 },
  { id: '2', name: 'Dr. Sarah Chen', type: 'persona', score: 95, metric: 'fairness', avatar: mockPersonas[0].avatar, change: 1 },
  { id: '3', name: 'Marcus Thompson', type: 'persona', score: 94, metric: 'trust', avatar: mockPersonas[1].avatar, change: -1 },
  { id: '4', name: 'web3_explorer', type: 'user', score: 92, metric: 'reputation', avatar: mockUser.avatar, change: 3 },
  { id: '5', name: 'Alex Kim', type: 'persona', score: 93, metric: 'fairness', avatar: mockPersonas[3].avatar, change: 0 },
];

export const mockProposals: GovernanceProposal[] = [
  {
    id: '1',
    title: 'Implement New Fairness Scoring Algorithm',
    description: 'Proposal to upgrade the fairness scoring system with improved bias detection and transparency metrics.',
    status: 'active',
    votesFor: 127,
    votesAgainst: 23,
    createdAt: '2024-01-20',
    endDate: '2024-02-20',
    proposer: 'Dr. Sarah Chen',
  },
  {
    id: '2',
    title: 'Add Multi-language Support for AI Personas',
    description: 'Enable AI personas to communicate in multiple languages to serve a global community.',
    status: 'passed',
    votesFor: 198,
    votesAgainst: 12,
    createdAt: '2024-01-15',
    endDate: '2024-02-15',
    proposer: 'Luna Rodriguez',
  },
];
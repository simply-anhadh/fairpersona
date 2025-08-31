export interface AIPersona {
  id: string;
  name: string;
  role: string;
  aiType: 'GPT-4' | 'Claude' | 'Gemini' | 'LLaMA' | 'Custom';
  avatar: string;
  fairnessScore: number;
  trustScore: number;
  contributionIndex: number;
  description: string;
  specialties: string[];
  createdAt: string;
  interactions: number;
  reputation: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  verified?: boolean;
  score?: number;
  verifiedAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  address?: string;
  carvId: string;
  username: string;
  avatar: string;
  xp: number;
  level: number;
  roles: string[];
  badges: Badge[];
  joinedAt: string;
  totalInteractions: number;
  reputationScore: number;
  skillCertifications: SkillCertification[];
  testHistory: SkillTest[];
  walletConnected?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  personaId?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  type: 'user' | 'persona';
  score: number;
  metric: 'fairness' | 'trust' | 'contribution' | 'reputation';
  avatar: string;
  change: number;
}

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  createdAt: string;
  endDate: string;
  proposer: string;
}

// Skill Testing Types
export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  passThreshold: number; // percentage
  prerequisites?: string[];
  tags: string[];
}

export interface TestQuestion {
  id: string;
  type: 'mcq' | 'short_text' | 'file_upload' | 'scenario' | 'code';
  question: string;
  options?: string[]; // for MCQ
  correctAnswer?: string | number;
  points: number;
  timeLimit?: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface SkillTest {
  id: string;
  skillId: string;
  userId: string;
  questions: TestQuestion[];
  startedAt: string;
  completedAt?: string;
  status: 'in_progress' | 'completed' | 'failed' | 'expired' | 'abandoned';
  score?: number;
  passed?: boolean;
  timeSpent: number; // in seconds
  answers: TestAnswer[];
  proctoring?: {
    enabled: boolean;
    violations: string[];
    screenshots: string[];
  };
}

export interface TestAnswer {
  questionId: string;
  answer: string | number | File;
  timeSpent: number;
  isCorrect?: boolean;
  points?: number;
  aiEvaluation?: {
    score: number;
    feedback: string;
  };
}

export interface SkillCertification {
  id: string;
  userId: string;
  skillId: string;
  skillName: string;
  testId: string;
  score: number;
  certifiedAt: string;
  nftTokenId?: string;
  nftTokenURI?: string;
  ipfsHash?: string;
  verified: boolean;
  expiresAt?: string;
  retakeAvailableAt?: string;
}

export interface TestSession {
  id: string;
  userId: string;
  skillId: string;
  startedAt: string;
  expiresAt: string;
  questions: TestQuestion[];
  currentQuestionIndex: number;
  answers: TestAnswer[];
  timeRemaining: number;
  proctoring: {
    enabled: boolean;
    violations: string[];
  };
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
  permissions: string[];
  createdAt: string;
}

export interface SystemStats {
  totalUsers: number;
  totalTests: number;
  totalCertifications: number;
  averageScore: number;
  popularSkills: { skillId: string; count: number }[];
  recentActivity: any[];
}

// Anti-cheat Types
export interface AntiCheatEvent {
  id: string;
  testId: string;
  userId: string;
  type: 'tab_switch' | 'copy_paste' | 'right_click' | 'dev_tools' | 'focus_loss';
  timestamp: string;
  details: any;
}

export interface ProctoringData {
  testId: string;
  userId: string;
  screenshots: string[];
  violations: AntiCheatEvent[];
  faceDetection: {
    enabled: boolean;
    violations: string[];
  };
}
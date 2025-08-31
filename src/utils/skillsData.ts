import { Skill } from '../types';

export const availableSkills: Skill[] = [
  // Tech Skills
  {
    id: 'react-dev',
    name: 'React Developer',
    category: 'Frontend Development',
    description: 'Build modern web applications with React, hooks, and component architecture',
    icon: '⚛️',
    difficulty: 'intermediate',
    estimatedTime: 25,
    passThreshold: 70,
  },
  {
    id: 'solidity-dev',
    name: 'Solidity Developer',
    category: 'Blockchain Development',
    description: 'Smart contract development on Ethereum and EVM-compatible chains',
    icon: '🔗',
    difficulty: 'advanced',
    estimatedTime: 30,
    passThreshold: 75,
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Designer',
    category: 'Design',
    description: 'User interface and experience design principles and best practices',
    icon: '🎨',
    difficulty: 'intermediate',
    estimatedTime: 20,
    passThreshold: 70,
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'Data Science',
    description: 'Machine learning, statistics, and data analysis expertise',
    icon: '📊',
    difficulty: 'advanced',
    estimatedTime: 35,
    passThreshold: 75,
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Specialist',
    category: 'Security',
    description: 'Information security, threat analysis, and security architecture',
    icon: '🛡️',
    difficulty: 'advanced',
    estimatedTime: 30,
    passThreshold: 80,
  },
  
  // Professional Skills
  {
    id: 'project-manager',
    name: 'Project Manager',
    category: 'Management',
    description: 'Project planning, execution, and team leadership skills',
    icon: '📋',
    difficulty: 'intermediate',
    estimatedTime: 20,
    passThreshold: 70,
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'Marketing',
    description: 'SEO, social media, content marketing, and analytics',
    icon: '📱',
    difficulty: 'beginner',
    estimatedTime: 15,
    passThreshold: 65,
  },
  {
    id: 'financial-analyst',
    name: 'Financial Analyst',
    category: 'Finance',
    description: 'Financial modeling, analysis, and investment evaluation',
    icon: '💰',
    difficulty: 'intermediate',
    estimatedTime: 25,
    passThreshold: 75,
  },
  
  // Creative Skills
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    category: 'Design',
    description: 'Visual design, branding, and creative problem solving',
    icon: '🖼️',
    difficulty: 'intermediate',
    estimatedTime: 20,
    passThreshold: 70,
  },
  {
    id: 'content-writer',
    name: 'Content Writer',
    category: 'Writing',
    description: 'Creative writing, copywriting, and content strategy',
    icon: '✍️',
    difficulty: 'beginner',
    estimatedTime: 15,
    passThreshold: 65,
  },
  
  // Trade Skills
  {
    id: 'plumber',
    name: 'Plumber',
    category: 'Trade',
    description: 'Plumbing systems, installation, and repair expertise',
    icon: '🔧',
    difficulty: 'intermediate',
    estimatedTime: 25,
    passThreshold: 75,
  },
  {
    id: 'electrician',
    name: 'Electrician',
    category: 'Trade',
    description: 'Electrical systems, wiring, and safety protocols',
    icon: '⚡',
    difficulty: 'intermediate',
    estimatedTime: 30,
    passThreshold: 80,
  },
  
  // Health & Wellness
  {
    id: 'yoga-teacher',
    name: 'Yoga Teacher',
    category: 'Health & Wellness',
    description: 'Yoga instruction, anatomy, and mindfulness practices',
    icon: '🧘',
    difficulty: 'beginner',
    estimatedTime: 20,
    passThreshold: 70,
  },
  {
    id: 'nutritionist',
    name: 'Nutritionist',
    category: 'Health & Wellness',
    description: 'Nutrition science, meal planning, and dietary counseling',
    icon: '🥗',
    difficulty: 'intermediate',
    estimatedTime: 25,
    passThreshold: 75,
  },
];

export const skillCategories = [
  'All Categories',
  'Frontend Development',
  'Blockchain Development',
  'Design',
  'Data Science',
  'Security',
  'Management',
  'Marketing',
  'Finance',
  'Writing',
  'Trade',
  'Health & Wellness',
];

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'text-green-500 bg-green-100 dark:bg-green-900';
    case 'intermediate':
      return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
    case 'advanced':
      return 'text-red-500 bg-red-100 dark:bg-red-900';
    default:
      return 'text-gray-500 bg-gray-100 dark:bg-gray-900';
  }
};
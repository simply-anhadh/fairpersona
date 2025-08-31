import { TestQuestion, Skill } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Question banks for different skills
const questionBanks: Record<string, TestQuestion[]> = {
  'react-dev': [
    {
      id: uuidv4(),
      type: 'mcq',
      question: 'What is the correct way to update state in a React functional component?',
      options: [
        'setState(newValue)',
        'useState(newValue)',
        'setStateValue(newValue)',
        'updateState(newValue)'
      ],
      correctAnswer: 2,
      points: 10,
      difficulty: 'easy'
    },
    {
      id: uuidv4(),
      type: 'mcq',
      question: 'Which hook is used for side effects in React?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 1,
      points: 10,
      difficulty: 'easy'
    },
    {
      id: uuidv4(),
      type: 'short_text',
      question: 'Explain the difference between controlled and uncontrolled components in React.',
      points: 15,
      difficulty: 'medium'
    },
    {
      id: uuidv4(),
      type: 'code',
      question: 'Write a React component that displays a counter with increment and decrement buttons.',
      points: 20,
      difficulty: 'medium'
    },
    {
      id: uuidv4(),
      type: 'scenario',
      question: 'You have a React app that is rendering slowly. What are three optimization techniques you would use?',
      points: 15,
      difficulty: 'hard'
    }
  ],
  'solidity-dev': [
    {
      id: uuidv4(),
      type: 'mcq',
      question: 'What is the correct visibility modifier for a function that should only be called from within the contract?',
      options: ['public', 'external', 'internal', 'private'],
      correctAnswer: 3,
      points: 10,
      difficulty: 'easy'
    },
    {
      id: uuidv4(),
      type: 'mcq',
      question: 'Which keyword is used to prevent reentrancy attacks?',
      options: ['modifier', 'require', 'assert', 'nonReentrant'],
      correctAnswer: 3,
      points: 15,
      difficulty: 'medium'
    },
    {
      id: uuidv4(),
      type: 'code',
      question: 'Write a simple ERC-20 token contract with mint and burn functions.',
      points: 25,
      difficulty: 'hard'
    }
  ],
  'ui-ux-design': [
    {
      id: uuidv4(),
      type: 'mcq',
      question: 'What is the recommended minimum contrast ratio for normal text according to WCAG guidelines?',
      options: ['3:1', '4.5:1', '7:1', '2.5:1'],
      correctAnswer: 1,
      points: 10,
      difficulty: 'easy'
    },
    {
      id: uuidv4(),
      type: 'scenario',
      question: 'A user reports that they cannot find the search function on your website. How would you approach this UX problem?',
      points: 15,
      difficulty: 'medium'
    },
    {
      id: uuidv4(),
      type: 'file_upload',
      question: 'Create a wireframe for a mobile app login screen. Upload your design.',
      points: 20,
      difficulty: 'medium'
    }
  ],
  'plumber': [
    {
      id: uuidv4(),
      type: 'mcq',
      question: 'What is the standard diameter for a main water supply line in residential plumbing?',
      options: ['1/2 inch', '3/4 inch', '1 inch', '1.5 inches'],
      correctAnswer: 2,
      points: 10,
      difficulty: 'easy'
    },
    {
      id: uuidv4(),
      type: 'scenario',
      question: 'A customer calls about low water pressure throughout their house. What are the first three things you would check?',
      points: 15,
      difficulty: 'medium'
    }
  ],
  'yoga-teacher': [
    {
      id: uuidv4(),
      type: 'mcq',
      question: 'Which breathing technique is commonly used to calm the nervous system?',
      options: ['Kapalabhati', 'Bhastrika', 'Nadi Shodhana', 'Ujjayi'],
      correctAnswer: 2,
      points: 10,
      difficulty: 'easy'
    },
    {
      id: uuidv4(),
      type: 'scenario',
      question: 'A student in your class has a lower back injury. How would you modify poses for them?',
      points: 15,
      difficulty: 'medium'
    }
  ]
};

// Generate additional questions using AI-like logic
const generateAdditionalQuestions = (skill: Skill, count: number): TestQuestion[] => {
  const baseQuestions = questionBanks[skill.id] || [];
  const additionalQuestions: TestQuestion[] = [];
  
  // Generate variations of existing questions
  for (let i = 0; i < count; i++) {
    const difficulty = i < 3 ? 'easy' : i < 6 ? 'medium' : 'hard';
    const questionType = ['mcq', 'short_text', 'scenario'][Math.floor(Math.random() * 3)] as 'mcq' | 'short_text' | 'scenario';
    
    additionalQuestions.push({
      id: uuidv4(),
      type: questionType,
      question: `Advanced ${skill.name} question ${i + 1} - ${difficulty} level`,
      options: questionType === 'mcq' ? [
        'Option A',
        'Option B', 
        'Option C',
        'Option D'
      ] : undefined,
      correctAnswer: questionType === 'mcq' ? Math.floor(Math.random() * 4) : undefined,
      points: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20,
      difficulty: difficulty as 'easy' | 'medium' | 'hard'
    });
  }
  
  return additionalQuestions;
};

export const generateSkillTest = (skill: Skill, userId: string): TestQuestion[] => {
  const baseQuestions = questionBanks[skill.id] || [];
  const additionalQuestions = generateAdditionalQuestions(skill, Math.max(0, 8 - baseQuestions.length));
  
  // Combine and shuffle questions
  const allQuestions = [...baseQuestions, ...additionalQuestions];
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  
  // Select 8-10 questions with balanced difficulty
  const selectedQuestions = shuffled.slice(0, Math.min(10, allQuestions.length));
  
  // Ensure each question has a unique ID for this test instance
  return selectedQuestions.map(q => ({
    ...q,
    id: uuidv4()
  }));
};

export const gradeTest = (questions: TestQuestion[], answers: any[]): { score: number; totalPoints: number; passed: boolean; feedback: string[] } => {
  let earnedPoints = 0;
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const feedback: string[] = [];
  
  questions.forEach((question, index) => {
    const answer = answers[index];
    let isCorrect = false;
    
    switch (question.type) {
      case 'mcq':
        isCorrect = answer === question.correctAnswer;
        if (isCorrect) {
          earnedPoints += question.points;
          feedback.push(`Question ${index + 1}: Correct! (+${question.points} points)`);
        } else {
          feedback.push(`Question ${index + 1}: Incorrect. The correct answer was option ${(question.correctAnswer as number) + 1}.`);
        }
        break;
        
      case 'short_text':
      case 'scenario':
        // Simulate AI grading with random scoring for demo
        const aiScore = Math.random() > 0.3 ? 1 : 0.7; // 70% chance of good score
        const pointsEarned = Math.floor(question.points * aiScore);
        earnedPoints += pointsEarned;
        feedback.push(`Question ${index + 1}: AI graded response - ${pointsEarned}/${question.points} points`);
        break;
        
      case 'code':
        // Simulate code evaluation
        const codeScore = Math.random() > 0.4 ? 1 : 0.6;
        const codePoints = Math.floor(question.points * codeScore);
        earnedPoints += codePoints;
        feedback.push(`Question ${index + 1}: Code evaluation - ${codePoints}/${question.points} points`);
        break;
        
      case 'file_upload':
        // Simulate file evaluation
        const fileScore = Math.random() > 0.3 ? 1 : 0.8;
        const filePoints = Math.floor(question.points * fileScore);
        earnedPoints += filePoints;
        feedback.push(`Question ${index + 1}: File evaluation - ${filePoints}/${question.points} points`);
        break;
    }
  });
  
  const score = Math.round((earnedPoints / totalPoints) * 100);
  const passed = score >= 70; // Default pass threshold
  
  return {
    score,
    totalPoints,
    passed,
    feedback
  };
};
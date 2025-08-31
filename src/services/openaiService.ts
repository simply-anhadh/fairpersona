import axios from 'axios';
import { TestQuestion, Skill } from '../types';
import { v4 as uuidv4 } from 'uuid';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export class OpenAIService {
  private static async makeRequest(messages: any[]) {
    if (!OPENAI_API_KEY) {
      console.warn('OpenAI API key not found, using mock responses');
      return this.getMockResponse(messages);
    }

    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-4',
          messages,
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      console.warn('Falling back to mock responses');
      return this.getMockResponse(messages);
    }
  }

  private static getMockResponse(messages: any[]) {
    // Mock response for demo purposes
    const lastMessage = messages[messages.length - 1].content;
    
    if (lastMessage.includes('generate questions')) {
      return JSON.stringify([
        {
          type: 'mcq',
          question: 'What is the virtual DOM in React?',
          options: [
            'A copy of the real DOM kept in memory',
            'A virtual reality interface',
            'A database for React components',
            'A testing framework'
          ],
          correctAnswer: 0,
          difficulty: 'medium',
          points: 15
        },
        {
          type: 'short_text',
          question: 'Explain the concept of React hooks and provide an example.',
          difficulty: 'medium',
          points: 20
        }
      ]);
    }

    if (lastMessage.includes('evaluate answer')) {
      return JSON.stringify({
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        feedback: 'Good understanding demonstrated with room for improvement in specific areas.'
      });
    }

    return 'Mock response for demo purposes.';
  }

  static async generateQuestions(skill: Skill, difficulty: string, count: number = 8): Promise<TestQuestion[]> {
    const prompt = `Generate ${count} diverse test questions for ${skill.name} skill assessment.
    
    Skill: ${skill.name}
    Category: ${skill.category}
    Description: ${skill.description}
    Difficulty: ${difficulty}
    
    Requirements:
    - Mix of question types: multiple choice (60%), short text (25%), scenario-based (15%)
    - Questions should test practical knowledge and real-world application
    - Difficulty should be appropriate for ${difficulty} level
    - Include point values (easy: 10pts, medium: 15pts, hard: 20pts)
    
    Return as JSON array with this structure:
    [
      {
        "type": "mcq|short_text|scenario",
        "question": "Question text",
        "options": ["option1", "option2", "option3", "option4"], // only for mcq
        "correctAnswer": 0, // index for mcq, null for others
        "difficulty": "easy|medium|hard",
        "points": 10-20
      }
    ]`;

    try {
      const response = await this.makeRequest([
        { role: 'system', content: 'You are an expert test generator. Generate high-quality, practical questions for skill assessment.' },
        { role: 'user', content: prompt }
      ]);

      const questions = JSON.parse(response);
      return questions.map((q: any) => ({
        ...q,
        id: uuidv4()
      }));
    } catch (error) {
      console.error('Error generating questions:', error);
      return this.getFallbackQuestions(skill);
    }
  }

  static async evaluateAnswer(question: TestQuestion, answer: string): Promise<{ score: number; feedback: string }> {
    if (question.type === 'mcq') {
      const isCorrect = answer === question.correctAnswer?.toString();
      return {
        score: isCorrect ? 100 : 0,
        feedback: isCorrect ? 'Correct answer!' : `Incorrect. The correct answer was option ${(question.correctAnswer as number) + 1}.`
      };
    }

    const prompt = `Evaluate this answer for a ${question.type} question:
    
    Question: ${question.question}
    Answer: ${answer}
    Points: ${question.points}
    Difficulty: ${question.difficulty}
    
    Provide a score (0-100) and constructive feedback. Consider:
    - Accuracy and completeness
    - Practical understanding
    - Real-world applicability
    
    Return as JSON: {"score": 0-100, "feedback": "detailed feedback"}`;

    try {
      const response = await this.makeRequest([
        { role: 'system', content: 'You are an expert evaluator. Provide fair, constructive assessment of answers.' },
        { role: 'user', content: prompt }
      ]);

      return JSON.parse(response);
    } catch (error) {
      console.error('Error evaluating answer:', error);
      // Fallback scoring
      const score = answer.length > 20 ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 40;
      return {
        score,
        feedback: 'Answer evaluated. Consider providing more detailed explanations for better scores.'
      };
    }
  }

  private static getFallbackQuestions(skill: Skill): TestQuestion[] {
    // Fallback questions for demo
    return [
      {
        id: uuidv4(),
        type: 'mcq',
        question: `What is a key principle of ${skill.name}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        points: 15,
        difficulty: 'medium'
      },
      {
        id: uuidv4(),
        type: 'short_text',
        question: `Describe a practical application of ${skill.name} in a real-world scenario.`,
        points: 20,
        difficulty: 'medium'
      }
    ];
  }
}
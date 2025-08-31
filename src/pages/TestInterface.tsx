import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle, XCircle, Camera, Mic, Upload, Code, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateSkillTest, gradeTest } from '../utils/testGenerator';
import { availableSkills } from '../utils/skillsData';
import { TestQuestion, SkillTest, TestAnswer } from '../types';
import Webcam from 'react-webcam';
import clsx from 'clsx';

interface TestInterfaceProps {
  skillId: string;
  onComplete: (result: any) => void;
  onExit: () => void;
}

export function TestInterface({ skillId, onComplete, onExit }: TestInterfaceProps) {
  const { darkMode, user, setActiveTest } = useStore();
  const [currentTest, setCurrentTest] = useState<SkillTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProctoring, setShowProctoring] = useState(false);
  const [proctoringEnabled, setProctoringEnabled] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const skill = availableSkills.find(s => s.id === skillId);

  useEffect(() => {
    if (!skill || !user) return;

    // Generate test
    const questions = generateSkillTest(skill, user.id);
    const test: SkillTest = {
      id: `test_${Date.now()}`,
      skillId: skill.id,
      userId: user.id,
      questions,
      startedAt: new Date().toISOString(),
      status: 'in_progress',
      timeSpent: 0,
      answers: []
    };

    setCurrentTest(test);
    setActiveTest(test);
    setTimeRemaining(skill.estimatedTime * 60); // Convert to seconds
    setAnswers(new Array(questions.length).fill(null));

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [skill, user]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer: any) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: currentTest!.questions[currentQuestionIndex].id,
      answer,
      timeSpent: 0,
    };
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentTest!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = async () => {
    if (!currentTest || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Grade the test
      const result = gradeTest(currentTest.questions, answers.map(a => a?.answer));
      
      // Update test status
      const completedTest: SkillTest = {
        ...currentTest,
        completedAt: new Date().toISOString(),
        status: result.passed ? 'completed' : 'failed',
        score: result.score,
        passed: result.passed,
        answers
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      onComplete({
        test: completedTest,
        result,
        skill
      });
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: TestQuestion) => {
    const currentAnswer = answers[currentQuestionIndex]?.answer;

    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-4">
            <h3 className={clsx(
              'text-lg font-semibold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              {question.question}
            </h3>
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <label
                  key={index}
                  className={clsx(
                    'flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200',
                    currentAnswer === index
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : darkMode
                      ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  )}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={index}
                    checked={currentAnswer === index}
                    onChange={() => handleAnswerChange(index)}
                    className="mr-3 text-indigo-600"
                  />
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'short_text':
      case 'scenario':
        return (
          <div className="space-y-4">
            <h3 className={clsx(
              'text-lg font-semibold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              {question.question}
            </h3>
            <textarea
              value={currentAnswer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              rows={6}
              className={clsx(
                'w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              )}
            />
          </div>
        );

      case 'code':
        return (
          <div className="space-y-4">
            <h3 className={clsx(
              'text-lg font-semibold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              {question.question}
            </h3>
            <div className="relative">
              <Code size={20} className={clsx(
                'absolute top-3 left-3',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              )} />
              <textarea
                value={currentAnswer || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Write your code here..."
                rows={10}
                className={clsx(
                  'w-full pl-10 pr-4 py-3 rounded-lg border font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                  darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                )}
              />
            </div>
          </div>
        );

      case 'file_upload':
        return (
          <div className="space-y-4">
            <h3 className={clsx(
              'text-lg font-semibold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            )}>
              {question.question}
            </h3>
            <div className={clsx(
              'border-2 border-dashed rounded-lg p-8 text-center',
              darkMode ? 'border-gray-600' : 'border-gray-300'
            )}>
              <Upload size={48} className={clsx(
                'mx-auto mb-4',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              )} />
              <p className={clsx(
                'text-lg font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              )}>
                Upload your file
              </p>
              <p className={clsx(
                'text-sm mb-4',
                darkMode ? 'text-gray-500' : 'text-gray-500'
              )}>
                Drag and drop or click to browse
              </p>
              <input
                type="file"
                onChange={(e) => handleAnswerChange(e.target.files?.[0])}
                className="hidden"
                id={`file-${question.id}`}
              />
              <label
                htmlFor={`file-${question.id}`}
                className="inline-block px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg cursor-pointer transition-colors duration-200"
              >
                Choose File
              </label>
              {currentAnswer && (
                <p className={clsx(
                  'mt-2 text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Selected: {(currentAnswer as File).name}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!currentTest || !skill) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100;

  return (
    <div className={clsx(
      'min-h-screen',
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    )}>
      {/* Header */}
      <div className={clsx(
        'sticky top-0 z-40 border-b',
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{skill.icon}</div>
              <div>
                <h1 className={clsx(
                  'text-xl font-bold',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  {skill.name} Certification Test
                </h1>
                <p className={clsx(
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Question {currentQuestionIndex + 1} of {currentTest.questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div className={clsx(
                'flex items-center space-x-2 px-3 py-2 rounded-lg',
                timeRemaining < 300 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              )}>
                <Clock size={16} />
                <span className="font-mono font-medium">
                  {formatTime(timeRemaining)}
                </span>
              </div>

              {/* Proctoring Toggle */}
              <button
                onClick={() => setProctoringEnabled(!proctoringEnabled)}
                className={clsx(
                  'p-2 rounded-lg transition-colors duration-200',
                  proctoringEnabled
                    ? 'bg-green-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
                title="Toggle webcam proctoring"
              >
                <Camera size={16} />
              </button>

              {/* Exit Button */}
              <button
                onClick={onExit}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                )}
              >
                Exit Test
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className={clsx(
              'w-full rounded-full h-2',
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            )}>
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={clsx(
                'p-8 rounded-xl border',
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              )}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                    darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'
                  )}>
                    {currentQuestionIndex + 1}
                  </div>
                  <span className={clsx(
                    'px-2 py-1 text-xs font-medium rounded-full capitalize',
                    currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  )}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <div className={clsx(
                  'text-sm font-medium',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {currentQuestion.points} points
                </div>
              </div>

              {/* Question Content */}
              {renderQuestion(currentQuestion)}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={clsx(
                    'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
                    currentQuestionIndex === 0
                      ? 'opacity-50 cursor-not-allowed'
                      : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  )}
                >
                  Previous
                </button>

                {currentQuestionIndex === currentTest.questions.length - 1 ? (
                  <button
                    onClick={handleSubmitTest}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        <span>Submit Test</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    Next
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Question Navigator */}
            <div className={clsx(
              'p-4 rounded-xl border',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}>
              <h3 className={clsx(
                'font-semibold mb-3',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                Questions
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {currentTest.questions.map((_, index) => {
                  const isAnswered = answers[index]?.answer !== undefined && answers[index]?.answer !== null;
                  const isCurrent = index === currentQuestionIndex;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={clsx(
                        'w-8 h-8 rounded text-xs font-medium transition-all duration-200',
                        isCurrent
                          ? 'bg-indigo-500 text-white'
                          : isAnswered
                          ? 'bg-green-500 text-white'
                          : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Test Info */}
            <div className={clsx(
              'p-4 rounded-xl border',
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}>
              <h3 className={clsx(
                'font-semibold mb-3',
                darkMode ? 'text-white' : 'text-gray-900'
              )}>
                Test Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Total Questions:
                  </span>
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {currentTest.questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Answered:
                  </span>
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {answers.filter(a => a?.answer !== undefined && a?.answer !== null).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Pass Threshold:
                  </span>
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {skill.passThreshold}%
                  </span>
                </div>
              </div>
            </div>

            {/* Proctoring */}
            {proctoringEnabled && (
              <div className={clsx(
                'p-4 rounded-xl border',
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              )}>
                <h3 className={clsx(
                  'font-semibold mb-3 flex items-center',
                  darkMode ? 'text-white' : 'text-gray-900'
                )}>
                  <Camera size={16} className="mr-2" />
                  Proctoring
                </h3>
                <div className="relative">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    className="w-full rounded-lg"
                    screenshotFormat="image/jpeg"
                  />
                  <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <p className={clsx(
                  'text-xs mt-2',
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Test session is being monitored for integrity
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
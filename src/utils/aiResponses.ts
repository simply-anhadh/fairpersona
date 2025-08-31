export const generateAIResponse = (message: string, personaName?: string): string => {
  const responses = {
    greeting: [
      `Hello! I'm ${personaName || 'an AI assistant'} and I'm here to help you explore the world of fair AI and Web3 technologies.`,
      `Hi there! Welcome to FairPersona. How can I assist you today?`,
      `Greetings! I'm excited to discuss AI ethics, blockchain technology, or any other topic you're curious about.`,
    ],
    fairness: [
      'Fairness in AI is crucial for building trust and ensuring equitable outcomes. Our platform uses advanced metrics to measure bias, transparency, and ethical considerations.',
      'AI fairness involves eliminating discrimination, ensuring equal treatment across different groups, and maintaining transparency in decision-making processes.',
      'We measure fairness through multiple dimensions: algorithmic bias, outcome equity, procedural fairness, and representational adequacy.',
    ],
    web3: [
      'Web3 represents the decentralized future of the internet, where users have greater control over their data and digital identities.',
      'Blockchain technology enables trustless interactions and transparent reputation systems, which is exactly what we\'re implementing with CARV ID and ERC-7231.',
      'The combination of AI and Web3 creates new possibilities for decentralized intelligence and community-governed AI systems.',
    ],
    reputation: [
      'Our reputation system uses on-chain identity principles to create transparent and verifiable trust scores for AI personas and users.',
      'Reputation is built through consistent positive interactions, community contributions, and demonstrated expertise in specific domains.',
      'The ERC-7231 standard helps ensure that reputation scores are portable across different platforms and applications.',
    ],
    default: [
      'That\'s an interesting question! I\'d love to explore that topic further with you.',
      'I appreciate your curiosity! Let me think about the best way to address that.',
      'Great question! The intersection of AI and Web3 opens up so many fascinating possibilities.',
      'I\'m here to help you understand these complex topics. Could you tell me more about what specific aspect interests you most?',
    ],
  };

  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  
  if (lowerMessage.includes('fair') || lowerMessage.includes('bias') || lowerMessage.includes('ethical')) {
    return responses.fairness[Math.floor(Math.random() * responses.fairness.length)];
  }
  
  if (lowerMessage.includes('web3') || lowerMessage.includes('blockchain') || lowerMessage.includes('decentralized')) {
    return responses.web3[Math.floor(Math.random() * responses.web3.length)];
  }
  
  if (lowerMessage.includes('reputation') || lowerMessage.includes('trust') || lowerMessage.includes('score')) {
    return responses.reputation[Math.floor(Math.random() * responses.reputation.length)];
  }
  
  return responses.default[Math.floor(Math.random() * responses.default.length)];
};

export const suggestedPrompts = [
  'What makes an AI system fair?',
  'How does Web3 enhance digital identity?',
  'Explain the CARV ID reputation system',
  'What are the benefits of decentralized AI?',
  'How do you measure AI trustworthiness?',
  'Tell me about blockchain-based reputation',
  'What is ERC-7231 and why is it important?',
  'How can AI bias be detected and prevented?',
];
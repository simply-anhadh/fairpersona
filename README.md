# FairPersona - Decentralized Reputation Platform

A comprehensive skill-based identity platform that lets users prove their expertise through AI-generated tests and mint verified SoulBound NFT badges.

## 🚀 Features

### Core Features
- **Email/Password Authentication** - Secure user registration and login with Firebase Auth
- **Wallet Integration** - MetaMask wallet connection for Web3 functionality
- **AI-Generated Skill Tests** - Dynamic, non-repetitive tests powered by OpenAI GPT-4
- **SoulBound NFT Minting** - Non-transferable certification badges on Polygon
- **Anti-Cheat System** - Tab switching detection, webcam proctoring, copy/paste prevention
- **IPFS Storage** - Decentralized storage for NFT metadata via Pinata
- **Real-time Scoring** - AI-powered evaluation of open-ended answers
- **Certification Dashboard** - View and manage earned skill badges
- **Admin Panel** - Comprehensive platform management tools

### Skill Categories
- Frontend Development (React, UI/UX Design)
- Blockchain Development (Solidity, Smart Contracts)
- Data Science & Analytics
- Cybersecurity
- Project Management
- Digital Marketing
- Creative Skills (Graphic Design, Content Writing)
- Trade Skills (Plumbing, Electrical)
- Health & Wellness (Yoga, Nutrition)

### Technical Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - Complete theme switching
- **Real-time Updates** - Live test progress and scoring
- **Progressive Web App** - Can be installed on mobile devices
- **Type Safety** - Full TypeScript implementation
- **State Management** - Zustand for efficient state handling
- **Animations** - Smooth transitions with Framer Motion

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling with validation
- **Zustand** - State management

### Backend Services
- **Firebase Auth** - User authentication
- **Firebase Firestore** - NoSQL database
- **OpenAI GPT-4** - AI question generation and evaluation
- **Pinata IPFS** - Decentralized file storage

### Web3 Integration
- **Ethers.js** - Ethereum library for wallet interaction
- **Polygon Mumbai** - Testnet for smart contract deployment
- **SoulBound Tokens** - Non-transferable NFT standard
- **MetaMask** - Wallet connection

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fairpersona.git
   cd fairpersona
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   - Firebase configuration
   - OpenAI API key
   - Pinata IPFS credentials
   - Smart contract address

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Add your Firebase config to `.env`

### OpenAI Setup
1. Get an API key from [OpenAI](https://platform.openai.com)
2. Add to `.env` as `VITE_OPENAI_API_KEY`

### Pinata IPFS Setup
1. Create account at [Pinata](https://pinata.cloud)
2. Generate API keys and JWT
3. Add credentials to `.env`

### Smart Contract Deployment
1. Deploy the SoulBound token contract to Polygon Mumbai
2. Update `VITE_CONTRACT_ADDRESS` in `.env`

## 🎮 Usage

### For Users
1. **Sign Up** - Create account with email/password
2. **Connect Wallet** - Link MetaMask wallet for Web3 features
3. **Browse Skills** - Explore available skill categories
4. **Take Tests** - Complete AI-generated assessments
5. **Mint Badges** - Earn verified NFT certifications
6. **Build Reputation** - Showcase skills on public profile

### For Admins
1. **Access Admin Panel** - Manage users and platform settings
2. **Add Skills** - Create new skill categories and tests
3. **Monitor Activity** - View platform statistics and user activity
4. **Moderate Content** - Review flagged tests and users

## 🔒 Security Features

### Anti-Cheat System
- **Tab Switch Detection** - Monitors when users leave the test tab
- **Copy/Paste Prevention** - Blocks clipboard operations during tests
- **Webcam Proctoring** - Optional video monitoring
- **Time Limits** - Enforced test duration limits
- **Question Randomization** - Unique test sets per attempt

### Data Protection
- **Encrypted Storage** - Sensitive data encrypted at rest
- **Secure Authentication** - Firebase Auth with industry standards
- **IPFS Immutability** - Tamper-proof certificate storage
- **Blockchain Verification** - Immutable skill verification

## 📱 Mobile Support

The application is fully responsive and can be used as a Progressive Web App (PWA):

1. **Mobile Browser** - Full functionality on mobile browsers
2. **Install as App** - Add to home screen for native-like experience
3. **Offline Support** - Basic functionality works offline
4. **Touch Optimized** - Gesture-friendly interface

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Web Deployment (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push

### Mobile App (Expo)
1. Install Expo CLI: `npm install -g @expo/cli`
2. Initialize Expo: `expo init fairpersona-mobile`
3. Copy web components to mobile project
4. Build and publish to app stores

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Firebase for backend services
- Pinata for IPFS storage
- Polygon for blockchain infrastructure
- The open-source community for amazing tools

## 📞 Support

For support, email support@fairpersona.app or join our Discord community.

## 🗺 Roadmap

- [ ] Mobile app release (iOS/Android)
- [ ] Advanced proctoring features
- [ ] Multi-language support
- [ ] Enterprise features
- [ ] API for third-party integrations
- [ ] Advanced analytics dashboard
- [ ] Skill endorsements system
- [ ] Gamification features

---

Built with ❤️ by the FairPersona team
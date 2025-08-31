import { ethers } from 'ethers';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// SoulBound Token Contract ABI (simplified)
const SOULBOUND_ABI = [
  "function mint(address to, string memory tokenURI) public returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)"
];

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x1234567890123456789012345678901234567890";
const POLYGON_TESTNET_RPC = "https://rpc-mumbai.maticvigil.com";

export class Web3Service {
  private static provider: ethers.BrowserProvider | null = null;
  private static signer: ethers.Signer | null = null;
  private static contract: ethers.Contract | null = null;

  static async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      
      // Switch to Polygon testnet
      await this.switchToPolygonTestnet();
      
      return address;
    } catch (error: any) {
      throw new Error(`Failed to connect wallet: ${error.message}`);
    }
  }

  private static async switchToPolygonTestnet() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // Polygon Mumbai testnet
      });
    } catch (switchError: any) {
      // Chain not added, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x13881',
            chainName: 'Polygon Mumbai Testnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: [POLYGON_TESTNET_RPC],
            blockExplorerUrls: ['https://mumbai.polygonscan.com/']
          }]
        });
      }
    }
  }

  static async mintSoulBoundToken(
    userAddress: string, 
    skillName: string, 
    score: number, 
    userId: string
  ): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      // Create contract instance
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, SOULBOUND_ABI, this.signer);

      // Create metadata for IPFS (simplified for demo)
      const metadata = {
        name: `${skillName} Certification`,
        description: `Verified skill certification for ${skillName}`,
        image: `https://api.dicebear.com/7.x/shapes/svg?seed=${skillName}`,
        attributes: [
          { trait_type: "Skill", value: skillName },
          { trait_type: "Score", value: score },
          { trait_type: "Verified", value: true },
          { trait_type: "Issue Date", value: new Date().toISOString() }
        ]
      };

      // For demo, we'll use a mock IPFS URL
      const tokenURI = `https://ipfs.io/ipfs/mock-${Date.now()}`;

      // Mint the token (this would be a real transaction in production)
      console.log('Minting SoulBound token...', { userAddress, tokenURI });
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const tokenId = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Update user's certifications in Firestore
      await updateDoc(doc(db, 'users', userId), {
        [`skillCertifications.${skillName}`]: {
          tokenId,
          tokenURI,
          mintedAt: new Date().toISOString(),
          score,
          verified: true
        }
      });

      return tokenId;
    } catch (error: any) {
      throw new Error(`Failed to mint token: ${error.message}`);
    }
  }

  static async getUserTokens(userAddress: string): Promise<any[]> {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, SOULBOUND_ABI, this.provider);
      
      // Get user's token balance
      const balance = await this.contract.balanceOf(userAddress);
      const tokens = [];

      // Get all tokens owned by user
      for (let i = 0; i < balance; i++) {
        const tokenId = await this.contract.tokenOfOwnerByIndex(userAddress, i);
        const tokenURI = await this.contract.tokenURI(tokenId);
        tokens.push({ tokenId: tokenId.toString(), tokenURI });
      }

      return tokens;
    } catch (error: any) {
      console.error('Error getting user tokens:', error);
      return [];
    }
  }

  static isWalletConnected(): boolean {
    return !!window.ethereum && !!this.signer;
  }

  static async getWalletAddress(): Promise<string | null> {
    if (!this.signer) return null;
    try {
      return await this.signer.getAddress();
    } catch {
      return null;
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
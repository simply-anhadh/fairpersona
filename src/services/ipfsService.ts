import axios from 'axios';

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY;
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;

export class IPFSService {
  private static readonly PINATA_API_URL = 'https://api.pinata.cloud';

  static async uploadJSON(data: any): Promise<string> {
    if (!PINATA_JWT) {
      console.warn('Pinata JWT not found, using mock IPFS hash');
      return `QmMock${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    }

    try {
      const response = await axios.post(
        `${this.PINATA_API_URL}/pinning/pinJSONToIPFS`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${PINATA_JWT}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      console.warn('Using mock IPFS hash as fallback');
      // Return mock hash as fallback
      return `QmMock${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  static async uploadFile(file: File): Promise<string> {
    if (!PINATA_JWT) {
      console.warn('Pinata JWT not found, using mock IPFS hash');
      return `QmMockFile${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${this.PINATA_API_URL}/pinning/pinFileToIPFS`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${PINATA_JWT}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      console.warn('Using mock IPFS hash as fallback');
      // Return mock hash as fallback
      return `QmMockFile${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  static getIPFSUrl(hash: string): string {
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }

  static async createCertificateMetadata(
    skillName: string,
    score: number,
    userAddress: string,
    testId: string
  ): Promise<string> {
    const metadata = {
      name: `${skillName} Certification`,
      description: `Verified skill certification for ${skillName} with a score of ${score}%`,
      image: `https://api.dicebear.com/7.x/shapes/svg?seed=${skillName}&backgroundColor=4F46E5`,
      external_url: `https://fairpersona.app/certificate/${testId}`,
      attributes: [
        {
          trait_type: "Skill",
          value: skillName
        },
        {
          trait_type: "Score",
          value: score
        },
        {
          trait_type: "Verified",
          value: true
        },
        {
          trait_type: "Issue Date",
          value: new Date().toISOString().split('T')[0]
        },
        {
          trait_type: "Holder",
          value: userAddress
        }
      ],
      properties: {
        category: "Skill Certification",
        type: "SoulBound Token",
        transferable: false
      }
    };

    return await this.uploadJSON(metadata);
  }
}
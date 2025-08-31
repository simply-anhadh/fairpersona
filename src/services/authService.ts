import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { UserProfile } from "../types";

export class AuthService {
  // -------------------- Sign Up --------------------
  static async signUp(email: string, password: string, username: string): Promise<UserProfile> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: username });

      // Send email verification
      if (user) await sendEmailVerification(user);

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        id: user.uid,
        email: user.email!,
        username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        address: "", // Will be set when wallet is connected
        carvId: `CARV-${Date.now()}-${user.uid.slice(0, 8)}`,
        xp: 0,
        level: 1,
        roles: ["User"],
        badges: [],
        joinedAt: new Date().toISOString(),
        totalInteractions: 0,
        reputationScore: 100,
        skillCertifications: [],
        testHistory: []
      };

      await setDoc(doc(db, "users", user.uid), userProfile);
      return userProfile;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // -------------------- Sign In --------------------
  static async signIn(email: string, password: string): Promise<UserProfile> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("User profile not found");
      }

      return userDoc.data() as UserProfile;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // -------------------- Sign Out --------------------
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // -------------------- Current User --------------------
  static async getCurrentUser(): Promise<UserProfile | null> {
    const user = auth.currentUser;
    if (!user) return null;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) return null;

      return userDoc.data() as UserProfile;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  // -------------------- Auth State Listener --------------------
  static onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // -------------------- Update User Profile --------------------
  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      await updateDoc(doc(db, "users", userId), updates);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // -------------------- Reset Password --------------------
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // -------------------- Send Verification Email --------------------
  static async sendVerificationEmail(): Promise<void> {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
      } else {
        throw new Error("No user is currently signed in");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

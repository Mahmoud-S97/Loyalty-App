import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail
} from '@react-native-firebase/auth';

const auth = getAuth();

export const authService = {
  signUp: async (email: string, password: string): Promise<User> => {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentials.user;
  },
  login: async (email: string, password: string): Promise<User> => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    return credentials.user;
  },
  sendPasswordResetEmail: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  },
  logout: async () => {
    await signOut(auth);
  }
};

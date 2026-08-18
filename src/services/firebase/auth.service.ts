import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from '@react-native-firebase/auth';

const auth = getAuth();

export const authService = {
  async signUp(email: string, password: string): Promise<User> {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentials.user;
  },
  async login(email: string, password: string): Promise<User> {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    return credentials.user;
  },
  async logout() {
    await signOut(auth);
  }
};

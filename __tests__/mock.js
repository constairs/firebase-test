export const mockUsersFirebase = () => {
  jest.mock('../src/firebase/userFunctions.js', () => ({
    createOpenChannel: jest.fn(channel => channel),
    getChannelListFromSB: jest.fn(),

    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    reAuth: jest.fn(),
    signOut: jest.fn(),
    updateProfile: jest.fn(),
    deleteProfile: jest.fn(),
    updateEmail: jest.fn(),
    sendVerification: jest.fn(),
    updatePassword: jest.fn(),
    resetPassword: jest.fn(),
  }));
};

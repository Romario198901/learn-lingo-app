export const firebaseBaseUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const getFireBaseUrl = (path: string) => {
  return `${firebaseBaseUrl}/${path}.json`;
};

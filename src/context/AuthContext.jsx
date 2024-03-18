import { getIdToken, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../googleSignIn/config";
import { verifyTokenGoogle } from "../helper/LoginAPI";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Indicate authentication state

  const value = {
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
    // Add signOut function for user convenience
    signOut: async () => {
      await signOut(auth);
      setCurrentUser(null);
      setIsLoading(false); // Update loading state on sign out
    },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsLoading(false); // Update loading state on initial auth check

      if (user) {
        try {
          const token = await user.getIdToken();
          if (!isLoading) return; // Avoid unnecessary calls if already logged in
          setIsLoading(true); // Show loading state while verifying token

          const data = await verifyTokenGoogle(token);
          console.log(data, "res verifyTokenGoogle");
          setIsLoading(false); // Update loading state after verification

          // Handle successful token verification based on your app logic
          // (e.g., update user profile, redirect to protected routes)
        } catch (err) {
          console.error("Error verifying token:", err);
          setCurrentUser(null);
          setIsLoading(false); // Update loading state on error
          // Handle token verification errors (e.g., sign out user)
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

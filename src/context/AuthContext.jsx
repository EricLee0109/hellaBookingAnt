import { getIdToken, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../googleSignIn/config";
import { verifyTokenGoogle } from "../helper/LoginAPI";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [checkLogin, setCheckLogin] = useState(false);

  const value = {
    authUser,
    setAuthUser,
    checkLogin,
    setCheckLogin,
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, async (currentUser) => {
      if (authUser) {
        setAuthUser(currentUser);
        const tokenPromise = currentUser.getIdToken();
        tokenPromise
          .then((token) => {
            if (!checkLogin) {
              return;
            }
            setCheckLogin(false);
            // setAuthUser(token);
            // console.log(token, "tokennn");
            const data = verifyTokenGoogle(token);
            data
              .then((res) => {
                console.log(res, "res verifyTokenGoogle");
                setCheckLogin(true);
              })
              .catch((err) => {
                setCheckLogin(false);
                signOut(auth);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return () => {
      unsubcribe();
    };
  }, [authUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

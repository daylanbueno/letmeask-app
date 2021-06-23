import { createContext, useState, ReactNode, useEffect} from "react"
import { auth, firebase } from "../services/firebase"

type UserType = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => void;
}

type AuthContextProviderProps =  {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider (props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserType>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
          const { displayName, photoURL, uid } = user
          if (!displayName || !photoURL) {
            throw new Error('Verifique as informações da sua conta do google!')
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
           })
        }
    }) 
    return () => {
      unsubscribe()
    }
  },[])
  

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then((result) => {
        if (result.user) {
          const { displayName, photoURL, uid } = result.user
          if (!displayName || !photoURL) {
            throw new Error('Verifique as informações da sua conta do google!')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
    })
  }

    return (
        <AuthContext.Provider value={{user , signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}
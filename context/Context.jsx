import { createContext, useState } from 'react'

export const UserContext = createContext()

const Context = ({children}) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
        {children}
    </UserContext.Provider>
  )
}

export default Context

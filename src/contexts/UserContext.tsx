import { createContext, useState } from "react";

const defaultUser: string = "";

interface UserContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue: UserContextType = {
  user: defaultUser,
  setUser: () => {}, // dummy function for default context
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>(defaultContextValue);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<string>(defaultUser);

  return (
    <UserContext.Provider
      value={{
        user: selectedUser,
        setUser: setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

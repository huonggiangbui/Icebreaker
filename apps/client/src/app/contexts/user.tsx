import { User } from '@icebreaker/shared-types';
import React, { useState, FC, Dispatch, SetStateAction } from 'react';

export const defaultState = {
  id: "",
  name: ""
}

interface IUserContext {
  user: User,
  setUser?: Dispatch<SetStateAction<User>>
}

const UserContext = React.createContext<IUserContext>({user: defaultState});
export { UserContext };

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState(defaultState);

  return (
    <UserContext.Provider
      value={{user, setUser}}
    >
      {children}
    </UserContext.Provider>
  );
};

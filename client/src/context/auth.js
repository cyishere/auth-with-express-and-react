import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  userId: null,
});

export default AuthContext;

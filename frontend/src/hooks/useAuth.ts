import { useContext } from "react";
import { AuthContext, AuthContextState } from "../context/auth-context";

export function useAuth(): AuthContextState {
	const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

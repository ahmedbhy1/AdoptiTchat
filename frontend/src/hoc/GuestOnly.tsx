import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export default function GuestOnly({ children }: { children: React.ReactNode; }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn && !isLoading) {
    return <Navigate to='/' />;
  }

  return children;
}

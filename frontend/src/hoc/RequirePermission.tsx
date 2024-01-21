import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../models/user-role';
export default function RequirePermission({ roles, children }: { roles: UserRole[], children: React.ReactNode; }) {
	const { user } = useAuth();
	if (roles?.length > 0
		&& (!user?.role
			|| !roles.includes(user.role))
	) {
		return <Navigate to='/' />;
	}

	return children;
}

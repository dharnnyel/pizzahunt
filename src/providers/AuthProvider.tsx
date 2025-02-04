import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';
import { AppState } from 'react-native';
import { Tables } from 'types/database';

type AuthData = {
	session: Session | null;
	profile: any;
	loading: boolean;
	isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	profile: null,
	loading: true,
	isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
	children,
}: PropsWithChildren) => {
	const [session, setSession] = useState<Session | null>(
		null
	);
	const [profile, setProfile] =
		useState<Tables<'profiles'> | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			setSession(session);

			// console.log(session)
			if (session) {
				const { data } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', session.user.id)
					.single();
				setProfile(data);
			}

			setLoading(false);
		};

		fetchSession();

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				session,
				loading,
				profile,
				isAdmin: profile?.group === 'ADMIN',
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

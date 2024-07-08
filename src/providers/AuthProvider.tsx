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

type AuthData = {
	session: Session | null;
	loading: boolean;
};

const AuthContext = createContext<AuthData>({
	session: null,
	loading: false,
});

export const useAuth = () => useContext(AuthContext);

// TODO: remove
// AppState.addEventListener('change', state => {
// 	if (state === 'active') {
// 		supabase.auth.startAutoRefresh();
// 	} else {
// 		supabase.auth.stopAutoRefresh();
// 	}
// });

export const AuthProvider = ({
	children,
}: PropsWithChildren) => {
	const [session, setSession] = useState<Session | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const { data, error } =
				await supabase.auth.getSession();
			setSession(data.session);
			setLoading(false);
		};

		fetchSession();

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ session, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

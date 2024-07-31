import {
	Button,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import { supabase } from '@/lib/supabase';

const UserProfile = () => {
	return (
		<View>
			<Button
				title='Sign Out'
				onPress={async () => await supabase.auth.signOut()}
			/>
		</View>
	);
};

export default UserProfile;

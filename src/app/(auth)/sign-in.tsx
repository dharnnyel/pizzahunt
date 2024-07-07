import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import React, { useState } from 'react';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {};

	const signInWithEmail = async () => {
		setLoading(true);
		const { error } =
			await supabase.auth.signInWithPassword({
				email,
				password,
			});

		if (error) Alert.alert(error.message);
		console.log('signed in successfully')
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: 'Sign In' }} />

			<View>
				<Text style={styles.label}>Email</Text>
				<TextInput
					placeholder='example@gmail.com'
					placeholderTextColor={'gray'}
					style={styles.input}
					value={email}
					onChangeText={setEmail}
				/>
			</View>
			<View>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.input}
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			</View>

			<Button
				text={loading ? 'Signing in...' : 'Sign in'}
				onPress={signInWithEmail}
				disabled={loading}
			/>

			<Link
				href='/sign-up'
				style={styles.textButton}
			>
				Create an account
			</Link>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
	},
	image: {
		width: '50%',
		aspectRatio: 1,
		alignSelf: 'center',
		borderRadius: 100,
	},
	textButton: {
		color: Colors.light.tint,
		alignSelf: 'center',
		fontSize: 15,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	label: {
		color: Colors.dark.tint,
		fontSize: 18,
	},
	input: {
		width: '100%',
		color: Colors.dark.tint,
		borderWidth: 1,
		borderColor: Colors.light.tint,
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		marginBottom: 20,
	},
});

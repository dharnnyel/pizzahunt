import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const MenuLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					title: 'Menu',
					headerRight: () => (
						<Link
							href='/create'
							asChild
						>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='plus'
										size={20}
										color={Colors.light.tint}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>

			<Stack.Screen
				name='[id]'
				options={{
					title: 'Menu',
					headerRight: () => (
						<Link
							href='/edit'
							asChild
						>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name='pencil'
										size={20}
										color={Colors.light.tint}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
		</Stack>
	);
};

export default MenuLayout;

import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const MenuLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerRight: () => (
					<Link
						href='/cart'
						asChild
					>
						<Pressable>
							{({ pressed }) => (
								<FontAwesome
									name='shopping-cart'
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
		>
			<Stack.Screen
				name='index'
				options={{ title: 'Menu' }}
			/>
		</Stack>
	);
};

export default MenuLayout;

import {
	View,
	Text,
	Platform,
	FlatList,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';

const Cart = () => {
	const { items, totalAmount, checkOut } = useCart();

	return (
		<View style={{ padding: 15 }}>
			<FlatList
				data={items}
				renderItem={({ item }) => (
					<CartListItem cartItem={item} />
				)}
				contentContainerStyle={{ gap: 10 }}
			/>

			{items.length > 0 ? (
				<>
					<Text
						style={{
							color: Colors.dark.tint,
							marginTop: 20,
							fontSize: 20,
							fontWeight: '500',
						}}
					>
						Total: ${totalAmount}
					</Text>
					<Button text='Checkout' onPress={checkOut} />
				</>
			) : (
				<Text
					style={{
						color: Colors.dark.tint,
						alignSelf: 'center',
						marginTop: 20,
						fontSize: 20,
						fontWeight: '700',
					}}
				>
					No items in cart
				</Text>
			)}

			<StatusBar
				style={Platform.OS === 'ios' ? 'light' : 'auto'}
			/>
		</View>
	);
};

export default Cart;

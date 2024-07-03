import {
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@assets/data/orders';
import products from '@assets/data/products';
import OrderListItem from '@/components/OrderListItem';
import OrderItemListItem from '@/components/OrderItemListItem';
import StatusSelector from '@/components/StatusSelector';

const OrderDetails = () => {
	const { id } = useLocalSearchParams();

	const order = orders.find(
		order => order.id.toString() === id
	);

	if (!order) {
		return <Text>Order not found</Text>;
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{ title: `Order #${order.id.toString()}` }}
			/>

			<OrderListItem order={order} />

			<FlatList
				data={order.order_items}
				renderItem={({ item }) => (
					<OrderItemListItem item={item} />
				)}
				contentContainerStyle={{ gap: 10 }}
				ListFooterComponent={() => (
					<StatusSelector order={order} />
				)}
			/>
		</View>
	);
};

export default OrderDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		gap: 10,
	},
});

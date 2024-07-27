import {
	ActivityIndicator,
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
import {
	useOrderDetails,
	useUpdateOrder,
} from '@/api/orders';

const OrderDetails = () => {
	const searchParam = useLocalSearchParams();

	const stringId = searchParam.id ?? '';
	const id = parseFloat(
		typeof stringId === 'string' && stringId !== ''
			? stringId
			: stringId[0]
	);

	const {
		data: order,
		error,
		isLoading,
	} = useOrderDetails(id);

	const { mutate: updateOrder } = useUpdateOrder();

	const updateStatus = (status: any) => {
		updateOrder({
			id: id,
			updatedFields: { status },
		});
	};

	if (!order) {
		return <Text>Order not found</Text>;
	}

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch</Text>;
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
					<StatusSelector
						order={order}
						updateStatus={updateStatus}
					/>
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

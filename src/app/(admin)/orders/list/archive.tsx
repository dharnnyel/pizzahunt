import {
	ActivityIndicator,
	FlatList,
	Text,
} from 'react-native';
import React from 'react';
import orders from '@assets/data/orders';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';

const OrderScreen = () => {
	const {
		data: orders,
		error,
		isLoading,
	} = useAdminOrderList({ archived: true });

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch orders</Text>;
	}

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => (
				<OrderListItem order={item} />
			)}
			contentContainerStyle={{ padding: 10, gap: 10 }}
		/>
	);
};

export default OrderScreen;

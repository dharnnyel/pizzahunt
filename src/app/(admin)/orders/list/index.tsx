import {
	ActivityIndicator,
	FlatList,
	Text,
} from 'react-native';
import React, { useEffect } from 'react';
import OrderListItem from '@/components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateOrderSubscription } from '@/api/orders/subscriptions';

const OrderScreen = () => {
	const {
		data: orders,
		error,
		isLoading,
	} = useAdminOrderList({ archived: false });

	useCreateOrderSubscription();

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

import {
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import { Link, useSegments } from 'expo-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type OrderListItemProps = {
	order: Order;
};

const OrderListItem: React.FC<OrderListItemProps> = ({
	order,
}) => {
	const segments = useSegments();

	return (
		<Link
			// href={`../orders/${order.id}`}
			href={`${segments[0]}/orders/${order.id}`}
			asChild
		>
			<Pressable style={styles.container}>
				<View>
					<Text style={styles.order_id}>
						Order #{order.id}
					</Text>
					<Text style={styles.time}>
						{dayjs(order.created_at).fromNow()}
					</Text>
				</View>

				<Text style={styles.status}>{order.status}</Text>
			</Pressable>
		</Link>
	);
};

export default OrderListItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderRadius: 15,
		padding: 20,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	order_id: {
		fontSize: 15,
		fontWeight: 'bold',
		marginBottom: 7,
	},
	time: {
		fontWeight: 'thin',
		color: 'gray',
	},
	status: {
		fontSize: 15,
		fontWeight: '800',
	},
});

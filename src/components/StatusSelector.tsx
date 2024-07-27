import {
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { Tables } from 'types/database';

type StatusSelectorProps = {
	order: Tables<'orders'>;
	updateStatus: (status: any) => void;
};

const OrderStatusList: OrderStatus[] = [
	'New',
	'Cooking',
	'Delivering',
	'Delivered',
];

const StatusSelector: React.FC<StatusSelectorProps> = ({
	order,
	updateStatus,
}) => {
	return (
		<>
			<Text
				style={{
					fontWeight: 'bold',
					color: Colors.dark.tint,
				}}
			>
				Status
			</Text>
			<View style={{ flexDirection: 'row', gap: 5 }}>
				{OrderStatusList.map(status => (
					<Pressable
						key={status}
						// TODO: ADD FUNCTIONALITY FOR CHANGING THE STATUS OF AN ORDER
						onPress={() => updateStatus(status)}
						style={{
							borderColor: Colors.light.tint,
							borderWidth: 1,
							padding: 10,
							borderRadius: 5,
							marginVertical: 10,
							marginRight: 4,
							backgroundColor:
								order.status === status
									? Colors.light.tint
									: 'transparent',
						}}
					>
						<Text
							style={{
								color:
									order.status === status
										? 'white'
										: Colors.light.tint,
							}}
						>
							{status}
						</Text>
					</Pressable>
				))}
			</View>
		</>
	);
};

export default StatusSelector;

const styles = StyleSheet.create({});

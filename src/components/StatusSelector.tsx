import {
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

type StatusSelectorProps = {
	order: Order;
};

const OrderStatusList: OrderStatus[] = [
	'New',
	'Cooking',
	'Delivering',
	'Delivered',
];

const StatusSelector: React.FC<StatusSelectorProps> = ({
	order,
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
						onPress={() => console.warn('Update status')}
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

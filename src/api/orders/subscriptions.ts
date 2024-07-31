import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const useCreateOrderSubscription = () => {
	const queryClient = useQueryClient();
	useEffect(() => {
		const ordersSubscription = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'orders',
				},
				payload => {
					console.log('Change received!', payload);
					queryClient.invalidateQueries({
						queryKey: ['orders'],
					});
				}
			)
			.subscribe();

		return () => {
			ordersSubscription.unsubscribe();
		};
	}, []);
};

const useUpdateOrderSubscription = (id: number) => {
	const queryClient = useQueryClient();
	useEffect(() => {
		const orderSubscription = supabase
			.channel('custom-update-channel')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'orders',
					filter: `id=eq.${id}`,
				},
				payload => {
					console.log('Change received!', payload);
					queryClient.invalidateQueries({
						queryKey: ['orders', id],
					});
				}
			)
			.subscribe();

		return () => {
			orderSubscription.unsubscribe();
		};
	}, []);
};

export {
	useCreateOrderSubscription,
	useUpdateOrderSubscription,
};

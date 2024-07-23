import { InsertTables } from '@/database';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import {
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

const useAdminOrderList = ({ archived = false }) => {
	const statuses = archived
		? ['Delivered']
		: ['New', 'Cooking', 'Delivering'];

	return useQuery({
		queryKey: ['orders', { archived }],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.in('status', statuses);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});
};

const useUserOrderList = () => {
	const { session } = useAuth();
	const id = session?.user.id;

	return useQuery({
		queryKey: ['orders', { userId: id }],
		queryFn: async () => {
			if (!id) return null;
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.eq('user_id', id);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});
};

const useOrderDetails = (id: number) => {
	return useQuery({
		queryKey: ['orders', id],
		queryFn: async () => {
			if (!id) return null;

			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.eq('id', id)
				.single();

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});
};

const useCreateOrder = () => {
	const queryClient = useQueryClient();
	const { session } = useAuth();
	const userId = session?.user.id;

	return useMutation({
		async mutationFn(data: InsertTables<'orders'>) {
			const { error, data: newProduct } = await supabase
				.from('orders')
				.insert({ ...data, user_id: userId })
				.select()
				.single();

			if (error) {
				throw new Error(error.message);
			}

			return newProduct;
		},
		async onSuccess(data) {
			await queryClient.invalidateQueries({
				queryKey: ['orders'],
			});
		},
	});
};

// const useCreateOrder = () => {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		async mutationFn(orderData: any) {
// 			const {data, error} = await supabase
// 				.from('orders')
// 				.insert({
// 					name: data.name,
// 					image: data.image,
// 					price: data.price,
// 				})
// 				.single();
// 		},
// 	});
// };

export {
	useAdminOrderList,
	useUserOrderList,
	useOrderDetails,
	useCreateOrder,
};

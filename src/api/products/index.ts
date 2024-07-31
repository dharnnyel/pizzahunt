import { supabase } from '@/lib/supabase';
import {
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

// FUNCTION TO FETCH ALL PRODUCTS
const useProductList = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('products')
				.select('*');

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});
};

// FUNCTION TO FETCH DETAILS OF A PARTICULAR PRODUCT
const useProduct = (id: number) => {
	return useQuery({
		queryKey: ['products', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('products')
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

// FUNCTION TO CREATE A PRODUCT. SPECIFIC TO THE ADMIN OF THE APPLICATION
const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(productData: any) {
			const { error, data: newProduct } = await supabase
				.from('products')
				.insert({
					name: productData.name,
					image: productData.image,
					price: productData.price,
				})
				.single();

			if (error) {
				throw new Error(error.message);
			}

			return newProduct;
		},
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: ['products'],
			});
		},
	});
};

//
const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(productData: any) {
			const { data, error } = await supabase
				.from('products')
				.update({
					name: productData.name,
					image: productData.image,
					price: productData.price,
				})
				.eq('id', productData.id)
				.single();

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({
				queryKey: ['products'],
			});
			await queryClient.invalidateQueries({
				queryKey: ['products', { id }],
			});
		},
	});
};

const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(id: number) {
			const { data, error } = await supabase
				.from('products')
				.delete()
				.eq('id', id);
		},
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: ['products'],
			});
		},
	});
};

export {
	useProductList,
	useProduct,
	useCreateProduct,
	useUpdateProduct,
	useDeleteProduct,
};

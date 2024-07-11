import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import {
	router,
	Stack,
	useLocalSearchParams,
} from 'expo-router';
import {
	useCreateProduct,
	useDeleteProduct,
	useProduct,
	useUpdateProduct,
} from '@/api/products';

const CreateProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState('');
	const [image, setImage] = useState<string | null>(null);

	const searchParam = useLocalSearchParams();

	const stringId = searchParam.id ?? '';
	const id = parseFloat(
		typeof stringId === 'string' && stringId !== ''
			? stringId
			: stringId[0]
	);

	const isUpdating = !!id;

	const { mutate: insertProduct } = useCreateProduct();
	const { mutate: updateProduct } = useUpdateProduct();
	const { data: updatingProduct } = useProduct(id);
	const { mutate: deleteProduct } = useDeleteProduct();

	console.log(updatingProduct);

	useEffect(() => {
		if (updatingProduct) {
			setName(updatingProduct.name);
			setPrice(updatingProduct.price.toString());
			setImage(updatingProduct.image);
		}
	}, [updatingProduct]);

	const resetFields = () => {
		setName('');
		setPrice('');
	};

	const validateInput = () => {
		if (!name) {
			setErrors('Name is required');
			return false;
		}
		if (!price) {
			setErrors('Price is required');
			return false;
		}
		if (isNaN(parseFloat(price))) {
			setErrors('Price is not a number');
			return false;
		}

		return true;
	};

	const onCreate = () => {
		if (!validateInput()) {
			return;
		}

		insertProduct(
			{
				name,
				price: parseFloat(price),
				image,
			},
			{
				onSuccess: () => {
					resetFields();
					router.back();
				},
			}
		);
	};

	const onUpdate = () => {
		if (!validateInput()) {
			return;
		}

		updateProduct(
			{
				id,
				name,
				price: parseFloat(price),
				image,
			},
			{
				onSuccess: () => {
					resetFields();
					router.back();
				},
			}
		);
	};

	const onDelete = () => {
		deleteProduct(
			{ id },
			{
				onSuccess: () => {
					resetFields();
					router.replace('/(admin)');
				},
			}
		);
	};

	const confirmDelete = () => {
		Alert.alert(
			'Confirm',
			'Are you sure you want to delete this product',
			[
				{ text: 'Cancel' },
				{
					text: 'Delete',
					style: 'destructive',
					onPress: onDelete,
				},
			]
		);
	};

	const onSubmit = () => {
		if (isUpdating) {
			//TODO: update
			onUpdate();
		} else {
			//TODO: create
			onCreate();
		}
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: isUpdating
						? 'Update Product'
						: 'Create Product',
				}}
			/>

			<Image
				source={{ uri: image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text
				style={styles.textButton}
				onPress={pickImage}
			>
				Select Image
			</Text>

			<View>
				<Text style={styles.label}>Name</Text>
				<TextInput
					placeholder='Pizza..'
					placeholderTextColor={'gray'}
					style={styles.input}
					value={name}
					onChangeText={setName}
					onFocus={() => setErrors('')}
				/>
			</View>
			<View>
				<Text style={styles.label}>Price ($)</Text>
				<TextInput
					placeholder='9.99'
					placeholderTextColor={'gray'}
					style={styles.input}
					keyboardType='numeric'
					value={price}
					onChangeText={setPrice}
					onFocus={() => setErrors('')}
				/>
			</View>

			<Text style={{ color: 'red' }}>{errors}</Text>

			<Button
				text={isUpdating ? 'Update' : 'Create'}
				onPress={onSubmit}
			/>

			{isUpdating && (
				<Text
					onPress={confirmDelete}
					style={styles.textButton}
				>
					Delete
				</Text>
			)}
		</View>
	);
};

export default CreateProduct;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
	},
	image: {
		width: '50%',
		aspectRatio: 1,
		alignSelf: 'center',
		borderRadius: 100,
	},
	textButton: {
		color: Colors.light.tint,
		alignSelf: 'center',
		fontSize: 15,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	label: {
		color: Colors.dark.tint,
		fontSize: 18,
	},
	input: {
		width: '100%',
		color: Colors.dark.tint,
		borderWidth: 1,
		borderColor: Colors.light.tint,
		borderRadius: 10,
		padding: 10,
		marginTop: 10,
		marginBottom: 20,
	},
});

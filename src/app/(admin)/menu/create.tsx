import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { Stack } from 'expo-router';

const CreateProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState('');
	const [image, setImage] = useState<string | null>(null);

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

		// TODO: code to store data in the database
		console.warn('Creating Product', { name, price });

		resetFields();
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
			<Stack.Screen options={{title: 'Create'}} />

			<Image
				source={{ uri: image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text
				style={styles.select}
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
				text='Create'
				onPress={onCreate}
			/>
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
	select: {
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

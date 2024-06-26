import { View } from '@components/Themed';
import products from '@assets/data/products';
import ProductListItem from '@components/ProducListItem';
import { FlatList } from 'react-native';

const MenuScreen = () => {
	return (
		<FlatList
			data={products}
			renderItem={({ item }) => (
				<ProductListItem product={item} />
			)}
			numColumns={2}
			contentContainerStyle={{ gap: 10, padding: 10 }}
			columnWrapperStyle={{ gap: 10 }}
		/>
	);
};

export default MenuScreen;

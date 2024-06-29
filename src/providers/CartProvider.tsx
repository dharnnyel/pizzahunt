import { randomUUID } from 'expo-crypto';
import {
	PropsWithChildren,
	createContext,
	useContext,
	useState,
} from 'react';

type CartType = {
	items: CartItem[];
	addItem: (
		product: Product,
		size: CartItem['size']
	) => void;
	updateQuantity: (itemId: string, amount: -1 | 1) => void;
	totalAmount: number;
};

export const CartContext = createContext<CartType>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	totalAmount: 0,
});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = (
		product: Product,
		size: CartItem['size']
	) => {
		// TODO: Increment quantity if item is already in cart array
		const existingItem = items.find(
			item => item.product === product && item.size === size
		);

		if (existingItem) {
			updateQuantity(existingItem.id, 1);
			return;
		}

		const newCartItem: CartItem = {
			id: randomUUID(),
			product,
			size,
			product_id: product.id,
			quantity: 1,
		};

		setItems([newCartItem, ...items]);
	};

	// TODO: Create function to update quantity of products
	const updateQuantity = (
		itemId: string,
		amount: -1 | 1
	) => {
		const updatedItem = items
			.map(item =>
				item.id !== itemId
					? item
					: { ...item, quantity: item.quantity + amount }
			)
			.filter(item => item.quantity > 0);

		setItems(updatedItem);
	};

	const totalAmount = parseFloat(
		items
			.reduce(
				(total, item) =>
					total + item.quantity * item.product.price,
				0
			)
			.toFixed(2)
	);

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				updateQuantity,
				totalAmount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

declare global {
	type PizzaSize = 'S' | 'M' | 'L' | 'XL';

	type CartItem = {
		id: string;
		product: Ta;
		product_id: number;
		size: PizzaSize;
		quantity: number;
	};

	type OrderStatus =
		| 'New'
		| 'Cooking'
		| 'Delivering'
		| 'Delivered';

	type Order = {
		id: number;
		created_at: string;
		total: number;
		user_id: string;
		status: OrderStatus;

		order_items?: OrderItem[];
	};

	type OrderItem = {
		id: number;
		product_id: number;
		products: Product;
		order_id: number;
		size: PizzaSize;
		quantity: number;
	};

	type Profile = {
		id: string;
		group: string;
	};
}

export {};

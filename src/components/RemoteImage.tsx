import { View, Text, Image } from 'react-native';
import React, {
	ComponentProps,
	useEffect,
	useState,
} from 'react';
import { supabase } from '@/lib/supabase';

type RemoteImageProps = {
	path?: string | null;
	fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage: React.FC<RemoteImageProps> = ({
	fallback,
	path,
	...imageProps
}) => {
	const [image, setImage] = useState('');

	useEffect(() => {
		if (!path) return;

		(async () => {
			setImage('');
			const { data, error } = await supabase.storage
				.from('product-images')
				.download(path);
			
			console.log(data)
			if (error) {
				console.log(`Error is: `, error);
			}

			if (data) {
				const fileReader = new FileReader();
				fileReader.readAsDataURL(data);
				fileReader.onload = () => {
					setImage(fileReader.result as string);
				};
			}
		})();
	}, [path]);

	if (!image) {
	}

	return (
		<Image
			source={{ uri: image || fallback }}
			{...imageProps}
		/>
	);
};

export default RemoteImage;

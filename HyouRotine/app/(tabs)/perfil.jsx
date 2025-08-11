import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
	return (
		<View style={styles.container}>

			<Text style={styles.nome}>Pagina de Perfil</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
	nome: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 8,
	},
});

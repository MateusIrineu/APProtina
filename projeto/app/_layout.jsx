import {View, StyleSheet} from "react-native"
import Title from "../components/Title";
import Form from "../components/Form"

export default function App() {
  return (
    <View style = {styles.container}>
      <Title />
      <Form />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: '#e0e5e5',
    paddingTop: 80,
  }
});

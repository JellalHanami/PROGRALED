import { StyleSheet, Text, View } from "react-native";

export default function Configuracion() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Configuración</Text>
      <Text>Aquí podrás cambiar opciones de red o cuenta.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

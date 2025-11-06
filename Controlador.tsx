import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const ESP32_URL = "http://192.168.43.226"; // IP del ESP32
const API_URL = "http://192.168.20.104:8000"; // IP del backend

export default function Controlador() {
  const [led1, setLed1] = useState(false);
  const [led2, setLed2] = useState(false);

  const toggleLed = async (led: number, newState: boolean) => {
    try {
      await fetch(`${ESP32_URL}/${newState ? "on" : "off"}${led}`);
      await fetch(`${API_URL}/api/accion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: 1, led, estado: newState ? 1 : 0 }),
      });

      if (led === 1) setLed1(newState);
      if (led === 2) setLed2(newState);
    } catch (e) {
      console.log("⚠️ Error al conectar con ESP32 o la API");
    }
  };

  const LuzCard = ({ nombre, icono, activo, onToggle }: any) => (
    <View style={[styles.card, activo && styles.cardOn]}>
      <Ionicons
        name={icono}
        size={28}
        color={activo ? "#FFF" : "#2E8B57"}
        style={{ marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.cardText, activo && { color: "#FFF" }]}>{nombre}</Text>
        <Text style={[styles.stateText, activo && { color: "#DFFFD6" }]}>
          {activo ? "Encendida" : "Apagada"}
        </Text>
      </View>
      <Switch
        value={activo}
        onValueChange={onToggle}
        thumbColor={activo ? "#FFF" : "#DDD"}
        trackColor={{ false: "#CCC", true: "#2E8B57" }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Luces 💡</Text>

      <LuzCard
        nombre="Luz Habitación"
        icono="bed-outline"
        activo={led1}
        onToggle={(val: boolean) => toggleLed(1, val)}
      />

      <LuzCard
        nombre="Luz Garaje"
        icono="car-outline"
        activo={led2}
        onToggle={(val: boolean) => toggleLed(2, val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardOn: {
    backgroundColor: "#2E8B57",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E8B57",
  },
  stateText: {
    fontSize: 13,
    color: "#666",
  },
});

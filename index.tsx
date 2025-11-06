import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [status, setStatus] = useState("checking");
  const ESP32_IP = "http://192.168.43.226"; // la IP real de tu ESP32

  const checkESP32Connection = async () => {
    try {
      const response = await fetch(`${ESP32_IP}/`);
      const text = await response.text();
      if (text.includes("ESP32")) {
        setStatus("connected");
      } else {
        setStatus("disconnected");
      }
    } catch (error) {
      setStatus("disconnected");
    }
  };

  useEffect(() => {
    checkESP32Connection();
    const interval = setInterval(checkESP32Connection, 5000); // cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel Principal 🏡</Text> 
      <Text style={styles.subtitle}>Monitorea tu hogar con ECO SMART 32</Text>

      {/* 🔹 Estado de conexión */}
      <View style={styles.card}>
        <Ionicons name="wifi" size={26} color="#2E8B57" />
        <Text style={styles.cardTitle}>Estado de conexión</Text>

        {status === "checking" && (
          <View style={styles.row}>
            <ActivityIndicator size="small" color="#2E8B57" />
            <Text style={styles.cardText}>Verificando...</Text>
          </View>
        )}

        {status === "connected" && (
          <Text style={[styles.cardText, { color: "#2E8B57" }]}>
            ✅ ESP32 conectado correctamente
          </Text>
        )}

        {status === "disconnected" && (
          <Text style={[styles.cardText, { color: "#C62828" }]}>
            ❌ No se pudo conectar con el ESP32
          </Text>
        )}
      </View>

      {/* 🔹 Control rápido */}
      <View style={styles.card}>
        <Ionicons name="flashlight-outline" size={26} color="#2E8B57" />
        <Text style={styles.cardTitle}>Luces principales</Text>
        <Text style={styles.cardText}>Accede al control manual</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/Controlador")}
        >
          <Text style={styles.buttonText}>Ir al Controlador</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F4F4", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#2E8B57", textAlign: "center", marginTop: 20 },
  subtitle: { textAlign: "center", color: "gray", fontSize: 15, marginBottom: 20 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 10 },
  cardText: { fontSize: 15, color: "#555", marginTop: 8 },
  button: { backgroundColor: "#2E8B57", paddingVertical: 10, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
});

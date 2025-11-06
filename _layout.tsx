import { Ionicons } from "@expo/vector-icons";
import { Slot, useRouter } from "expo-router";
import React, { useState } from "react";

import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";


import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from "react-native";


const LoginScreen: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handledCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Cuenta creada para:', user.email);
      })
      .catch((error) => {
        console.error('Error al crear la cuenta:', error.message);
        alert('Error al crear la cuenta: ' + error.message);
      });
  };

  const handleesSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Conectado como:', user.email);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
        alert('Error al iniciar sesión: ' + error.message);
      });
  };

  const handleLogin = () => {
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text: string) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const { width } = Dimensions.get("window");

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-width * 0.65))[0];
  const router = useRouter();

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -width * 0.65 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ECO SMART 32 💡</Text>
      </View>

      {/* Contenido dinámico de cada pantalla */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Menú lateral */}
      <Animated.View
        style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={styles.menuTitle}>Menú principal</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            toggleMenu();
            router.replace("/");
          }}
        >
          <Ionicons name="home-outline" size={22} color="#2E8B57" />
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            toggleMenu();
            router.replace("/(tabs)/Controlador");
          }}
        >
          <Ionicons name="bulb-outline" size={22} color="#2E8B57" />
          <Text style={styles.menuText}>Controlar luces</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            toggleMenu();
            router.replace("/(tabs)/Configuracion");
          }}
        >
          <Ionicons name="settings-outline" size={22} color="#2E8B57" />
          <Text style={styles.menuText}>Ajustes</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Fondo opaco para cerrar menú */}
      {menuOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#2E8B57",
    elevation: 5,
  },
  menuButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  sideMenu: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.65,
    backgroundColor: "#FFFFFF",
    paddingTop: 90,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
    elevation: 10,
    zIndex: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2E8B57",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});



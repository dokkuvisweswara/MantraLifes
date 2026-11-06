import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>🙏</Text>
      <Text style={styles.title}>Welcome to MantraLifes</Text>
      <Text style={styles.subtitle}>
        Sign in to sync your favorites and chanting progress.
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Login / Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    fontSize: 65,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#292015",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    color: "#8B8175",
    marginTop: 12,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#D97706",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

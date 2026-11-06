import { StyleSheet, Text, View } from "react-native";

export default function WatchlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ My Watchlist</Text>
      <Text style={styles.subtitle}>
        Your saved mantras and songs will appear here.
      </Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#292015",
  },
  subtitle: {
    marginTop: 12,
    color: "#8B8175",
    textAlign: "center",
  },
});

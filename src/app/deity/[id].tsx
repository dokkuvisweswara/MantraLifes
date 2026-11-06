import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DEITIES } from "../../constants/deities";
import { MANTRAS } from "../../data/mantras";

export default function DeityScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const deity = DEITIES.find((item) => item.id === id);

  const mantras = MANTRAS.filter((item) => item.deityId === id);

  if (!deity) {
    return (
      <View style={styles.container}>
        <Text>Deity not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <View style={styles.hero}>
        <Text style={styles.symbol}>{deity.symbol}</Text>
        <Text style={styles.title}>{deity.name}</Text>
        <Text style={styles.subtitle}>{deity.subtitle}</Text>
      </View>

      <Text style={styles.sectionTitle}>{deity.name} Mantras</Text>

      {mantras.length === 0 ? (
        <Text style={styles.empty}>Mantras coming soon.</Text>
      ) : (
        mantras.map((mantra) => (
          <Pressable
            key={mantra.id}
            style={styles.card}
            onPress={() => router.push(`/mantra/${mantra.id}`)}
          >
            <View style={styles.icon}>
              <Text style={{ fontSize: 25 }}>🕉️</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.mantraTitle}>{mantra.title}</Text>
              <Text style={styles.description}>{mantra.description}</Text>
              <Text style={styles.duration}>{mantra.duration}</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    padding: 20,
  },
  back: {
    fontSize: 16,
    color: "#D97706",
    marginTop: 35,
    marginBottom: 20,
  },
  hero: {
    alignItems: "center",
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#E5EDF9",
  },
  symbol: {
    fontSize: 75,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 12,
    color: "#292015",
  },
  subtitle: {
    color: "#76604C",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 15,
    color: "#292015",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
  },
  icon: {
    width: 55,
    height: 55,
    backgroundColor: "#FFF1D8",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  mantraTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#292015",
  },
  description: {
    color: "#8B8175",
    fontSize: 12,
    marginTop: 5,
  },
  duration: {
    color: "#D97706",
    fontSize: 11,
    marginTop: 5,
  },
  arrow: {
    fontSize: 26,
    color: "#D97706",
  },
  empty: {
    color: "#8B8175",
  },
});

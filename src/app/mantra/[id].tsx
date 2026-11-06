import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import ChantCounter from "../../components/common/ChantCounter";
import { MANTRAS } from "../../data/mantras";

export default function MantraDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const mantra = MANTRAS.find((item) => item.id === id);

  if (!mantra) {
    return (
      <View style={styles.container}>
        <Text>Mantra not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <View style={styles.hero}>
        <Text style={styles.om}>ॐ</Text>
        <Text style={styles.title}>{mantra.title}</Text>
        <Text style={styles.description}>{mantra.description}</Text>
      </View>

      <View style={styles.mantraBox}>
        <Text style={styles.label}>Sacred Mantra</Text>

        <Text style={styles.sanskrit}>{mantra.text}</Text>

        <Text style={styles.duration}>Duration: {mantra.duration}</Text>
      </View>

      <ChantCounter mantraId={mantra.id} target={108} />

      <View style={styles.info}>
        <Text style={styles.infoTitle}>About this Mantra</Text>

        <Text style={styles.infoText}>
          Chant this mantra with devotion and concentration. Traditionally, 108
          repetitions are used as a complete chanting cycle.
        </Text>
      </View>

      <View style={{ height: 35 }} />
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
    backgroundColor: "#6B3514",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
  },
  om: {
    fontSize: 65,
    color: "#FFD58C",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
  description: {
    color: "#F5D9B4",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 21,
  },
  mantraBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    marginTop: 22,
  },
  label: {
    color: "#8B8175",
    fontSize: 13,
    fontWeight: "600",
  },
  sanskrit: {
    fontSize: 25,
    color: "#9B520C",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 18,
    lineHeight: 42,
  },
  duration: {
    color: "#8B8175",
    fontSize: 12,
  },
  info: {
    backgroundColor: "#F8EBD8",
    borderRadius: 16,
    padding: 18,
    marginTop: 22,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#6B3514",
  },
  infoText: {
    color: "#76604C",
    lineHeight: 22,
    marginTop: 8,
  },
});

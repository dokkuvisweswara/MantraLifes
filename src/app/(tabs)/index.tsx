import { useRouter } from "expo-router";
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { DEITIES } from "../../constants/deities";

const CARD_WIDTH = (Dimensions.get("window").width - 52) / 2;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.title}>MantraLifes 🙏</Text>
          <Text style={styles.subtitle}>
            Find peace through divine chanting
          </Text>
        </View>

        <Pressable
          style={styles.profile}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Text style={styles.profileText}>👤</Text>
        </Pressable>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerOm}>ॐ</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Start your spiritual journey</Text>
          <Text style={styles.bannerSubtitle}>
            Chant, listen and find inner peace.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Explore Divine Mantras</Text>

      <View style={styles.grid}>
        {DEITIES.map((deity) => (
          <Pressable
            key={deity.id}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: deity.color,
                width: CARD_WIDTH,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/deity/[id]",
                params: { id: deity.id },
              })
            }
          >
            <Text style={styles.symbol}>{deity.symbol}</Text>
            <Text style={styles.deityName}>{deity.name}</Text>
            <Text style={styles.deitySubtitle}>{deity.subtitle}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with devotion ❤️</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 22,
    paddingTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: COLORS.muted,
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 4,
  },
  subtitle: {
    color: COLORS.muted,
    marginTop: 6,
  },
  profile: {
    backgroundColor: "#F3E4CE",
    padding: 12,
    borderRadius: 30,
  },
  profileText: {
    fontSize: 22,
  },
  banner: {
    marginHorizontal: 20,
    marginBottom: 28,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#6B3514",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bannerOm: {
    fontSize: 48,
    color: "#FFD58C",
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bannerSubtitle: {
    color: "#F5D9B4",
    fontSize: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    minHeight: 165,
    borderRadius: 18,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    fontSize: 48,
    marginBottom: 10,
  },
  deityName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#352719",
  },
  deitySubtitle: {
    fontSize: 11,
    color: "#76604C",
    marginTop: 5,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    padding: 28,
  },
  footerText: {
    color: COLORS.muted,
  },
});

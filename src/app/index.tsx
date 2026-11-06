import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StatusBar, StyleSheet, Text } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.85,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    );

    Animated.timing(opacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    animation.start();

    const timer = setTimeout(() => {
      animation.stop();
      router.replace("/(tabs)");
    }, 3000);

    return () => {
      clearTimeout(timer);
      animation.stop();
    };
  }, []);

  return (
    <LinearGradient
      colors={["#241309", "#60320B", "#1C1008"]}
      style={styles.container}
    >
      <StatusBar hidden />

      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={styles.om}>ॐ</Text>

        <Text style={styles.title}>MantraLifes</Text>

        <Text style={styles.subtitle}>Find peace through divine chanting</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  om: {
    fontSize: 110,
    color: "#FFC66D",
    textShadowColor: "#FFAA33",
    textShadowRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
  },
  subtitle: {
    color: "#F5D9B4",
    fontSize: 14,
    marginTop: 10,
  },
});

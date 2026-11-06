import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ChantCounterProps {
  mantraId: string;
  target?: number;
}

export default function ChantCounter({
  mantraId,
  target = 108,
}: ChantCounterProps) {
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const storageKey = `chant-progress-${mantraId}`;

  // Load saved progress
  useEffect(() => {
    let active = true;

    const loadProgress = async () => {
      try {
        const savedCount = await AsyncStorage.getItem(storageKey);

        if (active && savedCount !== null) {
          const parsed = Number(savedCount);

          if (Number.isFinite(parsed)) {
            setCount(Math.max(0, Math.min(target, parsed)));
          }
        }
      } catch (error) {
        console.log("Unable to load chanting progress", error);
      } finally {
        if (active) setLoaded(true);
      }
    };

    loadProgress();

    return () => {
      active = false;
    };
  }, [storageKey, target]);

  // Save progress whenever count changes
  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(storageKey, String(count)).catch((error) =>
      console.log("Unable to save progress", error),
    );
  }, [count, loaded, storageKey]);

  const increment = () => {
    setCount((previous) => Math.min(previous + 1, target));
  };

  const reset = () => {
    setCount(0);
  };

  const progress = (count / target) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chanting Counter</Text>

      <Text style={styles.subtitle}>Complete your 108 repetitions</Text>

      <View style={styles.counterCircle}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.target}>/ {target}</Text>
      </View>

      <Text style={styles.progressText}>{Math.round(progress)}% Completed</Text>

      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.countButton,
          pressed && styles.pressed,
          count === target && styles.completed,
        ]}
        onPress={increment}
        disabled={!loaded || count >= target}
      >
        <Text style={styles.countButtonText}>
          {count >= target ? "🙏 Completed" : "+ Count"}
        </Text>
      </Pressable>

      <Pressable onPress={reset} style={styles.resetButton}>
        <Text style={styles.resetText}>↻ Reset Counter</Text>
      </Pressable>

      {!loaded && <Text style={styles.loading}>Loading progress...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 24,
    elevation: 2,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#352719",
  },
  subtitle: {
    color: "#8B8175",
    marginTop: 8,
  },
  counterCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 7,
    borderColor: "#F3D6A8",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    backgroundColor: "#FFF9F0",
  },
  count: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#D97706",
  },
  target: {
    color: "#8B8175",
    fontSize: 14,
  },
  progressText: {
    fontWeight: "600",
    color: "#6B3514",
  },
  progressBackground: {
    width: "100%",
    height: 9,
    backgroundColor: "#F0E5D5",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#D97706",
    borderRadius: 10,
  },
  countButton: {
    backgroundColor: "#D97706",
    width: "100%",
    padding: 17,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 25,
  },
  countButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  completed: {
    backgroundColor: "#56845C",
  },
  pressed: {
    opacity: 0.7,
  },
  resetButton: {
    padding: 14,
    marginTop: 5,
  },
  resetText: {
    color: "#8B8175",
    fontWeight: "600",
  },
  loading: {
    color: "#8B8175",
    marginTop: 8,
  },
});

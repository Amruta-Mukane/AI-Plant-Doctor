import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen() {

  const handlePress = (item) => {
    console.log(item + " clicked");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.logo}>🌿 AI Plant Disease Predictor</Text>

      <Text style={styles.subtitle}>
        Detect diseases, get solutions & keep plants healthy
      </Text>

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <Image
          source={require("../../assets/images/mascot.png")}
          style={styles.mascot}
          resizeMode="contain"
        />

        <Text style={styles.heroTitle}>
          Healthy Plant 🌿
        </Text>

        <Text style={styles.heroSubtitle}>
          Happy You 💚
        </Text>

        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => handlePress("Scan Plant")}
        >
          <Text style={styles.scanText}>
            📷 Scan Plant
          </Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Explore Plants</Text>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handlePress("Vegetables")}
        >
          <Text style={styles.emoji}>🍅</Text>
          <Text>Vegetables</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handlePress("Fruits")}
        >
          <Text style={styles.emoji}>🍎</Text>
          <Text>Fruits</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handlePress("Leafy")}
        >
          <Text style={styles.emoji}>🌿</Text>
          <Text>Leafy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => handlePress("Flowers")}
        >
          <Text style={styles.emoji}>🌸</Text>
          <Text>Flowers</Text>
        </TouchableOpacity>
      </View>

      {/* Features */}
      <Text style={styles.sectionTitle}>Features</Text>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => handlePress("AI Disease Detection")}
      >
        <Text>🤖 AI Disease Detection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => handlePress("Instant Results")}
      >
        <Text>⚡ Instant Results</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => handlePress("Treatment Suggestions")}
      >
        <Text>💊 Treatment Suggestions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.featureCard}
        onPress={() => handlePress("Scan History")}
      >
        <Text>📜 Scan History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FFF5",
    padding: 16,
  },

  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1B5E20",
    marginTop: 20,
  },
    bannerImage: {
  width: "100%",
  height: 160,
  borderRadius: 18,
},

  subtitle: {
    color: "#666",
    marginTop: 8,
    fontSize: 13,
    marginBottom: 20,
  },

  heroCard: {
    backgroundColor: "#2E7D32",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
  },

  mascot: {
    width: 180,
    height: 180,
  },

  heroTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  heroSubtitle: {
    color: "white",
    fontSize: 18,
    marginTop: 5,
  },

  scanBtn: {
    backgroundColor: "white",
    marginTop: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
  },

  scanText: {
    color: "#2E7D32",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  categoryCard: {
    width: "48%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 12,
  },

  emoji: {
    fontSize: 35,
    marginBottom: 8,
  },

  featureCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },
});
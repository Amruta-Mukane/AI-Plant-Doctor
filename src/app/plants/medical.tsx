import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const plants = [
  { name: "🌿 Tulsi", benefit: "Boosts immunity & supports respiratory health" },
  { name: "🌱 Aloe Vera", benefit: "Helps heal skin and improves digestion" },
  { name: "🌳 Neem", benefit: "Natural antibacterial & pesticide" },
  { name: "🌾 Ashwagandha", benefit: "Reduces stress and improves vitality" },
  { name: "🍃 Mint", benefit: "Supports digestion and freshens breath" },
  { name: "🌿 Lemongrass", benefit: "Used in herbal tea and relaxation" },
];

export default function MedicinalPlantsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>🌿 Medicinal Plant Guide</Text>
        <Text style={styles.heroText}>
          Discover the importance of medicinal plants, their health benefits,
          proper care, common diseases and protect them using AI disease detection.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/camera")}>
          <Text style={styles.buttonText}>📷 Scan Medicinal Plant</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>💊 Why Medicinal Plants Are Important</Text>
        <Text style={styles.body}>
          Medicinal plants have been used for centuries in traditional and modern
          medicine. They contain natural compounds that help prevent illness,
          improve immunity, support healing, and are widely used in Ayurveda,
          herbal remedies and natural healthcare.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🌱 Plant Care Guide</Text>
        <Text style={styles.item}>☀️ Sunlight: 4–6 hours daily</Text>
        <Text style={styles.item}>💧 Water: Moderate watering, avoid waterlogging</Text>
        <Text style={styles.item}>🌿 Soil: Well-drained, nutrient-rich soil</Text>
        <Text style={styles.item}>🌡️ Temperature: 20°C – 35°C</Text>
        <Text style={styles.item}>🪴 Add organic compost every month</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🌿 Popular Medicinal Plants</Text>
        {plants.map((p) => (
          <View key={p.name} style={styles.listCard}>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.body}>{p.benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🦠 Common Diseases</Text>
        <Text style={styles.item}>• Powdery Mildew</Text>
        <Text style={styles.item}>• Leaf Spot</Text>
        <Text style={styles.item}>• Root Rot</Text>
        <Text style={styles.item}>• Wilt Disease</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🛡️ Prevention Tips</Text>
        <Text style={styles.item}>✓ Remove infected leaves immediately</Text>
        <Text style={styles.item}>✓ Ensure good air circulation</Text>
        <Text style={styles.item}>✓ Water plants at the base</Text>
        <Text style={styles.item}>✓ Use organic fertilizers and compost</Text>
        <Text style={styles.item}>✓ Inspect plants weekly</Text>
      </View>

      <TouchableOpacity style={[styles.button,{marginBottom:30}]} onPress={() => router.push("/camera")}>
        <Text style={styles.buttonText}>🤖 Detect Disease with AI</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#F5FFF5"},
  content:{padding:18},
  hero:{backgroundColor:"#2E7D32",padding:22,borderRadius:22,marginBottom:18},
  heroTitle:{fontSize:28,fontWeight:"bold",color:"#fff"},
  heroText:{color:"#E8F5E9",fontSize:15,lineHeight:22,marginVertical:12},
  button:{backgroundColor:"#fff",padding:14,borderRadius:14,alignItems:"center"},
  buttonText:{color:"#2E7D32",fontWeight:"bold",fontSize:16},
  card:{backgroundColor:"#fff",padding:18,borderRadius:18,marginBottom:16},
  title:{fontSize:20,fontWeight:"bold",color:"#1B5E20",marginBottom:10},
  body:{fontSize:15,color:"#455A64",lineHeight:22},
  item:{fontSize:15,color:"#37474F",marginBottom:8},
  listCard:{backgroundColor:"#F1F8E9",padding:14,borderRadius:14,marginTop:10},
  name:{fontSize:18,fontWeight:"bold",color:"#1B5E20"},
});
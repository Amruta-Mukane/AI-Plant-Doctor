import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const vegetables = [
  { name: "🍅 Tomato", benefit: "Rich in Vitamin C & Lycopene" },
  { name: "🥔 Potato", benefit: "Excellent energy source" },
  { name: "🥕 Carrot", benefit: "Supports healthy eyesight" },
  { name: "🥦 Broccoli", benefit: "High in calcium & fiber" },
  { name: "🥬 Spinach", benefit: "Iron-rich leafy vegetable" },
  { name: "🌶️ Chili", benefit: "Rich in antioxidants" },
];

export default function VegetablesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>🥕 Vegetable Health Guide</Text>
        <Text style={styles.heroText}>
          Learn how to grow healthy vegetables, prevent diseases, and improve crop quality.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/camera")}>
          <Text style={styles.buttonText}>📷 Scan Vegetable</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>❤️ Why Vegetables Are Important</Text>
        <Text style={styles.body}>
          Vegetables are rich in vitamins, minerals, fiber and antioxidants. They support
          digestion, improve immunity, strengthen bones and help maintain a healthy lifestyle.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🌱 Vegetable Care Guide</Text>
        <Text style={styles.item}>☀️ Sunlight: 5–8 hours daily</Text>
        <Text style={styles.item}>💧 Water: Keep soil moist, avoid waterlogging</Text>
        <Text style={styles.item}>🌿 Soil: Loose, fertile, well-drained soil</Text>
        <Text style={styles.item}>🌡️ Temperature: 18°C–30°C</Text>
        <Text style={styles.item}>🧪 Add organic compost every 3–4 weeks</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🥬 Popular Vegetables</Text>
        {vegetables.map(v => (
          <View key={v.name} style={styles.listCard}>
            <Text style={styles.name}>{v.name}</Text>
            <Text style={styles.body}>{v.benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🦠 Common Diseases</Text>
        <Text style={styles.item}>• Early Blight</Text>
        <Text style={styles.item}>• Late Blight</Text>
        <Text style={styles.item}>• Leaf Curl</Text>
        <Text style={styles.item}>• Root Rot</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🛡️ Prevention Tips</Text>
        <Text style={styles.item}>✓ Rotate crops regularly</Text>
        <Text style={styles.item}>✓ Remove infected leaves</Text>
        <Text style={styles.item}>✓ Water early in the morning</Text>
        <Text style={styles.item}>✓ Monitor pests every week</Text>
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
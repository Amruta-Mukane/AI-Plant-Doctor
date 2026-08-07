import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const flowers = [
  { name: "🌹 Rose", use: "Popular ornamental flower" },
  { name: "🌻 Sunflower", use: "Supports pollinators & produces seeds" },
  { name: "🌺 Hibiscus", use: "Decorative & medicinal uses" },
  { name: "🌼 Marigold", use: "Natural pest repellent" },
  { name: "💮 Lily", use: "Elegant indoor & outdoor flower" },
  { name: "🌷 Tulip", use: "Beautiful seasonal flowering plant" },
];

export default function FlowersScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>🌸 Flower Care Guide</Text>
        <Text style={styles.heroText}>
          Discover why flowers are valuable, how to care for them, and keep them blooming with proper maintenance.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/camera")}>
          <Text style={styles.buttonText}>📷 Scan Flower</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🌼 Why Flowers Are Important</Text>
        <Text style={styles.body}>
          Flowers beautify homes and gardens, attract bees and butterflies for pollination,
          improve biodiversity, and are widely used in decoration, celebrations and traditional medicine.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🌱 Flower Care Guide</Text>
        <Text style={styles.item}>☀️ Sunlight: 5–6 hours daily</Text>
        <Text style={styles.item}>💧 Water: Water regularly, avoid overwatering</Text>
        <Text style={styles.item}>🌿 Soil: Nutrient-rich, well-drained soil</Text>
        <Text style={styles.item}>✂️ Remove faded flowers to encourage blooming</Text>
        <Text style={styles.item}>🐝 Protect pollinators by avoiding excessive pesticides</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🌹 Common Flowers</Text>
        {flowers.map(f=>(
          <View key={f.name} style={styles.listCard}>
            <Text style={styles.name}>{f.name}</Text>
            <Text style={styles.body}>{f.use}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🦠 Common Diseases</Text>
        <Text style={styles.item}>• Powdery Mildew</Text>
        <Text style={styles.item}>• Black Spot</Text>
        <Text style={styles.item}>• Rust Disease</Text>
        <Text style={styles.item}>• Leaf Spot</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🛡️ Prevention Tips</Text>
        <Text style={styles.item}>✓ Remove infected leaves</Text>
        <Text style={styles.item}>✓ Ensure good air circulation</Text>
        <Text style={styles.item}>✓ Water the soil, not the leaves</Text>
        <Text style={styles.item}>✓ Inspect plants every week</Text>
      </View>

      <TouchableOpacity style={[styles.button,{marginBottom:30}]} onPress={()=>router.push("/camera")}>
        <Text style={styles.buttonText}>🤖 Detect Disease with AI</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles=StyleSheet.create({
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
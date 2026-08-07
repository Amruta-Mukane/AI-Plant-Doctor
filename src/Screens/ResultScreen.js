import React from "react";
import { View, Text, Image } from "react-native";

export default function ResultScreen({ route }) {
  const { image } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: 250,
          borderRadius: 10,
        }}
      />

      <Text style={{ fontSize: 24, marginTop: 20 }}>
        Tomato Leaf
      </Text>

      <Text style={{ color: "red", fontSize: 20 }}>
        Early Blight
      </Text>

      <Text style={{ marginTop: 10 }}>
        Solution: Use Mancozeb Fungicide
      </Text>

      <Text>
        Prevention: Avoid Overwatering
      </Text>
    </View>
  );
}
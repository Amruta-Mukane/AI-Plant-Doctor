import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function PlantCard({
  name,
  image
}) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      <Text style={styles.name}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: "center",
    elevation: 5,
  },

  image: {
    width: 80,
    height: 80,
  },

  name: {
    marginTop: 10,
    fontWeight: "bold",
  },
});
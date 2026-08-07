import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

import { useFocusEffect } from "expo-router";

import{
  getScans,
  ScanRecord,
}from "../utils/scanStorage";


export default function HistoryScreen() {
  const [scans, setScans] = useState<ScanRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    const data = await getScans();
    setScans(data);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>📜 Scan History</Text>

      <Text style={styles.subtitle}>
        Your real plant analysis results
      </Text>

      {scans.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🌱</Text>

          <Text style={styles.emptyTitle}>
            No scans yet
          </Text>

          <Text style={styles.emptyText}>
            Scan a plant and your result will appear here.
          </Text>
        </View>
      ) : (
        scans.map((scan) => (
          <View key={scan.id} style={styles.card}>

            {scan.image && (
              <Image
                source={{ uri: scan.image }}
                style={styles.image}
              />
            )}

            <View style={styles.info}>
              <Text style={styles.plant}>
                🌱 {scan.plant}
              </Text>

              <Text
                style={[
                  styles.status,
                  {
                    color: scan.healthy
                      ? "#2E7D32"
                      : "#C62828",
                  },
                ]}
              >
                {scan.healthy
                  ? "💚 Healthy"
                  : `🦠 ${scan.disease}`}
              </Text>

              <Text style={styles.confidence}>
                🎯 Confidence: {scan.confidence}%
              </Text>

              <Text style={styles.date}>
                {new Date(scan.date).toLocaleString()}
              </Text>
            </View>

          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF4",
  },

  content: {
    padding: 20,
    width: "100%",
    maxWidth: 800,
    alignSelf: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#145A32",
  },

  subtitle: {
    color: "#68776B",
    marginTop: 5,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    marginBottom: 15,
    flexDirection: "row",
    elevation: 2,
  },

  image: {
    width: 95,
    height: 95,
    borderRadius: 16,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },

  plant: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#145A32",
  },

  status: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
  },

  confidence: {
    marginTop: 5,
    color: "#53645A",
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    color: "#8A958D",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    borderRadius: 25,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 55,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#145A32",
    marginTop: 10,
  },

  emptyText: {
    color: "#68776B",
    marginTop: 8,
    textAlign: "center",
  },
});
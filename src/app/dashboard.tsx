import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import { useFocusEffect } from "expo-router";

import {
  getScans,
  ScanRecord,
} from "../utils/scanStorage";

export default function Dashboard() {
  const [scans, setScans] =
    useState<ScanRecord[]>([]);

  const loadDashboard = async () => {
    const data = await getScans();
    setScans(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

  const total = scans.length;

  const healthy = scans.filter(
    (scan) => scan.healthy
  ).length;

  const diseased = scans.filter(
    (scan) => !scan.healthy
  ).length;

  const healthRate =
    total > 0
      ? Math.round((healthy / total) * 100)
      : 0;

  // Count diseases dynamically
  const diseaseCounts: Record<string, number> = {};

  scans
    .filter((scan) => !scan.healthy)
    .forEach((scan) => {
      const name =
        scan.disease || "Unknown";

      diseaseCounts[name] =
        (diseaseCounts[name] || 0) + 1;
    });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        📊 Plant Dashboard
      </Text>

      <Text style={styles.subtitle}>
        Real statistics from your plant scans
      </Text>

      <View style={styles.grid}>
        <StatCard
          icon="🔍"
          number={total}
          label="Total Scans"
        />

        <StatCard
          icon="💚"
          number={healthy}
          label="Healthy"
        />

        <StatCard
          icon="🦠"
          number={diseased}
          label="Diseased"
        />

        <StatCard
          icon="🌿"
          number={`${healthRate}%`}
          label="Healthy Rate"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          🦠 Disease Statistics
        </Text>

        {Object.keys(diseaseCounts).length ===
        0 ? (
          <Text style={styles.emptyText}>
            No diseases detected yet.
          </Text>
        ) : (
          Object.entries(diseaseCounts).map(
            ([disease, count]) => (
              <View
                key={disease}
                style={styles.row}
              >
                <Text style={styles.rowText}>
                  {disease}
                </Text>

                <Text style={styles.count}>
                  {count}
                </Text>
              </View>
            )
          )
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          📜 Recent Scans
        </Text>

        {scans.length === 0 ? (
          <Text style={styles.emptyText}>
            No scans yet. Scan your first plant
            to generate dashboard data.
          </Text>
        ) : (
          scans.slice(0, 5).map((scan) => (
            <View
              key={scan.id}
              style={styles.scanRow}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.scanPlant}>
                  🌱 {scan.plant}
                </Text>

                <Text style={styles.scanDisease}>
                  {scan.healthy
                    ? "✅ Healthy"
                    : `🦠 ${scan.disease}`}
                </Text>
              </View>

              <Text style={styles.scanConfidence}>
                {Math.round(
                  scan.confidence * 100
                )}
                %
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function StatCard({
  icon,
  number,
  label,
}: {
  icon: string;
  number: number | string;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>
        {icon}
      </Text>

      <Text style={styles.number}>
        {number}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
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
    maxWidth: 900,
    alignSelf: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#145A32",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#68776B",
    marginTop: 6,
    marginBottom: 25,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
  },

  statIcon: {
    fontSize: 27,
  },

  number: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#1B8A3B",
    marginTop: 8,
  },

  label: {
    color: "#68776B",
    marginTop: 4,
  },

  section: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 22,
    marginTop: 15,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#176B38",
    marginBottom: 15,
  },

  emptyText: {
    color: "#7A887E",
    lineHeight: 21,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF3EE",
  },

  rowText: {
    color: "#455A4A",
  },

  count: {
    color: "#1B8A3B",
    fontWeight: "bold",
  },

  scanRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF3EE",
  },

  scanPlant: {
    fontWeight: "bold",
    color: "#145A32",
    fontSize: 16,
  },

  scanDisease: {
    color: "#68776B",
    marginTop: 4,
  },

  scanConfidence: {
    color: "#1B8A3B",
    fontWeight: "bold",
  },
});
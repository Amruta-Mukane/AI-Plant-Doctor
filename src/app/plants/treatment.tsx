import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { router } from "expo-router";

export default function TreatmentScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 45,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>💊</Text>
          </View>

          <View style={styles.headerContent}>
            <Text style={styles.title}>Treatment Guide</Text>

            <Text style={styles.subtitle}>
              Simple steps to manage common plant diseases
              and keep your plants healthy.
            </Text>
          </View>
        </View>

        {/* IMPORTANT MESSAGE */}

        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>🌿</Text>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Diagnose Before Treatment
            </Text>

            <Text style={styles.infoText}>
              Different plant diseases need different treatments.
              Identify the problem before applying any treatment.
            </Text>
          </View>
        </View>

        {/* RECOMMENDED ACTIONS */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.greenIcon}>
              <Text style={styles.cardEmoji}>🩹</Text>
            </View>

            <Text style={styles.cardTitle}>
              Recommended Actions
            </Text>
          </View>

          <ActionItem
            number="1"
            title="Inspect the Plant"
            text="Check leaves, stems and soil carefully for visible symptoms."
          />

          <ActionItem
            number="2"
            title="Remove Infected Parts"
            text="Remove badly affected leaves or plant material when appropriate."
          />

          <ActionItem
            number="3"
            title="Check Watering"
            text="Avoid excessive watering and make sure the soil drains properly."
          />

          <ActionItem
            number="4"
            title="Improve Airflow"
            text="Give plants enough space for better air circulation."
          />
        </View>

        {/* DISEASE TREATMENTS */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.redIcon}>
              <Text style={styles.cardEmoji}>🦠</Text>
            </View>

            <Text style={styles.cardTitle}>
              Common Disease Care
            </Text>
          </View>

          <DiseaseCard
            emoji="🍂"
            disease="Leaf Spot"
            treatment="Remove badly infected leaves, reduce prolonged leaf wetness and improve airflow."
          />

          <DiseaseCard
            emoji="🌫️"
            disease="Powdery Mildew"
            treatment="Improve airflow, avoid overcrowding and monitor nearby plants."
          />

          <DiseaseCard
            emoji="🌱"
            disease="Root Rot"
            treatment="Reduce excess watering and improve soil drainage."
          />

          <DiseaseCard
            emoji="🥀"
            disease="Blight"
            treatment="Remove affected plant material and avoid spreading contaminated material to healthy plants."
          />
        </View>

        {/* HEALTHY PLANT CARE */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.blueIcon}>
              <Text style={styles.cardEmoji}>💧</Text>
            </View>

            <Text style={styles.cardTitle}>
              Healthy Plant Care
            </Text>
          </View>

          <CareItem text="Water according to the plant's needs." />

          <CareItem text="Provide suitable sunlight." />

          <CareItem text="Keep the growing area clean." />

          <CareItem text="Use well-drained soil." />

          <CareItem text="Check plants regularly for disease." />

          <CareItem text="Clean gardening tools after use." />
        </View>

        {/* PREVENTION */}

        <View style={styles.preventionCard}>
          <View style={styles.preventionHeader}>
            <Text style={styles.preventionEmoji}>🛡️</Text>

            <Text style={styles.preventionTitle}>
              Prevention is Better
            </Text>
          </View>

          <Text style={styles.preventionText}>
            Healthy growing conditions can reduce the risk of many
            plant problems. Monitor your plants regularly so symptoms
            can be noticed early.
          </Text>
        </View>

        {/* WARNING */}

        <View style={styles.warningCard}>
          <Text style={styles.warningEmoji}>⚠️</Text>

          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>
              Treatment Safety
            </Text>

            <Text style={styles.warningText}>
              Do not apply a pesticide or fungicide just because symptoms
              look similar to a disease. Confirm the problem first and,
              if a product is needed, follow its label and local guidance.
            </Text>
          </View>
        </View>

        {/* AI SCAN */}

        <View style={styles.aiCard}>
          <View style={styles.aiIcon}>
            <Text style={styles.aiEmoji}>🤖</Text>
          </View>

          <Text style={styles.aiTitle}>
            Don't know the disease?
          </Text>

          <Text style={styles.aiDescription}>
            Capture or upload a clear photo of the affected
            plant and use AI Plant Doctor to analyze it.
          </Text>

          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => router.push("/camera")}
            activeOpacity={0.8}
          >
            <Text style={styles.scanButtonText}>
              📷 Scan Plant
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </Animated.View>
    </ScrollView>
  );
}

/* ==============================
   ACTION ITEM
============================== */

function ActionItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.actionRow}>
      <View style={styles.numberCircle}>
        <Text style={styles.numberText}>{number}</Text>
      </View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionText}>{text}</Text>
      </View>
    </View>
  );
}

/* ==============================
   DISEASE CARD
============================== */

function DiseaseCard({
  emoji,
  disease,
  treatment,
}: {
  emoji: string;
  disease: string;
  treatment: string;
}) {
  return (
    <View style={styles.diseaseCard}>
      <View style={styles.diseaseIcon}>
        <Text style={styles.diseaseEmoji}>{emoji}</Text>
      </View>

      <View style={styles.diseaseContent}>
        <Text style={styles.diseaseName}>{disease}</Text>

        <Text style={styles.diseaseTreatment}>
          {treatment}
        </Text>
      </View>
    </View>
  );
}

/* ==============================
   CARE ITEM
============================== */

function CareItem({ text }: { text: string }) {
  return (
    <View style={styles.careRow}>
      <View style={styles.checkCircle}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.careText}>{text}</Text>
    </View>
  );
}

/* ==============================
   STYLES
============================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FBF4",
  },

  content: {
    padding: 18,
    paddingBottom: 40,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },

  /* HEADER */

  header: {
    backgroundColor: "#DFF3E4",
    borderRadius: 25,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  headerIcon: {
    width: 72,
    height: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  headerEmoji: {
    fontSize: 38,
  },

  headerContent: {
    flex: 1,
    marginLeft: 17,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#145A32",
  },

  subtitle: {
    color: "#607066",
    fontSize: 13,
    marginTop: 5,
    lineHeight: 19,
  },

  /* INFO */

  infoCard: {
    backgroundColor: "#EAF7EC",
    borderRadius: 18,
    padding: 17,
    flexDirection: "row",
    marginBottom: 15,
  },

  infoEmoji: {
    fontSize: 28,
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#176B38",
  },

  infoText: {
    fontSize: 12,
    color: "#607066",
    lineHeight: 18,
    marginTop: 4,
  },

  /* GENERAL CARD */

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 22,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#176B38",
  },

  cardEmoji: {
    fontSize: 21,
  },

  greenIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E5F5E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  redIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFE8E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  blueIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E5F2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  /* ACTIONS */

  actionRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },

  numberCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E4F6E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  numberText: {
    color: "#218838",
    fontWeight: "bold",
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#35553D",
  },

  actionText: {
    fontSize: 12,
    color: "#738078",
    lineHeight: 18,
    marginTop: 3,
  },

  /* DISEASE */

  diseaseCard: {
    backgroundColor: "#FFF8F8",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  diseaseIcon: {
    width: 45,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  diseaseEmoji: {
    fontSize: 25,
  },

  diseaseContent: {
    flex: 1,
  },

  diseaseName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8B3A3A",
  },

  diseaseTreatment: {
    fontSize: 12,
    color: "#746565",
    lineHeight: 18,
    marginTop: 3,
  },

  /* CARE */

  careRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  checkCircle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#E4F6E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  check: {
    color: "#218838",
    fontWeight: "bold",
  },

  careText: {
    flex: 1,
    fontSize: 14,
    color: "#536158",
  },

  /* PREVENTION */

  preventionCard: {
    backgroundColor: "#EEF7FF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDECF8",
  },

  preventionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  preventionEmoji: {
    fontSize: 27,
    marginRight: 10,
  },

  preventionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#275D84",
  },

  preventionText: {
    fontSize: 13,
    color: "#5D7180",
    lineHeight: 20,
  },

  /* WARNING */

  warningCard: {
    backgroundColor: "#FFF8E3",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#F2E4B6",
  },

  warningEmoji: {
    fontSize: 27,
    marginRight: 12,
  },

  warningContent: {
    flex: 1,
  },

  warningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#795A00",
  },

  warningText: {
    fontSize: 12,
    color: "#6F6547",
    lineHeight: 18,
    marginTop: 4,
  },

  /* AI CARD */

  aiCard: {
    backgroundColor: "#DDF3E3",
    borderRadius: 25,
    padding: 23,
    alignItems: "center",
  },

  aiIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  aiEmoji: {
    fontSize: 31,
  },

  aiTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#145A32",
    textAlign: "center",
  },

  aiDescription: {
    fontSize: 13,
    color: "#607066",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 17,
  },

  scanButton: {
    width: "100%",
    backgroundColor: "#218838",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
  },

  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function CameraScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // OPEN REAL PHONE CAMERA
  // =========================
  const openCamera = async () => {
  Alert.alert("Step 1");

  try {
    setLoading(true);

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    Alert.alert("Step 2", `Granted: ${permission.granted}`);

    if (!permission.granted) {
      Alert.alert(
        "Camera Permission Required",
        "Please allow camera access."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
    });

    Alert.alert("Step 3");

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  } catch (e) {
    console.log(e);
    Alert.alert("Error", String(e));
  } finally {
    setLoading(false);
  }
};

  // =========================
  // OPEN PHONE GALLERY
  // =========================
  const openGallery = async () => {
    try {
      setLoading(true);

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Gallery Permission Required",
          "Please allow photo access so you can choose a plant image."
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: false,
          quality: 0.8,
        });

      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Gallery error:", error);
      Alert.alert("Gallery Error", "Unable to open the photo gallery.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SEND IMAGE TO RESULT
  // =========================
  const analyzePlant = () => {
    if (!image) {
      Alert.alert(
        "Image Required",
        "Take a photo or upload one from the gallery first."
      );
      return;
    }

    router.push({
      pathname: "/result",
      params: { image },
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.icon}>🌿</Text>

      <Text style={styles.title}>Scan Your Plant</Text>

      <Text style={styles.subtitle}>
        Take a real photo or upload a plant image from your gallery.
      </Text>

      {image ? (
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Selected Plant Photo</Text>

          <Image
            source={{ uri: image }}
            style={styles.preview}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={analyzePlant}
          >
            <Text style={styles.whiteText}>
              🌿 Analyze Plant
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cameraOutline}
            onPress={openCamera}
          >
            <Text style={styles.cameraOutlineText}>
              📷 Take Another Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.galleryOutline}
            onPress={openGallery}
          >
            <Text style={styles.galleryOutlineText}>
              🖼️ Choose Another From Gallery
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.bigCamera}>📷</Text>

          <Text style={styles.cardTitle}>
            Choose Plant Image
          </Text>

          <Text style={styles.cardText}>
            Use your phone camera or select an existing plant photo.
          </Text>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={openCamera}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.whiteText}>
                📷 Open Camera
              </Text>
            )}
          </TouchableOpacity>

          {/* THIS IS THE GALLERY BUTTON */}
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={openGallery}
            disabled={loading}
          >
            <Text style={styles.whiteText}>
              🖼️ Upload From Gallery
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 For Better Detection</Text>
        <Text style={styles.tipText}>• Keep the affected leaf clearly visible.</Text>
        <Text style={styles.tipText}>• Take the photo in good lighting.</Text>
        <Text style={styles.tipText}>• Avoid blurry photos.</Text>
        <Text style={styles.tipText}>• Keep the affected area near the center.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5FFF5",
  },

  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },

  icon: {
    fontSize: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#607D68",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 25,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 24,
    alignItems: "center",
    elevation: 3,
  },

  bigCamera: {
    fontSize: 55,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1B5E20",
  },

  cardText: {
    fontSize: 14,
    color: "#607D68",
    textAlign: "center",
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 22,
  },

  cameraButton: {
    width: "100%",
    backgroundColor: "#2E7D32",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 12,
  },

  galleryButton: {
    width: "100%",
    backgroundColor: "#1565C0",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
  },

  whiteText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  previewCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 24,
    elevation: 3,
  },

  previewTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 15,
  },

  preview: {
    width: "100%",
    height: 320,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
  },

  analyzeButton: {
    width: "100%",
    backgroundColor: "#2E7D32",
    paddingVertical: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 16,
  },

  cameraOutline: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#2E7D32",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 12,
  },

  cameraOutlineText: {
    color: "#2E7D32",
    fontSize: 16,
    fontWeight: "bold",
  },

  galleryOutline: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#1565C0",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 12,
  },

  galleryOutlineText: {
    color: "#1565C0",
    fontSize: 16,
    fontWeight: "bold",
  },

  tipCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginTop: 22,
    elevation: 2,
  },

  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 12,
  },

  tipText: {
    color: "#53645A",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
  },
});
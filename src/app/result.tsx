import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { saveScan } from "../utils/scanStorage";

// ======================================================
// TYPES
// ======================================================

type LanguageCode = "en" | "mr" | "hi";

type Language = {
  code: LanguageCode;
  name: string;
  voice: string;
};

// ======================================================
// LANGUAGES
// ======================================================

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    voice: "en-IN",
  },
  {
    code: "mr",
    name: "मराठी",
    voice: "mr-IN",
  },
  {
    code: "hi",
    name: "हिंदी",
    voice: "hi-IN",
  },
];

// ======================================================
// UI TRANSLATIONS
// ======================================================

const uiText = {
  en: {
    title: "Plant Disease Result",

    analyzing: "Analyzing your plant...",
    checking: "AI Plant Doctor is checking the image.",

    failed: "Analysis Failed",
    retry: "Try Another Image",

    selectLanguage: "Select Language",

    listen: "Listen to Result",
    stop: "Stop Voice",

    healthy: "Plant appears healthy",
    unhealthy: "Possible health issue detected",

    condition: "Condition",
    confidence: "Confidence",

    description: "About This Condition",
    possible: "Possible Conditions",
    treatment: "Treatment & Prevention",

    noDescription: "No description available.",
    noTreatment: "No treatment information available.",

    scanAgain: "Scan Another Plant",

    translating: "Translating...",
  },

  mr: {
    title: "वनस्पती रोग तपासणी निकाल",

    analyzing: "तुमच्या वनस्पतीचे विश्लेषण सुरू आहे...",
    checking: "एआय प्लांट डॉक्टर प्रतिमा तपासत आहे.",

    failed: "विश्लेषण अयशस्वी",
    retry: "दुसरी प्रतिमा निवडा",

    selectLanguage: "भाषा निवडा",

    listen: "निकाल ऐका",
    stop: "आवाज थांबवा",

    healthy: "वनस्पती निरोगी दिसत आहे",
    unhealthy: "वनस्पतीमध्ये आरोग्य समस्या आढळली",

    condition: "रोग किंवा स्थिती",
    confidence: "विश्वास पातळी",

    description: "या रोगाबद्दल माहिती",
    possible: "संभाव्य रोग",
    treatment: "उपचार आणि प्रतिबंध",

    noDescription: "रोगाची माहिती उपलब्ध नाही.",
    noTreatment: "उपचाराची माहिती उपलब्ध नाही.",

    scanAgain: "दुसरी वनस्पती स्कॅन करा",

    translating: "मराठीत भाषांतर करत आहे...",
  },

  hi: {
    title: "पौधे की बीमारी का परिणाम",

    analyzing: "आपके पौधे का विश्लेषण हो रहा है...",
    checking: "एआई प्लांट डॉक्टर तस्वीर की जांच कर रहा है।",

    failed: "विश्लेषण विफल",
    retry: "दूसरी तस्वीर चुनें",

    selectLanguage: "भाषा चुनें",

    listen: "परिणाम सुनें",
    stop: "आवाज़ बंद करें",

    healthy: "पौधा स्वस्थ दिखाई देता है",
    unhealthy: "पौधे में स्वास्थ्य समस्या हो सकती है",

    condition: "रोग या स्थिति",
    confidence: "विश्वास स्तर",

    description: "इस रोग के बारे में",
    possible: "संभावित रोग",
    treatment: "उपचार और रोकथाम",

    noDescription: "रोग की जानकारी उपलब्ध नहीं है.",
    noTreatment: "उपचार की जानकारी उपलब्ध नहीं है.",

    scanAgain: "दूसरा पौधा स्कैन करें",

    translating: "हिंदी में अनुवाद हो रहा है...",
  },
};

// ======================================================
// BACKEND
// ======================================================

const BACKEND_URL =
  "https://ai-plant-doctor-pian.onrender.com";

// ======================================================
// RESULT SCREEN
// ======================================================

export default function ResultScreen() {
  const { image } =
    useLocalSearchParams<{ image?: string }>();

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [apiData, setApiData] =
    useState<any>(null);

  const [language, setLanguage] =
    useState<LanguageCode>("en");

  const [
  translatedPlant,
  setTranslatedPlant,
] = useState("");

const [
  translatedDisease,
  setTranslatedDisease,
] = useState("");

const [
  translatedDescription,
  setTranslatedDescription,
] = useState("");

const [
  translatedTreatment,
  setTranslatedTreatment,
] = useState<string[]>([]);

const [
  translatedSuggestions,
  setTranslatedSuggestions,
] = useState<any[]>([]);

  const [
    translating,
    setTranslating,
  ] = useState(false);

  const [speaking, setSpeaking] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  // ====================================================
  // START
  // ====================================================

  useEffect(() => {
    loadLanguage();

    if (image) {
      analyzePlant();
    } else {
      setError(
        "No plant image was received."
      );

      setLoading(false);
    }

    return () => {
      Speech.stop();
    };
  }, [image]);

  // ====================================================
  // LOAD SAVED LANGUAGE
  // ====================================================

  const loadLanguage = async () => {
    try {
      const savedLanguage =
        await AsyncStorage.getItem(
          "preferred_language"
        );

      if (
        savedLanguage === "en" ||
        savedLanguage === "mr" ||
        savedLanguage === "hi"
      ) {
        setLanguage(savedLanguage);
      }
    } catch (err) {
      console.log(
        "Language load error:",
        err
      );
    }
  };

  // ====================================================
  // IMAGE -> BASE64
  // ====================================================

  const getBase64Image =
    async (): Promise<string> => {
      if (!image) {
        throw new Error(
          "Image was not received."
        );
      }

      // WEB
      if (Platform.OS === "web") {
        const imageResponse =
          await fetch(image);

        const blob =
          await imageResponse.blob();

        return await new Promise<string>(
          (resolve, reject) => {
            const reader =
              new FileReader();

            reader.onloadend = () => {
              resolve(
                reader.result as string
              );
            };

            reader.onerror = reject;

            reader.readAsDataURL(blob);
          }
        );
      }

      // MOBILE
// MOBILE
const FileSystem =
  await import(
    "expo-file-system/legacy"
  );

const base64 =
  await FileSystem.readAsStringAsync(
    image,
    {
      encoding: "base64",
    } as any
  );

      return `data:image/jpeg;base64,${base64}`;
    };

  // ====================================================
  // REAL PLANT ANALYSIS
  // ====================================================

  const analyzePlant = async () => {
    try {
      setLoading(true);
      setError("");
      setSaved(false);

      console.log("BACKEND_URL =", BACKEND_URL);
      console.log("Request URL =", `${BACKEND_URL}/api/plant-health`);

      const base64Image =
        await getBase64Image();

      const response = await fetch(
        `${BACKEND_URL}/api/plant-health`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            image: base64Image,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "REAL PLANT API RESULT:"
      );

      console.log(
        JSON.stringify(
          data,
          null,
          2
        )
      );

      if (!response.ok) {
        throw new Error(
          data?.details?.message ||
            data?.error ||
            "Plant analysis failed."
        );
      }

      setApiData(data);
    } catch (err: any) {
      console.error(
        "Plant analysis error:",
        err
      );

      setError(
        err?.message ||
          "Unable to analyze plant."
      );
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // REAL API VALUES
  // ====================================================

  const isHealthy =
    apiData?.result?.is_healthy
      ?.binary === true;

  const healthProbability =
    apiData?.result?.is_healthy
      ?.probability;

  const suggestions =
    apiData?.result?.disease
      ?.suggestions || [];

  const bestDisease =
    suggestions.length > 0
      ? suggestions[0]
      : null;

  const diseaseName =
    bestDisease?.name ||
    (isHealthy
      ? "Healthy Plant"
      : "Unknown condition");

  const confidenceNumber =
    bestDisease?.probability != null
      ? Math.round(
          bestDisease.probability *
            100
        )
      : healthProbability != null
      ? Math.round(
          healthProbability * 100
        )
      : 0;

  // ====================================================
  // DESCRIPTION
  // ====================================================

  const description =
    bestDisease?.details
      ?.description;

  const descriptionText =
    typeof description === "string"
      ? description
      : description?.value || "";

  // ====================================================
  // TREATMENT
  // ====================================================

  const treatment =
    bestDisease?.details
      ?.treatment;

  const treatmentItems: string[] = [
    ...(treatment?.biological || []),
    ...(treatment?.chemical || []),
    ...(treatment?.prevention || []),
  ];

  // ====================================================
  // PLANT NAME
  // ====================================================

  const plantName =
    apiData?.result?.classification
      ?.suggestions?.[0]?.name ||
    "Plant";

  // ====================================================
  // SAVE REAL SCAN
  // ====================================================

  useEffect(() => {
    if (
      !apiData ||
      saved ||
      !image
    ) {
      return;
    }

    saveCurrentScan();
  }, [apiData]);

  const saveCurrentScan =
    async () => {
      try {
        const scan = {
          id: Date.now().toString(),

          plant: plantName,

          disease: diseaseName,

          confidence:
            confidenceNumber,

          healthy: isHealthy,

          image: image as string,

          date:
            new Date().toISOString(),
        };

        await saveScan(scan);

        setSaved(true);

        console.log(
          "SCAN SAVED:",
          scan
        );
      } catch (err) {
        console.error(
          "Save scan error:",
          err
        );
      }
    };

  // ====================================================
  // LANGUAGE CHANGE
  // ====================================================

  const changeLanguage =
    async (
      code: LanguageCode
    ) => {
      try {
        // Stop previous voice
        await Speech.stop();

        setSpeaking(false);

        // Change language
        setLanguage(code);

        // Save language
        await AsyncStorage.setItem(
          "preferred_language",
          code
        );

        // English doesn't need translation
        if (code === "en") {
          setTranslatedDisease("");
          setTranslatedDescription("");
          setTranslatedTreatment([]);
          setTranslatedPlant("");
          setTranslatedSuggestions([]);

          return;
        }

        // Translate real API result
        if (apiData) {
          await translateResult(code);
        }
      } catch (err) {
        console.error(
          "Language change error:",
          err
        );
      }
    };

  // ====================================================
  // AUTOMATIC TRANSLATION
  // ====================================================
  const translateResult = async (
  targetLanguage: LanguageCode
) => {

  if (targetLanguage === "en") return;

  try {

    setTranslating(true);

    const response = await fetch(
      `${BACKEND_URL}/api/translate`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          targetLanguage,

          plant: plantName,

          disease: diseaseName,

          description: descriptionText,

          treatment: treatmentItems,

          suggestions: suggestions.map((item: any) => ({
            name: item.name,
            probability: item.probability,
          })),
        }),
      }
    );

    const data = await response.json();

    console.log("TRANSLATION");

    console.log(data);

    if (!response.ok) {
      throw new Error(data.error);
    }

    setTranslatedPlant(
      data.plant || plantName
    );

    setTranslatedDisease(
      data.disease || diseaseName
    );

    setTranslatedDescription(
      data.description || descriptionText
    );

    setTranslatedTreatment(
      data.treatment || treatmentItems
    );

    setTranslatedSuggestions(
      data.suggestions || []
    );

  } catch (err) {

    console.log(err);

    setTranslatedPlant(plantName);

    setTranslatedDisease(diseaseName);

    setTranslatedDescription(descriptionText);

    setTranslatedTreatment(treatmentItems);

    setTranslatedSuggestions(suggestions);

  } finally {

    setTranslating(false);

  }

};

  // ====================================================
  // AUTO TRANSLATE SAVED LANGUAGE
  // ====================================================

  useEffect(() => {
    if (
      !apiData ||
      language === "en"
    ) {
      return;
    }

    translateResult(language);
  }, [apiData, language]);

  // ====================================================
  // CURRENT DISPLAY DATA
  // ====================================================

  const labels =
    uiText[language];

  const displayedPlant =
  language === "en"
    ? plantName
    : translatedPlant || plantName;

  const displayedDisease =
  language === "en"
    ? diseaseName
    : translatedDisease || diseaseName;

const displayedDescription =
  language === "en"
    ? descriptionText
    : translatedDescription || descriptionText;

const displayedTreatment =
  language === "en"
    ? treatmentItems
    : translatedTreatment.length > 0
    ? translatedTreatment
    : treatmentItems;

const displayedSuggestions =
  language === "en"
    ? suggestions
    : translatedSuggestions.length > 0
    ? translatedSuggestions
    : suggestions;

  // ====================================================
  // VOICE
  // ====================================================

  const speakResult =
    async () => {
      try {
        // Button works as stop button
        if (speaking) {
          await Speech.stop();

          setSpeaking(false);

          return;
        }

        // Don't speak while translation is running
        if (translating) {
          return;
        }

        await Speech.stop();

        const selectedLanguage =
          languages.find(
            (item) =>
              item.code === language
          ) || languages[0];

        let speechText = "";

        // ===============================================
        // MARATHI SPEECH
        // ===============================================

        if (language === "mr") {
          speechText = `
          वनस्पती तपासणीचा निकाल.

          ${isHealthy
            ? "तुमची वनस्पती निरोगी दिसत आहे."
            : "तुमच्या वनस्पतीमध्ये आरोग्य समस्या आढळली आहे."}

          रोग किंवा स्थिती:
          ${displayedDisease}.

          विश्वास पातळी:
          ${confidenceNumber} टक्के.

          या रोगाबद्दल माहिती:
          ${
            displayedDescription ||
            labels.noDescription
          }.

          उपचार आणि प्रतिबंध:
          ${
            displayedSuggestions.length >
            0
              ? displayedSuggestions
  .map((item: any) => item.name || item)
  .join(". ")
              : labels.noTreatment
          }.
          `;
        }

        // ===============================================
        // HINDI SPEECH
        // ===============================================

        else if (
          language === "hi"
        ) {
          speechText = `
          पौधे की जांच का परिणाम।

          ${isHealthy
            ? "आपका पौधा स्वस्थ दिखाई देता है।"
            : "आपके पौधे में स्वास्थ्य समस्या पाई गई है।"}

          रोग या स्थिति:
          ${displayedDisease}।

          विश्वास स्तर:
          ${confidenceNumber} प्रतिशत।

          इस रोग के बारे में जानकारी:
          ${
            displayedDescription ||
            labels.noDescription
          }।

          उपचार और रोकथाम:
          ${
            displayedSuggestions.length >
            0
              ? displayedSuggestions
  .map((item: any) => item.name || item)
  .join(". ")
              : labels.noTreatment
          }।
          `;
        }

        // ===============================================
        // ENGLISH SPEECH
        // ===============================================

        else {
          speechText = `
          Plant analysis result.

          ${isHealthy
            ? "Your plant appears healthy."
            : "A possible plant health issue was detected."}

          Condition:
          ${displayedDisease}.

          Confidence:
          ${confidenceNumber} percent.

          About this condition:
          ${
            displayedDescription ||
            labels.noDescription
          }.

          Treatment and prevention:
          ${
            displayedSuggestions.length >
            0
              ? displayedSuggestions
  .map((item: any) => item.name || item)
  .join(". ")
              : labels.noTreatment
          }.
          `;
        }

        setSpeaking(true);

        Speech.speak(
          speechText,
          {
            language:
              selectedLanguage.voice,

            rate:
              language === "en"
                ? 0.85
                : 0.78,

            pitch: 1,

            onDone: () => {
              setSpeaking(false);
            },

            onStopped: () => {
              setSpeaking(false);
            },

            onError: (error) => {
              console.log(
                "Speech error:",
                error
              );

              setSpeaking(false);
            },
          }
        );
      } catch (err) {
        console.error(
          "Speech error:",
          err
        );

        setSpeaking(false);
      }
    };

  // ====================================================
  // LOADING SCREEN
  // ====================================================

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />

        <Text
          style={
            styles.loadingTitle
          }
        >
          🌿{" "}
          {
            uiText[language]
              .analyzing
          }
        </Text>

        <Text
          style={
            styles.loadingText
          }
        >
          {
            uiText[language]
              .checking
          }
        </Text>
      </View>
    );
  }

  // ====================================================
  // ERROR SCREEN
  // ====================================================

  if (error) {
    return (
      <View style={styles.center}>
        <Text
          style={styles.errorIcon}
        >
          ⚠️
        </Text>

        <Text
          style={styles.errorTitle}
        >
          {
            uiText[language]
              .failed
          }
        </Text>

        <Text
          style={styles.errorText}
        >
          {error}
        </Text>

        <TouchableOpacity
          style={
            styles.retryButton
          }
          onPress={() =>
            router.replace(
              "/camera"
            )
          }
        >
          <Text
            style={
              styles.retryText
            }
          >
            📷{" "}
            {
              uiText[language]
                .retry
            }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ====================================================
  // UI
  // ====================================================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* TITLE */}

      <Text style={styles.title}>
        🌿 {labels.title}
      </Text>

      {/* LANGUAGE */}

      <View
        style={
          styles.languageCard
        }
      >
        <Text
          style={
            styles.languageTitle
          }
        >
          🌐{" "}
          {labels.selectLanguage}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >
          {languages.map(
            (item) => (
              <TouchableOpacity
                key={item.code}
                style={[
                  styles.languageButton,

                  language ===
                    item.code &&
                    styles.activeLanguage,
                ]}
                onPress={() =>
                  changeLanguage(
                    item.code
                  )
                }
              >
                <Text
                  style={[
                    styles.languageText,

                    language ===
                      item.code &&
                      styles.activeLanguageText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      {/* IMAGE */}

      {image && (
        <Image
          source={{
            uri: image,
          }}
          style={styles.preview}
          resizeMode="cover"
        />
      )}

      {/* RESULT */}

      <View
        style={[
          styles.resultCard,

          isHealthy &&
            styles.healthyCard,
        ]}
      >
        <Text
          style={styles.status}
        >
          {isHealthy
            ? `✅ ${labels.healthy}`
            : `⚠️ ${labels.unhealthy}`}
        </Text>

        <Text
          style={styles.disease}
        >
          🦠 {labels.condition}:{" "}
          {displayedDisease}
        </Text>

        <Text
          style={
            styles.confidence
          }
        >
          🎯 {labels.confidence}:{" "}
          {confidenceNumber}%
        </Text>
      </View>

      {/* TRANSLATION LOADING */}

      {translating && (
        <View
          style={
            styles.translatingBox
          }
        >
          <ActivityIndicator
            color="#2E7D32"
          />

          <Text
            style={
              styles.translatingText
            }
          >
            {
              labels.translating
            }
          </Text>
        </View>
      )}

      {/* DESCRIPTION */}

      <View style={styles.card}>
        <Text
          style={styles.cardTitle}
        >
          📋 {labels.description}
        </Text>

        <Text style={styles.item}>
          {displayedDescription ||
            labels.noDescription}
        </Text>
      </View>

      {/* POSSIBLE CONDITIONS */}
      {displayedSuggestions.length > 0 && (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>
      🔬 {labels.possible}
    </Text>

    {displayedSuggestions
      .slice(0, 3)
      .map((item: any, index: number) => (
        <View
          key={index}
          style={styles.suggestionRow}
        >
          <Text style={styles.item}>
            {index + 1}.{" "}
            {index === 0
              ? displayedDisease
              : item.name || item}
          </Text>

          <Text style={styles.percentage}>
            {Math.round(
              (item.probability || 0) * 100
            )}
            %
          </Text>
        </View>
      ))}
  </View>
)}
      {/* TREATMENT */}

      <View style={styles.card}>
        <Text
          style={styles.cardTitle}
        >
          💊 {labels.treatment}
        </Text>

        {displayedTreatment.length ===
        0 ? (
          <Text style={styles.item}>
            {labels.noTreatment}
          </Text>
        ) : (
          displayedTreatment.map(
            (
              item,
              index
            ) => (
              <Text
                key={index}
                style={styles.item}
              >
                • {item}
              </Text>
            )
          )
        )}
      </View>

      {/* VOICE */}

      <TouchableOpacity
        style={
          speaking
            ? styles.stopButton
            : styles.voiceButton
        }
        onPress={speakResult}
        disabled={translating}
      >
        <Text
          style={
            styles.voiceButtonText
          }
        >
          {speaking
            ? `⏹ ${labels.stop}`
            : `🔊 ${labels.listen}`}
        </Text>
      </TouchableOpacity>

      {/* SCAN AGAIN */}

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() =>
          router.replace(
            "/camera"
          )
        }
      >
        <Text
          style={
            styles.scanButtonText
          }
        >
          📷 {labels.scanAgain}
        </Text>
      </TouchableOpacity>

      <View
        style={{ height: 40 }}
      />
    </ScrollView>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#F5FFF5",
    },

    content: {
      width: "100%",
      maxWidth: 750,
      alignSelf: "center",
      padding: 18,
    },

    center: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
      backgroundColor:
        "#F5FFF5",
      padding: 30,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#1B5E20",
      textAlign: "center",
      marginBottom: 20,
    },

    languageCard: {
      backgroundColor:
        "#FFFFFF",
      padding: 16,
      borderRadius: 18,
      marginBottom: 18,
      elevation: 2,
    },

    languageTitle: {
      fontSize: 17,
      fontWeight: "bold",
      color: "#1B5E20",
      marginBottom: 12,
    },

    languageButton: {
      paddingVertical: 10,
      paddingHorizontal: 17,
      backgroundColor:
        "#E8F5E9",
      borderRadius: 22,
      marginRight: 9,
    },

    activeLanguage: {
      backgroundColor:
        "#2E7D32",
    },

    languageText: {
      color: "#2E7D32",
      fontWeight: "600",
    },

    activeLanguageText: {
      color: "#FFFFFF",
    },

    preview: {
      width: "100%",
      height: 280,
      borderRadius: 24,
      marginBottom: 20,
    },

    resultCard: {
      backgroundColor:
        "#C62828",
      padding: 22,
      borderRadius: 22,
      marginBottom: 18,
    },

    healthyCard: {
      backgroundColor:
        "#2E7D32",
    },

    status: {
      color: "#FFFFFF",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
    },

    disease: {
      color: "#FFFFFF",
      fontSize: 18,
      marginBottom: 9,
    },

    confidence: {
      color: "#FFFFFF",
      fontSize: 16,
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      padding: 20,
      borderRadius: 20,
      marginBottom: 16,
      elevation: 2,
    },

    cardTitle: {
      fontSize: 19,
      fontWeight: "bold",
      color: "#2E7D32",
      marginBottom: 12,
    },

    item: {
      flex: 1,
      fontSize: 15,
      color: "#37474F",
      lineHeight: 23,
      marginBottom: 7,
    },

    suggestionRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 7,
    },

    percentage: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#2E7D32",
      marginLeft: 10,
    },

    voiceButton: {
      backgroundColor:
        "#1565C0",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      marginBottom: 12,
    },

    stopButton: {
      backgroundColor:
        "#C62828",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      marginBottom: 12,
    },

    voiceButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },

    scanButton: {
      backgroundColor:
        "#2E7D32",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
    },

    scanButtonText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    },

    translatingBox: {
      backgroundColor:
        "#E8F5E9",
      padding: 14,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },

    translatingText: {
      marginLeft: 10,
      color: "#2E7D32",
      fontWeight: "600",
    },

    loadingTitle: {
      fontSize: 21,
      fontWeight: "bold",
      color: "#1B5E20",
      marginTop: 20,
      textAlign: "center",
    },

    loadingText: {
      color: "#607D68",
      marginTop: 8,
      textAlign: "center",
    },

    errorIcon: {
      fontSize: 50,
    },

    errorTitle: {
      fontSize: 23,
      fontWeight: "bold",
      color: "#B71C1C",
      marginTop: 15,
    },

    errorText: {
      color: "#555",
      textAlign: "center",
      marginTop: 10,
    },

    retryButton: {
      backgroundColor:
        "#2E7D32",
      paddingVertical: 14,
      paddingHorizontal: 25,
      borderRadius: 15,
      marginTop: 25,
    },

    retryText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  });
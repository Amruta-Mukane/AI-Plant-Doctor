// import React from "react";
// import { router } from "expo-router";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from "react-native";

// export default function HomeScreen() {
//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.logo}>🌿 AI Plant Doctor</Text>
//         <Text style={styles.subText}>
//           Detect plant diseases instantly
//         </Text>
//       </View>

//       {/* Hero Banner */}
//       <Image
//         source={require("../../assets/images/hero_banner.png")}
//         style={styles.bannerImage}
//         resizeMode="cover"
//       />

//       {/* Scan Button */}
//       <TouchableOpacity
//         style={styles.scanBtn}
//         onPress={() => router.push("/camera")}
//       >
//         <Text style={styles.scanBtnText}>
//           📷 Scan Plant
//         </Text>
//       </TouchableOpacity>

//       {/* Welcome Card */}
//       <View style={styles.welcomeCard}>
//         <Text style={styles.welcomeTitle}>
//           🌱 Welcome to AI Plant Doctor
//         </Text>

//         <Text style={styles.welcomeText}>
//           Scan your plants, detect diseases,
//           get treatment suggestions and keep
//           your garden healthy.
//         </Text>
//       </View>

//       {/* Categories */}
//       <Text style={styles.sectionTitle}>
//         Explore Plants
//       </Text>

//       <View style={styles.categoryContainer}>
//         <TouchableOpacity
//           style={styles.categoryCard}
//         onPress={() => router.push("/plants/fruits")}
//         >
//           <Text style={styles.emoji}>🍎</Text>
//           <Text style={styles.cardText}>
//             Fruits
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.categoryCard}
//           onPress={() => router.push("/plants/vegetables")}
//         >
//           <Text style={styles.emoji}>🥕</Text>
//           <Text style={styles.cardText}>
//             Vegetables
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.categoryCard}
//           onPress={() => router.push("/plants/flowers")}
//         >
//           <Text style={styles.emoji}>🌹</Text>
//           <Text style={styles.cardText}>
//             Flowers
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.categoryCard}
//           onPress={() => router.push("/plants/medical")}
//         >
//           <Text style={styles.emoji}>🌿</Text>
//           <Text style={styles.cardText}>
//             Medicinal
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Features */}
//       <Text style={styles.sectionTitle}>
//         Features
//       </Text>

//       <View style={styles.featureCard}>
//         <Text style={styles.featureTitle}>
//           🤖 AI Disease Detection
//         </Text>
//         <Text style={styles.featureDesc}>
//           Detect diseases using Artificial Intelligence.
//         </Text>
//       </View>

//       <View style={styles.featureCard}>
//         <Text style={styles.featureTitle}>
//           💊 Treatment Suggestions
//         </Text>
//         <Text style={styles.featureDesc}>
//           Get solutions and treatments instantly.
//         </Text>
//       </View>

//       <View style={styles.featureCard}>
//         <Text style={styles.featureTitle}>
//           📜 Scan History
//         </Text>
//         <Text style={styles.featureDesc}>
//           Save and view previous scan results.
//         </Text>
//       </View>

//       <View style={{ height: 50 }} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5FFF5",
//   },

//   header: {
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },

//   logo: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#1B5E20",
//   },

//   subText: {
//     fontSize: 15,
//     color: "#666",
//     marginTop: 5,
//     marginBottom: 20,
//   },
//   bannerImage: {
//   width: "100%",
//   height: 160,
//   borderRadius: 18,
// },

// scanBtn: {
//   backgroundColor: "#2E7D32",
//   paddingVertical: 14,
//   borderRadius: 15,
//   alignItems: "center",
//   justifyContent: "center",
//   marginTop: 15,
//   marginBottom: 20,
// },

// scanBtnText: {
//   color: "#FFFFFF",
//   fontSize: 18,
//   fontWeight: "bold",
// },
// scanBtnText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },

//   welcomeCard: {
//     backgroundColor: "#FFFFFF",
//     marginHorizontal: 20,
//     marginTop: 20,
//     padding: 18,
//     borderRadius: 20,
//   },

//   welcomeTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#1B5E20",
//   },

//   welcomeText: {
//     marginTop: 10,
//     color: "#666",
//     lineHeight: 22,
//   },

//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1B5E20",
//     marginHorizontal: 20,
//     marginTop: 25,
//     marginBottom: 15,
//   },

//   categoryContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//   },

//   categoryCard: {
//     width: "48%",
//     height: 150,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 15,
//   },

//   emoji: {
//     fontSize: 55,
//     marginBottom: 10,
//   },

//   cardText: {
//     fontSize: 16,
//     fontWeight: "600",
//   },

//   featureCard: {
//     backgroundColor: "#FFFFFF",
//     marginHorizontal: 20,
//     padding: 18,
//     borderRadius: 20,
//     marginBottom: 12,
//   },

//   featureTitle: {
//     fontSize: 17,
//     fontWeight: "bold",
//   },

//   featureDesc: {
//     color: "#666",
//     marginTop: 5,
//   },
// });

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from "react-native";
import { router } from "expo-router";

// ========================================
// ANIMATED CATEGORY CARD
// ========================================

function CategoryCard({
  emoji,
  title,
  subtitle,
  route,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  route: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.categoryCardWrapper,
        {
          transform: [{ scale }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.categoryCard}
        activeOpacity={0.9}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={() => router.push(route as any)}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>

        <Text style={styles.cardTitle}>{title}</Text>

        <Text style={styles.cardSubtitle}>
          {subtitle}
        </Text>

        <Text style={styles.exploreText}>
          Explore →
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ========================================
// FEATURE CARD
// ========================================

function FeatureCard({
  emoji,
  title,
  description,
  route,
}: {
  emoji: string;
  title: string;
  description: string;
  route?: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.featureWrapper,
        {
          transform: [{ scale }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.featureCard}
        activeOpacity={0.9}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={() => {
          if (route) {
            router.push(route as any);
          }
        }}
      >
        <View style={styles.featureIcon}>
          <Text style={styles.featureEmoji}>
            {emoji}
          </Text>
        </View>

        <View style={styles.featureContent}>
          <Text style={styles.featureTitle}>
            {title}
          </Text>

          <Text style={styles.featureDesc}>
            {description}
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ========================================
// HOME SCREEN
// ========================================

export default function HomeScreen() {
  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  const slideAnim = useRef(
    new Animated.Value(30)
  ).current;

  const scanScale = useRef(
    new Animated.Value(1)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const scanPressIn = () => {
    Animated.spring(scanScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const scanPressOut = () => {
    Animated.spring(scanScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim,
            },
          ],
        }}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              🌿 AI Plant Doctor
            </Text>

            <Text style={styles.subText}>
              Smart plant care powered by AI
            </Text>
          </View>

          <TouchableOpacity
            style={styles.dashboardTopButton}
            onPress={() =>
              router.push("/dashboard")
            }
          >
            <Text style={styles.dashboardTopText}>
              📊 Dashboard
            </Text>
          </TouchableOpacity>
        </View>

        {/* HERO SECTION */}

        <View style={styles.heroContainer}>
          <Image
            source={require("../../assets/images/hero_banner.png")}
            style={styles.bannerImage}
            resizeMode="cover"
          />

          <View style={styles.heroOverlay}>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>
                ✨ AI Powered
              </Text>
            </View>
          </View>
        </View>

        {/* SCAN BUTTON */}

        <Animated.View
          style={[
            styles.scanWrapper,
            {
              transform: [
                {
                  scale: scanScale,
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.scanBtn}
            activeOpacity={0.9}
            onPressIn={scanPressIn}
            onPressOut={scanPressOut}
            onPress={() =>
              router.push("/camera")
            }
          >
            <View style={styles.scanIconCircle}>
              <Text style={styles.scanIcon}>
                📷
              </Text>
            </View>

            <View style={styles.scanTextContainer}>
              <Text style={styles.scanBtnText}>
                Scan Your Plant
              </Text>

              <Text style={styles.scanSubText}>
                Capture a leaf to detect diseases
              </Text>
            </View>

            <Text style={styles.scanArrow}>
              →
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* WELCOME */}

        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIcon}>
            <Text style={styles.welcomeEmoji}>
              🌱
            </Text>
          </View>

          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>
              Your Smart Plant Assistant
            </Text>

            <Text style={styles.welcomeText}>
              Detect diseases, discover treatments,
              explore plants and track your plant
              health in one place.
            </Text>
          </View>
        </View>

        {/* EXPLORE HEADER */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Explore Plants
            </Text>

            <Text style={styles.sectionSubtitle}>
              Learn about different plant categories
            </Text>
          </View>
        </View>

        {/* CATEGORY CARDS */}

        <View style={styles.categoryContainer}>
          <CategoryCard
            emoji="🍎"
            title="Fruits"
            subtitle="Fruit plants & diseases"
            route="/plants/fruits"
          />

          <CategoryCard
            emoji="🥕"
            title="Vegetables"
            subtitle="Vegetable health guide"
            route="/plants/vegetables"
          />

          <CategoryCard
            emoji="🌹"
            title="Flowers"
            subtitle="Flower care & diseases"
            route="/plants/flowers"
          />

          <CategoryCard
            emoji="🌿"
            title="Medicinal"
            subtitle="Medicinal plant guide"
            route="/plants/medical"
          />
        </View>

        {/* FEATURES */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Smart Features
            </Text>

            <Text style={styles.sectionSubtitle}>
              Everything you need for healthier plants
            </Text>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <FeatureCard
            emoji="🤖"
            title="AI Disease Detection"
            description="Upload a plant image and identify possible diseases using AI."
            route="/camera"
          />

          <FeatureCard
            emoji="📜"
            title="Scan History"
            description="View your previous plant scans and disease results."
            route="/history"
          />

          <FeatureCard
            emoji="📊"
            title="Plant Dashboard"
            description="Track scans, healthy plants, diseases and useful analytics."
            route="/dashboard"
          />
        </View>

        {/* HEALTH SUMMARY */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Plant Health
            </Text>

            <Text style={styles.sectionSubtitle}>
              Your quick health overview
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>
              🔍
            </Text>

            <Text style={styles.statNumber}>
              24
            </Text>

            <Text style={styles.statLabel}>
              Total Scans
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>
              💚
            </Text>

            <Text style={styles.statNumber}>
              18
            </Text>

            <Text style={styles.statLabel}>
              Healthy
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>
              🦠
            </Text>

            <Text style={styles.statNumber}>
              6
            </Text>

            <Text style={styles.statLabel}>
              Diseased
            </Text>
          </View>
        </View>

        {/* TIP */}

        <View style={styles.tipCard}>
          <Text style={styles.tipEmoji}>
            💡
          </Text>

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Plant Care Tip
            </Text>

            <Text style={styles.tipText}>
              Capture clear leaf images in natural
              light for better disease detection.
            </Text>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </Animated.View>
    </ScrollView>
  );
}

// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF4",
  },

  scrollContent: {
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
    paddingHorizontal: 20,
  },

  // HEADER

  header: {
    paddingTop: 45,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#145A32",
  },

  subText: {
    fontSize: 14,
    color: "#6B7B6E",
    marginTop: 5,
  },

  dashboardTopButton: {
    backgroundColor: "#E4F5E8",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 30,
  },

  dashboardTopText: {
    color: "#176B38",
    fontWeight: "700",
  },

  // HERO

  heroContainer: {
    position: "relative",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",

    ...Platform.select({
      android: {
        elevation: 4,
      },

      web: {
        boxShadow:
          "0px 6px 20px rgba(0,0,0,0.10)",
      },
    }),
  },

  bannerImage: {
    width: "100%",
    height: 230,
  },

  heroOverlay: {
    position: "absolute",
    top: 15,
    right: 15,
  },

  aiBadge: {
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  aiBadgeText: {
    color: "#176B38",
    fontWeight: "bold",
    fontSize: 12,
  },

  // SCAN

  scanWrapper: {
    marginTop: 18,
  },

  scanBtn: {
    backgroundColor: "#218838",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",

    ...Platform.select({
      android: {
        elevation: 5,
      },

      web: {
        boxShadow:
          "0px 5px 15px rgba(33,136,56,0.25)",
      },
    }),
  },

  scanIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  scanIcon: {
    fontSize: 24,
  },

  scanTextContainer: {
    flex: 1,
    marginLeft: 15,
  },

  scanBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  scanSubText: {
    color: "#E8F5E9",
    fontSize: 12,
    marginTop: 3,
  },

  scanArrow: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },

  // WELCOME

  welcomeCard: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  welcomeIcon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeEmoji: {
    fontSize: 28,
  },

  welcomeContent: {
    flex: 1,
    marginLeft: 15,
  },

  welcomeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#145A32",
  },

  welcomeText: {
    color: "#68776B",
    marginTop: 6,
    lineHeight: 20,
  },

  // SECTION

  sectionHeader: {
    marginTop: 32,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#145A32",
  },

  sectionSubtitle: {
    color: "#758078",
    fontSize: 13,
    marginTop: 4,
  },

  // CATEGORIES

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryCardWrapper: {
    width: "48.5%",
    marginBottom: 16,
  },

  categoryCard: {
    minHeight: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",

    ...Platform.select({
      android: {
        elevation: 3,
      },

      web: {
        boxShadow:
          "0px 4px 14px rgba(0,0,0,0.07)",
      },
    }),
  },

  iconCircle: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#F0F9F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  emoji: {
    fontSize: 42,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B3D25",
  },

  cardSubtitle: {
    color: "#7A857C",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },

  exploreText: {
    color: "#218838",
    fontWeight: "700",
    marginTop: 12,
    fontSize: 13,
  },

  // FEATURES

  featuresContainer: {
    gap: 12,
  },

  featureWrapper: {
    width: "100%",
  },

  featureCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",

    ...Platform.select({
      android: {
        elevation: 2,
      },

      web: {
        boxShadow:
          "0px 3px 12px rgba(0,0,0,0.05)",
      },
    }),
  },

  featureIcon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: "#EAF7EC",
    alignItems: "center",
    justifyContent: "center",
  },

  featureEmoji: {
    fontSize: 27,
  },

  featureContent: {
    flex: 1,
    marginLeft: 15,
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1B3D25",
  },

  featureDesc: {
    color: "#727C74",
    marginTop: 4,
    lineHeight: 19,
    fontSize: 13,
  },

  arrow: {
    fontSize: 30,
    color: "#218838",
    marginLeft: 10,
  },

  // STATS

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    width: "31.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",

    ...Platform.select({
      android: {
        elevation: 2,
      },

      web: {
        boxShadow:
          "0px 3px 12px rgba(0,0,0,0.05)",
      },
    }),
  },

  statEmoji: {
    fontSize: 27,
  },

  statNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#218838",
    marginTop: 8,
  },

  statLabel: {
    color: "#727C74",
    marginTop: 3,
    fontSize: 12,
  },

  // TIP

  tipCard: {
    backgroundColor: "#E6F5E9",
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },

  tipEmoji: {
    fontSize: 32,
  },

  tipContent: {
    flex: 1,
    marginLeft: 15,
  },

  tipTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#145A32",
  },

  tipText: {
    color: "#536A58",
    marginTop: 5,
    lineHeight: 19,
  },
});
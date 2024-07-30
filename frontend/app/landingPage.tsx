import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Animated,
} from "react-native";
import { Button } from "@/components/ui/button";
import { Stack, Link, router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingCarousel } from "@/components/ui/onboarding-carousel";
import { Paginator } from "@/components/ui/paginator";

import onboardingSlides from "./onboardingSlides";

const LandingPage = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: () => null }} />
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("@/assets/images/padpals-image.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent", "transparent"]}
            style={styles.linearGradient}
          />
        </ImageBackground>

        <View style={styles.whiteSpace} />
      </View>

      <SafeAreaView style={styles.overlay}>
        <Image
          source={require("@/assets/images/padpals-logo.svg")}
          style={styles.logo}
          contentFit="contain"
        />
        <View style={styles.carouselImage}>
          <FlatList
            data={onboardingSlides}
            renderItem={({ item }) => <OnboardingCarousel item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            bounces={true}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={32}
            viewabilityConfig={viewConfig}
          />
        </View>
        <Paginator data={onboardingSlides} scrollX={scrollX} />
        <Button
          variant="default"
          title="Get Started"
          onPress={() => {
            router.push("/getStarted");
          }}
        />
        <Link style={styles.loginText} href={{ pathname: "logIn" }}>
          Log In
        </Link>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  backgroundContainer: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    height: "80%",
    flex: 3,
  },
  whiteSpace: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  logo: {
    width: "35%",
    height: 100,
    marginTop: 10,
    marginBottom: 15,
    flex: 0.1,
  },
  carouselImage: {
    flex: 0.75,
    height: "100%",
    width: "auto",
    paddingBottom: 5,
  },
  loginText: {
    paddingTop: 20,
    flex: 0.1,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
});

export default LandingPage;

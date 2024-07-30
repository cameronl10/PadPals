import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
} from "react-native";

interface OnboardingCarouselProps {
  item: {
    title: string;
    image: ImageSourcePropType;
  };
}

//Component Containing the Carousel for the Onboarding Images/Descriptions
export function OnboardingCarousel({ item }: OnboardingCarouselProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.desc}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  desc: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
  },
  textContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});

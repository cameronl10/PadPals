import React from "react";
import { View, Animated, useWindowDimensions, StyleSheet } from "react-native";

interface PaginatorProps {
  data: {
    id: string;
    title: string;
    image: string;
  }[];
  scrollX: {
    interpolate: Animated.AnimatedInterpolation<number>["interpolate"];
    setValue: Animated.Value["setValue"];
  };
}

//Paginator is the '4 dots' at the bottom of the onboarding screen. Should dynamically adjust based on the number of slides
export function Paginator({ data, scrollX }: PaginatorProps) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const color = scrollX.interpolate({
          inputRange,
          outputRange: ["#1A1C1C", "#37B3CC", "#1A1C1C"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, backgroundColor: color }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 64,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#37B3CC",
    marginHorizontal: 8,
  },
});

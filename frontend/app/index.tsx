import React, { useState } from 'react';
import { Text, View } from "react-native";
import { Button } from "../components/ui/button";

export default function Index() {
  
  //testing count
  const [count, setCount] = useState(0);
  function trackCount() {
    setCount(prevCount => prevCount + 1);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="bottom" title="bottom"/>
      <Button variant="default" title="default" onPress={trackCount}/>
      <Text>The count is now: {count}</Text>
    </View>
  );
}

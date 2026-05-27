import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { FONTS } from "@/constants/styles";

import { CustomFont } from "../fonts/font";
import { IconCircle } from "../icons/icons";

interface Props {
  maxValue: number;
  value: (currentVal: number) => void;
}

export default function CounterInput({ maxValue, value }: Props) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    value(counter);
  }, [counter]);

  return (
    <View style={styles.container}>
      <IconCircle
        isDisabled={counter === 0}
        name="chevron-down"
        onPress={() => setCounter((current) => current - 1)}
      />
      <CustomFont style={[FONTS.LARGE, FONTS.title, { color: "black" }]}>
        {counter}
      </CustomFont>
      <IconCircle
        isDisabled={counter === maxValue}
        name="chevron-up"
        onPress={() => setCounter((current) => current + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

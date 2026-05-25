import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CTA from "../buttons/cta";

export default function DetailsCard() {
  const navigateBack = () => {
    router.back();
  };
  return (
    <View>
      <CTA
        variant="back"
        style={styles.backCTA}
        title={"Back"}
        onPress={navigateBack}
      />
      <Text>klsd</Text>
      <TouchableOpacity onPress={undefined}>
        <Text>kaldsjf</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backCTA: {
    alignSelf: "flex-start",
    marginLeft: 6
  }
});

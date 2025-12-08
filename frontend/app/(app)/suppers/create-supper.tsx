import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import AnimatedTextInput from "@/components/inputs/text-input";
import { FONTS, SCREEN_STYLES } from "@/constants/styles";
import useSupper from "@/hooks/useSuppers";

export default function CreateSupper() {
  const backCta = () => {
    router.back();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const { createSupper } = useSupper();

  const createSupperHandler = async () => {
    await createSupper({ name, description });
  };

  return (
    <SafeAreaView style={SCREEN_STYLES.screen}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <CTA isSmall style={styles.backCTA} title={"Back"} onPress={backCta} />
        <Text style={FONTS.LARGE}>host you own supper club</Text>
        <AnimatedTextInput
          value={name}
          label={"Name"}
          onChangeText={(value) => setName(value)}
        />
        <AnimatedTextInput
          label={"Short Description"}
          value={description}
          onChangeText={(value) => setDescription(value)}
        />
        <AnimatedTextInput
          label={"Longer Description"}
          value={longDescription}
          onChangeText={(value) => setLongDescription(value)}
          isTextArea
        />
        <CTA title={"Create Supper Club"} onPress={createSupperHandler} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backCTA: {
    alignSelf: "baseline",
  },
  scrollview: {
    flex: 1,
  },
});

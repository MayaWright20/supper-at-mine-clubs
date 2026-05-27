import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import { CustomFont } from "@/components/fonts/font";
import AnimatedTextInput from "@/components/inputs/text-input";
import { COLORS } from "@/constants/colors";
import { FONTS, SCREEN_STYLES } from "@/constants/styles";
import useImagePicker from "@/hooks/useImagePicker";
import useSuppers from "@/hooks/useSuppers";

const defaultAvatar = require("../../../assets/images/masgot/masgot_wave.png");

export default function CreateSupper() {
  const backCta = () => {
    router.back();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");

  const { createSupper } = useSuppers();
  const { image, pickImage } = useImagePicker(defaultAvatar, true, 5);

  const createSupperHandler = async () => {
    if (
      !price.trim() ||
      !name.trim() ||
      !(longDescription || description).trim()
    ) {
      Alert.alert("Missing details", "Please add missing details.");
      return;
    }

    try {
      await createSupper({
        name: name.trim(),
        description: (longDescription || description).trim(),
        images: image,
        price: Number(price),
        availableSeats: Number(availableSeats)
      });
      router.back();
    } catch (error: any) {
      Alert.alert("Could not create supper", error.message);
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[SCREEN_STYLES.screen, styles.scrollview]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview}
      >
        <CTA
          variant="back"
          style={styles.backCTA}
          title={"Back"}
          onPress={backCta}
        />
        <CustomFont
          style={[FONTS.LARGE, FONTS.title]}
        >{`Create your own Supper club`}</CustomFont>
        <AnimatedTextInput
          value={name}
          label={"Event Name"}
          onChangeText={(value) => setName(value)}
          placeholder={"e.g. Around the World Supper"}
          color={COLORS.RED_0}
          labelColor={COLORS.CREAM_0}
        />
        {/* Authentic creole food make with recipe learned in the Seychelles */}
        <AnimatedTextInput
          label={"Price per seat"}
          value={price}
          onChangeText={(value) => setPrice(value)}
          color={COLORS.RED_0}
          labelColor={COLORS.CREAM_0}
          placeholder={"£30"}
          keyboardType="numeric"
        />
        <AnimatedTextInput
          label={"Number of seats"}
          value={availableSeats}
          onChangeText={(value) => setAvailableSeats(value)}
          color={COLORS.RED_0}
          labelColor={COLORS.CREAM_0}
          placeholder={"5"}
          keyboardType="number-pad"
        />
        <AnimatedTextInput
          label={"Tagline"}
          value={description}
          onChangeText={(value) => setDescription(value)}
          color={COLORS.RED_0}
          labelColor={COLORS.CREAM_0}
          placeholder={"A short description for your event"}
        />
        <AnimatedTextInput
          label={"Longer Description"}
          value={longDescription}
          onChangeText={(value) => setLongDescription(value)}
          isTextArea
          color={COLORS.RED_0}
          labelColor={COLORS.CREAM_0}
          placeholder={
            "A longer description for your event. Include your menu, the vibe of the event and the itinary."
          }
        />
        <CTA isTransparent title={"Add Supper Images"} onPress={pickImage} />

        {image.length && (
          <View style={styles.imagePreviewRow}>
            {image.map((image, index) => (
              <Image
                key={image}
                source={{ uri: image }}
                style={styles.imagePreview}
              />
            ))}
          </View>
        )}
        <CTA title={"Create Supper Club"} onPress={createSupperHandler} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backCTA: {
    alignSelf: "baseline"
  },
  imagePreview: {
    backgroundColor: COLORS.PINK_0,
    borderRadius: 12,
    height: 110,
    width: 110
  },
  imagePreviewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginVertical: 16
  },
  scrollview: {
    flexGrow: 1
  }
});

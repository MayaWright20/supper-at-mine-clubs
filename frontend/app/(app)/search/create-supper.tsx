import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import AnimatedTextInput from "@/components/inputs/text-input";
import { COLORS } from "@/constants/colors";
import { FONTS, SCREEN_STYLES } from "@/constants/styles";
import useSuppers from "@/hooks/useSuppers";

export default function CreateSupper() {
  const backCta = () => {
    router.back();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const { createSupper } = useSuppers();

  const pickSupperImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: true,
      mediaTypes: ["images"],
      quality: 1,
      selectionLimit: 5
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  const createSupperHandler = async () => {
    if (!name.trim() || !(longDescription || description).trim()) {
      Alert.alert("Missing details", "Please add a name and description.");
      return;
    }

    try {
      await createSupper({
        name: name.trim(),
        description: (longDescription || description).trim(),
        imageUris: images
      });
      router.back();
    } catch (error: any) {
      Alert.alert("Could not create supper", error.message);
    }
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
        <CTA title={"Add Supper Images"} onPress={pickSupperImages} />
        {!!images.length && (
          <View style={styles.imagePreviewRow}>
            {images.map((image, index) => (
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
    flex: 1
  }
});

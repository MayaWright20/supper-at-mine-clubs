import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export default function useImagePicker(
  placeholder: string,
  allowsMultipleSelection?: boolean,
  selectionLimit?: number
) {
  const [image, setImage] = useState<string | string[]>(placeholder);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: !allowsMultipleSelection,
      aspect: [4, 3],
      quality: 1,
      selectionLimit,
      allowsMultipleSelection
    });

    if (!result.canceled) {
      setImage(
        allowsMultipleSelection
          ? result.assets.map((asset) => asset.uri)
          : result.assets[0].uri
      );
    }
  };

  return {
    pickImage,
    image
  };
}

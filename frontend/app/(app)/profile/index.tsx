import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import CTA from "@/components/buttons/cta";
import { COLORS } from "@/constants/colors";
import { SCREEN_STYLES } from "@/constants/styles";
import useImagePicker from "@/hooks/useImagePicker";
import useProfile from "@/hooks/useProfile";
import { formatMemberSince } from "@/utils/dates";

export default function Index() {
  const { deleteProfile, logOut, updateProfilePicture, user } = useProfile();
  const { image, pickImage } = useImagePicker({ uri: user?.avatarUrl });
  const memberSince = formatMemberSince(user?.createdAt, user?._id);
  const currentAvatarRef = useRef(user?.avatarUrl);

  useEffect(() => {
    if (typeof image !== "object" || !("uri" in image) || !image.uri) return;
    if (image.uri === currentAvatarRef.current) return;

    const saveProfilePicture = async () => {
      try {
        await updateProfilePicture(image.uri!);
        currentAvatarRef.current = image.uri!;
      } catch (error: any) {
        Alert.alert("Could not update profile picture", error.message);
      }
    };

    saveProfilePicture();
  }, [image, updateProfilePicture]);

  useEffect(() => {
    currentAvatarRef.current = user?.avatarUrl;
  }, [user?.avatarUrl]);

  const deleteProfileHandler = () => {
    Alert.alert(
      "Delete profile?",
      "This will permanently remove your account.",
      [
        {
          style: "cancel",
          text: "Cancel"
        },
        {
          style: "destructive",
          text: "Delete",
          onPress: async () => {
            try {
              await deleteProfile();
            } catch (error: any) {
              Alert.alert("Could not delete profile", error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={SCREEN_STYLES.screen}>
      <View style={styles.card}>
        <Pressable onPress={pickImage}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        </Pressable>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.label}>Member profile</Text>
        <Text style={styles.memberSince}>Joined {memberSince}</Text>
      </View>
      <CTA
        title={"Sign Out"}
        onPress={() => {
          logOut();
        }}
        style={styles.button}
      />
      <CTA
        isTransparent
        title={"Delete profile"}
        onPress={deleteProfileHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: COLORS.PINK_1,
    borderRadius: 100,
    borderWidth: 1,
    height: 200,
    marginBottom: 18,
    marginTop: 8,
    overflow: "hidden",
    width: 200
  },
  avatarCTA: {
    marginBottom: 12
  },
  button: {
    marginTop: 18,
    width: "100%"
  },
  card: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: COLORS.RED_0,
    borderRadius: 28,
    borderWidth: 1,
    marginTop: 24,
    padding: 24
  },
  label: {
    fontSize: 14,
    letterSpacing: 1.2,
    marginBottom: 8,
    textTransform: "uppercase"
  },
  memberSince: {
    fontSize: 15
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6
  }
});

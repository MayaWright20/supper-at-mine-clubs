import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import CTA from "@/components/buttons/cta";
import { COLORS } from "@/constants/colors";
import { SCREEN_STYLES } from "@/constants/styles";
import useProfile from "@/hooks/useProfile";

export default function Index() {
  const { logOut, user } = useProfile();
  const memberSince = formatMemberSince(user?.createdAt, user?._id);

  return (
    <View style={SCREEN_STYLES.screen}>
      <View style={styles.card}>
        {user?.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar}></View>
        )}
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
    </View>
  );
}

function formatMemberSince(createdAt?: string, userId?: string) {
  const date = createdAt ? new Date(createdAt) : getDateFromObjectId(userId);

  if (!date || Number.isNaN(date.getTime())) {
    return "recently";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function getDateFromObjectId(userId?: string) {
  if (!userId || userId.length < 8) return null;

  const timestamp = parseInt(userId.substring(0, 8), 16) * 1000;
  return new Date(timestamp);
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: COLORS.PINK_1,
    borderRadius: 100,
    borderWidth: 1,
    height: 132,
    marginBottom: 18,
    marginTop: 8,
    overflow: "hidden",
    width: 132
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

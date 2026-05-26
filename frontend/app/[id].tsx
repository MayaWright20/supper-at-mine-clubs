import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import { COLORS } from "@/constants/colors";
import { components } from "@/types/types";

export default function DetailsCard() {
  const navigateBack = () => {
    router.back();
  };

  const { id, item } = useLocalSearchParams();
  const [supper, setSupper] = useState<components["schemas"]["Supper"] | null>(
    null
  );

  useEffect(() => {
    const itemString = Array.isArray(item) ? item[0] : item;
    if (itemString) {
      setSupper(JSON.parse(itemString));
    }
  }, [id, item]);

  const buyASeat = () => {
    // if youre hosting the club you shouldnt be able to book you should see how many seats are purchased and who is attending how much revenue its bringing in, be able to change the price for seats not taken, discount all seats but not put the price up for seats taken, cancel the event
    // payment page
    // show confirmation
    // booking should go under My suppers page - hosting
  };

  return (
    <SafeAreaView style={styles.page} edges={["top"]}>
      <ScrollView style={styles.page}>
        <CTA
          variant="back"
          style={styles.backCTA}
          title={"Back"}
          onPress={navigateBack}
        />
        {supper && (
          <>
            <Text>{supper.name}</Text>
            <Text>{supper.availableSeats}</Text>
            <Text>{supper.description}</Text>
            <CTA variant="default" title={"Book a seat"} onPress={buyASeat} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backCTA: {
    alignSelf: "flex-start",
    marginLeft: 6
  },
  page: {
    backgroundColor: COLORS.CREAM_0,
    flex: 1
  }
});

import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CTA from "@/components/buttons/cta";
import Header from "@/components/header/header";
import CheckoutForm from "@/components/stripe/checkout-form.native";
import {
  PAGE_BACKGROUND_COL,
  PAGE_PADDING_HORIZONTAL
} from "@/constants/styles";
import { components } from "@/types/types";

export default function DetailsCard() {
  const navigateBack = () => {
    router.back();
  };

  const { id, item } = useLocalSearchParams();
  const [supper, setSupper] = useState<components["schemas"]["Supper"] | null>(
    null
  );
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const itemString = Array.isArray(item) ? item[0] : item;
    if (itemString) {
      setSupper(JSON.parse(itemString));
    }
  }, [id, item]);

  const renderImage = ({
    item: imageUri,
    index
  }: {
    item: string;
    index: number;
  }) => (
    <View
      style={[
        styles.imageWrapper,
        {
          width: width,
          height: 300
        }
      ]}
    >
      <Image
        key={`${imageUri}-${index}`}
        source={{ uri: imageUri }}
        contentFit="cover"
        style={styles.image}
      />
    </View>
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <CTA
          variant="back"
          style={styles.backCTA}
          title={"Back"}
          onPress={navigateBack}
        />
        {supper && (
          <View>
            <Header title={supper.name} />

            {supper.images && supper.images.length > 0 && (
              <View style={styles.flatlist}>
                <FlatList
                  horizontal
                  data={supper.images}
                  renderItem={renderImage}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  scrollEnabled={true}
                  // showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
            <View style={styles.descriptionContainer}>
              <Text>Description: {supper.description}</Text>
              <Text>Price per seat: {supper.price}</Text>
              <Text>
                Number of seats left:{" "}
                {`${supper.availableSeats - supper.attendies.length} / `}
                {supper.availableSeats}
              </Text>

              <CheckoutForm amount={supper.price} />
            </View>
          </View>
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
  descriptionContainer: {
    marginVertical: 40,
    paddingHorizontal: PAGE_PADDING_HORIZONTAL
  },
  flatlist: {
    height: 300,
    width: "100%"
  },
  image: {
    borderRadius: 15,
    height: "100%",
    width: "95%"
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2
  },
  screen: {
    backgroundColor: PAGE_BACKGROUND_COL,
    flex: 1
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 50
  }
});

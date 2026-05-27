import Ionicons from "@expo/vector-icons/Ionicons";
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
import { CustomFont } from "@/components/fonts/font";
import Header from "@/components/header/header";
import CounterInput from "@/components/inputs/counter-input";
import CheckoutForm from "@/components/stripe/checkout-form.native";
import { COLORS } from "@/constants/colors";
import {
  BORDER_RADIUS,
  FONTS,
  PAGE_BACKGROUND_COL,
  PAGE_PADDING_HORIZONTAL
} from "@/constants/styles";
import useProfile from "@/hooks/useProfile";
import { components } from "@/types/types";

export default function DetailsCard() {
  const navigateBack = () => {
    router.back();
  };

  const { id, item } = useLocalSearchParams();
  const [supper, setSupper] = useState<components["schemas"]["Supper"] | null>(
    null
  );
  const [seats, setSeats] = useState<number>(0);
  const { width } = useWindowDimensions();
  const { currentUserId } = useProfile();

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
        <View style={styles.backFavouriteWrapper}>
          <CTA
            variant="back"
            style={styles.backCTA}
            title={"Back"}
            onPress={navigateBack}
          />
          <Ionicons name={"heart-outline"} color={COLORS.RED_0} size={40} />
        </View>

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
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}

            <View style={styles.descriptionContainer}>
              <CustomFont
                style={[FONTS.LARGE, FONTS.title]}
              >{`Hosted by`}</CustomFont>
              <CustomFont
                style={[FONTS.LARGE, FONTS.title]}
              >{`Description`}</CustomFont>
              <Text style={styles.text}>{supper.description}</Text>
              <View style={styles.priceWrapper}>
                <CustomFont
                  style={[FONTS.LARGE, FONTS.title]}
                >{`Price per seat:`}</CustomFont>
                <CustomFont
                  style={[FONTS.X_LARGE, FONTS.title, { color: "black" }]}
                >{`£${supper.price}`}</CustomFont>
              </View>
              <View style={styles.priceWrapper}>
                <CustomFont
                  style={[FONTS.LARGE, FONTS.title]}
                >{`Number of seats left:`}</CustomFont>
                <CustomFont
                  style={[FONTS.LARGE, FONTS.title, { color: "black" }]}
                >
                  {`${supper.availableSeats - supper.attendies.length} / `}
                  {supper.availableSeats}
                </CustomFont>
              </View>

              <Header title={`Booking`} />
              <CustomFont style={[FONTS.LARGE, FONTS.title]}>
                Number of seats:
              </CustomFont>
              <CounterInput
                value={(value) => setSeats(value)}
                maxValue={supper.availableSeats - supper.attendies.length}
              />

              <View style={styles.priceWrapper}>
                <CustomFont
                  style={[FONTS.LARGE, FONTS.title]}
                >{`Total:`}</CustomFont>
                <CustomFont
                  style={[FONTS.X_LARGE, FONTS.title, { color: "black" }]}
                >{`£${supper.price * seats}`}</CustomFont>
              </View>

              <CheckoutForm
                isDisabled={currentUserId === supper.createdBy || seats === 0}
                amount={supper.price * seats}
                supperId={supper._id}
                seats={seats}
              />
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
  backFavouriteWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10
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
    borderRadius: BORDER_RADIUS.SMALL,
    height: "100%",
    width: "95%"
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2
  },
  priceWrapper: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  screen: {
    backgroundColor: PAGE_BACKGROUND_COL,
    flex: 1
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 50
  },
  text: {
    fontSize: 18
  }
});

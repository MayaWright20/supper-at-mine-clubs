import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import UserIcon from "@/components/icons/user-icon";
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
import useSuppers from "@/hooks/useSuppers";
import { formatDate } from "@/utils/dates";

const DETAIL_POLL_INTERVAL_MS = 30000; // 15 seconds

export default function DetailsCard() {
  const navigateBack = () => {
    router.back();
  };

  const { id, item } = useLocalSearchParams();
  const { supper, setSupper, getSupper, isAttendingSupper } = useSuppers();
  const [seats, setSeats] = useState<number>(0);
  const { width } = useWindowDimensions();
  const { user } = useProfile();
  const isFocused = useRef(false);

  useEffect(() => {
    const itemString = Array.isArray(item) ? item[0] : item;
    if (itemString) {
      setSupper(JSON.parse(itemString));
    }
  }, [id, item, setSupper]);

  useFocusEffect(
    useCallback(() => {
      isFocused.current = true;
      const supperId = Array.isArray(id) ? id[0] : id;
      getSupper(supperId);

      // Poll for updates while this screen is in focus
      const intervalId = setInterval(() => {
        if (isFocused.current) {
          getSupper(supperId);
        }
      }, DETAIL_POLL_INTERVAL_MS);

      return () => {
        isFocused.current = false;
        clearInterval(intervalId);
      };
    }, [id, getSupper])
  );

  const seatsLeft = useMemo(
    () => supper && supper.availableSeats - supper.attendies.length,
    [supper]
  );

  const isAttendingCurrentSupper = useMemo(
    () => isAttendingSupper(id),
    [id, isAttendingSupper]
  );

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

  const formattedDate = supper?.dateOfEvent
    ? formatDate(new Date(supper.dateOfEvent))
    : "";

  const formattedTime = supper?.dateOfEvent
    ? new Date(supper.dateOfEvent).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";

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
          <>
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
              <View style={styles.backFavouriteWrapper}>
                <CustomFont style={[FONTS.MEDIUM, FONTS.title]}>
                  Date:
                </CustomFont>
                <CustomFont
                  style={[FONTS.MEDIUM, FONTS.title, { color: "black" }]}
                >
                  {formattedDate}
                </CustomFont>
              </View>
              <View style={styles.backFavouriteWrapper}>
                <CustomFont style={[FONTS.MEDIUM, FONTS.title]}>
                  Time:
                </CustomFont>
                <CustomFont
                  style={[FONTS.MEDIUM, FONTS.title, { color: "black" }]}
                >
                  {formattedTime}
                </CustomFont>
              </View>

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
                  {`${seatsLeft} / `}
                  {supper.availableSeats}
                </CustomFont>
              </View>
              <CustomFont
                style={[FONTS.LARGE, FONTS.title]}
              >{`Hosted By:`}</CustomFont>
              <UserIcon
                isBlurred={false}
                size={80}
                uri={supper.createdBy.avatar}
              />
              <CustomFont
                style={[FONTS.LARGE, FONTS.title]}
              >{`Attendies:`}</CustomFont>
              <FlatList
                horizontal
                data={supper.attendies}
                renderItem={({ item }) => (
                  <UserIcon
                    // isBlurred={!(user.username === supper.createdBy.username) }
                    isBlurred={
                      !(
                        isAttendingCurrentSupper ||
                        user.username === supper.createdBy.username
                      )
                    }
                    size={35}
                    uri={item.avatar}
                  />
                )}
                keyExtractor={(item, index) => `${item}-${index}`}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
              />

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
                isSoldout={seatsLeft && seatsLeft <= 0 ? true : false}
                isDisabled={
                  user.username === supper.createdBy.username || seats === 0
                }
                amount={supper.price * seats}
                supperId={supper._id}
                seats={seats}
              />
            </View>
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
  backFavouriteWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10
  },
  createdByIcon: {
    alignItems: "flex-end",
    margin: PAGE_PADDING_HORIZONTAL
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

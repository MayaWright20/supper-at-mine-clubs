import { FlatList, StyleSheet, Text, View } from "react-native";

import Card from "@/components/cards/card";
import Header from "@/components/header/header";
import { COLORS } from "@/constants/colors";
import { SCREEN_STYLES } from "@/constants/styles";
import useSuppers from "@/hooks/useSuppers";

export default function Index() {
  const { myFavouriteSuppers } = useSuppers();

  return (
    <View style={SCREEN_STYLES.screen}>
      <Header title="Favourites" />
      {myFavouriteSuppers.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No favourites yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the heart icon on a supper to add it to your favourites
          </Text>
        </View>
      ) : (
        <FlatList
          data={myFavouriteSuppers}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card
              id={item._id}
              item={item}
              title={item.name}
              image={item.images}
              meta={`£${item.price} · ${item.availableSeats - item.attendies.length} seats left`}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40
  },
  emptySubtext: {
    color: "#7A685D",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center"
  },
  emptyText: {
    color: COLORS.RED_0,
    fontSize: 18,
    fontWeight: "600"
  },
  list: {
    gap: 16,
    padding: 16
  }
});

import { FlatList, StyleSheet, Text, View } from "react-native";

import AnimatedCard from "@/components/cards/animated-card";
import { SCREEN_STYLES } from "@/constants/styles";
import useSuppers from "@/hooks/useSuppers";

export default function Index() {
  const { mySuppers } = useSuppers();

  return (
    <View style={SCREEN_STYLES.screen}>
      <Text style={styles.name}>Your Suppers</Text>
      <View style={styles.flatlistWrapper}>
        <FlatList
          data={mySuppers}
          horizontal
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <AnimatedCard
                item={item}
                index={index}
                key={index}
                style={styles.card}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: undefined,
    width: "48%"
  },
  flatlistWrapper: {
    height: "50%",
    width: "100%"
  },
  listContent: {
    paddingRight: 16
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6
  },
  separator: {
    width: 10
  }
});

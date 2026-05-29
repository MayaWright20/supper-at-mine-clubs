import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedCard from "@/components/cards/animated-card";
import { CustomFont } from "@/components/fonts/font";
import Header from "@/components/header/header";
import {
  FONTS,
  PAGE_BACKGROUND_COL,
  PAGE_PADDING_HORIZONTAL
} from "@/constants/styles";
import useSuppers from "@/hooks/useSuppers";
import { components } from "@/types/types";

interface Props {
  data: components["schemas"]["Supper"][];
  title: string;
}

function Section({ data, title }: Props) {
  const { height: windowHeight } = useWindowDimensions();
  const cardHeight = windowHeight / 3;
  return (
    <View>
      <View style={styles.sectionPadding}>
        <CustomFont style={[FONTS.LARGE, FONTS.title]}>{title}</CustomFont>
      </View>

      <View style={[styles.flatlistWrapper, { height: cardHeight }]}>
        <FlatList
          data={data}
          horizontal
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            return (
              <AnimatedCard item={item} index={index} style={styles.card} />
            );
          }}
        />
      </View>
    </View>
  );
}

export default function Index() {
  const { myHostingSuppers, myBookedSuppers } = useSuppers();

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.sectionPadding}>
          <Header title="My Suppers" />
        </View>
        <Section title="Hosting" data={myHostingSuppers} />
        <Section title="Booked" data={myBookedSuppers} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: undefined,
    width: "48%"
  },
  flatlistWrapper: {
    minHeight: 200,
    width: "100%"
  },
  listContent: {
    marginLeft: 5,
    paddingRight: 16
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6
  },
  screen: {
    backgroundColor: PAGE_BACKGROUND_COL,
    flex: 1
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 50
  },
  sectionPadding: {
    paddingHorizontal: PAGE_PADDING_HORIZONTAL
  },
  separator: {
    width: 10
  }
});

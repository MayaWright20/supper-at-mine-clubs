import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";

import { CustomFont } from "../fonts/font";

type HeaderProps = {
  children?: ReactNode;
  title?: string;
};

export default function Header({ children, title }: HeaderProps) {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <CustomFont style={[styles.title]}>{title ?? children}</CustomFont>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: COLORS.RED_0,
    borderBottomWidth: 1,
    marginBottom: 20,
    marginHorizontal: 80
  },
  title: {
    color: COLORS.RED_0,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    textAlign: "center",
    textTransform: "uppercase"
  }
});

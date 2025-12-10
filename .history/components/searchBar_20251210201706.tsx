import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchIcon } from "../assets/icons/icons";
import { Color, Gap, Padding, Typography } from "../constants/GlobalStyles";

const SearchBarBase = () => {
  return (
    <SafeAreaView style={styles.searchBarBase}>
      <View style={[styles.view, styles.viewFlexBox]}>
        <View style={[styles.innerContainer, styles.viewFlexBox]}>
          <SearchIcon color={Color.colorDarkgray} size={20} />
          <Text style={styles.placeholderText}>Rezept suchen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarBase: {
    backgroundColor: Color.colorGray100,
    flex: 1,
  },
  viewFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  view: {
    width: "100%",
    height: 48,
    padding: Padding.padding_4,
    minHeight: 40,
    backgroundColor: Color.colorGray100,
  },
  innerContainer: {
    paddingHorizontal: Padding.padding_4,
    paddingVertical: 0,
    gap: Gap.gap_8,
  },
  placeholderText: {
    ...Typography.subheadlineRegular,
    color: Color.colorDarkgray,
    textAlign: "center",
  },
});

export default SearchBarBase;

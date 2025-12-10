import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchIcon } from "../assets/icons/icons";
import { Color, Gap, Padding, Typography } from "../constants/GlobalStyles";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <SearchIcon color={Color.colorDarkgray} size={20} />
      <Text style={styles.placeholderText}>Rezept suchen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingLeft: 16,
    backgroundColor: Color.neutralInputOnDark,
    borderRadius: 32,
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
    color: Color.neutralTextOrTabGrey,
    textAlign: "center",
  },
});

export default SearchBar;

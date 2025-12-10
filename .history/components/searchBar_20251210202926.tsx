import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchIcon } from "../assets/icons/icons";
import { Color, Gap, Padding, Typography } from "../constants/GlobalStyles";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <SearchIcon color={Color.colorDarkgray} size={20} />
        <Text style={styles.placeholderText}>Rezept suchen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Color.neutralInputOnDark,
    borderRadius: 32,
  },
  inn: {
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
  },
});

export default SearchBar;

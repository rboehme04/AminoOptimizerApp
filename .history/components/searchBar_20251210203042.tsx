import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchIcon } from "../assets/icons/icons";
import { Color, Gap, Padding, Typography } from "../constants/GlobalStyles";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <SearchIcon color={Color.neutralTextOrTabGrey} size={20} />
      <Text style={styles.placeholderText}>Rezept suchen</Text>
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
  placeholderText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
});

export default SearchBar;

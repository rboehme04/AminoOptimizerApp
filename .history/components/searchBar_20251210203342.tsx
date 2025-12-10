import * as React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SearchIcon } from "../assets/icons/icons";
import { Color, Gap, Padding, Typography } from "../constants/GlobalStyles";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <SearchIcon color={Color.neutralTextOrTabGrey} size={20} />
      <TextInput style={styles.placeholderText} placeholder="Rezept suchen" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
    backgroundColor: Color.neutralInputOnDark,
    borderRadius: 32,
  },
  placeholderText: {
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
  },
});

export default SearchBar;

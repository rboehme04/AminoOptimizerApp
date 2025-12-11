import * as React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { SearchIcon } from "../assets/icons/icons";
import { Color, Typography } from "../constants/GlobalStyles";

type Props = {
  placeholder?: string;
};

const SearchBar = React.forwardRef<TextInput, Props>(
  ({ placeholder = "Placeholder" }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const textInputRef = React.useRef<TextInput>(null);

    // Merge the forwarded ref with the internal ref
    React.useImperativeHandle(ref, () => textInputRef.current as TextInput);

    return (
      <View style={[styles.container, isFocused && styles.containerFocused]}>
        <Pressable style={styles.iconClickContainer} onPress={() => textInputRef.current?.focus()}>
          <SearchIcon color={Color.neutralTextOrTabGrey} size={20} />
        </Pressable>
        <TextInput
          ref={textInputRef}
          style={styles.placeholderText}
          placeholder={placeholder}
          placeholderTextColor={Color.neutralTextOrTabGrey}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: Color.neutralInputOnDark,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Color.neutralInputOnDark,
  },
  
  containerFocused: {
    borderColor: Color.neutralWhite,
  },
  placeholderText: {
    flex: 1,
    ...Typography.subheadlineRegular,
    color: Color.neutralTextOrTabGrey,
    paddingVertical: 13,
    backgroundColor: "red",
  },
});

export default SearchBar;

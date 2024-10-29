import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
  } from "react-native";
  import React, { useState } from "react";
  const { height } = Dimensions.get("window");

  const AppTextInput: React.FC<TextInputProps> = ({ value, onChangeText, ...otherProps }) => {
    const [focused, setFocused] = useState<boolean>(false);
    return (
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={"dark"}
        style={[
          {
            fontFamily: "poppins-regular",
            fontSize: 14,
            padding: 20,
            width: height / 2.3,
            backgroundColor: "#f1f4ff",
            borderRadius: 10,
            marginVertical: 10,
          },
          focused && {
            borderWidth: 3,
            borderColor: "#1E319D",
            shadowOffset: { width: 4, height: 10 },
            shadowColor: "blue",
            shadowOpacity: 0.2,
            shadowRadius: 10,
          },
        ]}
        {...otherProps}
      />
    );
  };
  
  export default AppTextInput;
  
  const styles = StyleSheet.create({});
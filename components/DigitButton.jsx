import { Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const DigitButton = ({ selectedDigit, digit, onPress, marginStart = 0 }) => {
  useEffect(() => {
    if (selectedDigit === 0 && digit === "0") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedDigit, digit]);

  const [disabled, setDisabled] = useState(false);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress(digit)}
      style={{
        backgroundColor: "lightgray",
        marginStart: marginStart,
        width: 30,
        height: 30,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: disabled ? "gray" : "black",
        }}
      >
        {digit}
      </Text>
    </TouchableOpacity>
  );
};

export default DigitButton;

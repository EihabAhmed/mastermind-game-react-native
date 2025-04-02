import { Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const DigitButton = ({
  selectedDigit,
  digit,
  gameOver,
  onPress,
  marginStart = 0,
}) => {
  useEffect(() => {
    if (gameOver) {
      setDisabled(true);
    } else if (selectedDigit === 0 && digit === "0") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedDigit, digit, gameOver]);

  const [disabled, setDisabled] = useState(false);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress(digit)}
      style={{
        backgroundColor: "lightgray",
        marginStart: marginStart,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
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

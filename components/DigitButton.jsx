import { Text, TouchableOpacity } from "react-native";

const DigitButton = ({ digit, disabled, onPress, marginStart = 0 }) => {
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
          color: disabled ? "#a0a0a0" : "black",
        }}
      >
        {digit}
      </Text>
    </TouchableOpacity>
  );
};

export default DigitButton;

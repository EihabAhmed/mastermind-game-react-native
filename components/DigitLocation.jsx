import { Pressable, Text, View } from "react-native";

const DigitLocation = ({ digitLocation, selectedDigit, digit, onPress }) => {
  return (
    <Pressable onPress={() => onPress(digitLocation)}>
      <Text
        style={{
          marginBottom: 10,
          fontSize: 32,
          textAlign: "center",
        }}
      >
        {digit}
      </Text>

      <View
        style={{
          width: 25,
          height: 2,
          backgroundColor:
            selectedDigit === digitLocation ? "black" : "lightgray",
        }}
      ></View>
    </Pressable>
  );
};

export default DigitLocation;

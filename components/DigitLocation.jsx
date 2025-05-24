import { Pressable, Text, View } from "react-native";

const DigitLocation = ({
  digitLocation,
  selectedDigitLocation,
  digit,
  digitLocationPressed,
}) => {
  return (
    <Pressable onPress={() => digitLocationPressed(digitLocation)}>
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
            selectedDigitLocation === digitLocation ? "black" : "lightgray",
        }}
      ></View>
    </Pressable>
  );
};

export default DigitLocation;

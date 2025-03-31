import DigitButton from "@/components/DigitButton";
import DigitLocation from "@/components/DigitLocation";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [win, setWin] = useState(true);
  const [lose, setLose] = useState(false);

  const [selectedDigit, setSelectedDigit] = useState(0);

  const [digitsStrings, setDigitsStrings] = useState(["", "", "", ""]);

  const digitClicked = (clickedDigit: string) => {
    setDigitsStrings(
      digitsStrings.map((digit, index) => {
        if (index === selectedDigit) {
          return clickedDigit;
        } else {
          return digit;
        }
      })
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 3,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            fontSize: 36,
            fontWeight: "bold",
            color: "steelblue",
          }}
        >
          Mastermind
        </Text>

        <View
          style={{
            marginTop: 10,
            width: 150,
            height: 70,
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            paddingBottom: 10,
          }}
        >
          <DigitLocation
            digitLocation={0}
            selectedDigit={selectedDigit}
            digit={digitsStrings[0]}
            onPress={setSelectedDigit}
          />

          <DigitLocation
            digitLocation={1}
            selectedDigit={selectedDigit}
            digit={digitsStrings[1]}
            onPress={setSelectedDigit}
          />

          <DigitLocation
            digitLocation={2}
            selectedDigit={selectedDigit}
            digit={digitsStrings[2]}
            onPress={setSelectedDigit}
          />

          <DigitLocation
            digitLocation={3}
            selectedDigit={selectedDigit}
            digit={digitsStrings[3]}
            onPress={setSelectedDigit}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <DigitButton
            selectedDigit={selectedDigit}
            digit="1"
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="2"
            marginStart={30}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="3"
            marginStart={30}
            onPress={digitClicked}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <DigitButton
            selectedDigit={selectedDigit}
            digit="4"
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="5"
            marginStart={30}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="6"
            marginStart={30}
            onPress={digitClicked}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <DigitButton
            selectedDigit={selectedDigit}
            digit="7"
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="8"
            marginStart={30}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="9"
            marginStart={30}
            onPress={digitClicked}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <DigitButton
            selectedDigit={selectedDigit}
            digit="0"
            onPress={digitClicked}
          />
        </View>

        <TouchableOpacity
          onPress={() => {}}
          style={{
            marginTop: 20,
            padding: 6,
            borderRadius: 6,
            backgroundColor: "#666666",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>

        <FlatList
          data={[
            "Hello",
            "World",
            "Hi",
            "There",
            "Hello",
            "World",
            "Hi",
            "There",
          ]}
          renderItem={({ item }) => (
            <Text
              style={{ marginBottom: 10, fontSize: 14, textAlign: "center" }}
            >
              {item}
            </Text>
          )}
          style={{
            marginTop: 10,
            height: "40%",
            flexGrow: 0,
            width: "30%",
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Text
        style={{
          flex: 1,
          marginTop: 30,
          fontSize: 24,
          fontWeight: "bold",
          color: win ? "#0000ff" : "#ff0000",
        }}
      >
        {win ? "You Win!" : lose ? "You Lose!" : ""}
      </Text>
    </View>
  );
}

import DigitButton from "@/components/DigitButton";
import DigitLocation from "@/components/DigitLocation";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  const [selectedDigit, setSelectedDigit] = useState(0);

  const [inputDigits, setInputDigits] = useState(["", "", "", ""]);
  const [solution, setSolution] = useState(["", "", "", ""]);

  type Answer = {
    answer: string;
    result: string;
  };

  const [answers, setAnswers] = useState<Answer[]>([]);

  const generateGame = () => {
    const sol = [];
    sol.push((Math.floor(Math.random() * 9) + 1).toString());

    while (true) {
      const num = Math.floor(Math.random() * 10).toString();
      if (num != sol[0]) {
        sol.push(num);
        break;
      }
    }

    while (true) {
      const num = Math.floor(Math.random() * 10).toString();
      if (num != sol[0] && num != sol[1]) {
        sol.push(num);
        break;
      }
    }

    while (true) {
      const num = Math.floor(Math.random() * 10).toString();
      if (num != sol[0] && num != sol[1] && num != sol[2]) {
        sol.push(num);
        break;
      }
    }
    console.log(sol);

    setSolution(
      sol.map((digit, index) => {
        return digit;
      })
    );
  };

  useEffect(() => {
    generateGame();
  }, []);

  const digitClicked = (clickedDigit: string) => {
    setInputDigits(
      inputDigits.map((digit, index) => {
        if (index === selectedDigit) {
          return clickedDigit;
        } else {
          return digit;
        }
      })
    );
  };

  const submitAnswer = () => {
    for (let i = 0; i < inputDigits.length; i++) {
      if (inputDigits[i] === "") {
        Alert.alert("Invalid answer", "Please enter all digits");
        return;
      }
    }

    for (let i = 0; i < inputDigits.length - 1; i++) {
      for (let j = i + 1; j < inputDigits.length; j++) {
        if (inputDigits[i] === inputDigits[j]) {
          Alert.alert("Invalid answer", "Digits cannot be repeated");
          return;
        }
      }
    }

    let stars = 0;
    let dots = 0;

    for (let i = 0; i < inputDigits.length; i++) {
      for (let j = 0; j < solution.length; j++) {
        if (inputDigits[i] === solution[j]) {
          if (i === j) {
            stars++;
          } else {
            dots++;
          }
          break;
        }
      }
    }

    const inputAnswer =
      inputDigits[0] + inputDigits[1] + inputDigits[2] + inputDigits[3];

    let result = "";
    // console.log(stars);
    // console.log(dots);
    for (let i = 0; i < stars; i++) {
      result = result + "*";
    }
    for (let i = 0; i < dots; i++) {
      result = result + ".";
    }

    const answer: Answer = {
      answer: inputAnswer,
      result: result,
    };
    setAnswers((prev) => [...prev, answer]);

    if (stars === 4) {
      setWin(true);
      return;
    } else if (answers.length === 9) {
      setLose(true);
      return;
    }

    setInputDigits(
      inputDigits.map(() => {
        return "";
      })
    );

    setSelectedDigit(0);

    // console.log(answers);
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
          flex: 7,
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
            digit={inputDigits[0]}
            onPress={setSelectedDigit}
          />

          <DigitLocation
            digitLocation={1}
            selectedDigit={selectedDigit}
            digit={inputDigits[1]}
            onPress={setSelectedDigit}
          />

          <DigitLocation
            digitLocation={2}
            selectedDigit={selectedDigit}
            digit={inputDigits[2]}
            onPress={setSelectedDigit}
          />

          <DigitLocation
            digitLocation={3}
            selectedDigit={selectedDigit}
            digit={inputDigits[3]}
            onPress={setSelectedDigit}
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
            digit="1"
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="2"
            marginStart={5}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="3"
            marginStart={5}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="4"
            marginStart={5}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="5"
            marginStart={5}
            onPress={digitClicked}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <DigitButton
            selectedDigit={selectedDigit}
            digit="6"
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="7"
            marginStart={5}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="8"
            marginStart={5}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="9"
            marginStart={5}
            onPress={digitClicked}
          />

          <DigitButton
            selectedDigit={selectedDigit}
            digit="0"
            marginStart={5}
            onPress={digitClicked}
          />
        </View>

        <TouchableOpacity
          onPress={submitAnswer}
          style={{
            marginTop: 10,
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
          data={answers}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
              }}
            >
              <Text>{index + 1})</Text>

              <Text
                style={{ fontSize: 14, textAlign: "center", marginStart: 10 }}
              >
                {item.answer}
              </Text>

              <Text style={{ fontSize: 24, marginStart: 10 }}>
                {item.result}
              </Text>
            </View>
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

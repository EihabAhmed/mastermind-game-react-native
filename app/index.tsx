import DigitButton from "@/components/DigitButton";
import DigitLocation from "@/components/DigitLocation";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  type Answer = {
    answer: string;
    result: string;
  };

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

    return sol;
  };

  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  const [selectedDigitLocation, setSelectedDigitLocation] = useState(0);

  const [inputDigits, setInputDigits] = useState(["", "", "", ""]);

  const [submitDisabled, setSubmitDisabled] = useState(true);

  // const solution = useRef<string[]>([]);
  // if (solution.current.length === 0) {
  //   solution.current = generateGame();
  // }

  const [solution, setSolution] = useState<string[]>(() => generateGame());

  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    for (let i = 0; i < inputDigits.length; i++) {
      if (inputDigits[i] === "") {
        setSubmitDisabled(true);
        return;
      }
    }

    setSubmitDisabled(false);
  }, [inputDigits]);

  const digitClicked = (clickedDigit: string) => {
    setInputDigits(
      inputDigits.map((digit, index) => {
        if (index === selectedDigitLocation) {
          return clickedDigit;
        } else {
          return digit;
        }
      })
    );

    const nextDigit =
      selectedDigitLocation === 3 ? 0 : selectedDigitLocation + 1;

    setSelectedDigitLocation(nextDigit);
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

    for (let i = 0; i < stars; i++) {
      result = result + "*";
    }
    for (let i = 0; i < dots; i++) {
      result = result + "-";
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
      // current answer is the 10th wrong answer
      setLose(true);
      return;
    }

    setInputDigits(
      inputDigits.map(() => {
        return "";
      })
    );

    setSelectedDigitLocation(0);

    setSubmitDisabled(true);

    // console.log(answers);
  };

  const newGame = () => {
    setWin(false);
    setLose(false);
    setSelectedDigitLocation(0);
    setInputDigits(
      inputDigits.map(() => {
        return "";
      })
    );
    setSolution(generateGame());
    setAnswers([]);
  };

  const checkDigitButtonDisabled = (digit: string) => {
    if (win || lose) {
      return true;
    }

    if (selectedDigitLocation === 0 && digit === "0") {
      return true;
    }

    for (let i = 0; i < inputDigits.length; i++) {
      if (inputDigits[i] === digit) {
        return true;
      }
    }

    return false;
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#eeeeee",
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
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: answers.length < 7 ? 16 : 24,
              color: answers.length < 7 ? "blue" : "red",
              fontWeight: "bold",
            }}
          >
            Attempt {win || lose ? answers.length : answers.length + 1}:
          </Text>
          <View
            style={{
              marginStart: 10,
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
              selectedDigitLocation={selectedDigitLocation}
              digit={inputDigits[0]}
              digitLocationPressed={setSelectedDigitLocation}
            />

            <DigitLocation
              digitLocation={1}
              selectedDigitLocation={selectedDigitLocation}
              digit={inputDigits[1]}
              digitLocationPressed={setSelectedDigitLocation}
            />

            <DigitLocation
              digitLocation={2}
              selectedDigitLocation={selectedDigitLocation}
              digit={inputDigits[2]}
              digitLocationPressed={setSelectedDigitLocation}
            />

            <DigitLocation
              digitLocation={3}
              selectedDigitLocation={selectedDigitLocation}
              digit={inputDigits[3]}
              digitLocationPressed={setSelectedDigitLocation}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <DigitButton
            digit="1"
            disabled={checkDigitButtonDisabled("1")}
            digitButtonPressed={digitClicked}
          />

          <DigitButton
            digit="2"
            disabled={checkDigitButtonDisabled("2")}
            marginStart={5}
            digitButtonPressed={digitClicked}
          />

          <DigitButton
            digit="3"
            disabled={checkDigitButtonDisabled("3")}
            marginStart={5}
            digitButtonPressed={digitClicked}
          />

          <DigitButton
            digit="4"
            disabled={checkDigitButtonDisabled("4")}
            marginStart={5}
            digitButtonPressed={digitClicked}
          />

          <DigitButton
            digit="5"
            disabled={checkDigitButtonDisabled("5")}
            marginStart={5}
            digitButtonPressed={digitClicked}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <DigitButton
            digit="6"
            disabled={checkDigitButtonDisabled("6")}
            digitButtonPressed={digitClicked}
          />

          <DigitButton
            digit="7"
            disabled={checkDigitButtonDisabled("7")}
            marginStart={5}
            digitButtonPressed={digitClicked}
          />

          <DigitButton
            digit="8"
            disabled={checkDigitButtonDisabled("8")}
            marginStart={5}
            digitButtonPressed={digitClicked}
          />

          <DigitButton
            digit="9"
            disabled={checkDigitButtonDisabled("9")}
            marginStart={5}
            digitButtonPressed={digitClicked}
          />

          <DigitButton
            digit="0"
            disabled={checkDigitButtonDisabled("0")}
            marginStart={5}
            digitButtonPressed={digitClicked}
          />
        </View>

        <TouchableOpacity
          disabled={win || lose || submitDisabled}
          onPress={submitAnswer}
          style={{
            marginTop: 10,
            padding: 6,
            borderRadius: 6,
            backgroundColor:
              win || lose || submitDisabled ? "#cccccc" : "#666666",
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
          data={answers.toReversed()}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
              }}
            >
              <Text>{answers.length - index})</Text>

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
            width: "50%",
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: win ? "#0000ff" : "#ff0000",
        }}
      >
        {win
          ? "You Win!"
          : lose
          ? `You Lose! Number is: ${solution[0]}${solution[1]}${solution[2]}${solution[3]}`
          : ""}
      </Text>

      <TouchableOpacity
        disabled={!(win || lose)}
        onPress={newGame}
        style={{
          marginTop: 10,
          marginBottom: 30,
          padding: 6,
          borderRadius: 6,
          backgroundColor: win || lose ? "#666666" : "#eeeeee",
          minWidth: "30%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: win || lose ? "white" : "#eeeeee",
          }}
        >
          New Game
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const win = 1;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
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
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Mastermind
        </Text>

        <View
          style={{
            width: 150,
            height: 70,
            borderWidth: 1,
          }}
        ></View>

        <TouchableOpacity
          onPress={() => {}}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 4,
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
            <Text style={{ marginBottom: 20, fontSize: 14 }}>{item}</Text>
          )}
          style={{
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
          color: win == 1 ? "#00ff00" : "#ff0000",
        }}
      >
        {win == 1 ? "You Win!" : win == 2 ? "You Lose!" : ""}
      </Text>
    </View>
  );
}

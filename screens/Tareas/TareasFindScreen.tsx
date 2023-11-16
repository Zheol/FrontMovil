import { Dimensions, View, Text, ImageBackground } from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";

const { height } = Dimensions.get("window");

export default function TareasFindScreen() {
  return (
    <View
      style={{
        padding: Spacing * 2,
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.large,
            maxWidth: "60%",
            textAlign: "center",
          }}
        >
          Find Tareas
        </Text>
      </View>
    </View>
  );
}

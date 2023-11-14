import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { Controller, useForm } from "react-hook-form";
import AppTextInput from "../components/AppTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Colors from "../constants/Colors";
import { RootStackParamList, formForgotPass } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPass">;

const { height } = Dimensions.get("window");

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});

const ForgotPassword: React.FC<Props> = ({ navigation: { navigate } }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onPressSend = (formData: formForgotPass) => {
    setLoading(true);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <ImageBackground
          style={{
            height: height / 2.2,
            marginTop: 50,
            marginBottom: 10,
          }}
          resizeMode="contain"
          source={require("../assets/images/welcome.png")}
        />
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
            Forgot password
          </Text>
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <AppTextInput
              value={value}
              onChangeText={onChange}
              placeholder="Email"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
        )}

        {loading ? (
          <View
            style={{
              padding: Spacing * 1.5,
              marginVertical: Spacing * 3,
            }}
          >
            <ActivityIndicator size="large" color="#d2691e" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onPressSend)}
            style={{
              padding: Spacing * 1.5,
              backgroundColor: "#000000",
              marginVertical: Spacing * 3,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

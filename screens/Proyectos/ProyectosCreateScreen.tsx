import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import {RootStackParamList, formCreateProyect, formLogin, formRegister } from "../../types";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import AppTextInput from "../../components/AppTextInput";
import Colors from "../../constants/Colors";
import { SubmitHandler } from "react-hook-form";
const { height } = Dimensions.get("window");



const CREATE_PROYECTO = gql`
  mutation createProyecto($input: CreateProyectoInput!) {
    createProyecto(createProyectoInput: $input) {
      nombre
    }
  }
`;



const schema = yup.object().shape({
  nombre: yup.string().required("Name is required"),
  area: yup.string().required("Area is required"),
});

export default function ProyectoCreateScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "",
      area: "",
    },
  });

  const [createProyecto, { loading, error}] = useMutation(CREATE_PROYECTO);

  const navigation = useNavigation();


  const onPressSend: SubmitHandler<formCreateProyect> = (formData) => {
    const createProyectoInput = {
      nombre: formData.nombre,
      idAdmin: 1,
      area: formData.area,
    };
    createProyecto({
      variables: {
        input: createProyectoInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.createProyecto) {
          console.log("Creado");
        }
      })
      .catch((error) => {});
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
          marginTop: 30,
        }}
      >
        <View
          style={{
            alignItems: "center",
            paddingTop: 20,
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
            Crear Proyecto
          </Text>
        </View>

        <View
          style={{
            marginVertical: Spacing * 1,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                value={value}
                onChangeText={onChange}
                placeholder="Nombre"
              />
            )}
            name="nombre"
          />
          <View style={{ height: 15 }}>
            {errors.nombre && (
              <Text style={{ color: "red" }}>{errors.nombre.message}</Text>
            )}
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
                placeholder="Área"
              />
            )}
            name="area"
          />
          <View style={{ height: 15 }}>
            {errors.area && (
              <Text style={{ color: "red" }}>{errors.area.message}</Text>
            )}
          </View>
        </View>

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
              backgroundColor: "#005050",
              marginTop: 20,
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
              Crear
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40, paddingTop: 20 }}>
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {error.message}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

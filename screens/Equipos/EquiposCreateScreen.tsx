import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { gql, useMutation } from "@apollo/client";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInput from "../../components/AppTextInput";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../constants/Colors";
import { formCreateEquipo } from "./types";

const { height } = Dimensions.get("window");

const CREATE_EQUIPO = gql`
  mutation createEquipo($input: CreateEquipoInput!) {
    createEquipo(createEquipoInput: $input) {
      nombre
    }
  }
`;

const schema = yup.object().shape({
  nombre: yup.string().required("Name is required"),
});

export default function EquipoCreateScreen({ route }) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "",
    },
  });

  const { idUser, nombreUser, idProyecto, nombreProyecto } = route.params;

  const [createEquipo, { loading, error }] = useMutation(CREATE_EQUIPO);

  const onPressSend: SubmitHandler<formCreateEquipo> = (formData) => {
    const createProyectoInput = {
      nombre: formData.nombre,
      idAdmin: idUser,
      idProyecto: idProyecto,
    };
    createEquipo({
      variables: {
        input: createProyectoInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.createProyecto) {
          console.log("Creado");
          reset({ nombre: "" });
          // Mandar a la Pantalla de Equipos
        }
      })
      .catch((error) => {});
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
          marginTop: 20,
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
            Crear Equipo
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
      </View>
    </SafeAreaView>
  );
}

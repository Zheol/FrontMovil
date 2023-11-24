import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { gql, useMutation } from "@apollo/client";
const { height } = Dimensions.get("window");
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formCreateTarea } from "./types";
import AppTextInput from "../../components/AppTextInput";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const CREATE_TAREA = gql`
  mutation createTarea($input: CreateTareaInput!) {
    createTarea(createTareaInput: $input) {
      id
      descripcion
    }
  }
`;

const schema = yup.object().shape({
  descripcion: yup.string().required("Description is required"),
});

export default function TareasCreateScreen({ route }) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      descripcion: "",
    },
  });
  const {
    idUser,
    nombreUser,
    idProyecto,
    nombreProyecto,
    idEquipo,
    nombreEquipo,
  } = route.params;

  const [createTarea, { loading, error }] = useMutation(CREATE_TAREA);

  const navigation = useNavigation();

  const onPressSend: SubmitHandler<formCreateTarea> = (formData) => {
    const createTareaInput = {
      descripcion: formData.descripcion,
      idEquipo: idEquipo,
      estado: "Creada",
    };
    createTarea({
      variables: {
        input: createTareaInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.createTarea) {
          reset({ descripcion: "" });
          navigation.navigate("Tareas");
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
            Crear Tarea
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
                placeholder="descripcion"
              />
            )}
            name="descripcion"
          />
          <View style={{ height: 15 }}>
            {errors.descripcion && (
              <Text style={{ color: "red" }}>{errors.descripcion.message}</Text>
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

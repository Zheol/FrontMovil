import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInput from "../../components/AppTextInput";
import Colors from "../../constants/Colors";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { formFindProyect } from "../../types";

const { height } = Dimensions.get("window");

const schema = yup.object().shape({
  nombre: yup.string().required("Name is required"),
  area: yup.string(),
});

const FIND_PROYECT = gql`
query($getProyectoInput: getProyectoInput!){
  getProyectobyUserIdName(getProyectoInput: $getProyectoInput) {
    id
    nombre
  }
}
`;

export default function ProyectoFindScreen({ route }) {
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

  const { nombre, email, id } = route.params;
  const { loading, error, data } = useQuery(FIND_PROYECT);


  const onPressSend: SubmitHandler<formFindProyect> = (formData) => {
    const getProyectoInput = {
      nombre: formData.nombre,
      idUser: id,
    };
    console.log(getProyectoInput)
    const { loading, error, data } = useQuery(FIND_PROYECT, {
      variables: {
        getProyectoInput: getProyectoInput
      }
    });
    console.log(data)
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
            Buscar Proyecto
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
            //onPress={handleSubmit(onPressSend)}
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
              Buscar
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40, paddingTop: 20 }}>
          {/* {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {error.message}
            </Text>
          )} */}
        </View>
      </View>
    </SafeAreaView>
  );
}

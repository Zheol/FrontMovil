import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { gql, useLazyQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const { height } = Dimensions.get("window");
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formFindEquipo } from "../../types";
import AppTextInput from "../../components/AppTextInput";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const schema = yup.object().shape({
  nombre: yup.string().required("Name is required"),
});

const FIND_EQUIPO = gql`
  query ($getEquipoInput: getEquipoInput!) {
    getEquiposbyIdProyectoName(getEquipoInput: $getEquipoInput) {
      id
      nombre
    }
  }
`;

interface Equipo {
  id: number;
  name: string;
}

export default function EquipoFindScreen({ route }) {
  const {
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
  const [getEquipo, { loading, error, data }] = useLazyQuery(FIND_EQUIPO);

  const onPressSend: SubmitHandler<formFindEquipo> = (formData) => {
    getEquipo({
      variables: {
        getEquipoInput: {
          nombre: formData.nombre,
          idProyecto: idProyecto,
        },
      },
    });
  };

  const navigation = useNavigation();

  const equipos: Equipo[] =
    data?.getEquiposbyIdProyectoName?.map((item) => ({
      id: item.id,
      name: item.nombre,
    })) || [];

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
            Buscar Equipo
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

          <View style={{ marginBottom: 60 }}>
            <ScrollView>
              <View>
                {equipos.map((equipos: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#005050",
                        height: 80,
                        borderRadius: 10,
                      }}
                      key={equipos.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DE TAREAS
                        // navigation.navigate("EquiposNav", {
                        //   nombreUser: nombre,
                        //   idUser: id,
                        //   nombreProyecto: projects.name,
                        //   idEquipo: equipos.id,
                        // });
                      }}
                    >
                      <Text
                        style={{
                          width: 350,
                          color: "white",
                          textAlign: "center",
                          paddingTop: 25,
                        }}
                      >
                        {equipos.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

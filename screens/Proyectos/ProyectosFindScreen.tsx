import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInput from "../../components/AppTextInput";
import Colors from "../../constants/Colors";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { formFindProyect } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { Divider, PaperProvider } from "react-native-paper";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const { height } = Dimensions.get("window");

const schema = yup.object().shape({
  nombre: yup.string().required("Campo Requerido"),
  area: yup.string(),
});

const FIND_PROYECT = gql`
  query ($getProyectoInput: getProyectoInput!) {
    getProyectobyUserIdName(getProyectoInput: $getProyectoInput) {
      id
      nombre
      area
    }
  }
`;

interface Project {
  id: number;
  name: string;
  area: string;
}

export default function ProyectoFindScreen() {
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

  const {
    nameUser,
    emailUser,
    idUser,
  } = useContext(UserContext);
  const [getProyecto, { loading, error, data }] = useLazyQuery(FIND_PROYECT);
  const navigation = useNavigation();

  const onPressSend: SubmitHandler<formFindProyect> = (formData) => {
    getProyecto({
      variables: {
        getProyectoInput: {
          nombre: formData.nombre,
          idUser: idUser,
        },
      },
    });
    reset({ nombre: "" });
  };

  const projects: Project[] =
    data?.getProyectobyUserIdName?.map((item) => ({
      id: item.id,
      name: item.nombre,
      area: item.area,
    })) || [];

  return (
    <PaperProvider>
      <View
        style={{
          padding: Spacing * 2,
          marginTop: 20,
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

        <View style={{ width: "100%" }}>
          <Divider />
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
          <View style={{ height: 25 }}>
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
        <View style={{paddingTop: 20}}>
          <ScrollView style={{maxHeight:380}} >
            <View>
              {projects.map((projects: Project) => {
                return (
                  <TouchableOpacity
                    key={projects.id}
                    style={{
                      marginVertical: 10,
                      backgroundColor: "#ffebcd",
                      height: 120,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      // MANDAR A LA PANTALLA DEL PROYECTO
                      navigation.navigate("EquiposNav", {
                        nombreProyecto: projects.name,
                        idProyecto: projects.id,
                      });
                    }}
                  >
                    <Text
                      style={{
                        width: 350,
                        color: "grey",
                        fontSize: 13,
                        alignSelf: "flex-start",
                        paddingTop: 10,
                        paddingLeft: 15,
                      }}
                    >
                      {projects.area}
                    </Text>
                    <Text
                      style={{
                        width: 350,
                        color: "black",
                        textAlign: "center",
                        paddingTop: 20,
                        fontSize: 15,
                      }}
                    >
                      {projects.name}
                    </Text>

                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </PaperProvider>
  );
}

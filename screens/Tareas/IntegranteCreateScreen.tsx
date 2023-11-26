import {
    Dimensions,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import Spacing from "../../constants/Spacing";
  import Font from "../../constants/Font";
  import FontSize from "../../constants/FontSize";
  import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
  import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
  import { SubmitHandler, useForm, Controller } from "react-hook-form";
  import { useNavigation } from "@react-navigation/native";
import { formCreateIntegrante } from "../../types";
import { Schema } from "yup";
import AppTextInput from "../../components/AppTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { ActivityIndicator } from "react-native-paper";
  
  const { height } = Dimensions.get("window");
  
  const OBTENER_USUARIO = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      name
    }
  }
  `;

  const CREAR_INTEGRANTE = gql `
  mutation createIntegrante($input: CreateIntegranteInput!){
    createIntegrante(createIntegranteInput: $input){
      id,
    }
  }
  `
const schema = yup.object().shape({
    email: yup.string().required("email is required"),
    rol: yup.string().required("rol is required")
});
  
  export default function IntegrantesCreateScreen({ route }) {
    const {
      idUser,
      nombreUser,
      idProyecto,
      nombreProyecto,
      idEquipo,
      nombreEquipo,
    } = route.params;
    const [getUser, { loading, error, data, refetch }] = useLazyQuery(OBTENER_USUARIO);
    const navigation = useNavigation();

    const [newIntegrante, { loading: cargando, error: errores }] = useMutation(CREAR_INTEGRANTE);

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          email: "",
          rol: "",
        },
      });

      const onPressSend: SubmitHandler<formCreateIntegrante> = async (formData) => {
        try {
          const { data: userData } = await getUser({
            variables: {
              email: formData.email
            },
          });
      
          const userId = userData.user.id;

          const CreateIntegranteInput = {
            userId: userId,
            equipoId: idEquipo,
            rol: formData.rol
          };
      
          await newIntegrante({
            variables: {
              input: CreateIntegranteInput,
            }
          });
      
          navigation.navigate("TareasNav", {
            nombreUser: nombreUser,
            idUser: idUser,
            idProyecto: idProyecto,
            nombreProyecto: nombreProyecto,
            nombreEquipo: nombreEquipo,
            idEquipo: idEquipo
          });
        } catch (error) {
          console.error(error);
        }
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
              Agregar Integrante
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
                  placeholder="Email"
                />
              )}
              name="email"
            />
            <View style={{ height: 15 }}>
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email.message}</Text>
              )}
            </View>
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
                placeholder="Rol"
              />
            )}
            name="rol"
          />
          <View style={{ height: 15 }}>
            {errors.rol && (
              <Text style={{ color: "red" }}>{errors.rol.message}</Text>
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
                Agregar
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
  
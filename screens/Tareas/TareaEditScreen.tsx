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

const EDITAR_TAREA = gql`
mutation updateTarrea($input: UpdateTareaInput!){
updateTarea(updateTareaInput: $input){
    id,
}
}
`

  
  export default function TareaEditScreen({ route }) {
    const {
      idUser,
      nombreUser,
      idProyecto,
      nombreProyecto,
      idEquipo,
      nombreEquipo,
      nombreTarea,
      estadoTarea,
    } = route.params;
    const navigation = useNavigation();
    // const [editTarea, { loading: cargando, error: errores }] = useMutation(CREAR_INTEGRANTE);
    // const onPressSend:() => {
    //     const createProyectoInput = {
    //       nombre: formData.nombre,
    //       idAdmin: id,
    //       area: formData.area,
    //     };
    //     editTarea({
    //       variables: {
    //         input: createProyectoInput,
    //       },
    //     })
    //   };
      
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
                fontSize: 30,
                maxWidth: "60%",
                textAlign: "center",
              }}
            >
              Tarea: {nombreTarea}             
            </Text>
          </View>
        
          <View
            style={{
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                fontSize: 30,
                maxWidth: "60%",
                textAlign: "center",
              }}
            >
              Estado: {estadoTarea}             
            </Text>
          </View>

          <TouchableOpacity
            style={{
                marginVertical: 20,
                backgroundColor: "#005050",
                height: 80,
                borderRadius: 10,
            }}
            onPress={() => {
                // MANDAR A LA PANTALLA DEL PROYECTO
                console.log("SI")
            }}
            >
            <Text
                style={{
                fontSize: 25,
                width: 350,
                color: "white",
                textAlign: "center",
                paddingTop: 20,
                }}
            >
                En curso
            </Text>
            <Text
                style={{
                width: 350,
                color: "red",
                textAlign: "center",
                }}
            >
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
                
                marginVertical: 20,
                backgroundColor: "blue",
                height: 80,
                borderRadius: 10,
            }}
            onPress={() => {
                // MANDAR A LA PANTALLA DEL PROYECTO
                console.log("SI")
            }}
            >
            <Text
                style={{
                    fontSize: 25,
                width: 350,
                color: "white",
                textAlign: "center",
                paddingTop: 20,
                }}
            >
                Compleatada
            </Text>
            <Text
                style={{
                width: 350,
                color: "red",
                textAlign: "center",
                }}
            >
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
                marginVertical: 20,
                backgroundColor: "red",
                height: 80,
                borderRadius: 10,
            }}
            onPress={() => {
                // MANDAR A LA PANTALLA DEL PROYECTO
                console.log("SI")
            }}
            >
            <Text
                style={{
                    fontSize: 25,
                width: 350,
                color: "white",
                textAlign: "center",
                paddingTop: 20,
                }}
            >
                Eliminar
            </Text>
            <Text
                style={{
                width: 350,
                color: "red",
                textAlign: "center",
                }}
            >
            </Text>
            </TouchableOpacity>


  
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
  
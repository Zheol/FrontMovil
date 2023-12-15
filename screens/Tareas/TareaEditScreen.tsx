import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
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
import CommentBox from "../../components/CommnetBox";
import { FlatList } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

const GET_COMENTARIOS = gql`
query getComentariosbyIdTarea ($input: getComentariosByIdTareaDto!) {
    getComentariosbyIdTarea(getComentariosbyIdTarea: $input ) {
        id,
        comentario,
        created_at
    }
}
`

interface Comentario {
  __typename: string;
  comentario: string;
  created_at: string;
  id: number;
}

export default function TareaEditScreen({ route }) {
  const {
    idTarea,
    nombreTarea,
    estadoTarea,
  } = route.params;
  const navigation = useNavigation();
  const {
    loading: loadPro,
    error: errProy,
    data,
    refetch,
  } = useQuery(GET_COMENTARIOS, {
    variables: {
      input: {
        id: idTarea,
      },
    },
  });
  console.log(data?.getComentariosbyIdTarea)
  refetch()
  const renderItem = ({ item }: {item: Comentario}) => (
    <View style={styles.commentContainer}>
      <Text style={styles.dateText}>{item.created_at}:</Text>
      <Text style={styles.commentText}>{item.comentario}</Text>
    </View>
  );

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
        <CommentBox
          idTarea={idTarea}
          onCommentAdded={refetch}
        />
        <FlatList
          data={data?.getComentariosbyIdTarea}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    fontWeight: 'bold',
    marginBottom: 5,
    color:"black"
  },
  commentText: {
    // Estilos para el texto del comentario
  },
});

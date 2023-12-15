import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';

const CREATE_COMENTARIO = gql`
  mutation createComentario($input: CreateComentarioInput!){
    createComentario(createComentarioInput: $input){
      comentario
    }
  }
`;

interface CreateCommentProps {
  idTarea: number;
  onCommentAdded: () => void;
  nombreUser: string;
}

const CommentBox: React.FC<CreateCommentProps> = ({ idTarea, onCommentAdded, nombreUser }) => {
  const [comment, setComment] = useState('');

  const [createComentario, { loading, error }] = useMutation(CREATE_COMENTARIO, {
    onCompleted: () => {
      // Llama a onCommentAdded cuando la mutación se completa
      onCommentAdded();
      setComment('');
    }
  });

  const handleAddComment = () => {
    if (loading) return;
    console.log(nombreUser)
    const comentario: string = nombreUser + ": " + comment;
    
    const createComentarioInput = {
      idTarea: idTarea,
      comentario: comentario
    };
    
    createComentario({
      variables: {
        input: createComentarioInput,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setComment}
        value={comment}
        placeholder="Escribe un comentario..."
        multiline
        numberOfLines={5}
        maxLength={200}
      />
      <Button 
        title="Enviar" 
        onPress={handleAddComment}
        disabled={!comment.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Estilos para el contenedor si son necesarios
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  // Estilos adicionales si son necesarios
});

export default CommentBox;

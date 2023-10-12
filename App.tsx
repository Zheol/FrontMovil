import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Navigation from "./src/navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://172.25.16.1:3000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Navigation from "./src/navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserProvider } from "./src/User/UserContext";

const client = new ApolloClient({
  uri: "http://172.24.208.1:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.root}>
        <UserProvider>
          <Navigation />
        </UserProvider>
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

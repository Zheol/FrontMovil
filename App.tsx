import "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import Navigation from "./navigation";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserProvider } from "./context/UserContext";
const client = new ApolloClient({
  uri: "http://192.168.100.3:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <UserProvider>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

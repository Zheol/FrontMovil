import "react-native-gesture-handler";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import fonts from "./config/fonts";
import Navigation from "./navigation";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserProvider } from "./context/UserContext";
import { ProyectProvider } from "./context/ProyectContext";
const client = new ApolloClient({
  uri: "http://172.21.48.1:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <UserProvider>
      <ProyectProvider>
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </ApolloProvider>
      </ProyectProvider>
    </UserProvider>
  );
}

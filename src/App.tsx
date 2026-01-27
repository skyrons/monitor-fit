import { Home } from "./components/Home"; 
import { Header } from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/default";
import { GlobalStyle } from "./styles/global";

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AuthProvider>
        <Header />
        <Home />
      </AuthProvider>
    </ThemeProvider>
  );
}

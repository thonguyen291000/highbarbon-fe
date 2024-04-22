import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/index.ts";
import { IntlProvider } from "react-intl";
import { messages } from "./il8n.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from "./context/AppContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <IntlProvider messages={messages["en"]} locale="en" defaultLocale="en">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </IntlProvider>
  </ThemeProvider>
);

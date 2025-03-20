import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie"; // Import CookiesProvider
import { RouteList } from "./routes/RouteList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouteList />
        <ToastContainer />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;

import AppRoutes from "./routes/AppRoutes";
import GlobalLoader from "./components/layout/GlobalLoader";

function App() {
  return (
    <>
      <GlobalLoader />
      <AppRoutes />
    </>
  );
}

export default App;
// routes
import LoadingScreen from "./components/LoadingScreen";
import NotistackProvider from "./components/NotistackProvider";
import ScrollToTop from "./components/ScrollToTop";
// components
import ThemeLocalization from "./components/ThemeLocalization";
// hooks
import useAuth from "./hooks/useAuth";
import Router from "./routes";
// theme
import ThemeConfig from "./theme";

// ----------------------------------------------------------------------

const App = () => {
  const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <ThemeLocalization>
        <NotistackProvider>
          <ScrollToTop />
          {isInitialized ? <Router /> : <LoadingScreen />}
        </NotistackProvider>
      </ThemeLocalization>
    </ThemeConfig>
  );
};

export default App;

import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { capitalCase } from "change-case";

// sections
import { LoginForm } from "src/components/authentication/login";
import Logo from "src/components/Logo";
import Page from "src/components/Page";
import { useAuth } from "src/hooks";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const LoginPage = () => {
  const { method, login } = useAuth();

  const handleLoginAuth0 = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <RootStyle title="Login">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                LOGO
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below.
              </Typography>
            </Box>

            {/* <Logo sx={{ width: 64, height: 64 }} /> */}
          </Stack>

          {method !== "auth0" ? (
            <LoginForm />
          ) : (
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleLoginAuth0}
            >
              Login
            </Button>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default LoginPage;

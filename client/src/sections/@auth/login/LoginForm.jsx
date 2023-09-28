import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
// @mui
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// components
import Iconify from "src/components/Iconify";
import { useAuth } from "src/hooks";
// ----------------------------------------------------------------------

const LoginForm = () => {
  const { signIn, isLoading } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [shouldRememberMe, setShouldRememberMe] = useState(false);

  const handleLogin = handleSubmit((data) => {
    const { email, password } = data;
    signIn(email, password);
  });

  return (
    <Paper elevation={4} sx={{ p: 2, position: "relative", zIndex: 2 }}>
      <Stack spacing={3}>
        <Controller
          name={"email"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={"Email"}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />

        <Controller
          name={"password"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label="Password"
              onChange={onChange}
              fullWidth
              value={value}
              type={showPassword ? "text" : "password"}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 2 }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={shouldRememberMe}
              onChange={(e) => setShouldRememberMe(e.target.checked)}
            />
          }
          label="Remember me"
        />
        <Link to="/auth/forgot-password">
          <Button>Forgot password?</Button>
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLogin}
        loading={isLoading}
      >
        Login
      </LoadingButton>
    </Paper>
  );
};

export default LoginForm;

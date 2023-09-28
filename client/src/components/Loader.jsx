import { CircularProgress, Stack } from "@mui/material";

const Loader = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%", my: 4 }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loader;

// material
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

//
import Iconify from "src/components/Iconify";
// utils
import { fShortenNumber } from "src/utils/formatNumber";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2, 2, 3),
}));

// ----------------------------------------------------------------------

const StatisticBox = ({ name, total, icon, color, bgColor }) => {
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">
          {total ? fShortenNumber(total) : 0}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {name}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: "50%",
          bgcolor: "background.neutral",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Iconify icon={icon} width={64} height={64} />
      </Box>
    </RootStyle>
  );
};

export default StatisticBox;

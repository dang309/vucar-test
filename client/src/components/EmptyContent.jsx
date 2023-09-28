import { Box, Typography } from "@mui/material";
// material
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

const EmptyContent = ({ title, description, img, ...other }) => {
  return (
    <RootStyle {...other}>
      <Box
        component="img"
        alt="empty content"
        src={
          img ||
          `${
            import.meta.env.BASE_URL
          }/static/illustrations/illustration_empty_content.svg`
        }
        sx={{ height: 128, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        {title || "No Data"}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
};

EmptyContent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  description: PropTypes.string,
};

export default EmptyContent;

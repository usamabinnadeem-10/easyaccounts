import { styled } from "@mui/styles";

export const Wrapper = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "width" && prop !== "padding" && prop !== "marginbottom",
})(({ theme, width, padding, marginbottom }) => ({
  backgroundColor: "rgba(105, 105, 105, 0.03)",
  borderRadius: "4px",
  padding: theme.spacing(padding || 2),
  width: width ? `${width}vw` : "75vw",
  marginBottom: theme.spacing(marginbottom) || "0rem",
}));

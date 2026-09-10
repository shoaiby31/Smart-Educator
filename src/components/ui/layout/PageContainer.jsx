import { Container } from "@mui/material";

const PageContainer = ({
  children,
  maxWidth = "xl",
  disableGutters = false,
}) => {
  return (
    <Container
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      sx={{
        py: 3,
      }}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
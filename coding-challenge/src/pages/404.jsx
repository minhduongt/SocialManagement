import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

// ----------------------------------------------------------------------

export default function Page404() {
  const navigate = useNavigate();
  return (
    <Container>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
        <Text variant="h3" paragraph>
          Page not found!
        </Text>

        <Text sx={{ color: "text.secondary" }}>
          Sorry, we couldnt find the page you are looking for. Perhaps you have
          mistyped the URL? Be sure to check your spelling.
        </Text>

        {/* <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} /> */}

        <Button size="large" variant="contained" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}

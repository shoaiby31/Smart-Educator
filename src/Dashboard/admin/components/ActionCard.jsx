import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ActionCard = ({
  title,
  icon,
  path,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardActionArea
        sx={{ p: 3 }}
        onClick={() => navigate(path)}
      >
        <Stack
          spacing={2}
          alignItems="center"
        >
          {icon}

          <Typography
            align="center"
            fontWeight={600}
          >
            {title}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default ActionCard;
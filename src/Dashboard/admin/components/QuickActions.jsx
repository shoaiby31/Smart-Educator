import { Paper, Typography, Grid } from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import ActionCard from "./ActionCard";

const actions = [
  {
    title: "Add Teacher",
    icon: <PersonAddAlt1RoundedIcon />,
    path: "/dashboard/admin/faculty-members",
  },
  {
    title: "Add Student",
    icon: <SchoolRoundedIcon />,
    path: "/dashboard/admin/students",
  },
  {
    title: "Create Class",
    icon: <ClassRoundedIcon />,
    path: "/dashboard/admin/classes",
  },
  {
    title: "Create Quiz",
    icon: <QuizRoundedIcon />,
    path: "/dashboard/admin/quizzes",
  },
  {
    title: "Announcement",
    icon: <CampaignRoundedIcon />,
    path: "/dashboard/admin/announcements",
  },
  {
    title: "Settings",
    icon: <SettingsRoundedIcon />,
    path: "/dashboard/admin/settings",
  },
];

const QuickActions = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Quick Actions
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}
            key={action.title}
          >
            <ActionCard {...action} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default QuickActions;
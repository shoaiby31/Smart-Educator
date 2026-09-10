import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

const activities = [
  {
    id: 1,
    title: "Ahmed Khan joined as Teacher",
    subtitle: "2 minutes ago",
    icon: <PersonAddRoundedIcon />,
  },
  {
    id: 2,
    title: "Science Quiz Published",
    subtitle: "15 minutes ago",
    icon: <QuizRoundedIcon />,
  },
  {
    id: 3,
    title: "Class 10-B Created",
    subtitle: "Today",
    icon: <ClassRoundedIcon />,
  },
  {
    id: 4,
    title: "New School Announcement",
    subtitle: "Yesterday",
    icon: <CampaignRoundedIcon />,
  },
];

const RecentActivities = () => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
        >
          Recent Activities
        </Typography>

        <List disablePadding>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem disableGutters>
                <ListItemAvatar>
                  <Avatar color="primary">
                    {activity.icon}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={activity.title}
                  secondary={activity.subtitle}
                />
              </ListItem>

              {index !== activities.length - 1 && (
                <Divider />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
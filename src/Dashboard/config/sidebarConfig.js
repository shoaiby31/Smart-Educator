import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ClassRounded from "@mui/icons-material/ClassRounded";
import QuizRounded from "@mui/icons-material/QuizRounded";
import AssessmentRounded from "@mui/icons-material/AssessmentRounded";
import HowToRegRounded from "@mui/icons-material/HowToRegRounded";
import CampaignRounded from "@mui/icons-material/CampaignRounded";






export const sidebarConfig = {
  admin: [
    {
      title: "Dashboard",
      icon: <DashboardRoundedIcon />,
      path: "/dashboard/admin",
    },
    {
      title: "My Faculty",
      icon: <PeopleRoundedIcon />,
      path: "/dashboard/admin/faculty-members",
    },
    {
      title: "Academic Sessions",
      icon: <SchoolRoundedIcon />,
      path: "/dashboard/admin/academic-sessions",
    },
    
    {
        title: "Classes",
        icon: <ClassRounded />,
        path: "/dashboard/classes",
      },
      {
      title: "Students",
      icon: <PeopleRoundedIcon />,
      path: "/dashboard/students",
    },
      {
        title: "Quizzes",
        icon: <QuizRounded />,
        path: "/dashboard/quizzes",
      },
      {
        title: "Reports",
        icon: <AssessmentRounded />,
        path: "/dashboard/reports",
      },
      {
        title: "Join Requests",
        icon: <HowToRegRounded />,
        path: "/dashboard/admin/faculty-joining-requests",
      },
      {
        title: "Announcements",
        icon: <CampaignRounded />,
        path: "/dashboard/announcements",
      },
      {
      title: "Settings",
      icon: <SettingsRoundedIcon />,
      path: "/dashboard/admin/settings",
    },
  ],

  teacher: [
    {
      title: "Dashboard",
      icon: <DashboardRoundedIcon />,
      path: "/dashboard/teacher",
    },
    {
      title: "Quizzes",
      icon: <QuizRoundedIcon />,
      path: "/dashboard/teacher/quizzes",
    },
    {
      title: "Students",
      icon: <PeopleRoundedIcon />,
      path: "/dashboard/teacher/students",
    },
  ],

  student: [
    {
      title: "Dashboard",
      icon: <DashboardRoundedIcon />,
      path: "/dashboard/student",
    },
    {
      title: "Assignments",
      icon: <AssignmentRoundedIcon />,
      path: "/dashboard/student/assignments",
    },
    {
      title: "Results",
      icon: <QuizRoundedIcon />,
      path: "/dashboard/student/results",
    },
  ],
};
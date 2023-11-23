/* eslint-disable react/no-unescaped-entities */

/*__________________________________________

 ✅ import 
____________________________________________*/

import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Avatar from "@mui/material/Avatar"
import { alpha, useTheme } from "@mui/material/styles"
import { colors } from "@mui/material"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import EditIcon from "@mui/icons-material/Edit"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import TextFormatIcon from "@mui/icons-material/TextFormat"

/*__________________________________________

 ✅ data 
____________________________________________*/

const data = [
  {
    color: colors.blue[500],
    title: "Create Notes",
    subtitle:
      "Start your journey of thoughts with a blank slate or a template, and let the creativity flow onto the digital page.",
    icon: <NoteAddIcon />,
  },
  {
    color: colors.green[500],
    title: "Edit Notes",
    subtitle:
      "Refine your ideas with advanced editing tools. Style your text, add bullet points, and more for clear, impactful notes.",
    icon: <EditIcon />,
  },
  {
    color: colors.amber[500],
    title: "Bookmark Notes",
    subtitle:
      "Mark important notes for quick access. Your highlights are always one click away.",
    icon: <BookmarkIcon />,
  },
  {
    color: colors.deepOrange[500],
    title: "Rich Text Editor",
    subtitle:
      "Enhance your notes with a powerful rich text editor. Style, format, and organize your content with ease.",
    icon: <TextFormatIcon />,
  },
]

/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function FEATURES___COMPONENT() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        padding: { xs: "1rem", lg: "2rem" },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={4}>
        {data.map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box
              display={"block"}
              width={1}
              height={1}
              sx={{
                textDecoration: "none",
                transition: "all .2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                sx={{ border: `1px solid ${theme.palette.divider}` }}
                padding={4}
                width={1}
                height={1}
              >
                <Box display={"flex"} flexDirection={"column"}>
                  <Box
                    component={Avatar}
                    width={45}
                    height={45}
                    marginBottom={2}
                    bgcolor={alpha(item.color, 0.1)}
                    color={item.color}
                    variant={"rounded"}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.subtitle}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

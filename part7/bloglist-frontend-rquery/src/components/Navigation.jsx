import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

const Navigation = ({ user, onLogout }) => {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", mr: 2 }}
        >
          Bloglist
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button component={RouterLink} to="/" color="inherit">
            blogs
          </Button>
          <Button component={RouterLink} to="/users" color="inherit">
            users
          </Button>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        {user && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {user.name} logged in
            </Typography>
            <Button variant="outlined" size="small" onClick={onLogout}>
              logout
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

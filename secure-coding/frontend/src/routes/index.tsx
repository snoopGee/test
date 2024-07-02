import { Navigate } from "react-router-dom";

import * as index from "../pages/index";

const path = "";

const publicRoutes = [
  // Course
  { path: `${path}/index`, exact: true, component: index.Home },
  { path: `${path}/admin`, exact: true, component: index.Admin },
  { path: `${path}/profile/edit`, exact: true, component: index.EditProfile },
  { path: `${path}/profile`, exact: true, component: index.Profile },
  { path: `${path}/transfer`, exact: true, component: index.Transfer },
  { path: `${path}/register`, exact: true, component: index.Register },

  {
    path: "*",
    component: () => <Navigate to={`${path}/index`} />,
  },
];

export { publicRoutes };

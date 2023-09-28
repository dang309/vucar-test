// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOT_AUTH_PATH = "/auth";
const ROOT_ADMIN_PATH = "/admin";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOT_AUTH_PATH,
  login: path(ROOT_AUTH_PATH, "/signin"),
};

export const PATH_PAGE = {
  page404: "/404",
};

export const PATH_DASHBOARD = {
  root: ROOT_ADMIN_PATH,
  dashboard: path(ROOT_ADMIN_PATH, "/dashboard"),
  car: {
    management: path(ROOT_ADMIN_PATH, "/cars"),
    form: path(ROOT_ADMIN_PATH, "/cars/form"),
  },
};

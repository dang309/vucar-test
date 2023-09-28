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
  loginUnprotected: path(ROOT_AUTH_PATH, "/login-unprotected"),
  register: path(ROOT_AUTH_PATH, "/register"),
  registerUnprotected: path(ROOT_AUTH_PATH, "/register-unprotected"),
  resetPassword: path(ROOT_AUTH_PATH, "/reset-password"),
  verify: path(ROOT_AUTH_PATH, "/verify"),
};

export const PATH_PAGE = {
  page404: "/404",
};

export const PATH_DASHBOARD = {
  root: ROOT_ADMIN_PATH,
  dashboard: path(ROOT_ADMIN_PATH, "/dashboard"),
  user: {
    management: path(ROOT_ADMIN_PATH, "/users"),
    form: path(ROOT_ADMIN_PATH, "/users/form"),
  },
  system: {
    management: path(ROOT_ADMIN_PATH, "/system"),
    form: path(ROOT_ADMIN_PATH, "/system/form"),
  },
  asset: {
    management: path(ROOT_ADMIN_PATH, "/assets"),
  },
  sfaceData: {
    index: path(ROOT_ADMIN_PATH, "/sface-data"),
    person: {
      management: path(ROOT_ADMIN_PATH, "/sface-data/people"),
      form: path(ROOT_ADMIN_PATH, "/sface-data/people"),
    },
    face: {
      management: path(ROOT_ADMIN_PATH, "/sface-data/faces"),
      form: path(ROOT_ADMIN_PATH, "/sface-data/faces"),
    },
    model: {
      management: path(ROOT_ADMIN_PATH, "/sface-data/models"),
      form: path(ROOT_ADMIN_PATH, "/sface-data/models"),
    },
    task: {
      management: path(ROOT_ADMIN_PATH, "/sface-data/tasks"),
      form: path(ROOT_ADMIN_PATH, "/sface-data/tasks"),
    },
  },
  webMaster: {
    index: path(ROOT_ADMIN_PATH, "/web-master"),

    setting: {
      management: path(ROOT_ADMIN_PATH, "/web-master/settings"),
      form: path(ROOT_ADMIN_PATH, "/web-master/settings"),
    },
    backup: {
      management: path(ROOT_ADMIN_PATH, "/web-master/backup"),
      form: path(ROOT_ADMIN_PATH, "/web-master/backup"),
    },
    serverStatus: {
      management: path(ROOT_ADMIN_PATH, "/web-master/server-status"),
      form: path(ROOT_ADMIN_PATH, "/web-master/server-status"),
    },
  },
};

import api from "../plugins/axios";

const UserService = {
  getUsers: (filter) => {
    return api.get("/users", {
      params: filter,
    });
  },
  create: (userInfo) => {
    const fd = new FormData();
    for (const key in userInfo) {
      fd.append(key, userInfo[key]);
    }
    return api.post("/users", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update: (userInfo, id) => {
    const fd = new FormData();
    for (const key in userInfo) {
      if (key != "avatar") {
        fd.append(key, userInfo[key]);
      }
      if (key == "avatar" && userInfo[key] instanceof File) {
        fd.append(key, userInfo[key]);
      }
    }
    return api.post(`/users/${id}?_method=PUT`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  findById: (id) => {
    return api.get(`/users/${id}`);
  },
};

export default UserService;

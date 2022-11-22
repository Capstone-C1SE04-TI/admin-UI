import * as httpRequest from '~/utils/httpRequest';

export const getUsers = async () => {
  try {
    const response = await httpRequest.get("/admin/user/list");
    return response.datas;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetail = async (userId) => {

  try {
    const response = await httpRequest.get("/admin/user/details", {
      params: { userId: userId}
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const getAdmin = async () => {
  try {
    const response = await httpRequest.get("/admin/list");
    return response.datas;
  } catch (error) {
    console.log(error);
  }
};


export const deleteUsers = async (data) => {
  try {
    const response = await httpRequest.post("/admin/delete-users", data);
    return response;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }

};

import * as httpRequest from '~/utils/httpRequest';

export const getUsers = async () => {
  try {
    const response = await httpRequest.get("/admin/user/list");
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

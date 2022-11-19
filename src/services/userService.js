import * as httpRequest from '~/utils/httpRequest';

export const getUsers = async () => {
  try {
    const response = await httpRequest.get("admin/user/list");
    return response.datas;
  } catch (error) {
    console.log(error);
  }
};

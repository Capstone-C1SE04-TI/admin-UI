import * as httpRequest from '~/utils/httpRequest';

export const getUsers = async () => {
  try {
    const response = await httpRequest.get("/users/suggested");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

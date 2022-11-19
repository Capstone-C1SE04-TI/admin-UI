import * as httpRequest from '~/utils/httpRequest';

export const signOut = async () => {
    try {
        const response = await httpRequest.post('/admin/signout');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};


export const signIn = async (data) => {
  try {
    const response = await httpRequest.post("/admin/signin", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
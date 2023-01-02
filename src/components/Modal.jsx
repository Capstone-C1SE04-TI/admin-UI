import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useStateContext } from "~/contexts/ContextProvider";
import ToastCustomize from "~/helpers/ToastCustomize";
import { userSelector } from "~/modules/user";
import userSlice from "~/modules/user/userSlice";
import { authService } from "~/services";

export default function Modal({ showModal = true, requestCloseModal }) {
  const [formValue, setFormValue] = React.useState({
    username: "",
    password: "",
  });
  const { setCurrentUserLogin } = useStateContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await authService.signIn(formValue);
    console.log({ response });
    if (!response.error) {
      localStorage.setItem("currentUser", true);
      localStorage.setItem("userInfo", JSON.stringify(response.user));
      setCurrentUserLogin(true);
      dispatch(userSlice.actions.statusUserLogin("userName"));
      ToastCustomize("Login success");
      requestCloseModal();
    } else {
      ToastCustomize("failed authorization");
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none"
                style={{ width: "500px" }}
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Login form</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={requestCloseModal}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    className=" shadow-md rounded px-8 pt-6 pb-8 w-full"
                    onSubmit={handleSubmit}
                  >
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Username
                    </label>
                    <input
                      name="username"
                      onChange={handleChange}
                      value={formValue.username}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                    />
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5">
                      Password
                    </label>
                    <input
                      name="password"
                      value={formValue.password}
                      onChange={handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="password"
                      placeholder="******************"
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    onClick={handleSubmit}
                    className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    style={{ backgroundColor: "rgb(3, 201, 215)" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

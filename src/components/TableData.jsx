import { useEffect, useState } from "react";
import ToastCustomize from "~/helpers/ToastCustomize";
import { userService } from "~/services";
import TableDataItem from "./TableDataItem";
import ModalNotify from "./ModalNotify";

const TableData = ({ data, onChangeData }) => {
  const [checkedUser, setCheckedUser] = useState([]);
  const [isAllChecked, setIsCheckedAll] = useState(false);

  const renderSearch = () => {
    return (
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </form>
    );
  };

  const renderFilter = () => {
    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
            <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">Filters</div>
            </span>
          </button>
        </div>
      </div>
    );
  };

  const renderDelete = () => {
    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
            <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
              <div>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/l36ouVTLKY-.png"
                  alt=""
                />
              </div>
              <div className="hidden sm:block">Delete</div>
            </span>
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (checkedUser.length > 0) {
      if (data.length === checkedUser.length) {
        setIsCheckedAll(true);
      } else {
        setIsCheckedAll(false);
      }

      // handleChangeCheckboxAll()
    }
  }, [checkedUser]);

  const handleChangeCheckboxAll = () => {
    if (!isAllChecked) {
      let allUserId = data.map((user) => {
        return user.userId;
      });
      setCheckedUser(allUserId);
      setIsCheckedAll(!isAllChecked);
    } else {
      setIsCheckedAll(!isAllChecked);
      setCheckedUser([]);
    }
  };
  // console.log({ checkedUser, isAllChecked });
  const handleDelete = async () => {
    const response = await userService.deleteUsers({
      ids: checkedUser,
    });

    if (!response.error) {
      const newUSer = data.filter((user) => !checkedUser.includes(user.userId));
      onChangeData(newUSer);
      ToastCustomize("Success deleted");
    } else {
      ToastCustomize("User not found");
    }
  };

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const openModal = () => {
    setIsShowModalDelete(true);
  };

  const closeModal = () => {
    setIsShowModalDelete(false);
  };

  return (
    <div className="flex flex-col">
      <ModalNotify
        title="Delete user"
        description="Are you sure to delete this users ?"
        actionName="Delete"
        requestCloseModal={closeModal}
        isShowModal={isShowModalDelete}
        onAcceptACtion={handleDelete}
      />
      <div className="overflow-x-auto">
        <div className="flex justify-between py-3 pl-2">
          {renderSearch()}

          {renderFilter()}
        </div>

        <div className="p-1.5 w-full inline-block align-middle">
          <div
            className="flex items-center pb-4 cursor-pointer"
            onClick={openModal}
          >
            {renderDelete()}
          </div>
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      <input
                        checked={isAllChecked}
                        onChange={handleChangeCheckboxAll}
                        id="checkbox-all"
                        type="checkbox"
                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500 hover:border-slate-400"
                      />
                      <label htmlFor="checkbox" className="sr-only">
                        Checkbox
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    FullName
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    PhoneNumber
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Sharks followed quantity
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <TableDataItem
                    key={index}
                    value={item}
                    checkedUser={checkedUser}
                    onCheckedUser={setCheckedUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableData;

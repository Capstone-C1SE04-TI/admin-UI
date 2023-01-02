import React, { useEffect, useState } from "react";
import { Header, TableData } from "../components";
import { userService } from "~/services";
import { useStateContext } from "~/contexts/ContextProvider";

const Investors = () => {
  const [investors, setInvestors] = useState([]);
  const { currentUserLogin } = useStateContext();
  console.log({ currentUserLogin });
  useEffect(() => {
    const fetchApi = async () => {
      if (currentUserLogin) {
        const response = await userService.getUsers();
        setInvestors(response);
      } else {
        setInvestors([]);
      }
      // console.log(response);
    };

    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserLogin]);

  const handleSetNewUser = (newUser) => {
    setInvestors(newUser);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Investors" />
      {investors.length > 0 && (
        <TableData data={investors} onChangeData={handleSetNewUser} />
      )}
    </div>
  );
};
export default Investors;

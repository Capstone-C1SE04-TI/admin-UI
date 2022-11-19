import React, {useEffect, useState} from 'react';
import { Header, TableData } from '../components';
import  {userService}  from '~/services';

const Investors = () => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
        const fetchApi = async () => {
            const response = await userService.getUsers();
            setInvestors(response);
            // console.log(response);
        };
        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Investors" />
      {investors.length > 0 &&<TableData data={investors} />}
    </div>
  );
};
export default Investors;

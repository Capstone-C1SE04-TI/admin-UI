import React, {useEffect, useState} from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { employeesGrid } from '../data/dummy';
import { Header } from '../components';
import  {userService}  from '~/services';
import { getUsers } from '~/services/userService';

const Investors = () => {
  const [invests, setinvests] = useState([]);
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };
  useEffect(() => {
        const fetchApi = async () => {
            const response = await userService.getUsers();
            setinvests(response)
            console.log(response);
        };
        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Investors" />
      <GridComponent
        dataSource={invests}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Investors;

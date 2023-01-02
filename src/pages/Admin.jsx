import React, { useEffect, useState } from "react";
import { Header, TableData } from "../components";
import { userService } from "~/services";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { employeesGrid } from "~/data/dummy";
import { useStateContext } from "~/contexts/ContextProvider";

const Admin = () => {
  const [investors, setInvestors] = useState([]);
  const selectionsettings = { persistSelection: true };
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentUserLogin } = useStateContext();

  useEffect(() => {
    const fetchApi = async () => {
      if (currentUserLogin) {
        const response = await userService.getAdmin();
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
      <Header category="Page" title="Admin" />
      <GridComponent
        dataSource={investors}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};
export default Admin;

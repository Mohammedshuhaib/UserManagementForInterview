import React, { useEffect, useState } from "react";
import "./UserList.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";

function UserList() {
    const {userData, setUserData} = useState([])

    const getUserData = async() => {
        try{
           let response = await axios({
                url:'/admin/getData',
                method:'get',
            })
            setUserData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserData()
    })
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Name", width: 150 },
    { field: "Email", headerName: "Email", width: 200 },
  ];
  const actioncolumn = [
    {
      field: "Action",
      headerName: "Action",
      width: 300,
      renderCell: () => {
        return (
          <div className="cellAction">
            <div className="updateButton">
              <Button >Update</Button>
            </div>
            <div className="deleteButton">
              <Button>Delete</Button>
            </div>
          </div>
        );
      },
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  ];
  return (
    <div className="listContainer">
      {" "}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actioncolumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default UserList;

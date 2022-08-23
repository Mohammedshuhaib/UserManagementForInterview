import React, { useEffect } from "react";
import "./UserList.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";

function UserList() {

    const getUserData = async() => {
        try{
           let response = await axios({
                url:'/admin/getData',
                method:'get',
            })
            console.log(response)
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
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
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

import React, { useEffect, useState } from "react";
import "./UserList.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";

function UserList() {
    const[userData, setUserData] = useState([])
    const[refresh,setRefresh]=useState(true)
    const getUserData = async() => {
        try{
           let {data} = await axios({
                url:'/admin/getData',
                method:'get',
            })
          
            setUserData(data)
            setRefresh(!refresh)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserData()
    
       
    },[refresh])
  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "Name", headerName: "Name", width: 150 },
    { field: "Email", headerName: "Email", width: 250 },
  ];
  const actioncolumn = [
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        const deleteUser = async() => {
          try{
            let response = await axios({
              method:'delete',
              url:`/admin/deleteUser?id=${params.row._id}`
            })
          }catch(err) {
            console.log(err)
          }
        }
        return (
          <div className="cellAction">
            <div className="deleteButton">
              <Button onClick={() => deleteUser()}>Delete</Button>
            </div>
          </div>
        );
      },
    },
  ];

  


  return (
    <div className="listContainer">
      {" "}
      <div style={{ height: 400, width: "100%" }}>
      { userData && <DataGrid
          rows={userData}
          columns={columns.concat(actioncolumn)}
          pageSize={5}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        /> }
      </div>
    </div>
  );
}

export default UserList;

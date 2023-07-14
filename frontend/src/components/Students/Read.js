import React, { useEffect, useState } from "react";
import {Link,} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Loder from "../../Images/loder2.gif"

const Read = () => {
  let index = 0;

  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("")

  const navigate = useNavigate();


  const getData = async () => {
    const response = await fetch("/api/user/all");

    const result = await response.json();

    if (!result.success) {
      setError(result.message);
    }
    if (result.success) {
      setData(result.result);
    }
  };

  const deleteHandler = async (id) => {
    const response = await fetch(
      `/api/user/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!result.status) {
      console.log("Hello --- --- Login");
      setError(result.message);
      await new Promise((resolveOuter) => {
        resolveOuter(
          new Promise((resolveInner) => { 
            setTimeout(resolveInner, 1000);
          })
        );
      });
  
      navigate("/login");
    }
    if (result.status) {
      setMessage("Deleted Successfully");

      setTimeout(() => {
        setMessage("");
        getData();
      }, 1000);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  return (
    <div className="container my-5">
      <h2>All Data</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      {!data &&  <img src={Loder} alt="" /> }
      {data?.length===0 && <div className="alert alert-danger">No data Avilable <Link to="/">Click Here</Link> to add data. </div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sr. No</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Enrollment Number</th>
            <th scope="col">Department</th>
            <th scope="col">Age</th>
            <th scope="col">C.G.P.A.</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((elem) => (
            <tr key={elem.email}>
              <th scope="row">{(index += 1)}</th>
              <td>{elem.firstname}</td>
              <td>{elem.lastname}</td>
              <td>{elem.email}</td>
              <td>{elem.enroll}</td>
              <td>{elem.dept}</td>
              <td>{elem.age}</td>
              <td>{elem.cgpa}</td>
              <td>
                <button
                  href="#"
                  className="card-link btn btn-danger"
                  onClick={() => deleteHandler(elem._id)}
                >
                  Delete
                </button>
                <Link to={`/update/${elem._id}`} className="card-link btn btn-primary">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );
};

export default Read;

import React, { useEffect, useState } from "react";
import Card from "../components/card";
import Createblog from "../components/createblog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMemo } from "react";

const Event = () => {
  const navigate = useNavigate();
  const [eventData, seteventData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setsearch] = useState("");
  const [paginatedData, setpaginatedData] = useState([]);
  const [reload, setreload] = useState(false);
  const [finalfilteredData, setfinalfilteredData] = useState([]);

  console.log("data", eventData);

  const filteredData = useMemo(() => {
    if (!search) return eventData;
    const searchLower = search.toLowerCase();
    return eventData.filter((item) =>
      item.title?.toLowerCase().includes(searchLower)
    );
  }, [eventData, search]);

  const totalPages = Math.ceil(filteredData.length / 3);

  const paginatedfilterdata = useMemo(() => {
    const startIndex = (currentPage - 1) * 3;
    return filteredData.slice(startIndex, startIndex + 3);
  }, [filteredData, currentPage]);

  console.log("paginated", paginatedfilterdata);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const blog = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/event/getallevent"
        );
        const data = await response.json();
        seteventData(data.data);
      } catch (error) {}
    };
    blog();
  }, []);

  // create blog
  const handleopenform = () => {};

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const handleedit = (id) => {};

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/event/deletebyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("response", response.data);
      alert(response.data.message);
      setreload(true);
    } catch (error) {
      alert(error.response.data.message);
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="text-center"></div>

      <div className="container mt-4">
        <h1 className="text-center mb-4">All Event</h1>
        <div className="d-flex justify-content-between">
          <button
            className="mb-4 text-white p-2 bg-primary mt-4"
            onClick={handleopenform}
          >
            Create Event
          </button>

          <button
            className="mb-4 text-white p-2 bg-primary mt-4"
            onClick={handlelogout}
          >
            Logout
          </button>
        </div>
        <div className="d-flex">
          <input
            type="text"
            name=""
            placeholder="search..."
            onChange={(e) => setsearch(e.target.value)}
            id=""
          />
        </div>
      </div>

      <div className="d-flex flex-wrap  justify-content-center">
        {paginatedfilterdata?.map((item, i) => (
          <div className="mx-2 my-2" key={i}>
            <Card
              item={item}
              handleedit={handleedit}
              handledelete={handledelete}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-center">
        <button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Event;

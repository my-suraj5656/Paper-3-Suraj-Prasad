import React, { useEffect, useState } from "react";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMemo } from "react";
import EventForm from "../components/createModal";
import EditEventForm from "../components/editModal";
import { apiKey } from "../App";

const Event = () => {
  const navigate = useNavigate();
  const [allEventData, setAllEventData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setsearch] = useState("");
  const [selectedCategory, setselectedCategory] = useState("")
  const [sortOrder, setsortOrder] = useState("")
  const [categoryData, setcategoryData] = useState([])

  // modal open/closed for creating
  const [modalOpenCreate, setmodalOpenCreate] = useState(false)
  // modal open/closed for edit
  const [modalOpenEdit, setmodalOpenEdit] = useState(false)
  const [editData, seteditData] = useState({})
  const [editId, seteditId] = useState("")
  // console.log(editData);

  const totalPages = Math.ceil(allEventData.length / 4);

  const paginatedfilterdata = useMemo(() => {
    const startIndex = (currentPage - 1) * 4;
    return allEventData?.slice(startIndex, startIndex + 4);
  }, [allEventData, currentPage]);


  const filteredData = useMemo(() => {
    let result = [...paginatedfilterdata]

    if (search) {
      result = result.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase()) || item.location.address.toLowerCase().includes(search.toLowerCase())
      })
    }

    if (selectedCategory) {
      result = result.filter((item) => item.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    }

    if (sortOrder) {
      switch (sortOrder) {
        case "asc":
          result.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
          break;

        case "desc":
          result.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
          break;

        default:
          break;
      }
    }

    return result
  }, [paginatedfilterdata, search, selectedCategory, sortOrder]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // getallevent on mount
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${apiKey}/api/event/getallevent`
      );
      const data = await response.json();
      setAllEventData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // exract event from the all event
  useEffect(() => {
    const categoryExtract = () => {
      const categories = allEventData?.map((item) => item.category)
      const catData = [...new Set(categories)]
      setcategoryData(catData)
    }
    categoryExtract()
  }, [allEventData])

  const handleopenform = () => {
    setmodalOpenCreate((prev) => !prev)
  };


  const openEditForm = () => {
    setmodalOpenEdit((prev) => !prev)
  }

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role")
    navigate("/login");
  };

  const handleedit = (id, item) => {
    setmodalOpenEdit((prev) => !prev)
    // console.log(id);
    // console.log(item);
    seteditData(item)
    seteditId(id)

  };

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `${apiKey}/api/event/deletebyid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("response", response.data);
      alert(response.data.message);
      fetchEvents()
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      {/* top */}
      <div className="container mt-4">
        <h1 className="text-center mb-4">All Event</h1>
        <div className="d-flex justify-content-between">
          {localStorage.getItem("role") === "organizer" && (
            <button
              className="mb-4 text-white p-2 bg-primary mt-4"
              onClick={handleopenform}
            >
              Create Event
            </button>
          )}

          <button
            className="mb-4 text-white p-2 bg-primary mt-4"
            onClick={handlelogout}
          >
            Logout
          </button>
        </div>

        {/* filter */}
        <div className="d-flex gap-1">
          <input
            className="form-control"
            type="text"
            placeholder="search..."
            onChange={(e) => setsearch(e.target.value)}
          />
          <select className="form-select" aria-label="Select Category" value={selectedCategory} onChange={(e) => setselectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categoryData.length && categoryData?.map((item) => {
              return (
                <option key={item} value={item}>{item}</option>
              )
            })}
          </select>

          <select
            className="form-select"
            aria-label="Select Date"
            value={sortOrder}
            onChange={(e) => setsortOrder(e.target.value)}
          >
            <option value="">Sort by Date</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>


        </div>
      </div>

      {/* create modal  */}
      {modalOpenCreate && <EventForm onClose={() => setmodalOpenCreate(false)} refreshEvent={fetchEvents} />}


      {/* Edit modal  */}
      {modalOpenEdit && <EditEventForm editId={editId} editData={editData} onClose={() => setmodalOpenEdit(false)} refreshEvent={fetchEvents} />}

      {/* card */}
      <div className="container mt-4">
        <div className="row g-4">
          {filteredData.length ? filteredData.map((item, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <Card
                item={item}
                handleedit={handleedit}
                handledelete={handledelete}
              />
            </div>
          )) : (
            <div className="text-center">
              Not Found...
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div
        className="d-flex align-items-center justify-content-center mt-3 gap-3"
      >

        {/* Previous */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: currentPage === 1 ? "#f1f1f1" : "white",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            fontSize: "0.9rem",
          }}
        >
          Previous
        </button>

        {/* Page text */}
        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>
          Page {currentPage} of {totalPages}
        </span>

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: currentPage === totalPages ? "#f1f1f1" : "white",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            fontSize: "0.9rem",
          }}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Event;

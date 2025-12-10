import React from "react";
import { useState } from "react";
import RegisterEvent from "./registerEvent";

const Card = ({ item, handleedit, handledelete }) => {
  const [registerModal, setregisterModal] = useState(false)

  const [eventId, seteventId] = useState("")
  const handleRegisteModal = (id, item) => {
    // console.log(id, item);
    seteventId(id)
    setregisterModal((prev) => !prev)
  }

  return (
    <div
      className="shadow card h-100 border-0"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        transition: "0.3s",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={item?.image}
          className="card-img-top"
          alt={item?.title}
          style={{
            height: "200px",
            width: "100%",
            objectFit: "cover",
          }}
        />

        {/* Category Badge */}
        <span
          className="badge bg-warning text-dark"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "8px 12px",
            fontSize: "0.8rem",
            borderRadius: "10px",
          }}
        >
          {item?.category}
        </span>
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">

        {/* Title */}
        <h5
          className="card-title fw-bold text-truncate"
          style={{ fontSize: "1.1rem" }}
        >
          {item?.title}
        </h5>

        {/* Dates */}
        <p className="text-muted small mb-2">
          📅 {new Date(item?.startDate).toLocaleDateString("en-GB")} —{" "}
          {new Date(item?.endDate).toLocaleDateString("en-GB")}
        </p>

        {/* Location */}
        <p className="text-dark fw-semibold mb-1" style={{ fontSize: "0.95rem" }}>
          📍 {item?.location?.name}
        </p>
        <p className="small text-muted mb-3">
          {item?.location?.address}
        </p>

        {/* Description Preview */}
        <p className="card-text text-muted" style={{ flex: 1 }}>
          {item?.description?.slice(0, 60)}...
        </p>

        {/* Status + Seats */}
        <div className="d-flex justify-content-between mb-2">
          <span
            className={`badge ${item.status === "open"
              ? "bg-success"
              : item.status === "closed"
                ? "bg-secondary"
                : "bg-danger"
              }`}
            style={{ padding: "8px 14px" }}
          >
            {item?.status?.toUpperCase()}
          </span>

          <span className="badge bg-info text-dark" style={{ padding: "8px 14px" }}>
            Seats: {item?.seatsAvailable}
          </span>
        </div>

        {/* Price */}
        <h5 className="fw-bold text-success mb-3">₹ {item?.price}</h5>

        {/* Buttons */}
        <div className="mt-auto d-flex justify-content-between gap-2">
          {localStorage.getItem("role") === "organizer" ? (
            <>
              <button
                className="btn btn-outline-warning btn-sm w-50 fw-semibold"
                onClick={() => handleedit(item._id, item)}
              >
                ✏️ Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm w-50 fw-semibold"
                onClick={() => handledelete(item._id)}
              >
                🗑️ Delete
              </button></>
          ) : (
            <button
              onClick={() => handleRegisteModal(item._id, item)}
              className="btn btn-outline-danger btn-sm w-50 fw-semibold"
            >Register</button>
          )}
        </div>

        {/* registerModal */}
        {registerModal ? (
          <RegisterEvent onClose={() => setregisterModal(false)} eventId={eventId} />
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default Card;

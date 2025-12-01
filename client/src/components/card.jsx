import React from "react";

const Card = ({ item, handleedit, handledelete }) => {
  return (
    <div className="card shadow-sm" style={{ width: "22rem", height: "28rem" }}>
      <img
        src={item.image}
        className="card-img-top"
        alt={item.title}
        style={{ height: "180px", objectFit: "cover" }}
      />

      <div className="card-body">
        <div className="d-flex gap-2">
          <p className="card-text">
            <small className="text-muted">Start Date:</small>
            <strong>{item.startDate.slice(0, 10)}</strong>
          </p>
          <p className="card-text">
            <small className="text-muted">End Date:</small>
            <strong>{item.endDate.slice(0, 10)}</strong>
          </p>
        </div>
        <p className="text-end">
          <span className="bg-success text-end text-white p-1">
            Status:{item.status}
          </span>
        </p>
        <div className="d-flex justify-content-between">
          <p>Capacity{item.capacity}</p>
          <p className="bg-warning p-1">{item.category}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>${item.price}</p>
          <p className="bg-info p-1">
            <span>seat Avaliable</span> {item.seatsAvailable}
          </p>
        </div>
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.description}</p>
        <p className="fw-bold text-primary">{item.author}</p>

        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => handleedit(item._id)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => handledelete(item._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;

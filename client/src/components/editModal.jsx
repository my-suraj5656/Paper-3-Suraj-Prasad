import React from "react";
import "../assets/css/modal.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventValidationSchema } from "../utils/yupSchema";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiKey } from "../App";

const EditEventForm = ({ onClose, refreshEvent, editData, editId }) => {
    // console.log(editData);
    const flattenEventObj = (event) => ({
        ...event,
        locationName: event.location?.name,
        address: event.location?.address,
        latitude: event.location?.location?.coordinates?.[1],
        longitude: event.location?.location?.coordinates?.[0],
    });

    const flatData = flattenEventObj(editData)
    // console.log(flatData);


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(eventValidationSchema),
        defaultValues: flatData
    });

    const onSubmit = async (data) => {
        const eventData = {
            title: data.title,
            description: data.description,
            image: data.image,
            category: data.category,

            location: {
                name: data.locationName,
                address: data.address,
                location: {
                    type: "Point",
                    coordinates: [
                        Number(data.longitude),
                        Number(data.latitude),
                    ]
                }
            },

            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),

            price: Number(data.price),
            capacity: Number(data.capacity),
            seatsAvailable: Number(data.seatsAvailable),
            status: data.status,
        };
        // console.log(eventData);


        try {
            const response = await axios.put(
                `${apiKey}/api/event/update/${editId}`, eventData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            // console.log("response", response.data);
            alert(response.data.message);
            reset()
            onClose()
            refreshEvent()
        } catch (error) {
            // console.log(error.response.data.message);
            alert(error.response.data.message);
        }
    };


    return (
        <div className="container p-4">
            <div className="modal-overlay" onClick={onClose}>
                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="mb-3">Update Event</h3>

                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        {/* Title */}
                        <div className="col-md-6">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("title")}
                            />
                            <p className="text-danger">{errors.title?.message}</p>
                        </div>

                        {/* Category */}
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("category")}
                            />
                            <p className="text-danger">{errors.category?.message}</p>
                        </div>

                        {/* Description */}
                        <div className="col-12">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                {...register("description")}
                            ></textarea>
                            <p className="text-danger">{errors.description?.message}</p>
                        </div>

                        {/* Image URL */}
                        <div className="col-12">
                            <label className="form-label">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("image")}
                            />
                            <p className="text-danger">{errors.image?.message}</p>
                        </div>

                        {/* Location Name */}
                        <div className="col-md-6">
                            <label className="form-label">Location Name</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("locationName")}
                            />
                            <p className="text-danger">{errors.locationName?.message}</p>
                        </div>

                        {/* Address */}
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("address")}
                            />
                            <p className="text-danger">{errors.address?.message}</p>
                        </div>

                        {/* Latitude */}
                        <div className="col-md-6">
                            <label className="form-label">Latitude</label>
                            <input
                                type="number"
                                step="any"
                                className="form-control"
                                {...register("latitude")}
                            />
                            <p className="text-danger">{errors.latitude?.message}</p>
                        </div>

                        {/* Longitude */}
                        <div className="col-md-6">
                            <label className="form-label">Longitude</label>
                            <input
                                type="number"
                                step="any"
                                className="form-control"
                                {...register("longitude")}
                            />
                            <p className="text-danger">{errors.longitude?.message}</p>
                        </div>

                        {/* Start Date */}
                        <div className="col-md-6">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                {...register("startDate")}
                            />
                            <p className="text-danger">{errors.startDate?.message}</p>
                        </div>

                        {/* End Date */}
                        <div className="col-md-6">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                {...register("endDate")}
                            />
                            <p className="text-danger">{errors.endDate?.message}</p>
                        </div>

                        {/* Price */}
                        <div className="col-md-4">
                            <label className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register("price")}
                            />
                            <p className="text-danger">{errors.price?.message}</p>
                        </div>

                        {/* Capacity */}
                        <div className="col-md-4">
                            <label className="form-label">Capacity</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register("capacity")}
                            />
                            <p className="text-danger">{errors.capacity?.message}</p>
                        </div>

                        {/* Seats Available */}
                        <div className="col-md-4">
                            <label className="form-label">Seats Available</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register("seatsAvailable")}
                            />
                            <p className="text-danger">
                                {errors.seatsAvailable?.message}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select className="form-select" {...register("status")}>
                                <option value="open">Open</option>
                                <option value="full">Full</option>
                                <option value="closed">Closed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <p className="text-danger">{errors.status?.message}</p>
                        </div>

                        {/* Submit Button */}
                        <div className="col-12">
                            <button className="btn btn-primary w-100">Update Event</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEventForm;

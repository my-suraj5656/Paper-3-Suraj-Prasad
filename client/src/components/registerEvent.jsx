import React from "react";
import "../assets/css/modal.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { eventRegisterSchema } from "../utils/yupSchema";
import { apiKey } from "../App";

const RegisterEvent = ({ onClose, eventId }) => {

    // console.log(eventId, registerItemData);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(eventRegisterSchema),
    });

    const onSubmit = async (data) => {
        const registerData = {
            ...data,
            user: localStorage.getItem("id"),
            event: eventId
        }
        // console.log(registerData);


        try {
            const response = await axios.post(
                `${apiKey}/api/event/registerevent`, registerData,
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
        } catch (error) {
            // console.log(error.response.data.message);
            alert(error.response.message);
        }
    };


    return (
        <div className="container p-4">
            <div className="modal-overlay" onClick={onClose}>
                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="mb-3">Register Event</h3>

                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>

                        {/* Tickets */}
                        <div className="col-md-6">
                            <label className="form-label">Tickets</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register("tickets")}
                                placeholder="Number of tickets"
                            />
                            <p className="text-danger">{errors.tickets?.message}</p>
                        </div>

                        {/* Paid */}
                        <div className="col-md-6">
                            <label className="form-label">Paid Amount (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                {...register("Paid")}
                                placeholder="Amount paid"
                            />
                            <p className="text-danger">{errors.Paid?.message}</p>
                        </div>

                        {/* Status */}
                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select className="form-select" {...register("status")}>
                                <option value="confirmed">Confirmed</option>
                                <option value="waitlisted">Waitlisted</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="checked-in">Checked In</option>
                                <option value="checked-out">Checked Out</option>
                            </select>
                            <p className="text-danger">{errors.status?.message}</p>
                        </div>

                        {/* Payment Status */}
                        <div className="col-md-6">
                            <label className="form-label">Payment Status</label>
                            <select className="form-select" {...register("paymentStatus")}>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="failed">Failed</option>
                            </select>
                            <p className="text-danger">{errors.paymentStatus?.message}</p>
                        </div>

                        {/* Seat Numbers */}
                        <div className="col-md-12">
                            <label className="form-label">Seat Numbers (comma separated)</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("seatNumbers")}
                                placeholder="Ex: A1, A2, A3"
                            />
                            <p className="text-danger">{errors.seatNumbers?.message}</p>
                        </div>

                        {/* Submit button */}
                        <div className="col-12">
                            <button className="btn btn-primary w-100">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default RegisterEvent;

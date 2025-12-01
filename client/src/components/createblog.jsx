import React from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Createblog = ({
  heading,
  button,
  editData,
  setcreateOpen,
  seteditOpen,
  editOpen,
  seteditData,
}) => {
  // console.log(edit);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: editData
      ? {
          title: editData.title,
          image: editData.image,
          author: editData.author,
          description: editData.description,
        }
      : {},
  });

  const onSubmit = async (data) => {
    // console.log(edit);
    let response;
    if (editOpen) {
      try {
        response = await axios.put(
          `http://localhost:3000/api/v1/blog/updateblog?id=${editData._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert(response.data.message);
        seteditOpen(false);
        seteditData({});
        reset();
      } catch (error) {
        alert(error.response.data.message);
        navigate("/login");
      }
    } else {
      try {
        response = await axios.post(
          "http://localhost:3000/api/v1/blog/createblog",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert(response.data.message);
        setcreateOpen(false);
        reset();
      } catch (error) {
        alert(error.response.data.message, "Login again");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <h2>{heading}</h2>

        <form className="App" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="title"
          />
          {errors.title && (
            <span style={{ color: "red" }}>*title* is mandatory</span>
          )}

          <input
            type="url"
            {...register("image", { required: true })}
            placeholder="image"
          />
          {errors.image && (
            <span style={{ color: "red" }}>*image* is mandatory</span>
          )}

          <input
            type="text"
            {...register("author", { required: true })}
            placeholder="author"
          />
          {errors.author && (
            <span style={{ color: "red" }}>*author* is mandatory</span>
          )}

          <textarea
            {...register("description", { required: true })}
            placeholder="description"
          />
          {errors.description && (
            <span style={{ color: "red" }}>*description* is mandatory</span>
          )}

          <input
            type="submit"
            value={button}
            style={{ backgroundColor: "#a1eafb" }}
          />
        </form>
      </div>
    </>
  );
};

export default Createblog;

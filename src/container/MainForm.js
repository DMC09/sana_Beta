import React, { useContext,useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormContext } from "../context/formContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function MainForm() {
  const [fname, setFname, lname, setLname,email,setEmail,frequency, setFrequency,category, setCategory] = useContext(FormContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
  const onSubmit = async (data) => {

    // console.log(category)
const {category,frequency} = await data;
await setFrequency(frequency)
await setCategory(category)
await axios.post("http://localhost:3001/post", { fname,lname,email,frequency,category });
};
  return (

        <form onSubmit={handleSubmit(onSubmit)} className="form_container">
      <h1 style={{textAlign:"center"}}>Almost there, {fname}!</h1>
          <div className="username_row">
        <div id="firstName" className="input-field">
        <label label="username">Username</label>
        <input
          type="text"
          className="validate"
          name="uname"
          ref={register({
            required: true,
            minLength: 1,
            pattern: /^[a-zA-z]+$/,
          })}
        ></input>
        {errors.uname?.type === "required" && (
          <span
            className="helper-text"
            data-error="wrong"
            data-success="right"
          >
            Your input is required
          </span>
        )}
        {errors.uname?.type === "minLength" && (
          <span
            className="helper-text"
            data-error="wrong"
            data-success="right"
          >
            Your input needs to be at least 1 letter
          </span>
        )}
        {errors.uname?.type === "pattern" && (
          <span
            className="helper-text"
            data-error="wrong"
            data-success="right"
          >
            please only use letters
          </span>
        )}
        </div>
          </div>
          <div className="password_row">
          <div id="password" className="input-field" >
          <label label="password">Password</label>
          <input
            type={passwordShown ? "text" : "password"}
            className="validate"
            name="pword"
            ref={register({
              required: true,
              minLength: 1,
              pattern: /^[a-zA-z]+$/,
            })}
          >

          </input>
<i onClick={togglePasswordVisiblity}>{eye}</i>
          {errors.pword?.type === "required" && (
            <span
              className="helper-text"
              data-error="wrong"
              data-success="right"
            >
              Your input is required
            </span>
          )}
          {errors.pword?.type === "minLength" && (
            <span
              className="helper-text"
              data-error="wrong"
              data-success="right"
            >
              Your input needs to be at least 1 letter
            </span>
          )}
          {errors.pword?.type === "pattern" && (
            <span
              className="helper-text"
              data-error="wrong"
              data-success="right"
            >
              please only use letters
            </span>
          )}
          </div>
          </div>
          <div className="subscribe_row">
            <div className="input-field ">
            <label label="Frequency">Subscribe to Newsletter?</label>
            <div className="newsletter">
<input type="radio" name="frequency" value="true" ref={register} />
<label for="Weekly">Yes</label>
<input type="radio"  name="frequency" value="false" ref={register} />
<label for="Bi-Weekly">No</label>
            </div>
            </div>
          </div>
          <button className="btn confirm-btn" type="submit" name="action">
            Confirm
          </button>
        </form>
  )
}

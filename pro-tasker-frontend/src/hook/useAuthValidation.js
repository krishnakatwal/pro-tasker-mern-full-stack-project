import { useState } from "react";

function useAuthValidation() {
  //state to strore validation errors for form fields
  const [errors, setErrors] = useState({});

  // function to validate login form
  const validateLogin = (form) => {
    //container for collecting problems in the form.
    //temporary object to collect errors

    const newErrors = {};

    //check if email is empty
    if (!form.email) {
      newErrors.email = "Email is required";
    }
    //check if email format is valid
    else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    //check if password is empty
    if (!form.password) {
      newErrors.password = "password is required";
    }

    // check if password length is at least 8 characters
    else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // update state with validation errors
    setErrors(newErrors);

    // return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // function to validate registration form
  const validateRegister = (form) => {
    // temporary object to collect errors
    const newErrors = {};

    // check if name is provided
    if (!form.username) {
      newErrors.username = "Name is required";
    }

    // check if email is empty
    if (!form.email) {
      newErrors.email = "Email is required";
    }
    // check if email format is valid
    else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    // check if password is empty
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    // check if password length is at least 8 characters
    else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // update state with validation errors
    setErrors(newErrors);

    // return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // expose errors and validation functions
  return {
    errors,
    validateLogin,
    validateRegister,
  };
}

export default useAuthValidation;

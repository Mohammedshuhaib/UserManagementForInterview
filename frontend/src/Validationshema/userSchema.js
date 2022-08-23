import * as yup from "yup";

export const signupSchema = yup.object().shape({
  Name: yup.string().required("Name cannot be empty"),
  Email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  Password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export const loginSchema = yup.object().shape({
  Email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
    Password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

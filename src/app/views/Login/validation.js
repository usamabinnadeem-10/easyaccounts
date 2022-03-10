import * as Yup from "yup";

const REQUIRED = "Required";
export const validationSchema = Yup.object().shape({
  username: Yup.string().required(REQUIRED),
  password: Yup.string().required(REQUIRED),
});

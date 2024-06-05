import { Button, Card, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import * as yup from "yup";
import { userRegistrationHandler } from "../../handlers/auth";
import useMapContext from "../../hooks/useMapContext";

const FormSchema = yup.object().shape({
  email: yup.string().required().email("Invalid email address").matches(/[.]/),
  pass: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirm: yup
    .string()
    .oneOf([yup.ref("pass")], 'Must match "password" field value'),
});

const RegisterForm = ({ onOpenChange }: { onOpenChange: () => void }) => {
  const { dispatch } = useMapContext();
  const [error, setError] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const handleSubmit = async (values: { email: string; pass: string }) => {
    const user = await userRegistrationHandler({
      email: values.email,
      password: values.pass,
    });
    if (user) {
      dispatch({ type: "SET_USER", user: user });
      onOpenChange();
    } else {
      setError("User already exist");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
      confirm: "",
    },

    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: FormSchema,
  });
  const { confirm, email, pass } = formik.values;
  useEffect(() => {
    if (confirm && email && pass) {
      const isNoErrors = Object.keys(formik.errors).length > 0 ? true : false;

      if (!isNoErrors) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [confirm, email, pass, formik.errors]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="gap-2 flex items-center flex-col">
        {error && (
          <Card className=" p-4 bg-[#f31212] text-white border-gray-500">
            {error}
          </Card>
        )}
        <Input
          autoFocus
          label="Email"
          name="email"
          id="email"
          placeholder="Enter your email"
          variant="bordered"
          isInvalid={!!formik.errors.email}
          errorMessage="Pleas input valid email"
          endContent={<IoMdMail />}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          value={formik.values.pass}
          id="pass"
          name="pass"
          onChange={formik.handleChange}
          endContent={<FaUnlock />}
          label="Password"
          min={8}
          isInvalid={!!formik.errors.pass}
          errorMessage={formik.errors.pass}
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />
        <Input
          id="confirm"
          name="confirm"
          endContent={<FaLock />}
          isInvalid={!!formik.errors.confirm}
          errorMessage={formik.errors.confirm}
          onChange={formik.handleChange}
          value={formik.values.confirm}
          label="Confirm password"
          placeholder="Confirm your password"
          type="password"
          variant="bordered"
        />
        <Button
          type="submit"
          disabled={disabled}
          fullWidth
          color={!disabled ? "success" : "default"}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;

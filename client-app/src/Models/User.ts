import * as Yup from "yup";

 export interface RegisterFormValues{
  name: string;
  email:string;
  password:string;
  confirmPassword:string;
  phoneNumber:string;
  role:number;
  longitude?:string;
  latitude?:string;


 }
 export const RegisterInitialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  role: 0, // Default to a valid UserRole
  longitude: undefined,
  latitude: undefined,
};

//    Add Validation:

export const RegisterSchema=Yup.object<any>().shape<any>({
  name:Yup.string().required("Name is Required"),
  email:Yup.string().email("Invalid email").required('Email is required'),
  password:Yup.string().min(6,"Password must be atleast 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
  .equals([Yup.ref("password")], "Passwords must match")
  .required("Confirm Password is required"),
  phoneNumber: Yup.string().matches(/^[0-9]{11}$/, "Phone number must be 11 digits").required("Phone number is required"),
  role:Yup.number().required("Role is required"),
  longitude:Yup.number().optional(),
  latitude:Yup.number().optional(),
});

//Now for LogIn
export interface LogInFormValues{
  email: string,
  password: string,

}
export const LogInInitialValues: LogInFormValues={
  email:"",
  password:"",

};
export const LogInSchema=Yup.object<any>().shape<any>({
  email:Yup.string().email("Invalid email").required("Email is required"),
  password:Yup.string().required("Password is required")
})
export interface User {
  id: string;
  name: string;
  role: number;
}

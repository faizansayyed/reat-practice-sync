import { useDispatch } from "react-redux";
import { showSnackbar } from "./snackbarSlice";

// Inside your component
const dispatch = useDispatch();
dispatch(
  showSnackbar({ message: "This is a success message!", type: "success" })
);

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "@reduxjs/toolkit/query";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useSelector("");
  const [password, setPassword] = useState("");
};

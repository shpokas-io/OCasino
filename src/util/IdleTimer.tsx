import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const IdleTimer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const inactivityLimit = 10 * 60 * 1000; // 10 minutes
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    if (!accessToken) return;

    const resetTimer = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    const interval = setInterval(() => {
      if (Date.now() - lastActivityRef.current > inactivityLimit) {
        dispatch(logout());
        navigate("/login?reason=inactive");
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      clearInterval(interval);
    };
  }, [accessToken, dispatch, navigate]);

  return null;
};

export default IdleTimer;

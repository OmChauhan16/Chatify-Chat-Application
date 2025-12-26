import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    const id = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;

    const data = await axios.get(`${logoutRoute}/${id}`);

    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
      <span className="tooltip">Logout</span>
    </Button>
  );
}


const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }

  .tooltip {
    position: absolute;
    top: -38px;
    left: 50%;
    transform: translateX(-50%);
    background: #000000e0;
    color: #fff;
    padding: 0.35rem 0.6rem;
    border-radius: 0.4rem;
    font-size: 0.75rem;
    white-space: nowrap;
    pointer-events: none;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 9999;   /* <-- important */
  }

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;

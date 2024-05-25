import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { Link } from 'react-router-dom'; // Import Link if using React Router
import "./Home.module.css";
import { FaUser, FaComments } from "react-icons/fa"; // Import icons for user and chatbox
import "../../styles/sidebar.css"
import Sidebar from "../MainHeader/Sidebar";
const Home = () => {
  return (
    <Sidebar/>
  );
};


export default Home;

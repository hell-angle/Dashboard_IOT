import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Sidebar from "../components/MainHeader/Sidebar";
import MainHeader from "../components/MainHeader/MainHeader";
import "../styles/logs.css";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import { CSVLink } from "react-csv";
import Button from '@material-ui/core/Button';
const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:3000/user/fulldata")
      .then((response) => {
        setLogs(response.data);
        setFilteredLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
      });
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleExportClick = () => {
    // Filter logs before exporting
    const filteredData = logs.filter(
      (log) =>
        log.sensor_id.toString().includes(searchTerm) ||
        log.reading_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.reading_value.toString().includes(searchTerm) ||
        log.reading_timestamp.includes(searchTerm)
    );

    // Generate CSV data
    const csvData = filteredData.map((log) => ({
      "Sensor ID": log.sensor_id,
      "Reading Type": log.reading_type,
      "Reading Value": log.reading_value,
      "Reading Timestamp": log.reading_timestamp,
    }));

    // Define CSV headers
    const headers = [
      { label: "Sensor ID", key: "Sensor ID" },
      { label: "Reading Type", key: "Reading Type" },
      { label: "Reading Value", key: "Reading Value" },
      { label: "Reading Timestamp", key: "Reading Timestamp" },
    ];

    // Use CSVLink to provide download link for the CSV file
    return (
        <Button variant="contained" color="inherit" className="Export_Button">
      <CSVLink data={csvData} headers={headers} filename={"D:\Downloads\logs.csv"} className="Export_Button">
        Export
      </CSVLink>
      </Button>
    );
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = logs.filter(
      (log) =>
        log.sensor_id.toString().includes(searchTerm) ||
        log.reading_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.reading_value.toString().includes(searchTerm) ||
        log.reading_timestamp.includes(searchTerm)
    );
    setFilteredLogs(filtered);
    setCurrentPage(0); // Reset current page when filtering
  };

  const offset = currentPage * itemsPerPage;
  const currentLogs = filteredLogs.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredLogs.length / itemsPerPage);

  return (
    <div className="main-page">
      <MainHeader />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <h2>Current Sensor Values</h2>
          <div className="sensor-values">
            <div style={{display:"flex", justifycontent: "left"}} className="search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <div 
              style={{paddingLeft:"10px"}}
              className="actions">
            {handleExportClick()}
          </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Sensor ID</th>
                  <th>Reading Type</th>
                  <th>Reading Value</th>
                  <th>Reading Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log) => (
                  <tr key={log.reading_id}>
                    <td>{log.sensor_id}</td>
                    <td>{log.reading_type}</td>
                    <td>{log.reading_value}</td>
                    <td>{log.reading_timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{paddingLeft:"133px", paddingTop:"25px"}} className="paginate">
            <ReactPaginate
              previousLabel={
                <IconContext.Provider
                  value={{ color: "#B8C1CC", size: "36px" }}
                >
                  <AiFillLeftCircle />
                </IconContext.Provider>
              }
              nextLabel={
                <IconContext.Provider
                  value={{ color: "#B8C1CC", size: "36px" }}
                >
                  <AiFillRightCircle />
                </IconContext.Provider>
              }
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;

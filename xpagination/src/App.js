import React, { useState, useEffect } from "react";

function App() {
  const thStyle = {
    padding: "12px",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "12px",
  };

  const paginationContainerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const buttonStyle = {
    backgroundColor: "#059862",
    color: "white",
    padding: "8px 16px",
    margin: "0 5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const pageNumberStyle = {
    backgroundColor: "#059862",
    color: "white",
    padding: "8px 16px",
    margin: "0 5px",
    border: "none",
    borderRadius: "4px",
    textAlign: "center",
    cursor: "default",
  };

  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => alert(`/failed to fetch data/i`));
  }, []);

  const totalPages = Math.ceil(members.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = members.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h1>Employee Data Table</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead
          style={{
            backgroundColor: "#059862",
            color: "white",
          }}
        >
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member) => (
            <tr key={member.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tdStyle}>{member.id}</td>
              <td style={tdStyle}>{member.name}</td>
              <td style={tdStyle}>{member.email}</td>
              <td style={tdStyle}>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={paginationContainerStyle}>
        <button onClick={handlePrevious} style={buttonStyle}>
          Previous
        </button>
        <span style={pageNumberStyle}>{currentPage}</span>
        <button onClick={handleNext} style={buttonStyle}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

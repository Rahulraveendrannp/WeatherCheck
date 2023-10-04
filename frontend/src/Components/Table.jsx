import React from "react";

const Table = ({components}) => {
  return (
    <table className="mt-10" style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}>Components</th>
          <th style={headerCellStyle}>μg/m3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cellStyle}>CO</td>
          <td style={cellStyle}>{components['co']}</td>
        </tr>
        <tr>
          <td style={cellStyle}>NO</td>
          <td style={cellStyle}>{components['no']}</td>
        </tr>
        <tr>
          <td style={cellStyle}>NH3</td>
          <td style={cellStyle}>{components['nh3']}</td>
        </tr>
        <tr>
          <td style={cellStyle}>NO2</td>
          <td style={cellStyle}>{components['no2']}</td>
        </tr>
        <tr>
          <td style={cellStyle}>O3</td>
          <td style={cellStyle}>{components['o3']}</td>
        </tr>
        <tr>
          <td style={cellStyle}>PM2_5</td>
          <td style={cellStyle}>{components['pm2_5']}</td>
        </tr>
        <tr>
          <td style={cellStyle}>PM10</td>
          <td style={cellStyle}>{components['pm10']}</td>
        </tr>
        <tr>
          <td style={cellStyle}>SO2</td>
          <td style={cellStyle}>{components['so2']}</td>
        </tr>
      </tbody>
    </table>
  );
};
const tableStyle = {
    borderCollapse: 'collapse', // Collapse table borders
    width: '10%',
  };
  
  const headerCellStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
    border: '1px solid #fff', // Header border
  };
  
  const cellStyle = {
    border: '1px solid #ccc', // Cell border
    padding: '10px',
    textAlign: 'left',
  };

export default Table;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import grade9Data from "../data/grade9-data.json";
import grade10Data from "../data/grade10-data.json";
import grade11Data from "../data/grade11-data.json";
import grade12Data from "../data/grade12-data.json";
import magnifyingGlass from "../images/magnifying-glass.png";
import "./home.scss";

const Home = () => {
  const [gradeData, setGradeData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleJoinRoom = (room) => {
    setSelectedRoom(room);
  };

  if (selectedRoom) {
    const { Grade, Subject } = selectedRoom;
    const gradeWithoutSpace = Grade.replace(/\s+/g, "");
    const subjectWithoutSpace = Subject.replace(/\s+/g, "");
    const url = `/home/${gradeWithoutSpace}/${subjectWithoutSpace}`;
    return <Navigate to={url} state={{ room: selectedRoom }} />;
  }

  return (
    <div className="home">
      <div className="gradeButtons">
        <button onClick={() => setGradeData(grade9Data)}>Grade 9</button>
        <button onClick={() => setGradeData(grade10Data)}>Grade 10</button>
        <button onClick={() => setGradeData(grade11Data)}>Grade 11</button>
        <button onClick={() => setGradeData(grade12Data)}>Grade 12</button>
      </div>
      <div className="groupsContainer">
        {gradeData.map((value, key) => {
          return (
            <div className="group" key={key}>
              <h1>{value.Title}</h1>
              <div className="components">
                <h2>
                  <i class="fa-solid fa-users"></i>

                  {value.Members}
                </h2>
                <button onClick={() => handleJoinRoom(value)}>Join</button>
              </div>
            </div>
          );
        })}
      </div>
      {!gradeData.length && (
        <div className="info">
          <img src={magnifyingGlass} />
          <p>Please select a grade...</p>
        </div>
      )}
    </div>
  );
};

export default Home;

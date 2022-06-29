import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import "./App.css";
// https://react-lets-chat.herokuapp.com/
const socket = io("https://react-lets-chat.herokuapp.com/");

export const HomePage = ({ enter }) => {
  const [name, setname] = useState("");
  const [message, setmessage] = useState("");

  const SendNames = () => {
    console.log("SENDNAME");
    return socket.emit("SendName", { name });
  };

  useEffect(() => {
    socket.on("SendtoUser", (data) => {
      const { message } = data;

      console.log(message);
      if (message === "Welcome !!!!") enter();
      else if (message === "User Name already present") {
        setmessage(message);
        // To prevent user from having two socketIDs
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    });
  });

  return (
    <>
      <div className="box row container mx-auto">
        <div className="py-5 py-5 mb-5">
          <h2> Welcome , Guys </h2>
          <h3>
            Come over and start the conversation with your friends..........
          </h3>
          <div className=" input-group mb-3 my-5 col-4">
            <input
              type="text"
              className="form-control "
              placeholder="Enter your name"
              aria-label="Enter your name"
              aria-describedby="button-addon2"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <button
              className="btn btn-outline-warning"
              type="button"
              id="button-addon2"
              onClick={() => {
                SendNames();
              }}
            >
              Enter
            </button>
          </div>
          {/* <div className="nameHomepage input-group mb-5 my-2">
            <input
              type="text"
              className="form-control"
              placeholder="Create / Join room"
              aria-label="Create / Join room"
              aria-describedby="button-addon2"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              id="button-addon2"
              onClick={() => {
                SendNames();
              }}
            >
              Join/Create
            </button> */}
          {/* </div> */}
          <h1 className="connected">
            {" "}
            {`Time ::  ${new Date().toLocaleTimeString()}`}
          </h1>
          <h1 className="text-center"> {message}</h1>
        </div>
      </div>
    </>
  );
};

export { socket };
// ********************************************************************************************

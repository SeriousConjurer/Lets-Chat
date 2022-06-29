import React from "react";
import { useState, useEffect } from "react";
import { socket } from "./HomePage";
import "./Chat.css";
import { useNavigate } from "react-router";

export const Chat = () => {
  let navigate = useNavigate();
  const [allmesssages, setallmesssages] = useState([]);

  const [input, setinput] = useState("");
  const [name, setname] = useState("");

  //   *****************************************************
  //   const [nothing, setnothing] = useState(0);
  //   if (nothing === 0) setnothing(1);
  useEffect(() => {
    // socket.on("SendtoUser", (data) => {
    //   const { message } = data;
    //   console.log(data);
    //   setmessage(message);
    // });

    socket.emit("giveName");
    socket.on("takeName", (data) => {
      setname(data.name);
    });
  }, []);
  // *************************************************************

  const SendMessage = (e) => {
    e.preventDefault();
   //console.log("GA");
    socket.emit("SendtoServer", { name, input });
    e.target.value = "";
  };

  useEffect(() => {
    socket.on("SendtoChat", (data) => {
      setallmesssages([...allmesssages, data]);
    //  console.log(allmesssages);
    });
  }, [allmesssages]);

  return (
    <div>
      <>
        <div class="input-group input-group-lg fixed-bottom">
          <button
            class="btn btn-outline-danger"
            type="button"
            id="button-addon2"
            onClick={(e) => {
              navigate("/");
              window.location.reload();
            }}
          >
            Leave
          </button>
          <button
            class="btn btn-outline-light"
            type="button"
            id="button-addon2"
            onClick={(e) => {
              setallmesssages([]);
            }}
          >
            Clear All
          </button>
          <input
            type="text"
            class="form-control"
            placeholder="write the message"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(e) => {
              return setinput(e.target.value);
            }}
            onKeyPress={(e) => (e.key === "Enter" ? SendMessage(e) : null)}
          />
        </div>
        <div className="container chatbox">
          <div className="row">
            {allmesssages.map((ff) => {
              const { id } = ff;
              if (ff.username === "You")
                return (
                  <div key={id} className="row justify-content-md-end">
                    <div className="text-end msgboxmy col-8 align-self-end ">
                      <h5>
                        <span className="boldstyle">
                          {" "}
                          {`${ff.username} :`}{" "}
                        </span>
                        {ff.message}
                      </h5>
                    </div>
                  </div>
                );
              else if (ff.username === "")
                return (
                  <div key={id} className="row">
                    <div className="text-center col-12  msgboxleft ">
                      <h4>{`${ff.message}`}</h4>
                    </div>
                  </div>
                );
              else {
                return (
                  <div key={id} className="row justify-content-md-start">
                    <div className="text-start msgbox col-8 align-self-start ">
                      <h5>
                        <span className="boldstyle">
                          {" "}
                          {`${ff.username} :`}{" "}
                        </span>
                        {ff.message}
                      </h5>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </>
    </div>
  );
};

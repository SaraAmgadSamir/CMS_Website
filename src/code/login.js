import "../font/login.scss";
import React, { useRef, useState, useEffect } from "react";
import { Route, useParams } from "react-router-dom";
var Airtable = require("airtable");
export default function FirstPage(props) {
  var cors = require("cors");
  const AIRTABLE_API_KEY = "keyufQOUOgaWQeSoA";
  var base = new Airtable({ apiKey: "keyufQOUOgaWQeSoA" }).base(
    "appQDez5zT9fpvP7Z"
  );
  var FacebookUsersTable = new Airtable({ apiKey: "keyufQOUOgaWQeSoA" }).base(
    process.env.FacebookUsersTable
  );
  var InstructorInformationTable = new Airtable({
    apiKey: "keyufQOUOgaWQeSoA",
  }).base(process.env.InstructorInformationTable);
  var ntlmRequest = require("request-simple-ntlm");
  var bodyLogIn;
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
  const [loggedIn, setLogIn] = useState(false);
  var userName = useRef();
  var password = useRef();
  var count;
  var tempId;
  const recordId = props.match.params.recordId;
  async function HandleClick() {
    setLogIn(true);
    //check if record is already there and it will update it

    console.log(recordId);
    count = -1;
    let passToInsert = password.current.value;
    let userNameToInsert = userName.current.value;

    base("FacebookUsersTable").update(recordId, {
      userName: userNameToInsert,
      password: passToInsert,
    });
    /*await base("FacebookUsersTable")
      .select({
        filterByFormula: '{userName} = "' + userNameToInsert + '"',
      })
      .eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
          tempId = record.id;
          count = 1;
          console.log("Inside");
          base("FacebookUsersTable").update(
            record.id,
            {
              password: passToInsert,
            },

            function (err, records) {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
        });

        console.log("Printed :" + count);
        console.log("Entered here yoh");
        if (count == -1) {
          base("FacebookUsersTable").create(
            [
              {
                fields: {
                  userName: userNameToInsert,
                  password: passToInsert,
                },
              },
            ],
            function (err, records) {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
        }
      });*/
  }
  function HandleClick2() {
    setLogIn(false);
  }

  if (!loggedIn) {
    return (
      <div class="login">
        <div class="heading">
          <h2
            style={{
              color: "#ffffff",
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}
          >
            Enter Credentials
          </h2>
          <form>
            <div class="input-group input-group-lg">
              <span class="input-group-addon">
                <i class="fa fa-user"></i>
              </span>
              <input
                type="text"
                class="form-control"
                ref={userName}
                placeholder="Username or email"
              />
            </div>

            <div class="input-group input-group-lg">
              <span class="input-group-addon">
                <i class="fa fa-lock"></i>
              </span>
              <input
                type="password"
                class="form-control"
                ref={password}
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              class="float"
              onClick={HandleClick}
              style={{
                color: "#ffffff",
                fontFamily: "sans-serif",
                fontStyle: "italic",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div class="fix-middle">
        <div class="fix-middle">
          <p class="float" style={{ marginLeft: "25%" }}>
            {" "}
            Thank you!
          </p>
        </div>
        <div class="heading">
          <p style={{ marginLeft: "24%" }}>
            Do not forget to reply "Done" to you CMS Chatbot
          </p>
          <button class="btn" onClick={HandleClick2}>
            <i class="	fa fa-arrow-circle-left"></i> Back
          </button>
        </div>
      </div>
    );
  }
}

import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import CalendarEventModal from "../Components/CalendarEventModal/CalendarEventModal";
import CellButton from "../Components/CellButton/CellButton";
import "./Calendar.css";
import CONSTANTS from "../util/Constants";
const moment = require("moment");
const today = moment();

// TODO: navigate to next and prev week
// TODO: handle EDIT current events with Modal
// TODO: handle DELETE current events with Modal

// TODO: REJECT CREATING events that overlap with EXISTING events
// TODO: REJECT or DISALLOW events that extend multiple days
// TODO: STRETCH GOAL: events may only have smaller times e.g. 15min / 30min blocks instead of 1hr

function Calendar() {
  const [showModal, setShowModal] = useState(false);
  const [clickedHourAndDate, setClickedHourAndDate] = useState([
    "0:00",
    "0/0",
    false,
  ]);
  const [cellList, setCellList] = useState([]);
  const [highlightedHours, setHighlightedHours] = useState(
    localStorage.getItem("highlightedHours")
      ? JSON.parse(localStorage.getItem("highlightedHours"))
      : {}
  );

  useEffect(() => {
    setAllCells();
  }, []);

  const handleOpenModal = (e, hour, date) => {
    setShowModal(true);
    const concatHour = parseInt(hour) + 1 + ":00";
    setClickedHourAndDate([concatHour, date, false]);
  };
  const handleCloseModal = () => setShowModal(false);

  const weekDates = [];
  let currentDate = today.format("DD");

  if (currentDate.charAt(0) === "0") {
    currentDate = currentDate.charAt(1);
  }

  for (let i = 0; i < 7; i++) {
    const date = moment(today).isoWeekday(i).format("DD/MM");

    const dateDay = date.split("/")[0];
    const dateMonth = date.split("/")[1];

    if (dateDay.charAt(0) === "0") {
      weekDates.push(`${dateDay.charAt(1)}/${dateMonth}`);
    } else {
      weekDates.push(`${dateDay}/${dateMonth}`);
    }
  }

  const handleNewCalEventSubmit = (e) => {
    e.preventDefault();
    const newHighlightedHours = {
      ...highlightedHours,
      [clickedHourAndDate[0] + clickedHourAndDate[1]]: true,
    };
    setClickedHourAndDate((c) => (c[2] = true));
    setHighlightedHours(newHighlightedHours);
    setAllCells();

    localStorage.setItem(
      "highlightedHours",
      JSON.stringify(newHighlightedHours)
    );
    handleCloseModal();
  };

  const handleDeleteCalEvent = (e) => {
    debugger;
    console.log("e", e);
    //TODO: GET THIS figured out!
    console.log("delete event!");
    const newHighlightedHours = {
      ...highlightedHours,
      [clickedHourAndDate[0] + clickedHourAndDate[1]]: false,
    };
    setClickedHourAndDate((c) => (c[2] = false));
    setHighlightedHours(newHighlightedHours);
    setAllCells();

    localStorage.setItem(
      "highlightedHours",
      JSON.stringify(newHighlightedHours)
    );
    handleCloseModal();
  };

  const displaySingleRowHours = (hour) => {
    const arr = [];

    for (let i = 1; i < 8; i++) {
      let backgroundHighlighted = false;
      let highlightKey = hour + weekDates[i - 1];

      if (
        (clickedHourAndDate[0] === hour &&
          clickedHourAndDate[1] === weekDates[i - 1] &&
          clickedHourAndDate[3]) ||
        highlightedHours[highlightKey]
      ) {
        backgroundHighlighted = true;
      }

      if (i === 1) {
        arr.push(
          <td className="timezone-col timezone-col-text timezone-col-flex">
            <p className="timezone-col-p"> {hour} </p>
          </td>
        );
        arr.push(
          <td className="cell">
            <CellButton
              backgroundHighlighted={backgroundHighlighted}
              hour={hour}
              date={weekDates[i - 1]}
              handleDeleteCalEvent={handleDeleteCalEvent}
              handleOpenModal={handleOpenModal}
            />
          </td>
        );
      } else if (i === 7) {
        arr.push(
          <td className="last-cell">
            <CellButton
              backgroundHighlighted={backgroundHighlighted}
              hour={hour}
              date={weekDates[i - 1]}
              handleDeleteCalEvent={handleDeleteCalEvent}
              handleOpenModal={handleOpenModal}
            />
          </td>
        );
      } else {
        arr.push(
          <td className="cell">
            <CellButton
              backgroundHighlighted={backgroundHighlighted}
              hour={hour}
              date={weekDates[i - 1]}
              handleDeleteCalEvent={handleDeleteCalEvent}
              handleOpenModal={handleOpenModal}
            />
          </td>
        );
      }
    }
    return arr;
  };

  const setAllCells = () => {
    const arr = [];
    CONSTANTS.hourRange24().forEach((hour) => {
      arr.push(<tr>{displaySingleRowHours(hour)}</tr>);
    });
    setCellList(arr);
  };

  const displayAllCells = () => {
    return cellList.map((cell) => {
      return cell;
    });
  };

  return (
    <div className="container">
      <CalendarEventModal
        handleNewCalEventSubmit={handleNewCalEventSubmit}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        clickedHourAndDate={clickedHourAndDate}
      />

      <table className="Calendar">
        <thead>
          <tr>
            <th className="timezone-col timezone-col-header">
              <p className="timezone-col-text">
                {today._d.toString().split(" ")[5]}
              </p>
            </th>
            <Header weekDates={weekDates} currentDate={currentDate} />
          </tr>
        </thead>
        <tbody>{displayAllCells()}</tbody>
      </table>
    </div>
  );
}

export default Calendar;

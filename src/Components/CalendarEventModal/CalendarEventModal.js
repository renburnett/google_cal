import Modal from "react-modal";

const CalendarEventModal = ({
  handleCloseModal,
  handleNewCalEventSubmit,
  handleDeleteCalEvent,
  showModal,
  clickedHourAndDate,
}) => {
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const shiftedHour = parseInt(clickedHourAndDate[0].split(":")[0]) - 1;
  const newHour = `${shiftedHour}:00`;

  return (
    <Modal
      ariaHideApp={false}
      isOpen={showModal}
      style={modalStyles}
      contentLabel="New Event Modal"
    >
      <button onClick={handleCloseModal}>
        <b>x</b>
      </button>
      <h4>Add New Event</h4>
      <b> Hour: {newHour} </b>
      <br />
      <b> Date: {clickedHourAndDate[1]} </b>
      <hr />
      <form onSubmit={(e) => handleNewCalEventSubmit(e)}>
        <label>Duration: </label>
        <select name="new-event-duration">
          <option value="1">1 HR</option>
          {/* 
          TODO: Add option for more than 1HR blocks
          <option value="2">2 HR</option>
          <option value="3">3 HR</option> */}
        </select>
        <br />
        <br />
        <label>Event Name: </label>
        <input type="text" name="event-title" />
        <br />
        <input type="submit" value="submit" />
      </form>
      <button onClick={handleDeleteCalEvent}>
        <b>Delete Event</b>
      </button>
    </Modal>
  );
};

export default CalendarEventModal;

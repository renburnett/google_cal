import "./Header.css";
import CONSTANTS from "../../util/Constants";

const Header = ({ currentDate, weekDates }) => {
  return CONSTANTS.daysOfTheWeek.map((day, idx) => {
    const currentDay = weekDates[idx].split("/")[0];
    if (idx === 6) {
      return (
        <th className="header-last-cell">
          <div className="header-text">
            <p>{day}</p>
            {currentDate === currentDay ? (
              <div className="num-div-container">
                <div className="num-div-highlight">
                  <p className="header-big-num">{currentDay}</p>
                </div>
              </div>
            ) : (
              <p className="header-big-num">{currentDay}</p>
            )}
          </div>
        </th>
      );
    } else {
      return (
        <th className="header">
          <div className="header-text">
            <p>{day}</p>
            {currentDate === currentDay ? (
              <div className="num-div-container">
                <div className="num-div-highlight">
                  <p className="header-big-num">{currentDay}</p>
                </div>
              </div>
            ) : (
              <p className="header-big-num">{currentDay}</p>
            )}
          </div>
        </th>
      );
    }
  });
};

export default Header;

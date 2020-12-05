import './Calendar.css';
import Header from '../Components/Header/Header';
import CONSTANTS from '../util/Constants';
const moment = require('moment');
const today = moment();

// TODO: navigate to next and prev week
// TODO: handle CREATE new events with Modal
// TODO: handle EDIT current events with Modal
// TODO: handle DELETE current events with Modal

// TODO: REJECT CREATING events that overlap with EXISTING events
// TODO: REJECT or DISALLOW events that extend multiple days
// TODO: events may only have fixed times e.g. 15min / 30min blocks of time

function Calendar() {
  const hours = [];
  const currentTime = today._d.toString().split(' ')[4];

  const hourRange = () => {
    for(let i=1; i<25; i++) {
      hours.push(`${i}:00`);
    }
  }

  const displaySingleRowHours = (hour) => {
    const arr = [];
    for (let i=1; i<8; i++) {
      if (i === 1) {
        arr.push(
          <td className="timezone-col timezone-col-text timezone-col-flex">
            <p className="timezone-col-p">{hour}</p>
          </td>
        );
        arr.push(<td className="cell">  .  </td>);
      } else if (i === 7) {
        arr.push(<td className="last-cell">  .  </td>);
      } else {
        arr.push(<td className="cell">  +  </td>);
      }
    }
    return arr;
  }

  const displayAllCells = () => {
    hourRange(); //calc hour range

    return hours.map((hour) => {
      return (
        <tr>
          { displaySingleRowHours(hour) }
        </tr>
      )
    })
  }

  const displayUtcOffset = () => {
    return <p className="timezone-col-text">{ today._d.toString().split(' ')[5] }</p>
  }

  return (
    <div className="container">
      <table className="Calendar">
        <thead>
          <tr>
            <th className="timezone-col timezone-col-header">{ displayUtcOffset() }</th>
            <Header today={today} moment={moment}/>
          </tr>
        </thead>
        <tbody>
          { displayAllCells() }
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;

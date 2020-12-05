import './Header.css';
import CONSTANTS from '../../util/Constants';

const Header = ({ today, moment }) => {
    const weekDates = [];
    let currentDate = today.format("DD");
    if (currentDate.charAt(0) === '0') { currentDate = currentDate.charAt(1); }

    for (let i=0; i<7; i++) {
        const date = moment(today).isoWeekday(i).format("DD");

        if (date.charAt(0) === '0') {
            weekDates.push(date.charAt(1));
        } else {
            weekDates.push(date);
        }
    }

  return CONSTANTS.daysOfTheWeek.map((day, idx) => {
        if (idx === 6) {
            return (
                <th className="header-last-cell">
                    <div className="header-text">
                        <p>{day}</p>
                        { currentDate === weekDates[idx] ? 
                            <div className="num-div-container"><div className="num-div-highlight"><p className="header-big-num">{weekDates[idx]}</p></div></div> : 
                            <p className="header-big-num">{weekDates[idx]}</p>
                        }
                    </div>
                </th>
            )
        } else {
            return (
                <th className="header">
                    <div className="header-text">
                        <p>{day}</p>
                        { currentDate === weekDates[idx] ? 
                            <div className="num-div-container"><div className="num-div-highlight"><p className="header-big-num">{weekDates[idx]}</p></div></div> : 
                            <p className="header-big-num">{weekDates[idx]}</p>
                        }
                    </div>
                </th>
            )
        }
    })
}

export default Header;

import './Hour.css';
import CONSTANTS from '../../util/Constants';

const Hour = () => {  
  return CONSTANTS.daysOfTheWeek.map((day, idx) => {
        return (
            <td className="hour">
                <p className="hour-text">
                </p>
            </td>
        )
    })
}

export default Hour;

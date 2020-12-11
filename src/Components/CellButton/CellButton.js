import './CellButton.css';
import CONSTANTS from '../../util/Constants';

const CellButton = ({ hour, date, handleOpenModal, backgroundHighlighted }) => {
    const tempNum = parseInt(hour.split(':')[0]) - 1
    const shiftedHour = tempNum.toString();

    return (
        <div 
            className={backgroundHighlighted ? "cell-button-background" : "cell-button"} 
            onClick={(e) => handleOpenModal(e, shiftedHour, date)}
        >
        </div>
    )
}

export default CellButton;

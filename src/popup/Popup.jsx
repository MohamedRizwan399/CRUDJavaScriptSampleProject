import { APP_INITIAL_POPUP_MSG } from "../utility/constants";


const Popup = (props) => {
    const { setClosePopup } = props;

    const closePopup = () => {
        setClosePopup(true);
    }

    return(
        <div className="popup-overlay">
            <div className="popup">
            <img src={`${process.env.PUBLIC_URL}/favicon1.ico`} alt="" />
            <p dangerouslySetInnerHTML={{__html: APP_INITIAL_POPUP_MSG}}></p>
                <button onClick={closePopup}>OK</button>
            </div>
        </div>
    );
}
export default Popup;
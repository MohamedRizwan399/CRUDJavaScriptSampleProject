import { APP_INITIAL_POPUP_MSG_1, APP_INITIAL_POPUP_MSG_2 } from "../utility/constants";


const Popup = (props) => {
    const { setClosePopup } = props;

    const closePopup = () => {
        setClosePopup(true);
    }

    return(
        <div className="popup-overlay">
            <div className="popup">
                <img src={`${process.env.PUBLIC_URL}/favicon1.ico`} alt="" />
                <ul>
                    <li dangerouslySetInnerHTML={{__html: APP_INITIAL_POPUP_MSG_1}}></li>
                    <li dangerouslySetInnerHTML={{__html: APP_INITIAL_POPUP_MSG_2}}></li>
                </ul>
                <button className="popup-button" onClick={closePopup}><b>Click here to explore!</b></button>
            </div>
        </div>
    );
}
export default Popup;
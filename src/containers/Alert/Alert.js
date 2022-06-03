import { useDispatch, useSelector } from "react-redux";
import { deactivateAlert } from "../../store/actions/alert";
import Modal from "../../components/Modal/Modal";

const Alert = () => {

    const dispatch = useDispatch();
    const message = useSelector(state => state.Alert.message);

    const closeModal = () => {
        dispatch(deactivateAlert());
    };

    const modalProps = {
        open: true,
        width: "360",
        close: true,
        closeAction: true,
        onCloseClick: closeModal, 
        title: message.title,
    };

    return (
        <Modal {...modalProps}>
            { message.contents }
        </Modal>
    )
};

export default Alert;
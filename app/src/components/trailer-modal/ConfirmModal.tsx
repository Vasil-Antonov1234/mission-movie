import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";
import styles from "./TrailerModal.module.css";

type ConfirmModalProps = {
    text: string,
    onCancel: () => void,
    onConfirm?: () => void
};

export default function ConfirmModal({ text, onCancel, onConfirm }: ConfirmModalProps) {

    return (
        <div className={styles["trailer-modal-container"]} >
            <div className={styles["confirm-modal-container"]}>
                <p className={styles["text"]}>{text}</p>
                <div className={styles["buttons-wrapper"]}>
                    <ButtonPrimary text="Yes" clickHandler={onConfirm} addStyle="btn-red" />
                    <ButtonSecondary text="Cancel" clickHandler={onCancel} addStyle="btn-gray" />
                </div>
            </div>
        </div>
    )
}
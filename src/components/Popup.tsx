import { Point } from "../types";
import Modal from "./Modal";

interface PopupProps {
    point: Point | null,
    children: React.ReactNode,
}

function Popup({ point, children }: PopupProps) {
    return (
        <Modal isVisible={point !== null}>
            {
                point &&
                <div style={{ position: "absolute", left: point.x, top: point.y }}>
                    {children}
                </div>
            }
        </Modal>
    );
}

export default Popup;
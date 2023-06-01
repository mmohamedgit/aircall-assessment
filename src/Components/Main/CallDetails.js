import { useState } from "react";

import styles from "../../Styles/CallDetails.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faRotateLeft,
  faVoicemail,
  faPhoneVolume,
  faPhoneSlash,
} from "@fortawesome/free-solid-svg-icons";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

const CallDetails = (props) => {
  const {
    id,
    date,
    direction,
    from,
    to,
    phoneNumber,
    duration,
    callType,
    buttonLabel,
  } = props;

  const callDate = new Date(date);
  const calendarDate = callDate.toDateString();
  const time = callDate.toLocaleTimeString();

  let callDirection;

  direction === "inbound"
    ? (callDirection = "Incoming")
    : (callDirection = "Outgoing");

  const [showCard, setShowCard] = useState(true);
  const toggleShowCard = () => {
    props.onClick(id);
    setShowCard(!showCard);
  };

  return (
    <div className={styles["call-details"]}>
      <Row>
        <Col md={12} className="mb-2">
          <Toast show={showCard} bg="light">
            <Toast.Header closeButton={false}>
              {callType === "answered" && (
                <>
                  <FontAwesomeIcon icon={faPhoneVolume} />
                  <strong className="me-auto">
                    Answered Call From {phoneNumber}
                  </strong>
                </>
              )}

              {callType === "missed" && (
                <>
                  <FontAwesomeIcon icon={faPhoneSlash} />
                  <strong className="me-auto">
                    Missed Call From {phoneNumber}
                  </strong>
                </>
              )}
              {callType === "voicemail" && (
                <>
                  <FontAwesomeIcon icon={faVoicemail} />
                  <strong className="me-auto">
                    Voicemail From {phoneNumber}
                  </strong>
                </>
              )}

              {buttonLabel === "Archive" ? (
                <FontAwesomeIcon
                  icon={faBoxArchive}
                  onClick={toggleShowCard}
                  className={styles.icon}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faRotateLeft}
                  onClick={toggleShowCard}
                  className={styles.icon}
                />
              )}
            </Toast.Header>
            <Toast.Body className={styles.toast}>
              {callType === "missed" ? (
                <p>
                  {from} tried to call on {to}
                </p>
              ) : (
                <p>
                  {callDirection} call, {duration} secs
                </p>
              )}
              <div>
                <small>
                  {calendarDate} at {time}
                </small>
              </div>
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </div>
  );
};

export default CallDetails;

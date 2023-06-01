import CallDetails from "../Main/CallDetails";
import styles from "../../Styles/Feed.module.css";

import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const Feed = (props) => {
  const { calls, onCall, onAllCalls, actionIcon } = props;

  return (
    <>
      <div className={styles.feed}>
        <div className={styles.title}>
          <Button onClick={onAllCalls} variant="outline-light" size="sm">
            {actionIcon === "archive" ? (
              <FontAwesomeIcon icon={faBoxArchive} />
            ) : (
              <FontAwesomeIcon icon={faRotateLeft} />
            )}

            <span>{actionIcon} All Calls</span>
          </Button>
        </div>

        <div>
          {calls.map((call) => (
            <CallDetails
              key={call.id}
              id={call.id}
              date={call.created_at}
              direction={call.direction}
              from={call.from}
              to={call.to}
              phoneNumber={call.via}
              duration={call.duration}
              callType={call.call_type}
              buttonLabel={actionIcon}
              onClick={onCall}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Feed;

import styles from "../../Styles/ToggleButton.module.css";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const ToggleButton = (props) => {
  const { buttonLabel } = props;
  return (
    <div className={styles.toggle}>
      <Button onClick={props.onClick} variant="outline-dark" size="sm">
        {buttonLabel === "Activity Feed" ? (
          <FontAwesomeIcon icon={faPhone} className={styles.icon} />
        ) : (
          <FontAwesomeIcon icon={faDownload} className={styles.icon} />
        )}

        <span>{props.buttonLabel}</span>
      </Button>
    </div>
  );
};

export default ToggleButton;

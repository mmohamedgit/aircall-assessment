import { useState, useEffect, useCallback } from "react";
import styles from "./Styles/App.module.css";
import Feed from "./Components/Main/Feed";
import Header from "./Components/Main/Header";
import ToggleButton from "./Components/UI/ToggleButton";
import Spinner from "react-bootstrap/Spinner";

const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [activeCalls, setActiveCalls] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [activeTab, setActiveTab] = useState("Activity Feed");
  const [isLoading, setIsLoading] = useState(false);

  const fetchActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}activities`);
      const callData = await response.json();
      setActivities(callData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const archiveCallHandler = async (activityId) => {
    try {
      await fetch(`${BASE_URL}/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_archived: true }),
      });
    } catch (error) {
      console.log(error);
    }

    fetchActivities();
  };

  const unarchiveCallHandler = async (activityId) => {
    try {
      await fetch(`${BASE_URL}/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_archived: false }),
      });
    } catch (error) {
      console.log(error);
    }

    fetchActivities();
  };

  const archiveAllCallsHandler = async () => {
    try {
      await Promise.all(
        activities.map((activity) =>
          fetch(`${BASE_URL}activities/${activity.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_archived: true }),
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
    fetchActivities();
  };

  const unarchiveAllCallsHandler = async () => {
    try {
      await fetch(`${BASE_URL}reset`, {
        method: "PATCH",
      });
    } catch (error) {
      console.log(error);
    }
    fetchActivities();
  };

  useEffect(() => {
    const filteredArchivedCalls = activities.filter(
      (activity) => activity.is_archived === true
    );
    setArchivedCalls(filteredArchivedCalls);
  }, [activities]);

  useEffect(() => {
    const filteredActiveCalls = activities.filter(
      (activity) =>
        activity.is_archived === false && Object.keys(activity).length > 8
    );
    setActiveCalls(filteredActiveCalls);
  }, [activities]);

  const showActiveFeedHandler = () => {
    setActiveTab("Activity Feed");
  };

  const showArchivedCallsHandler = () => {
    setActiveTab("Archived Calls");
  };

  return (
    <>
      <div className={styles.app}>
        <div className={styles.container}>
          <Header />
          <div className={styles["container-view"]}>
            <div className={styles["toggle-button"]}>
              <ToggleButton
                buttonLabel={"Activity Feed"}
                onClick={showActiveFeedHandler}
              />
              <ToggleButton
                buttonLabel={"Archived Calls"}
                onClick={showArchivedCallsHandler}
              />
            </div>

            {isLoading ? (
              <div className={styles.spinner}>
                <Spinner animation="border" role="status" variant="primary" />
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <main>
                  {activeTab === "Activity Feed" && (
                    <Feed
                      calls={activeCalls}
                      onCall={archiveCallHandler}
                      onAllCalls={archiveAllCallsHandler}
                      actionIcon="Archive"
                    />
                  )}
                  {activeTab === "Archived Calls" && (
                    <Feed
                      calls={archivedCalls}
                      onCall={unarchiveCallHandler}
                      onAllCalls={unarchiveAllCallsHandler}
                      actionIcon="Unarchive"
                    />
                  )}
                </main>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

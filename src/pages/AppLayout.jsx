import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

import styles from '../styles/AppLayout.module.css'
import ProtectedRoute from "./ProtectedRoute";

function AppLayout() {
  return (
    <ProtectedRoute>
      <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    </ProtectedRoute>
  );
}

export default AppLayout;
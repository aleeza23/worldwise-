import { Link } from "react-router-dom";
import styles from "../styles/Logo.module.css";
import logo from '../assets/logo.png'

function Logo() {
  return (
    <Link to="/">
      <img src={logo} alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
import { useNavigate } from "react-router-dom";
import ButtonStyles from '../styles/Button.module.css'

const BackButton = () => {
    const navigate = useNavigate()

  return <>
 <button className={`${ButtonStyles.btn} ${ButtonStyles.back}`} onClick={(e)=> {
            e.preventDefault()
            navigate(-1)
          } }>&larr; Back</button>
  </>;
};

export default BackButton;

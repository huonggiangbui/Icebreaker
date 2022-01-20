import react from "react";
import './styles.css';
import { ReactComponent as HeartIcon } from "../../../assets/heart.svg"

export function Footer() {
  return (
    <p id="love">
      Carefully crafted with <HeartIcon />. Author: Giang Bui Huong
    </p>
  )
}
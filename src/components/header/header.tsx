import { Link } from "react-router-dom";

import { header, link } from "./styles.css";

export const Header = () => {
  return (
    <div className={header}>
      <Link to="/" className={link}>
        Home
      </Link>
    </div>
  );
};

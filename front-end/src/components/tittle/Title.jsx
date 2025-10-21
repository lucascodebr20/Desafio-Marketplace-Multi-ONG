import { BsHandbagFill } from "react-icons/bs";

function Title({ className = '' }) {
  return (
    <a href="/">
      <h2 className={`text-gray-800 dark:text-white ${className}`}>
        Market Place das ONG
      </h2>
    </a>
  );
}

export default Title;
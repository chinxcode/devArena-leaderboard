import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className={`ml-4 py-2 px-3 rounded-full transition-colors duration-200 ${
                theme === "dark" ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
        >
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
        </button>
    );
};

export default ThemeToggle;

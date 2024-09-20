import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ThemeToggle from "./ThemeToggle";

const Header = ({ theme, toggleTheme }) => {
    return (
        <header className={`py-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800 shadow-md"}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                            DevArena
                        </h1>
                        <span className="text-sm text-gray-500">by MSI</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <a
                        href="https://github.com/chinxcode/devArena-leaderboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition-colors duration-200"
                    >
                        <FontAwesomeIcon icon={faGithub} size="xl" />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;

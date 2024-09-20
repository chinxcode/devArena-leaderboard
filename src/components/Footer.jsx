import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ theme }) => {
    return (
        <footer
            className={`py-6 ${
                theme === "dark" ? "bg-gray-800 text-white border-t border-gray-700" : "bg-white text-gray-800 border-t border-gray-300"
            } text-center`}
        >
            <p className="text-sm flex items-center justify-center">
                Made with <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> by{" "}
                <a
                    href="https://github.com/chinxcode"
                    className="ml-1 font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text hover:underline"
                >
                    Sachin Sharma
                </a>
            </p>
        </footer>
    );
};

export default Footer;

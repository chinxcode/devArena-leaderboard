const Footer = ({ theme }) => {
    return (
        <footer
            className={`py-4 ${
                theme === "dark" ? "bg-gray-800 text-white border-t border-gray-700" : "bg-white text-gray-800 border-t border-gray-300"
            } text-center`}
        >
            <p className="text-sm">
                Made with ❤️ by{" "}
                <a
                    href="https://github.com/chinxcode"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"
                >
                    Sachin Sharma
                </a>
            </p>
        </footer>
    );
};

export default Footer;

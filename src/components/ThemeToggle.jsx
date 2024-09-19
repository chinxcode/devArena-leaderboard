const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className={`btn ${
                theme === "dark" ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
        >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
    );
};

export default ThemeToggle;

import ThemeToggle from "./ThemeToggle";

const Header = ({ theme, toggleTheme }) => {
    return (
        <header className={`py-6 ${theme === "dark" ? "bg-gray-800" : "bg-white shadow-md"}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">DevArena</h1>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
        </header>
    );
};

export default Header;

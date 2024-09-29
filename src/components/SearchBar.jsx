import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch, theme }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        onSearch(searchTerm);
    }, [searchTerm, onSearch]);

    const handleClear = () => {
        setSearchTerm("");
    };

    return (
        <div className="mb-6">
            <div className={`relative ${theme === "dark" ? "bg-gray-700" : "bg-white"} rounded-full shadow-lg`}>
                <FontAwesomeIcon
                    icon={faSearch}
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                    type="text"
                    placeholder="Search by username, enrollment, or name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full py-3 px-12 rounded-full focus:outline-none focus:ring-2 transition-all duration-300 ${
                        theme === "dark"
                            ? "bg-gray-700 text-white focus:ring-blue-500 placeholder-gray-400"
                            : "bg-white text-gray-900 focus:ring-blue-300 placeholder-gray-500"
                    }`}
                />
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                            theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                        } transition-colors duration-200`}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;

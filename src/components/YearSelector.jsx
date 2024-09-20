import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const YearSelector = ({ selectedYear, setSelectedYear, theme }) => {
    const years = [2, 3];

    return (
        <div className="flex justify-center space-x-4 mb-8">
            {years.map((year) => (
                <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        selectedYear === year
                            ? theme === "dark"
                                ? "bg-blue-600 text-white"
                                : "bg-blue-500 text-white"
                            : theme === "dark"
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                    Year {year}
                </button>
            ))}
        </div>
    );
};

export default YearSelector;

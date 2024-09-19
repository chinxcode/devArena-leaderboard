const YearSelector = ({ selectedYear, setSelectedYear }) => {
    const years = [1, 2, 3];

    return (
        <div className="flex justify-center space-x-4 mb-8">
            {years.map((year) => (
                <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`btn ${selectedYear === year ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                    Year {year}
                </button>
            ))}
        </div>
    );
};

export default YearSelector;

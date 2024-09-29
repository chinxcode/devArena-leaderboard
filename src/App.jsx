import { useState, useEffect, useCallback } from "react";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import debounce from "lodash/debounce";
import Header from "./components/Header";
import LeaderBoard from "./components/LeaderBoard";
import YearSelector from "./components/YearSelector";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";

function App() {
    const [selectedYear, setSelectedYear] = useState(2);
    const [allLeaderboardData, setAllLeaderboardData] = useState([]);
    const [filteredLeaderboardData, setFilteredLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (verified) {
            fetchData();
        }
    }, [verified, selectedYear]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://profile-data-handler.vercel.app/api/leaderboard`);
            const data = await response.json();
            setAllLeaderboardData(data);
            setFilteredLeaderboardData(data.filter((user) => user.year === selectedYear));
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = () => {
        setVerified(true);
    };

    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            const filtered = allLeaderboardData
                .filter(
                    (user) =>
                        (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (user.enrollment && user.enrollment.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .filter((user) => user.year === selectedYear);
            setFilteredLeaderboardData(filtered);
        }, 300),
        [allLeaderboardData, selectedYear]
    );

    const handleSearch = (searchTerm) => {
        debouncedSearch(searchTerm);
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setFilteredLeaderboardData(allLeaderboardData.filter((user) => user.year === year));
    };

    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LdmTlIqAAAAAN5_zhLdM8n8H3nANVvYc9ifQIge">
            <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
                <Header theme={theme} toggleTheme={toggleTheme} />
                <main className="container mx-auto px-4 py-8 flex-grow">
                    {!verified ? (
                        <div className="flex justify-center items-center h-full">
                            <GoogleReCaptcha onVerify={handleVerify} />
                        </div>
                    ) : (
                        <>
                            <YearSelector selectedYear={selectedYear} setSelectedYear={handleYearChange} theme={theme} />
                            <SearchBar onSearch={handleSearch} theme={theme} />
                            <LeaderBoard data={filteredLeaderboardData} theme={theme} loading={loading} />
                        </>
                    )}
                </main>
                <Footer theme={theme} />
            </div>
        </GoogleReCaptchaProvider>
    );
}

export default App;

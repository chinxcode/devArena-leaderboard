import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
    }, [verified]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://profile-data-handler.vercel.app/api/leaderboard-data`);
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

    const handleSearch = (searchTerm) => {
        console.log("Searching for", searchTerm);
        if (searchTerm.length >= 1) {
            const filtered = allLeaderboardData
                .filter(
                    (user) =>
                        (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (user.enrollment && user.enrollment.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .filter((user) => user.year === selectedYear);
            setFilteredLeaderboardData(filtered);
        } else {
            setFilteredLeaderboardData(allLeaderboardData.filter((user) => user.year === selectedYear));
        }
    };

    const handleYearChange = (year) => {
        console.log("Year changed to", year);
        setSelectedYear(year);
        setFilteredLeaderboardData(allLeaderboardData.filter((user) => user.year === year));
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="container mx-auto px-4 py-8 flex-grow">
                {!verified ? (
                    <div className="flex flex-col justify-center items-center h-full">
                        <p className="mb-4">Please verify that you&apos;re human:</p>
                        <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleVerify} size="normal" />
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
    );
}

export default App;

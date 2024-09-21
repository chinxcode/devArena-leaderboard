import { useState, useEffect } from "react";
import Header from "./components/Header";
import LeaderBoard from "./components/LeaderBoard";
import YearSelector from "./components/YearSelector";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";

function App() {
    const [selectedYear, setSelectedYear] = useState(2);
    const [allLeaderboardData, setAllLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://profile-data-handler.vercel.app/api/leaderboard`);
                const data = await response.json();
                setAllLeaderboardData(data);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredLeaderboardData = allLeaderboardData.filter((user) => user.year === selectedYear);

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} theme={theme} />
                <LeaderBoard data={filteredLeaderboardData} theme={theme} loading={loading} />
            </main>
            <Footer theme={theme} />
        </div>
    );
}

export default App;

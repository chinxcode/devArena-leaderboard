import { useState, useEffect } from "react";
import Header from "./components/Header";
import LeaderBoard from "./components/LeaderBoard";
import YearSelector from "./components/YearSelector";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";

function App() {
    const [selectedYear, setSelectedYear] = useState(1);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://profile-data-handler.vercel.app/api/leaderboard?year=${selectedYear}`);
                const data = await response.json();
                setLeaderboardData(data);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        };
        fetchData();
    }, [selectedYear]);

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                <LeaderBoard data={leaderboardData} theme={theme} />
            </main>
            <Footer theme={theme} />
        </div>
    );
}

export default App;

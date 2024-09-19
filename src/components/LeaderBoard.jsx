import { motion } from "framer-motion";

const LeaderBoard = ({ data, theme }) => {
    const sortedData = [...data].sort((a, b) => {
        if (a.rank === 0) return 1;
        if (b.rank === 0) return -1;
        return a.rank - b.rank;
    });

    return (
        <div>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className={`${theme === "dark" ? "bg-gray-400" : "bg-blue-600"} text-white`}>
                            <th className="py-4 px-6 text-left">Rank</th>
                            <th className="py-4 px-6 text-left">Name</th>
                            <th className="py-4 px-6 text-left">Score</th>
                            <th className="py-4 px-6 text-left">Questions Solved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((user, index) => (
                            <motion.tr
                                key={user.username}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`${
                                    theme === "dark"
                                        ? index % 2 === 0
                                            ? "bg-gray-800"
                                            : "bg-gray-700"
                                        : index % 2 === 0
                                        ? "bg-white"
                                        : "bg-gray-100"
                                } hover:bg-opacity-80 transition-colors duration-200`}
                            >
                                <td className="py-4 px-6">{user.rank || "-"}</td>
                                <td className="py-4 px-6 font-semibold">{user.name}</td>
                                <td className="py-4 px-6">{user.score}</td>
                                <td className="py-4 px-6">{user.totalQuestionsSolved}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                className={`mt-4 p-2 rounded-md text-sm ${
                    theme === "dark" ? "bg-yellow-800 text-yellow-200" : "bg-yellow-100 text-yellow-800"
                }`}
            >
                ⚠️ Leaderboard updates every 4 hours
            </div>
        </div>
    );
};

export default LeaderBoard;

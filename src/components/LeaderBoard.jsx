import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import UserDetailPopup from "./UserDetailPopup";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faMedal, faAward, faUser, faStar, faInfoCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const LeaderBoard = ({ data, theme, loading }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const sorted = [...data].sort((a, b) => {
            if (a.rank === 0 && b.rank === 0) return 0;
            if (a.rank === 0) return 1;
            if (b.rank === 0) return -1;
            return a.rank - b.rank;
        });
        setSortedData(sorted);
        setSelectedUser(null);
    }, [data]);

    const handleRowClick = (user) => {
        setSelectedUser(user);
    };

    const closePopup = () => {
        setSelectedUser(null);
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <FontAwesomeIcon icon={faTrophy} className="text-yellow-400" />;
            case 2:
                return <FontAwesomeIcon icon={faMedal} className="text-gray-400" />;
            case 3:
                return <FontAwesomeIcon icon={faAward} className="text-yellow-600" />;
            default:
                return <FontAwesomeIcon icon={faUser} className="text-blue-400" />;
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg rounded-lg overflow-hidden`}>
            <div className="overflow-x-auto">
                {sortedData.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className={`${theme === "dark" ? "bg-gray-700" : "bg-blue-600"} text-white`}>
                                <th className="py-3 px-4 text-left">Rank</th>
                                <th className="py-3 px-4 text-left">Username</th>
                                <th className="py-3 px-4 text-left">Score</th>
                                <th className="py-3 px-4 text-left">Solved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((user, index) => (
                                <motion.tr
                                    key={user.username}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    className={`${
                                        theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                                    } transition-colors duration-200 cursor-pointer`}
                                    onClick={() => handleRowClick(user)}
                                >
                                    <td className="py-4 px-4 flex items-center">
                                        <span className="mr-2">{getRankIcon(user.rank)}</span>
                                        {user.rank || "-"}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center">
                                            <span className="font-semibold text-blue-500 hover:underline">{user.username}</span>
                                            <FontAwesomeIcon icon={faInfoCircle} className="ml-2 text-gray-400" />
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="flex items-center">
                                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
                                            {user.score}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{user.totalQuestionsSolved}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-8 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                    >
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                        <p>Sorry, we couldn&apos;t find any users matching your criteria.</p>
                    </motion.div>
                )}
            </div>
            <div
                className={`mt-4 p-3 rounded-md text-sm ${
                    theme === "dark" ? "bg-yellow-800 text-yellow-200" : "bg-yellow-100 text-yellow-800"
                }`}
            >
                ⚠️ Leaderboard updates every 30 minutes
            </div>
            <AnimatePresence>{selectedUser && <UserDetailPopup user={selectedUser} onClose={closePopup} theme={theme} />}</AnimatePresence>
        </div>
    );
};

export default LeaderBoard;

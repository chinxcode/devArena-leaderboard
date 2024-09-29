import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faCode, faCheckCircle, faTimes, faClock, faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";

const UserDetailPopup = ({ user, onClose, theme }) => {
    const [sortAscending, setSortAscending] = useState(false);
    const [filter, setFilter] = useState("Total");
    if (!user) return null;

    const difficultyColor = {
        Easy: "text-green-500",
        Medium: "text-yellow-500",
        Hard: "text-red-500",
    };

    const formatTimestamp = (timestamp) => {
        return moment.unix(timestamp).tz("Asia/Kolkata").format("MMMM D, YYYY h:mm A");
    };

    const filteredQuestions = Object.entries(user.solvedQuestions || {}).filter(([_, question]) => {
        if (filter === "Total") return true;
        return question.difficulty === filter;
    });

    const sortedQuestions = filteredQuestions.sort((a, b) => {
        return sortAscending ? a[1].timestamp - b[1].timestamp : b[1].timestamp - a[1].timestamp;
    });

    const filterOptions = ["Total", "Easy", "Medium", "Hard"];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`${
                    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                } p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <a
                        className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"
                        href={`https://leetcode.com/u/${user.username}/`}
                        target="_blank"
                    >
                        {user.username || "N/A"}
                    </a>
                    <button
                        onClick={onClose}
                        className={`text-2xl ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-75">Name</p>
                                <p className="text-xl font-bold">{user.name || "N/A"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm opacity-75">Enrollment</p>
                                <p className="text-xl font-bold">{user.enrollment || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow flex items-center">
                        <FontAwesomeIcon icon={faTrophy} className="text-3xl mr-3" />
                        <div>
                            <p className="text-sm">Rank</p>
                            <p className="text-2xl font-bold">{user.rank || "N/A"}</p>
                        </div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow flex items-center">
                        <FontAwesomeIcon icon={faCode} className="text-3xl mr-3" />
                        <div>
                            <p className="text-sm">Score</p>
                            <p className="text-2xl font-bold">{user.score || "N/A"}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Questions Solved</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {filterOptions.map((option) => (
                            <motion.div
                                key={option}
                                className={`p-3 rounded-lg shadow cursor-pointer ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} ${
                                    filter === option ? (theme === "dark" ? "ring-2 ring-blue-500" : "ring-2 ring-blue-400") : ""
                                }`}
                                onClick={() => setFilter(option)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <p className="text-sm opacity-75">{option}</p>
                                <p className="text-xl font-bold">{user[`${option.toLowerCase()}QuestionsSolved`] || 0}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-bold">Solved Questions ({filter})</h3>
                        <button
                            onClick={() => setSortAscending(!sortAscending)}
                            className={`py-2 px-3 rounded-full ${
                                theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            <FontAwesomeIcon icon={sortAscending ? faSortAmountUp : faSortAmountDown} />
                        </button>
                    </div>
                    <AnimatePresence>
                        <motion.div className="space-y-2" layout>
                            {sortedQuestions.map(([slug, question]) => (
                                <motion.div
                                    key={slug}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`p-3 rounded-lg shadow ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <a
                                            href={`https://leetcode.com/problems/${slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline font-medium"
                                        >
                                            {question.title}
                                        </a>
                                        <span className={`text-sm font-semibold ${difficultyColor[question.difficulty]}`}>
                                            {question.difficulty}
                                        </span>
                                    </div>
                                    <div className="flex items-center mt-2 text-sm">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                                        <span>
                                            {question.status} in {question.language}
                                        </span>
                                    </div>
                                    <div className="flex items-center mt-2 text-sm">
                                        <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-2" />
                                        <span>{formatTimestamp(question.timestamp)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UserDetailPopup;

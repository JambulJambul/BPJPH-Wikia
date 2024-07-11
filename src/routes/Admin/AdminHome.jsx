import { Sidebar } from "../../components"
import HelloImage from "../../assets/undraw_hello.svg"

import { useState, useEffect } from "react"
import axios from "axios"

const AdminHome = () => {
    const [userCount, setUserCount] = useState(0)
    const [totalEntryCount, setTotalEntryCount] = useState(0)
    const [toReviewEntryCount, setToReviewEntryCount] = useState(0)
    const token = localStorage.getItem('token');
    const AuthStr = 'Bearer '.concat(token);

    useEffect(() => {
        const fetchUsersCount = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/count`, { headers: { Authorization: AuthStr } })
            const fetchedUserCount = response?.data?.countTotalUser
            setUserCount(fetchedUserCount);
        };

        const fetchEntriesCount = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/entries/count`, { headers: { Authorization: AuthStr } })
            const fetchedTotalArticle = response?.data?.countTotalArticle
            const fetchedToReviewArticle = response?.data?.countToBeReviewed
            setTotalEntryCount(fetchedTotalArticle);
            setToReviewEntryCount(fetchedToReviewArticle);
        };

        fetchUsersCount();
        fetchEntriesCount();
    }, []);

    return (
        <>
            <div className="block xl:flex pt-12 xl:pt-24">
                <div className="xl:w-64">
                    <Sidebar />
                </div>
                <div className="max-w-[1440px] mx-auto py-16 px-12 xl:px-24 xl:flex-1">
                    <div className="w-full rounded-lg px-10 py-6 shadow-xl flex justify-between items-center flex-col-reverse xl:flex-row">
                        <div>
                            <h1 className="text-2xl pb-4">
                                Hi Admin,
                            </h1>
                            <h1 className="text-md text-gray-600">
                                Welcome to Kamus Halal admin dashboard
                            </h1>
                        </div>
                        <img className="h-64 p-4" src={HelloImage} alt="" />
                    </div>
                    <div className="py-12">
                        <section>
                            <h2 className="text-xl mb-4">Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold">Users</h3>
                                    <p className="text-gray-700">Total: {userCount}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold">Articles</h3>
                                    <p className="text-gray-700">Total: {totalEntryCount}</p>
                                    <p className="text-red-600">To Review: {toReviewEntryCount}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome
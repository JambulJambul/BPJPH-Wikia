import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            // axios.get(`${process.env.REACT_APP_API_URL}/users/`)
            const fetchedUsers = Array.from({ length: 50 }, (_, i) => ({
                id: i + 1,
                name: `User ${i + 1}`,
                email: `user${i + 1}@example.com`,
            }));
            setUsers(fetchedUsers);
        };

        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="flex pt-24">
            <div className="w-64">
                <Sidebar />
            </div>
            <div className="max-w-[1440px] mx-auto py-16 px-24 flex-1">
                <h2 className="text-2xl mb-8">Users</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(user => (
                                <tr key={user.id} className="border-t">
                                    <td className="text-center py-2 px-4">{user.id}</td>
                                    <td className="text-center py-2 px-4">{user.name}</td>
                                    <td className="text-center py-2 px-4">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;

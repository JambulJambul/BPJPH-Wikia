import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../../components';
import UserRoleModal from './components/userRoleModal';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userRoleModalOpen, setUserRoleModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState(null);
    const usersPerPage = 10;
    const token = localStorage.getItem('token');
    const AuthStr = 'Bearer '.concat(token);

    const fetchUsers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/`, { headers: { Authorization: AuthStr } })
        const fetchedUsers = response?.data?.data
        setUsers(fetchedUsers);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const openUserRoleModal = (userId, newRole) => {
        setSelectedUser(userId),
            setNewRole(newRole)
        setUserRoleModalOpen(true)
    }

    const handleModalClose = (updated) => {
        if (updated === true) {
            fetchUsers()
        }
        setSelectedUser(null)
        setUserRoleModalOpen(null)
        setUserRoleModalOpen(false)
    }

    return (
        <>
            <div className="xl:flex pt-10 sm:pt-12 md:pt-14">
                <div className="xl:w-64">
                    <Sidebar />
                </div>
                <div className="mx-auto py-16 px-12 xl:px-24 xl:flex-1">
                    <h2 className="text-2xl mb-8">Users</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-sm md:text-md xl:text-base py-2 px-4">ID</th>
                                    <th className="text-sm md:text-md xl:text-base py-2 px-4">Name</th>
                                    <th className="text-sm md:text-md xl:text-base py-2 px-4">Email</th>
                                    <th className="text-sm md:text-md xl:text-base py-2 px-4">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user.id} className="border-t">
                                        <td className="text-center text-sm md:text-md xl:text-base py-2 px-4">{user.id}</td>
                                        <td className="text-center text-sm md:text-md xl:text-base py-2 px-4">{user.username}</td>
                                        <td className="text-center text-sm md:text-md xl:text-base py-2 px-4">{user.email}</td>
                                        <td className="text-center text-sm md:text-md xl:text-base py-2 px-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => openUserRoleModal(user.id, e.target.value)}
                                            >
                                                <option value="1">Admin</option>
                                                <option value="0">User</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between mt-4 items-center">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                className="p-1 xl:px-4 xl:py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className='text-sm'>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                className="p-1 xl:px-4 xl:py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UserRoleModal isOpen={userRoleModalOpen} onClose={handleModalClose} id={selectedUser} changeRoleTo={newRole} />
        </>
    );
};

export default AdminUsers;

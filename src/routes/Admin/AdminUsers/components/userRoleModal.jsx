import axios from "axios";
import { useState } from "react";
import encryptPayload from "../../../utils/encryption";

const userRoleModal = ({ isOpen, onClose, id, changeRoleTo }) => {
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(false);
        }
    };

    const setNewRole = async () => {
        const token = localStorage.getItem('token');
        const AuthStr = 'Bearer '.concat(token);
        const payload = {
            role: changeRoleTo
        };
        const encryptedData = encryptPayload(payload);
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/change-role/${id}`, {
                encryptedData
            }, { headers: { Authorization: AuthStr } });
            closeModal(true);
            if (response?.status === 200) {
                closeModal(true);
            } else {
                console.error('Failed to update role:', response?.status, response?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const closeModal = (updated) => {
        onClose(updated)
    }

    return (
        <>
            {
                isOpen && (
                    <div className="fixed w-full h-full inset-0 p-6 flex items-center justify-center z-50 font-['Poppins']">
                        <div className="fixed inset-0 bg-black opacity-40" onClick={handleOverlayClick} />
                        <div className="bg-white p-6 rounded-lg shadow-lg z-50 flex flex-col items-center gap-8">
                            <h1 className="text-xl text-center">
                                Are you sure to change the user role to {changeRoleTo === "0" ? 'User' : 'Admin'}?
                            </h1>
                            <div className='flex gap-8'>
                                <button onClick={() => closeModal(false)} className='px-4 py-2 rounded-xl bg-green-500 text-white'>
                                    No
                                </button>
                                <button onClick={setNewRole} className='px-4 py-2 rounded-xl bg-red-500 text-white'>
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default userRoleModal
import axios from "axios";
import { useState } from "react";
import encryptPayload from "../../../../utils/encryption";

const ReviewModal = ({ isOpen, onClose, id, actionType }) => {
    const [comment, setComment] = useState('')
    const [commentAlertOpen, setCommentAlertOpen] = useState(false)
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal(false);
        }
    };

    const setArticleStatus = async () => {
        const token = localStorage.getItem('token');
        const AuthStr = 'Bearer '.concat(token);
        let data;

        if (actionType === 'accept') {
            data = { actionType };
        } else {
            if (!comment) {
                setCommentAlertOpen(true);
                return;
            } else {
                data = { actionType, comment };
            }
        }

        const encryptedData = encryptPayload(data);

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/entries/status/${id}`, {
                encryptedData
            }, { headers: { Authorization: AuthStr } });
            closeModal(true);
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = (updated) => {
        setComment('')
        setCommentAlertOpen(false)
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
                                Are you sure to
                                {
                                    actionType === 'accept' ? ' accept ' : ' reject '
                                }
                                the article?
                            </h1>
                            {
                                actionType === 'reject' && (
                                    <>
                                        <input
                                            type="text"
                                            name="comment"
                                            placeholder="Comments"
                                            className="w-full px-4 py-2 border rounded-md"
                                            value={comment}
                                            onChange={(e) => {
                                                setComment(e.target.value)
                                            }
                                            }
                                        />
                                        {commentAlertOpen === true && (
                                            <div className="text-red-500 text-sm">
                                                Please enter a comment
                                            </div>
                                        )}
                                    </>
                                )
                            }
                            <div className='flex gap-8'>
                                <button onClick={() => closeModal(false)} className='px-4 py-2 rounded-xl bg-red-500 text-white'>
                                    No
                                </button>
                                <button onClick={setArticleStatus} className='px-4 py-2 rounded-xl bg-green-500 text-white'>
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

export default ReviewModal
const ReviewModal = ({ isOpen, onClose, id, actionType }) => {
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {
                isOpen && (
                    <div className="fixed w-full h-full inset-0 p-6 flex items-center justify-center z-50 font-['Poppins']">
                        <div className="fixed inset-0 bg-black opacity-40" onClick={handleOverlayClick} />
                        <div className="bg-white p-6 rounded-lg shadow-lg z-50 flex flex-col items-center gap-8">
                            <h1 className="text-xl text-center">Are you sure to accept the article?</h1>
                            <div className='flex gap-8'>
                                <button onClick={onClose} className='px-4 py-2 rounded-xl bg-red-500 text-white'>
                                    No
                                </button>
                                <button onClick={onClose} className='px-4 py-2 rounded-xl bg-green-500 text-white'>
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
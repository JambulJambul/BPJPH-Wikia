const SuccessModal = ({ isOpen, onClose, eventType }) => {
    const handleClose = (isDelete) => {

        onClose(isDelete);
    }

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleClose(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed w-full h-full inset-0 p-6 flex items-center justify-center z-50 font-['Poppins']">
                    <div className="fixed inset-0 bg-black opacity-40" onClick={handleOverlayClick} />
                    <div className="bg-white p-6 rounded-lg shadow-lg z-50 flex flex-col items-center gap-8">
                        <h1 className="text-xl text-center">
                            <h1 className="text-xl text-center">
                                {eventType === 'create' ? 'Article created successfully! \n Please wait for admin review.'
                                    : eventType === 'edit' ? 'Article edited successfully!'
                                        : eventType === 'delete' ? 'Are you sure to delete article?'
                                            : 'Empty Modal'}
                            </h1>

                        </h1>
                        {eventType === 'delete' ?
                            <div className="flex gap-8">
                                <button className="text-xl text-center bg-blue-500 text-white py-2 px-4 rounded-xl" onClick={() => handleClose(false)}>No</button>
                                <button className="text-xl text-center bg-red-500 text-white py-2 px-4 rounded-xl" onClick={() => handleClose(true)}>Yes</button>
                            </div>
                            : <button onClick={() => handleClose(false)} className="text-xl text-center bg-blue-500 text-white py-2 px-4 rounded-xl">Close</button>}
                    </div>
                </div>)}
        </>
    );
};
export default SuccessModal
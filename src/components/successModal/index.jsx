const SuccessModal = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed w-full h-full inset-0 p-6 flex items-center justify-center z-50 font-['Poppins']">
                    <div className="fixed inset-0 bg-black opacity-40" />
                    <div className="bg-white p-6 rounded-lg shadow-lg z-50 flex flex-col items-center gap-8">
                        <h1 className="text-xl text-center">Article created successfully!</h1>
                        <button onClick={onClose} className="text-xl text-center bg-blue-500 text-white py-2 px-4 rounded-xl">Close</button>
                    </div>
                </div>)}

        </>
    );
};
export default SuccessModal
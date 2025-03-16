import React from 'react'

const ConfirmDeleteModal = () => {

        const [isOpen, setIsOpen] = useState(false);

        const openModal = () => setIsOpen(true);
        const closeModal = () => setIsOpen(false);

        return (
            <>
                <button id="openModalButton" onClick={openModal}>Open Modal</button>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
                        <div className="bg-white w-1/3 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                            <h1 className="text-center text-lg font-bold">Are you sure you want to delete this report?</h1>
                            <div className="flex justify-center gap-4 mt-4">
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={closeModal}>Yes</button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={closeModal}>No</button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
}

export default ConfirmDeleteModal
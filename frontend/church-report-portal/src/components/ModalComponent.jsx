import React from 'react'

const ModalComponent = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        console.log('Modal closed');
    };
  return (
    <div>
        <button onClick={handleOpenModal}>Open Modal</button>
        {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={handleCloseModal}>&times;</span>
                    <h2>Modal Title</h2>
                    <p>This is a modal window.</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default ModalComponent
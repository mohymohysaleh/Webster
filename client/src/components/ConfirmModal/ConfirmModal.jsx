import './ConfirmModal.css';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', cancelText = 'Cancel' }) {
  if (!isOpen) return null;
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>{confirmText}</button>
          <button className="cancel-btn" onClick={onCancel}>{cancelText}</button>
        </div>
      </div>
    </div>
  );
} 
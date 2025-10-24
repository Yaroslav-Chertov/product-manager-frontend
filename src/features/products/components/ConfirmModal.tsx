import React from 'react';

interface ConfirmModalProps {
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ title = 'Подтверждение', message = 'Вы уверены, что хотите удалить этот товар?', onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-center gap-3">
                    <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                        Отмена
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateProduct, deleteProduct } from '../productsSlice';
import { Product } from '../productsSlice';
import { ConfirmModal } from './ConfirmModal';

interface Props {
    product: Product;
    onClose: () => void;
}

export const ProductDetailsModal = ({ product, onClose }: Props) => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState({ title: product.title, price: product.price });
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        await dispatch(updateProduct({ ...product, ...form, price: Number(form.price) }));
        onClose();
    };

    const handleDelete = async () => {
        await dispatch(deleteProduct(product.id));
        setShowConfirm(false);
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
                    <h2 className="text-xl font-semibold">Редактировать товар</h2>

                    <img src={product.image} alt={product.title} className="w-full h-48 object-contain rounded" />

                    <div>
                        <label className="block text-sm text-gray-600">Название</label>
                        <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600">Цена</label>
                        <input name="price" value={form.price} onChange={handleChange} type="number" className="w-full border p-2 rounded" />
                    </div>

                    <div className="flex justify-between pt-4">
                        <button onClick={() => setShowConfirm(true)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                            Удалить
                        </button>

                        <div className="flex gap-2">
                            <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
                                Отмена
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirm && <ConfirmModal title="Удалить товар?" message={`Вы уверены, что хотите удалить "${product.title}"?`} onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />}
        </>
    );
};

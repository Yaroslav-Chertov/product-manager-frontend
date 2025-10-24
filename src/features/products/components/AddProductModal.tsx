import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { addProduct } from '../productsSlice';

interface Props {
    onClose: () => void;
}

export const AddProductModal = ({ onClose }: Props) => {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(
            addProduct({
                ...form,
                price: Number(form.price),
                rating: { rate: 0, count: 0 },
            } as any)
        );
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-3">
                <h2 className="text-xl font-semibold mb-2">Добавить товар</h2>

                <input name="title" value={form.title} onChange={handleChange} placeholder="Название" className="w-full border p-2 rounded" required />
                <input name="price" value={form.price} onChange={handleChange} placeholder="Цена" type="number" className="w-full border p-2 rounded" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" className="w-full border p-2 rounded" />
                <input name="image" value={form.image} onChange={handleChange} placeholder="URL изображения" className="w-full border p-2 rounded" />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Категория" className="w-full border p-2 rounded" />

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
                        Отмена
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Добавить
                    </button>
                </div>
            </form>
        </div>
    );
};

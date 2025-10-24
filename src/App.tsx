import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts } from './features/products/productsSlice';
import { AddProductModal } from './features/products/components/AddProductModal';
import { ProductDetailsModal } from './features/products/components/ProductDetailsModal';
import { Product } from './features/products/productsSlice';

function App() {
    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector((state) => state.products);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') return <p className="text-center mt-10">Загрузка...</p>;
    if (status === 'failed') return <p className="text-center mt-10 text-red-500">Ошибка загрузки</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Менеджер товаров</h1>
                <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    + Добавить товар
                </button>
            </div>

            {/* Список товаров */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => setSelectedProduct(p)} // 🔸 добавили обработчик клика
                        className="border rounded-2xl shadow p-4 hover:shadow-lg transition cursor-pointer">
                        <img src={p.image} alt={p.title} className="h-40 w-full object-contain mb-2" />
                        <h2 className="font-semibold line-clamp-1">{p.title}</h2>
                        <p className="text-gray-500">${p.price}</p>
                    </div>
                ))}
            </div>

            {/* Модалка добавления */}
            {showModal && <AddProductModal onClose={() => setShowModal(false)} />}

            {/* Модалка редактирования / просмотра */}
            {selectedProduct && <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
        </div>
    );
}

export default App;

"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Carrucel({ items }) {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleItemClick = (itemID) => {
        router.push(`/movie/${itemID}`);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + items.length) % items.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % items.length);
    };

    // Función para obtener los tres elementos visibles en el carrusel
    const getVisibleItems = () => {
        const prevIndex = (currentSlide - 1 + items.length) % items.length;
        const nextIndex = (currentSlide + 1) % items.length;
        return [
            items[prevIndex],  // Elemento anterior
            items[currentSlide], // Elemento central
            items[nextIndex]  // Elemento siguiente
        ];
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="relative w-full">
            {/* Contenedor del carrusel con fondo de la película central */}
            <div
                className="relative w-full min-h-[600px] flex items-center justify-center bg-cover bg-center text-white overflow-hidden"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${visibleItems[1]?.backdrop_path})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100vw", // Ocupar el ancho completo de la pantalla
                    padding: "50px 0" // Espacio arriba y abajo
                }}
            >
                {/* Contenedor de sombra oscura solo en el fondo */}
                <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

                <div className="relative flex items-center justify-between z-10 w-full max-w-screen-xl px-4">
                    <button
                        onClick={handlePrevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg z-20"
                    >
                        {"<"}
                    </button>

                    {/* Pósters de las películas */}
                    <div className="flex justify-center w-full space-x-8 px-6">
                        {visibleItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative transition-transform duration-500 ${
                                    index === 1 ? "transform scale-105" : "transform scale-100"
                                }`}
                                style={{
                                    width: "300px", // Tamaño consistente para todos los elementos
                                    cursor: "pointer",
                                }}
                                onClick={() => handleItemClick(item.id)}
                            >
                                <img
                                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title || item.name}
                                />
                                {/* Descripción solo en el póster central y aparece al pasar el mouse */}
                                {index === 1 && (
                                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-70 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-xl font-semibold mb-2">{item.title || item.name}</h3>
                                        <p className="text-sm mb-2">
                                            {item.overview.length > 100 ? item.overview.slice(0, 100) + '...' : item.overview}
                                        </p>
                                        <button
                                            onClick={() => handleItemClick(item.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Más información
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleNextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg z-20"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    );
}

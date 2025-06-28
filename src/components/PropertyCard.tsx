"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { Property } from "@/models/Property";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface PropertyCardProps {
  property: Property;
}
export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el clic en el corazón navegue a la página de detalle
    e.stopPropagation(); // Evita que el evento se propague al Link
    console.log(`PropertyCard: Clic en favorito para ID ${property.id}`);
    toggleFavorite(Number(property.id));
  };
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/properties/${property.id}`} className="block">
        {/* Imagen de la propiedad */}
        <div className="relative w-full h-48">
          <Image
            src={property.imagen}
            alt={property.titulo}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Detalles de la propiedad */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {property.titulo}
          </h3>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Ciudad:</span> {property.ciudad}
          </p>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Tipo:</span> {property.tipo}
          </p>
          <p className="text-gray-700 text-lg font-bold mt-2">
            ${property.precio.toLocaleString("es-AR")}
          </p>
          <div className="flex justify-between text-gray-500 text-xs mt-2">
            <span>{property.ambientes} ambientes</span>
            <span>{property.metros_cuadrados} m²</span>
          </div>
        </div>
      </Link>

      {/* Botón de Favorito */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 text-gray-500 hover:text-red-500 transition-colors duration-200"
        aria-label={
          isFavorite(property.id)
            ? "Eliminar de favoritos"
            : "Añadir a favoritos"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isFavorite(property.id) ? "text-red-500 fill-current" : "text-gray-500"}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>
  );
};

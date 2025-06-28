"use client";

import React from "react";

import { propertyService } from "@/services/propertyService";
import { useFavorites } from "@/hooks/useFavorites";
import { Property } from "@/models/Property";
import { PropertyCard } from "@/components/PropertyCard";

function FavoritesPage() {
  const { favoriteIds } = useFavorites(); // Obtenemos los IDs de los favoritos del hook
  const allProperties: Property[] = propertyService.getProperties();

  const favoriteProperties: Property[] = allProperties.filter((property) =>
    favoriteIds.includes(property.id),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Mis Propiedades Favoritas
      </h1>

      {favoriteProperties.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Aún no has añadido ninguna propiedad a favoritos. ¡Explora y guarda
          tus preferidas!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;

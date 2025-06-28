"use client";
import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "@/models/Property";
import { propertyService } from "@/services/propertyService";
import { useMemo, useEffect, useState, useCallback, useRef } from "react";

const ITEMS_PER_PAGE = 15;
function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visiblePropertyCount, setVisiblePropertyCount] =
    useState<number>(ITEMS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const propertiesData = propertyService.getProperties();
      setAllProperties(propertiesData);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    if (!searchTerm) {
      return allProperties;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allProperties.filter(
      (property) =>
        property.titulo.toLowerCase().includes(lowerCaseSearchTerm) ||
        property.ciudad.toLowerCase().includes(lowerCaseSearchTerm) ||
        property.tipo.toLowerCase().includes(lowerCaseSearchTerm),
    );
  }, [searchTerm, allProperties]);

  const propertiesToDisplay = useMemo(() => {
    return filteredProperties.slice(0, visiblePropertyCount);
  }, [filteredProperties, visiblePropertyCount]);

  const loadMoreProperties = useCallback(() => {
    // Solo cargar más si no estamos ya cargando y si hay más propiedades disponibles
    if (!loading && visiblePropertyCount < filteredProperties.length) {
      setVisiblePropertyCount((prevCount) => prevCount + ITEMS_PER_PAGE);
    }
  }, [loading, visiblePropertyCount, filteredProperties.length]);

  // Resetea la cuenta de propiedades visibles cada vez que los filtros cambian
  useEffect(() => {
    setVisiblePropertyCount(ITEMS_PER_PAGE);
  }, [searchTerm]);

  // Efecto para el Intersection Observer
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return; // Si el elemento no existe, salimos

    const observer = new IntersectionObserver(
      (entries) => {
        // Si el elemento centinela está visible (intersecting)
        if (entries[0].isIntersecting) {
          loadMoreProperties(); // Llamamos a la función para cargar más
        }
      },
      {
        root: null, // El viewport es el elemento raíz
        rootMargin: "0px", // No hay margen extra alrededor del root
        threshold: 1.0, // Dispara cuando el 100% del target es visible
      },
    );

    observer.observe(target); // Empezamos a observar el elemento

    // Función de limpieza: desobservar cuando el componente se desmonte
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loadMoreProperties]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600 text-lg">
        Cargando propiedades...
      </div>
    );
  }
  const hasMoreProperties = visiblePropertyCount < filteredProperties.length;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Propiedades Disponibles
      </h1>

      {/* Barra de búsqueda */}
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Buscar por título, ciudad o tipo..."
          className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {propertiesToDisplay.length === 0 && !loading ? (
        <p className="text-center text-gray-600 text-lg">
          {searchTerm
            ? "No se encontraron propiedades que coincidan con tu búsqueda."
            : "No hay propiedades disponibles en este momento."}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {propertiesToDisplay.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* El elemento "centinela" que el Intersection Observer observará */}
          {hasMoreProperties && (
            <div
              ref={observerTarget}
              className="text-center py-4 text-gray-600"
            >
              {loading ? "Cargando más..." : ""}{" "}
              {/* Puedes mostrar un spinner si la carga fuera asíncrona real */}
            </div>
          )}

          {/* Mensaje cuando no hay más propiedades por cargar */}
          {!hasMoreProperties && filteredProperties.length > 0 && (
            <div className="text-center py-4 text-gray-600">
              Has visto todas las propiedades disponibles.
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default HomePage;

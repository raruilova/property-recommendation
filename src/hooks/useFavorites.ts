"use client";
import { useEffect, useState } from "react";

const FAVORITES_STORAGE_KEY = "property_favorites";

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Efecto que se ejecuta una única vez al montar el hook para cargar los favoritos
   * desde localStorage.
   *
   * @description
   * Lee la cadena de IDs almacenada, la parsea a un array y la convierte en un Set.
   * Maneja errores durante la carga y marca `isLoaded` como true al finalizar.
   */
  useEffect(() => {
    /**
     * Función interna para cargar los favoritos desde localStorage.
     * @private
     */
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setFavoriteIds(new Set(parsed));
          console.log("Loaded favorites:", parsed); // Debug
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  /**
   * Efecto que se ejecuta cada vez que 'favoriteIds' o 'isLoaded' cambian.
   * Se encarga de persistir el estado actual de los favoritos en localStorage.
   *
   * @description
   * Solo guarda los datos si la carga inicial (`isLoaded`) ya ha finalizado.
   * Convierte el Set de IDs a un Array antes de serializarlo a JSON y guardarlo.
   */
  useEffect(() => {
    if (!isLoaded) return;

    try {
      const idsArray = Array.from(favoriteIds);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(idsArray));
      console.log("Saved favorites:", idsArray); // Debug
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favoriteIds, isLoaded]);

  /**
   * Verifica si una propiedad específica es actualmente favorita.
   * @param {number} id - El ID numérico de la propiedad a verificar.
   * @returns {boolean} `true` si la propiedad es favorita, `false` en caso contrario.
   */
  const isFavorite = (id: number) => favoriteIds.has(id);

  /**
   * Función interna para añadir o eliminar un ID de la lista de favoritos.
   * Garantiza la inmutabilidad creando un nuevo Set.
   * @param {"add" | "remove"} action - La acción a realizar: "add" para añadir, "remove" para eliminar.
   * @param {number} id - El ID de la propiedad a modificar.
   * @private
   */
  const updateFavorites = (action: "add" | "remove", id: number) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (action === "add") {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  /**
   * Alterna el estado de favorito de una propiedad.
   * Si la propiedad ya es favorita, la elimina; si no lo es, la añade.
   * @param {number} id - El ID de la propiedad cuyo estado de favorito se desea alternar.
   */
  const toggleFavorite = (id: number) => {
    updateFavorites(isFavorite(id) ? "remove" : "add", id);
  };

  return {
    favoriteIds: Array.from(favoriteIds),
    isFavorite,
    toggleFavorite,
    isLoaded,
  };
};

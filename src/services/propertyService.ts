import { Property } from "@/models/Property";
import propertiesData from "../../public/properties_mock_100_clean.json";

export const propertyService = {
  /**
   * Obtiene todas las propiedades del JSON.
   * @returns Un array de objetos Property.
   */
  getProperties(): Property[] {
    return propertiesData as Property[];
  },
  /**
   * Busca una propiedad por su ID.
   * @param id El ID de la propiedad a buscar.
   * @returns La propiedad encontrada o undefined si no existe.
   */
  getPriorityById(id: number): Property | undefined {
    return this.getProperties().find((prop) => prop.id === id);
  },
};

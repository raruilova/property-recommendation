import { Property } from "@/models/Property";

export const recommendationService = {
  getSimilarProperties(currentProperty: Property, allProperties: Property[]) {
    const similarProperties: Property[] = [];
    const PRICE_TOLERANCE_PERCENT = 0.2;
    for (const prop of allProperties) {
      if (prop.id === currentProperty.id) {
        continue;
      }
      const sameCity = prop.ciudad === currentProperty.ciudad;
      const sameType = prop.tipo === currentProperty.tipo;
      const minPrice = currentProperty.precio * (1 - PRICE_TOLERANCE_PERCENT);
      const maxPrice = currentProperty.precio * (1 + PRICE_TOLERANCE_PERCENT);
      const priceInRange = prop.precio >= minPrice && prop.precio <= maxPrice;
      if (sameCity && sameType && priceInRange) {
        similarProperties.push(prop);
      }
      if (similarProperties.length >= 2) {
        break;
      }
    }
    return similarProperties;
  },
};

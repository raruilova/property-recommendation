import { PropertyCard } from "@/components/PropertyCard";
import { Property } from "@/models/Property";
import { propertyService } from "@/services/propertyService";
import { recommendationService } from "@/services/recommendationService";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}
async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const propertyId = Number(params.id);
  const currentProperty: Property | undefined =
    propertyService.getPriorityById(propertyId);
  if (!currentProperty) {
    notFound();
  }
  const allProperties: Property[] = propertyService.getProperties();

  const recommendedProperties: Property[] =
    recommendationService.getSimilarProperties(currentProperty, allProperties);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sección de Detalle de la Propiedad Principal */}
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center md:text-left">
          {currentProperty.titulo}
        </h1>
        <p className="text-gray-600 text-lg mb-6 text-center md:text-left">
          {currentProperty.tipo} en {currentProperty.ciudad}
        </p>

        <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image
            src={currentProperty.imagen}
            alt={currentProperty.titulo}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority // Carga esta imagen con mayor prioridad
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Detalles clave
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="font-medium mr-2">Precio:</span>
                <span className="text-xl font-bold text-green-700">
                  ${currentProperty.precio.toLocaleString("es-AR")}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Ambientes:</span>
                {currentProperty.ambientes}
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Metros Cuadrados:</span>
                {currentProperty.metros_cuadrados} m²
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección de Propiedades Recomendadas */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Propiedades Similares
        </h2>
        {recommendedProperties.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No se encontraron propiedades similares.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default PropertyDetailPage;

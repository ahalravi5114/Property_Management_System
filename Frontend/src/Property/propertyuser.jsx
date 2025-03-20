import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

const PropertyUser = ({ properties = [] }) => {  // Default value added
  console.log("Properties received:", properties); // Debugging log

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center ml-50">Select Your Property</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-50 gap-y-20 ml-30">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <Card key={index} variant="outlined" sx={{ width: 320, cursor: "pointer", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src={property.image || "https://via.placeholder.com/320"}
                    alt={property.name || "Property Image"}
                    loading="lazy"
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{property.name || "Unnamed Property"}</Typography>
                <Typography level="body-sm"><strong>Location:</strong> {property.location || "N/A"}</Typography>
                <Typography level="body-sm"><strong>Type:</strong> {property.type || "N/A"}</Typography>
                <Typography level="body-sm"><strong>Size:</strong> {property.size ? `${property.size} sq ft` : "N/A"}</Typography>
                <Typography level="body-sm"><strong>Amenities:</strong> {property.amenities || "N/A"}</Typography>
                <Typography level="body-sm"><strong>Price:</strong> ${property.price || "N/A"}</Typography>
              </CardContent>
              <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography level="body-xs" textColor="text.secondary" sx={{ fontWeight: "md" }}>
                    Listed just now
                  </Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No properties available.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyUser;

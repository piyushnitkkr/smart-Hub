import React, { useState } from "react";
import Header from "../components/Header";
import StudyMaterialCard from "../components/StudyMaterialCard";

function BrowsePage() {
  const [materials, setMaterials] = useState([]);

  const handleDataUpdate = (newMaterials) => {
    setMaterials(newMaterials);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header onDataUpdate={handleDataUpdate} />
      <StudyMaterialCard materials={materials} />
    </div>
  );
}

export default BrowsePage;

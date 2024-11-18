"use client";

import { useState } from "react";
import Banner from "./_components/Banner/Banner";
import Deal from "./_components/Deal/Deal";
import DealForm from "./_components/Deal/DealForm";
import Modal from "./_components/Modal";
import Offer from "./_components/Offer/Offer";
import OfferForm from "./_components/Offer/OfferForm";
import Slider from "./_components/Slider/Slider";
import SliderForm from "./_components/Slider/SliderForm";

const SliderPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(""); // To track the type of form to render
  const [formData, setFormData] = useState(null); // To track the data for the form
  const [isEdit, setIsEdit] = useState(false);

  const openModal = (data, type, action) => {
    setIsModalOpen(true);
    setFormData(data);
    setFormType(type); // Set the form type (e.g., "slider" or "offer")
    setIsEdit(action === "edit");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormType(""); // Reset the form type when modal is closed
  };

  return (
    <div className="p-4 w-full">
      <div className="my-2">
        {/* Pass the appropriate type to the openModal function */}
        <Slider
          openModal={(data, action) => openModal(data, "slider", action)}
        />
        <Offer openModal={(data, action) => openModal(data, "offer", action)} />
        <Banner
          openModal={(data, action) => openModal(data, "banner", action)}
        />
        <Deal openModal={(data, action) => openModal(data, "deal", action)} />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Render the appropriate form based on the formType */}
        {formType === "slider" && (
          <SliderForm onClose={closeModal} slider={formData} isEdit={isEdit} />
        )}
        {formType === "deal" && (
          <DealForm onClose={closeModal} deal={formData} isEdit={isEdit} />
        )}

        {formType === "offer" && (
          <OfferForm onClose={closeModal} offer={formData} isEdit={isEdit} />
        )}
        {/* Add other form types here if needed */}
      </Modal>
    </div>
  );
};

export default SliderPage;

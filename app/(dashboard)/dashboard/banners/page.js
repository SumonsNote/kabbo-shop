"use client";

import { useState } from "react";
import Banner from "./_components/Banner/Banner";
import Deal from "./_components/Deal/Deal";
import Modal from "./_components/Modal";
import Offer from "./_components/Offer/Offer";
import Slider from "./_components/Slider/Slider";
import SliderForm from "./_components/Slider/SliderForm";

const SliderPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 w-full">
      <div className="my-2">
        <Slider openModal={openModal} />
        <Offer openModal={openModal} />
        <Banner openModal={openModal} />
        <Deal openModal={openModal} />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SliderForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default SliderPage;

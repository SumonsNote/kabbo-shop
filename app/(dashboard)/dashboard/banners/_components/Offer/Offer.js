import { useFetchOffersQuery } from "@/store/slices/OfferApi";
import Error from "../../../error";
import Loading from "../../../loadding";
import BannerTitlte from "../BannerTitlte";
import OfferTable from "./OfferTable";

const Offer = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchOffersQuery();
  const offers = isSuccess ? data.offer : [];

  if (isLoading) {
    return (
      <div className="m-auto w-full h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <BannerTitlte title="Offer List" />

      <div className="flex justify-start mt-4">
        {/* Button for adding a new offer */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={() => openModal(null, "offer", "add")} // Pass action type and data
        >
          Add Offer
        </button>
      </div>

      {/* Render the offer table with edit functionality */}
      <OfferTable
        offers={offers}
        onEdit={(offer) => openModal(offer, "offer", "edit")} // Pass offer data for editing
      />
    </div>
  );
};

export default Offer;

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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={openModal}
        >
          Add Offer
        </button>
      </div>

      <OfferTable offers={offers} />
    </div>
  );
};

export default Offer;

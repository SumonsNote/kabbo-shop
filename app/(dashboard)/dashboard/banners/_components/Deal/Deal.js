import { useFetchDealsQuery } from "@/store/slices/DealApi";
import Error from "../../../error";
import Loading from "../../../loadding";
import BannerTitle from "../BannerTitlte";
import DealTable from "./DealTable";

const Deal = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchDealsQuery();

  const deals = isSuccess ? data.deal : [];

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
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Banner Title */}
      <BannerTitle title="Deal List" />

      {/* Add Deal Button */}
      <div className="flex justify-start mt-6 px-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={openModal}
        >
          Add Deal
        </button>
      </div>

      {/* Deal Table */}
      <div className="mt-6 px-4">
        <DealTable deals={deals} />
      </div>
    </div>
  );
};

export default Deal;

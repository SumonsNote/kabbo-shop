import { useFetchExclusivesQuery } from "../../../../../../store/slices/exclusiveApi";
import Error from "../../../error";
import Loading from "../../../loadding";
import BannerTitle from "../BannerTitlte";
import ExclusiveTable from "./ExclusiveTable";

const Exclusive = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchExclusivesQuery();
  const exclusive = isSuccess ? data.exclusive : [];

  if (isLoading) {
    return (
      <div className="m-auto w-full h-[50vh] dark:bg-gray-900">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error className="dark:bg-gray-900" />;
  }
  return (
    <div>
      <BannerTitle title="Exclusive List" className="dark:text-white" />

      <div className=" dark:bg-gray-900">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={openModal}
        >
          Add exclusive offer
        </button>
      </div>
      <ExclusiveTable exclusives={exclusive} openModal={openModal} />
    </div>
  );
};

export default Exclusive;

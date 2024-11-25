import { useFetchSlidersQuery } from "../../../../../../store/slices/SliderApi";
import Error from "../../../error";
import Loading from "../../../loadding";
import BannerTitlte from "../BannerTitlte";
import SliderTable from "./SliderTable";

const Slider = ({ openModal }) => {
  const { data, isSuccess, isLoading, error } = useFetchSlidersQuery();

  const sliders = isSuccess ? data.slider : [];

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
    <div className="dark:bg-gray-900 dark:text-gray-300">
      <BannerTitlte title="Slider List" />

      <div className="flex justify-start mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={openModal}
        >
          Add Slider
        </button>
      </div>

      <SliderTable sliders={sliders} openModal={openModal} />
    </div>
  );
};

export default Slider;

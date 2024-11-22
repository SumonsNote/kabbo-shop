import PhoneDetails from "../components/ProductsDetails";

export default async function IPhoneDetailsPage({ params: { id } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/product/new/${id}`
  );
  const data = await res.json();

  return <PhoneDetails data={data.product} />;
}

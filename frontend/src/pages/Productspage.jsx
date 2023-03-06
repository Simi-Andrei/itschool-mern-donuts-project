import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import Product from "../components/Product";
import Title from "../components/Title";
import PageWrapper from "../components/PageWrapper";
import { getAllProducts } from "../features/product/productSlice";

const Productspage = () => {
  const dispatch = useDispatch();

  const { products, loading, error, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <PageWrapper>
      <Title
        text="Search through our donuts and
        find the one that suits your taste!"
      />

      {loading ? (
        <div className="w-full mt-40 text-center">
          <ClipLoader />
        </div>
      ) : error ? (
        <div className="w-full mt-40 text-center">
          <p>{message}</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
};
export default Productspage;

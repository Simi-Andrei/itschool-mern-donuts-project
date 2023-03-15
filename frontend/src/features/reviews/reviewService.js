import axios from "axios";

// create review
const createReview = async (review, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(
    `/api/products/${review.id}/reviews`,
    review,
    config
  );
  return data;
};

const reviewService = {
  createReview,
};

export default reviewService;

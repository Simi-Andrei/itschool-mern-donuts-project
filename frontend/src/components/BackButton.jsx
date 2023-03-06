import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center text-sm md:text-base"
      onClick={() => navigate(-1)}
    >
      <BsChevronLeft fill="#000" className="mb-0.5" />
      Back
    </button>
  );
};
export default BackButton;

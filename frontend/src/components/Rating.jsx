import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Rating = ({ value, text, color, caption }) => {
  return (
    <div className="flex items-center justify-between w-24">
      <span className="text-lg" style={{ color }}>
        {value > 1 ? (
          <BsStarFill />
        ) : value >= 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span className="text-lg ml-0.5" style={{ color }}>
        {value > 2 ? (
          <BsStarFill />
        ) : value >= 1.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span className="text-lg ml-0.5" style={{ color }}>
        {value > 3 ? (
          <BsStarFill />
        ) : value >= 2.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span className="text-lg ml-0.5" style={{ color }}>
        {value > 4 ? (
          <BsStarFill />
        ) : value >= 3.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
      <span className="text-lg ml-0.5" style={{ color }}>
        {value > 5 ? (
          <BsStarFill />
        ) : value >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f0c330",
};

export default Rating;

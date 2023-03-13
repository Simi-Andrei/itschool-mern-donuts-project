import { useNavigate } from "react-router-dom";

const Heading = ({ text, className, button, address }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        className={
          `bg-white w-full rounded-sm shadow-sm shadow-stone-200 p-2 ${
            button && "pl-16"
          } ` + className
        }
      >
        <h2 className="tracking-tighter uppercase">{text}</h2>
      </div>
      {button && (
        <button
          className="absolute top-2 -left-1 py-0.5 px-3 rounded-tr-md rounded-br-md rounded-tl-sm rounded-bl-sm bg-stone-900 text-white text-sm"
          onClick={() => navigate(address)}
        >
          Back
        </button>
      )}
    </div>
  );
};
export default Heading;

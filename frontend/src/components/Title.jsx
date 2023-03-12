const Title = ({ text, className }) => {
  return (
    <div
      className={
        `bg-white w-full rounded-sm shadow-sm shadow-stone-200 p-2 ` + className
      }
    >
      <h2 className="tracking-tighter uppercase">{text}</h2>
    </div>
  );
};
export default Title;

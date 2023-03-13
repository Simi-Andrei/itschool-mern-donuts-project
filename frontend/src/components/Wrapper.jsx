const Wrapper = ({ children, className }) => {
  return (
    <div
      className={
        `bg-white shadow-sm shadow-stone-200 mt-1 p-2 text-xs xl:text-sm rounded-sm ` +
        className
      }
    >
      {children}
    </div>
  );
};
export default Wrapper;

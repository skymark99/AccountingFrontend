import { useDispatch } from "react-redux";

function PagesNumbers({
  currentPage,
  startPage,
  endPage,
  onSetCurrentPage,
  btnDisable,
  totalPages,
}) {
  const dispatch = useDispatch();

  const handleOnclick = (val) => {
    return () => {
      if (btnDisable && val > currentPage) return;
      dispatch(onSetCurrentPage(val));
    };
  };

  return (
    <ul className="page-numbers">
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      ).map((val) => (
        <li
          key={val}
          className={val === currentPage ? "current" : ""}
          onClick={handleOnclick(val)}
        >
          {val}
        </li>
      ))}
    </ul>
  );
}

export default PagesNumbers;

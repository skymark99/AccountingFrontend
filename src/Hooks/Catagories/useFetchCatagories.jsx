import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatagory } from "../../Global-Variables/features/catagorySlice/catagorySlice";

export const useFetchCategories = () => {
  const dispatch = useDispatch();
  const { catagories } = useSelector((state) => state.catagories);

  useEffect(() => {
    if (!catagories || catagories.length <= 0) {
      dispatch(fetchCatagory());
    }
  }, [catagories, dispatch]);

  return catagories;
};

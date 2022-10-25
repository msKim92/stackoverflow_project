import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../reduxStore/slices/userSlice";
import CookieModal from "./CookieModal";

function AddComment() {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <CookieModal user={user} />
    </div>
  );
}

export default AddComment;

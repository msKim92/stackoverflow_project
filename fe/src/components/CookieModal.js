import React from "react";

function CookieModal({ user }) {
  return (
    <div>
      {user?.map((data) => (
        <div key={data.id}>{data.body}</div>
      ))}
    </div>
  );
}

export default CookieModal;

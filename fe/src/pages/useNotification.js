export default function Toast({ msg = "메세지 없음" }) {
  return (
    <div>
      <div>
        {msg === "내용을 10글자이상 입력해주세요." ? (
          <div
            style={{
              position: "absolute",
              top: "70%",
              left: "50%",
              padding: "11px",
              transform: "translate(-50%, -50%)",
              zIndex: "3",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              borderRadius: "4px",
              border: "1px solid #000",
            }}
          >
            {msg}
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              padding: "11px",
              transform: "translate(-50%, -50%)",
              zIndex: "3",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              borderRadius: "4px",
              border: "1px solid #000",
            }}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <style>
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 11px;
  min-width: 200px;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 4px;
  border: 1px solid #000;
}
</style> */
}

import { ScaleLoader } from "react-spinners";

export default function FullScreenLoader() {
  return (
    <div
      className="loaderDiv d-flex justify-content-center align-items-center vh-100"
      // style={{ padding: "20rem" }}
    >
      <div className="spinner">
        <ScaleLoader
          color="#6045EB"
          // loading="true"
          // cssOverride={override}
          size={150}
          loading
        />
      </div>
    </div>
  );
}

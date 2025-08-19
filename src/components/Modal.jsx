import ReactDom from "react-dom";

export default function Modal(props) {
  const { showReciteDescription, handleCloseModal } = props;
  const { name, description } = showReciteDescription || {};

  return ReactDom.createPortal(
    <div
      className="custom-framework modal-container "
      role="dialog"
      aria-modal="true"
      aria-labelledby="exercise-title"
    >
      <button
        className="custom-framework modal-underlay"
        onClick={handleCloseModal}
        aria-label="إغلاق"
      />
      <div className="custom-framework modal-content">
        <div>
          <h6>اليوم</h6>
          <h2 id="exercise-title" className="custom-framework skill-name">
            {name?.replaceAll("-", " ")}
          </h2>
        </div>
        <div>
          <h6>الوصف</h6>
          <p>{description}</p>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            إغلاق
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

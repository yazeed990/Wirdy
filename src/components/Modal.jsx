import ReactDom from "react-dom"


export default function Modal(props){
    const {showReciteDescription, handleCloseModal} = props
    const {name, description} = showReciteDescription || {}


    return ReactDom.createPortal((
        <div className="custom-framework modal-container ">
            <button className="custom-framework modal-underlay" onClick={handleCloseModal}/>
            <div className="custom-framework modal-content">
                <div>
                    <h6>اليوم</h6>
                    <h2 className="custom-framework skill-name">{name.replaceAll("-", " ")}</h2>
                </div>
                <div>
                    <h6>الوصف</h6>
                    <p>{description}</p>
                </div>
            </div>

        </div>
    ),document.getElementById("portal"))
}
import "./Matrix.css"

export default function MatrixCard({ icon, label, value, unit }) {

    return (
        <div className="matrix-card">
            <span className="icon">{icon}</span>
            <div className="container">
                <p className="label">{label}</p>
                <h4 className="value">
                    {value !== null && value !== undefined ? value : "--"}
                    <span className="unit"> {unit}</span>
                </h4>

            </div>
        </div>

    );
}
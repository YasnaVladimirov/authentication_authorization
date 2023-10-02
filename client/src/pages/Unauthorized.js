import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="goTo"><button onClick={() => navigate(-1)}>Go Back</button></div>
    </div>
  )
}

export default Unauthorized
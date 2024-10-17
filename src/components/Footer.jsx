import Github from "../assets/github.png"
import Linkedin from "../assets/linkedin.png"

function Footer() {
  return (
    <div className="footer-container">
      <h3>page created by Enrique Páez: </h3>

      <a href="https://www.linkedin.com/in/enrique-paez/">
          <img src={Github} alt="Github Logo" />
      </a>

      <a href="https://github.com/enriquepaez">
        <img src={Linkedin} alt="Linkedin Logo" />
      </a>
    </div>
  )
}

export default Footer
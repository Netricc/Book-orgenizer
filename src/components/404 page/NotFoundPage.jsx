import './notfoundpage.css'
import { Link } from "react-router-dom";
import nofoundpageImage from "./../../assets/nofoundpageImage.png"


export default function NotFoundPage() {
  let currentHref = window.location.href;
  let lastSegment = currentHref.substring(currentHref.lastIndexOf('/') + 1);
  return (
    <section className='NoFoundPage'>
      <div className="container">

        <div className="content">
          <h1>Page Not Found : <span className='urlNoFound'>/{lastSegment}</span></h1>
          <span>do you want to return into the <Link to="/">Home Page</Link></span>
        </div>

        <div className="image">
          <img src={nofoundpageImage} alt="" />
        </div>

      </div>
    </section>
  )
}

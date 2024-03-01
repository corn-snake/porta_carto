import {Routes, Route, NavLink} from "./deps.js"
import {Home} from "./components/Home.jsx"
import { Contact } from "./components/Contact.jsx";
import { Admin } from "./components/Admin.jsx";
import { GalleryDisplay, MapDisplay } from "./components/MapDisplay.jsx";

export default function App() {
  return (
    <>
      <div class="header-sh"></div>
      <header class="mH">
        <h2>E. C. Correa</h2>
        <div class="midline_hor"></div>
        <img src="/?res=logo" class="logo_h"/>
      </header>
      <main>
        <nav class="mainNav"><span>
          <span><NavLink to="/worlds">My Projects</NavLink></span>
          <span><NavLink to="/bigBio">More About Me</NavLink></span>
        </span></nav>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/worlds' element={<GalleryDisplay/>}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/admin/:hash' element={<Admin/>}/>
          <Route path='/map/:id' element={<MapDisplay />} />
        </Routes>
        <footer class="footnav">
          <span>
            <span><NavLink to="/contact">Contact</NavLink></span>
            <span><NavLink to="/">Main Page</NavLink></span>
          </span>
        </footer>
      </main>
    </>
  );
}

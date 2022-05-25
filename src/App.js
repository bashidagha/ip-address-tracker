import { useEffect, useState } from 'react';
import {API_KEY} from './key'
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet'
import * as L from "leaflet";


function App() {

  const [loc, setLoc] = useState();
  const [position,setPosition] = useState([37.38605, -122.08385]);
  const [ip,setIP] = useState('8.8.8.8');

  useEffect(() => {
    getfirstLoc();
  }, []);

  async function getfirstLoc() {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`
      );
    const location = await response.json();
    setLoc(location);
    setPosition([location.location.lat, location.location.lng])
    setIP(location.ip)
    console.log(location);
  }

  async function getLoc() {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
      );
    const location = await response.json();
    if(location.code)
      return 0;
    setLoc(location);
    setPosition([location.location.lat, location.location.lng])
    setIP(location.ip)
    console.log(location);
  }

  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
    iconUrl:
      "icon-location.svg"
  })

  const [icon, setIcon] = useState(blueIcon);


  return (
    <>
      <div className='location-top-panel'>
        <h1>IP Address Tracker</h1>

        <div className='location-top-panel-search-box'>
          <input placeholder="Search for any IP address or domain" onInput={e => setIP(e.target.value)}></input>
          <div>
            <img src="icon-arrow.svg" alt="arrow" onClick={()=>getLoc()}></img>
          </div>
          
        </div>


        <div className='location-top-panel-loc'>
        <div className='row'>
          <div className='col-md-3 location-top-panel-loc-item'>
            <h4> IP Address</h4>
            <h2>{loc?loc.ip:"Loading..."}</h2>
          </div>
          <div className='col-md-3 location-top-panel-loc-item'>
            <h4> Location</h4>
            <h2>{loc?loc.location.city:"Loading..."}<br></br>{loc?.location.postalCode}</h2>
          </div>
          <div className='col-md-3 location-top-panel-loc-item'>
            <h4> Timezone</h4>
            <h2>{loc?`UTC ${loc.location.timezone}`:"Loading..."}</h2>
          </div>
          <div className='col-md-3 location-top-panel-loc-item'>
            <h4> ISP</h4>
            <h2>{loc?loc.isp:"Loading..."}</h2>
          </div>
        </div>
        
      </div>

      </div>  

      


      <MapContainer center={position} zoom={13} scrollWheelZoom={false} id='map-container'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
        </Marker>
      </MapContainer>
      
    </>
  );
}

export default App;

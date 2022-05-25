import Arrow from './assets/icon-arrow.svg'
import {API_KEY} from './key'

function App() {
  return (
    <>
      <div className='location-top-panel'>
        <h1>IP Address Tracker</h1>

        <div className='location-top-panel-search-box'>
          <input placeholder="Search for any IP address or domain"></input>
          <div>
            <img src={Arrow} alt="arrow" onClick={()=>console.log(API_KEY)}></img>
          </div>
          
        </div>

        <div className='location-top-panel-loc col-md-10'>
          <div className='row'>
            <div className='col-md-3 location-top-panel-loc-item'>
              <h4> IP Address</h4>
            </div>
            <div className='col-md-3 location-top-panel-loc-item'>
              <h4> Location</h4>
            </div>
            <div className='col-md-3 location-top-panel-loc-item'>
              <h4> Timezone</h4>
            </div>
            <div className='col-md-3 location-top-panel-loc-item'>
              <h4> ISP</h4>
            </div>
          </div>
          
        </div>

      </div>  
    </>
  );
}

export default App;

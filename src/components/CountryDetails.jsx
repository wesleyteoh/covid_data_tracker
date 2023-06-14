import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import addCommas from "../functions/addCommas";
import GoogleMapReact from "google-map-react";
import CountryDetailsBreadcrumb from "./Breadcrumbs/CountryDetailBreadcrumb";

export default function CountryDetails({ props }) {
  const [countryList, setCountryList] = useState(props);
  const { id } = useParams();
  const idNum = parseInt(id);
  const navigate = useNavigate();
  const AnyReactComponent = ({ text }) => (
    <div
      style={{
        color: "white",
        background: "grey",
        padding: "15px 10px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {text}
    </div>
  );

  const handleClick = () => {
    console.log("Click");
    navigate("/comparator");
  };
  let country;
  for (let i = 0; i < countryList?.length; i++) {
    if (countryList[i]?.countryInfo?._id === idNum) {
      country = countryList[i];
      break;
    }
  }

  const defaultProps = {
    center: {
      // lat: countryList[id]?.countryInfo?.lat,
      // lng: countryList[id]?.countryInfo?.long,
      lat: country?.countryInfo?.lat,
      lng: country?.countryInfo?.long,
    },
    zoom: 11,
  };

  return (
    <>
      <CountryDetailsBreadcrumb id={id} />

      <br />
      <button onClick={handleClick}>Return</button>

      <h2>
        Detail for {country?.country}, {country?.countryInfo?.iso3}
      </h2>
      <h3>
        Coordinates: <br />
        Latitude: {country?.countryInfo?.lat} Longitude:{" "}
        {country?.countryInfo?.long}
      </h3>
      <img className="image" width="30%" src={country?.countryInfo?.flag}></img>
      <p>Population: {addCommas(country?.population)}</p>
      <p>Tests done: {addCommas(country?.tests)}</p>
      <p>Cases: {addCommas(country?.cases)}</p>
      <p>Critical: {addCommas(country?.critical)}</p>
      <p>Deaths: {addCommas(country?.deaths)}</p>
      <p>Recovered: {addCommas(country?.recovered)}</p>
      <p>Cases per Million: {addCommas(country?.casesPerOneMillion)}</p>
      <p>Critical per Million: {addCommas(country?.criticalPerOneMillion)}</p>
      <p>Deaths per Million: {addCommas(country?.deathsPerOneMillion)}</p>
      <p>Recovered per Million: {addCommas(country?.recoveredPerOneMillion)}</p>
      {/* Main fn here */}
      <br />
      <p>{/* Details - {id} Component {JSON.stringify(countryList[id])} */}</p>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {/* <AnyReactComponent
            lat={countryList[id]?.countryInfo?.lat}
            lng={countryList[id]?.countryInfo?.long}
            // text={countryList[id]?.country}
          /> */}
        </GoogleMapReact>
        <br />
        <button onClick={handleClick}>Return</button>
      </div>
    </>
  );
}

import React from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import Widget from '../../../../components/Widget/Widget';

import s from './Company.module.scss';

const BasicMap = withScriptjs(withGoogleMap(() =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: parseFloat(-37.813179), lng: parseFloat(144.950259) }}
  >
    <Marker position={{ lat: -37.813179, lng: 144.950259 }} />
  </GoogleMap>,
));

class Company extends React.Component {

  render() {
    return (
      <div>
        <h1 className="page-title">
          회사 <span className="fw-semi-bold">소개</span>
        </h1>
        <Widget
          title={<h4>통계마당 <small className="text-muted">여기에 있어용</small></h4>}
          collapse close
        >
          <div>
            <p>대표는 누구고 우리는 이런 회사 어쩌구저쩌구</p>
          </div>
          <div className={s.MapContainer}>
            <BasicMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg"
              loadingElement={<div style={{ height: 'inherit', width: 'inherit' }} />}
              containerElement={<div style={{ height: 'inherit' }} />}
              mapElement={<div style={{ height: 'inherit' }} />}
            />
          </div>
        </Widget>
      </div>);
  }

}

export default Company;

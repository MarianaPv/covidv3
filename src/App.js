/* global google */

import React, { Component } from 'react'
import { render } from 'react-dom';
import GoogleMapReact from 'google-map-react'
import Navigation from './Components/Navigation/Navigation'
import './HeatMap.css'


class HeatMap extends Component {
  
  
  static defaultProps = {
    center: {
      lat: 	10.963889,
      lng: 	-74.796387
    },
    zoom: 12
  }

  constructor(props) {
  	super(props)
  	this.state = {
      heatmapVisible: true,
  		heatmapPoints: [
		  		{lat: 10.9639, lng: -74.80},
          {lat: 10.9739, lng: -74.81},
          {lat: 10.96, lng: -74.80}
        ],
        infoDatabase: []
  	};
  }

  componentDidMount(){
    const { infoDatabase } = this.state;
    fetch("http://localhost:5000/coords")
    .then(response => response.json())
    .then((data) => {
      let{data1} = data;
      if (infoDatabase.toString() !== data1.toString()){

      this.setState({ infoDatabase: data1.infoDatabase })
      }
  });
   
  }
  
  render() {

  	const apiKey = {key: 'AIzaSyAps7iV33s_Nk0RwrOpQDzKw8CrJmgKJkk'}
  	const heatMapData = {
  		positions: this.state.infoDatabase,
		  options: {
			radius: 22,
			opacity: 0.6
		}
  	}

  	console.log(this.state)

    return (
      <div className="main" style={{ height: '100vh', width: '100%' }}>
        <Navigation/>
        <GoogleMapReact
          className ="mapa"
          ref={(el) => this._googleMap = el}
          bootstrapURLKeys={apiKey}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={heatMapData}
         
        />

       
      </div>
    )
  }
}

export default HeatMap
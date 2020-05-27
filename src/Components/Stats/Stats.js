import React, { Component, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import { render } from 'react-dom';
import './Stats.css'
import * as ROUTES from '../Routes/Routes.js';
import { withRouter } from "react-router-dom";




class Stats extends Component {
    
    
    render(){
        
    return(
        <div style={{ height: '100vh', width: '100%' }}>
        <Navigation/>
        
        <div className="bienvenida">¡Conoce las estadísticas del COVID-19 en Barranquilla!</div>
        <div className="primero">
          <canvas ref="canvas" className="html" id="Casos_diarios" width="560"height="400"></canvas>
          <canvas ref="canvas" className="espacio" id="Casos_acumuladoslog" width="550"height="400"></canvas>
          </div>
          <div className="primero">
          <canvas ref="canvas" className="html" id="Casos_acumulados" width="550"height="400"></canvas>
          <canvas ref="canvas"  className="espacio" id="FemvsMas" width="315"height="300"></canvas>
          <canvas ref="canvas" className="espacio2" id="FallvsRecu" width="260"height="300"></canvas>
          </div>
          <div className="slider">Desliza para ver cómo ha avanzado la enfermedad en el tiempo:
          <input type="text" class="js-range-slider" name="my_range" value="" />
          </div>
        </div>
    )
}
}

export default (Stats);

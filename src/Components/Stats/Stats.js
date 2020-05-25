import React, { Component, useState } from 'react'
import Navigation from '../Navigation/Navigation'
import { render } from 'react-dom';
import './Stats.css'

class Stats extends Component {


    render(){
        
    return(
        <div>
        <Navigation/>
        
        <div className="bienvenida">¡Conoce las estadísticas del COVID-19 en Barranquilla!</div>
        <div>
        <div className="html">
        <div id="root"></div>
        </div>
        </div>
        </div>
    )
}
}

export default Stats;
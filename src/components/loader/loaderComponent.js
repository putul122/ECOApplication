import React from 'react'
import style from './loaderComponent.scss'
class LoaderComponent extends React.Component {
    construct (props) {}
    render () {
        return (
          <div id='loaderScreen' >
            <svg style={{'visibility': 'hidden', 'position': 'absolute'}}>
              <linearGradient id='cg_static' gradientUnits='userSpaceOnUse' x1='140.59779' y1='1033.4098' x2='140.59779' y2='1158.1532' gradientTransform='matrix(0.8662,-0.4997,0.4997,0.8662,-594.2272,-800.84584)'>
                <stop offset='0' style={{stopColor: '#F15A29'}} />
                <stop offset='0.4135' style={{stopColor: '#F9ED32'}} />
                <stop offset='0.6243' style={{stopColor: '#27AAE1'}} />
                <stop offset='0.6642' style={{stopColor: '#2A9ACD'}} />
                <stop offset='0.7402' style={{stopColor: '#2A77A6'}} />
                <stop offset='0.8443' style={{stopColor: '#204772'}} />
                <stop offset='0.9714' style={{stopColor: '#08073B'}} />
                <stop offset='1' style={{'stopColor': '#01002F'}} />
              </linearGradient>
              <path id='pc' className={style.waitCenter} d='m 60.678825,38.849609 -3.351562,5.800782 h 0.152343 l -15.199218,26.398437 15,26.101563 h -0.125 l 3.408203,5.898439 h 0.117187 l 0.09961,0.20117 6.912109,0.0195 -0.01172,-0.0195 H 97.835075 L 116.38,71.048828 97.778435,38.849609 H 67.479606 Z m 3.5,5.900391 H 94.579216 L 97.872185,50.560547 107.78039,67.75 h -0.16992 l 1.86914,3.298828 -1.59375,2.800781 h 0.19336 L 94.579216,97.25 h -27 -3.400391 L 48.979606,70.949219 Z' />
              <path id='pl' className={style.waitLeft} d='M 26.979606,38.75 8.38,70.949219 l 18.599606,32.201171 33.701172,-0.10156 0.0957,0.1914 3.302735,0.01 L 82.681,70.949219 64.079216,38.75 h -3.398438 z m 3.5,5.900391 h 27 3.400391 l 5.021484,8.865234 9.878907,17.134766 -0.08594,0.148437 0.08594,0.150391 -14.900391,26.201172 H 57.280388 30.479606 L 15.280388,70.849609 Z' />
              <path id='prt' className={style.waitTop} d='M 77.678825,9.5507812 59.079216,41.75 l 3.482422,6.029297 0.01758,-0.0293 13.201172,22.900391 -0.0039,0.0078 1.902344,3.292969 3.335938,0.0098 0.06445,-0.111329 h 26.999998 l -0.10547,0.183594 6.8047,0.01758 1.74414,-3.027343 -0.043,-0.07422 L 133.38,41.75 114.77844,9.5507812 Z m 3.300781,5.8984378 H 111.38 l 0.002,0.002 h 0.19727 l 11.55273,20.390625 3.34766,5.808594 -0.0293,0.04883 0.0293,0.05078 -14.90039,26.201172 H 81.178825 L 81.061638,67.75 h -0.08203 L 67.780388,44.849609 h 0.04883 l -1.84961,-3.199218 1.625,-2.800782 h -0.125 z' />
              <path id='prb' className={style.waitBottom} d='m 77.579216,67.75 -18.59961,32.199219 18.59961,32.201171 h 37.101564 l 18.59961,-32.201171 -16.80078,-29 0.0234,-0.04102 L 114.67883,67.75 h -6.89844 -26.800784 z m 3.5,5.900391 H 111.47961 L 126.38,99.949219 111.47961,126.15039 h -0.19922 -30.201174 -0.09961 L 67.680778,103.25 h 0.164063 l -1.964844,-3.400391 z' />
              <g id='relay_cycle' transform='translate(-8.3799969,-4.6502911)'>
                <use xlinkHref='#pl' style={{'fill': 'url(#cg_static)'}} />
                <use xlinkHref='#prt' style={{'fill': 'url(#cg_static)'}} />
                <use xlinkHref='#prb' style={{'fill': 'url(#cg_static)'}} />
                <use xlinkHref='#pc' style={{'fill': 'url(#cg_static)'}} />
              </g>
            </svg>
            <svg width='125.00011' height='132.45041' viewBox='0 0 125.00011 132.45041' className={style.waitSmall}>
              <use xlinkHref='#relay_cycle' style={{'fill': 'url(#cg_static)'}} />
            </svg>
          </div>
          )
    }

    props: {}
}
export default LoaderComponent

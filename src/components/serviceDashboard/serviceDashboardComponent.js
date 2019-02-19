import React from 'react'
// import PropTypes from 'prop-types'
import * as d3 from 'd3'
// import rd3 from 'react-d3'
import { call } from 'redux-saga/effects'
console.log('d3', d3)
export default function ServiceDashboard (props) {
  // let Treemap = rd3.Treemap
  // let treemapData = [
  //   {label: 'Human Resource', value: 5},
  //   {label: 'Marketing & Sales', value: 4},
  //   {label: 'Billing', value: 3},
  //   {label: 'Order Management', value: 6},
  //   {label: 'Supplier Chain Management', value: 7}
  // ]
  let position = function () {
    this
      .style('left', function (d) { return d.x0 + '%' })
      .style('top', function (d) { return d.y0 + '%' })
      .style('width', function (d) { return (d.x1 - d.x0) + '%' })
      .style('height', function (d) { return (d.y1 - d.y0) + '%' })
  }
  let data = {
    'Skill': 'Application per Capability',
    'children': [
        {label: 'Develop Vision and Strategy', value: 2},
        {label: 'Manage Customer Service', value: 2},
        {label: 'Manage Information Technology', value: 4},
        {label: 'Develop and Manage Human Capital', value: 2},
        {label: 'Manage Customer Service', value: 4},
        {label: 'Manage Financial Resources', value: 3}
    ]
  }
  let width = 900
  let height = 600
  let chart = d3.select('#customTree')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const treeMap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true)
  treeMap.tile(d3.treemapBinary)
  const root = d3.hierarchy(data)
    .sum((d) => { console.log(d); return d.value })
    .sort(function (a, b) { return b.height - a.height || b.value - a.value })
  treeMap(root)
  const cell = chart.selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    // .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})

  // let color = d3.schemeCategory10
  cell.append('rect')
    .attr('x', function (d) { return d.x0 })
    .attr('y', function (d) { return d.y0 })
    .attr('id', (d) => { console.log('d', d); return d.data.id })
    // .attr('fill', (d,i) => { return color[i%20]; })
    .attr('fill', (d, i) => { return 'white' })
    .attr('width', (d) => { return d.x1 - d.x0 })
    .attr('height', (d) => { return d.y1 - d.y0 })
    .attr('stroke', 'black')
    .attr('stroke-width', 0.5)
    call(position)
  cell.append('text')
    .attr('x', function (d) { return d.x0 + 5 })
    .attr('y', function (d) { return d.y0 + 20 })
    .text(function (d) { return d.data.label })
    .attr('font-family', 'Courier')
    // .attr("font-size", function (d) { return app.isMobile == true ? '13px': '16px'; })
    .attr('text-anchor', 'left')
  return (
    <div>
      <div className='row'>
        <div className='col-md-10'>
          <h3>&nbsp;</h3>
        </div>
      </div>
      <div className='row' id='agreementSummary'>
        <div className='col-md-4'>
          <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  {/* <h3 className='m-portlet__head-text m--font-light'>
                  Activity
                  </h3> */}
                </div>
              </div>
            </div>
            <div className='m-portlet__body' style={{'height': '150px'}}>
              <div className='m-widget17'>
                <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
                  <div className='m-widget17__chart'>
                    <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                      <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                    <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                  </div>
                </div>
                <div className='m-widget17__stats'>
                  <div className='m-widget17__items m-widget17__items-col2'>
                    <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                      <span className='m-widget17__icon'>
                        <i className='flaticon-notes m--font-brand' />
                      </span>
                      <span className='m-widget17__subtitle'>
                        <h3>Services</h3>
                        <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{12}</h5>
                      </span>
                      {/* <span className='m-widget17__desc'>
                        <h1>{softwareCount}</h1>
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  {/* <h3 className='m-portlet__head-text m--font-light'>
                  Activity
                  </h3> */}
                </div>
              </div>
            </div>
            <div className='m-portlet__body' style={{'height': '150px'}}>
              <div className='m-widget17'>
                <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
                  <div className='m-widget17__chart'>
                    <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                      <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                    <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                  </div>
                </div>
                <div className='m-widget17__stats'>
                  <div className='m-widget17__items m-widget17__items-col2'>
                    <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                      <span className='m-widget17__icon'>
                        <i className='flaticon-notes m--font-brand' />
                      </span>
                      <span className='m-widget17__subtitle'>
                        <h3>Services Categories</h3>
                        <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{12}</h5>
                      </span>
                      {/* <span className='m-widget17__desc'>
                        <h1>{softwareCount}</h1>
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='m-portlet m-portlet--bordered-semi m-portlet--skin-light  m-portlet--rounded-force'>
            <div className='m-portlet__head'>
              <div className='m-portlet__head-caption'>
                <div className='m-portlet__head-title'>
                  {/* <h3 className='m-portlet__head-text m--font-light'>
                  Activity
                  </h3> */}
                </div>
              </div>
            </div>
            <div className='m-portlet__body' style={{'height': '150px'}}>
              <div className='m-widget17'>
                <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-danger'>
                  <div className='m-widget17__chart'>
                    <div className='chartjs-size-monitor' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className='chartjs-size-monitor-expand' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div>
                      <div className='chartjs-size-monitor-shrink' style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                        <div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
                    <canvas id='m_chart_activities' width={509} height={16} className='chartjs-render-monitor' style={{display: 'block', width: 509, height: 50}} />
                  </div>
                </div>
                <div className='m-widget17__stats'>
                  <div className='m-widget17__items m-widget17__items-col2'>
                    <div className='m-widget17__item' style={{'marginTop': '-8.87rem'}}>
                      <span className='m-widget17__icon'>
                        <i className='flaticon-notes m--font-brand' />
                      </span>
                      <span className='m-widget17__subtitle'>
                        <h3>Departments</h3>
                        <h5 style={{'float': 'right', 'paddingRight': '25px', 'marginTop': '-35px'}}>{12}</h5>
                      </span>
                      {/* <span className='m-widget17__desc'>
                        <h1>{softwareCount}</h1>
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='row'>
        <div className='col-md-8'>
          <Treemap
            width={700}
            height={500}
            title='Application per Capability'
            data={treemapData}
            textColor='#484848'
            fontColor='12px'
            hoverAnimation
          />
        </div>
      </div> */}
      <div className='row'>
        <div className='col-md-12'><span>Services per Capability</span></div>
        <div className='col-md-8' id='customTree' />
      </div>
    </div>
  )
}

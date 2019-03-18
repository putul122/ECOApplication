import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { call } from 'redux-saga/effects'
let width = 1000
let height = 700

let position = function () {
  this
    .style('left', function (d) { return d.x0 + '%' })
    .style('top', function (d) { return d.y0 + '%' })
    .style('width', function (d) { return (d.x1 - d.x0) + '%' })
    .style('height', function (d) { return (d.y1 - d.y0) + '%' })
}

let clearVisualization = function () {
  d3.select('#treeLayout').remove()
  d3.select('#mainScreen')
    .append('div:div')
    .attr('id', 'treeLayout') // set id
}

let plotMap = function (data) {
  let chart = d3.select('#treeLayout')
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
    .text(function (d) { return d.data.label + ' (' + d.data.value + ')' })
    .attr('font-family', 'Courier')
    // .attr("font-size", function (d) { return app.isMobile == true ? '13px': '16px'; })
    .attr('text-anchor', 'left')
}

export default function TreeMap (props) {
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
  clearVisualization()
  plotMap(data)
  return (
    <div className=''>
      <div className='col-md-12'><span>Services per Capability</span></div>
      <div id='mainScreen'>
        <div className='col-md-8' id='treeLayout' />
      </div>
    </div>
    )
  }
TreeMap.propTypes = {
  data: PropTypes.any
}

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  mxGraph,
  mxRubberband,
  mxKeyHandler,
  mxClient,
  mxUtils,
  mxEvent
} from 'mxgraph-js'
import axios from 'axios'
import parser from 'fast-xml-parser'

import '../common.css'
import '../mxgraph.css'

class mxGraphGridAreaEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      graph: {},
      layout: {},
      json: '',
      dragElt: null,
      createVisile: false,
      currentNode: null,
      currentTask: ''
    }
    this.LoadGraph = this.LoadGraph.bind(this)
  }
  componentDidMount () {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('userAccessToken')
    axios.defaults.headers.common['Accept'] = 'application/vnd.jgraph.mxgraph.xml'

    axios.get('https://model-eco-dev.ecoconductor.com/meta_model_perspectives/24')
    .then(response => {
      this.setState({ data: response.data })
      this.LoadGraph()
    })
    .catch(e => console.log(e))
  }

  LoadGraph () {
    var container = ReactDOM.findDOMNode(this.refs.divGraph)

    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error('Browser is not supported!', 200, false)
    } else {
      // Disables the built-in context menu
      mxEvent.disableContextMenu(container)

      // Creates the graph inside the given container
      var graph = new mxGraph(container)

      // Enables rubberband selection
      new mxRubberband(graph)

      var options = {
        attributeNamePrefix: '',
        textNodeName: '#text',
        ignoreAttributes: false,
        ignoreNameSpace: false,
        allowBooleanAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: true,
        trimValues: true,
        cdataTagName: '__cdata', // default is 'false'
        cdataPositionChar: '\\c',
        localeRange: '', // To support non english character in tag/attribute values.
        parseTrueNumberOnly: false
    }

    if (parser.validate(this.state.data) === true) { // optional (it'll return an object in case it's not valid)
        var jsonObj = parser.parse(this.state.data, options)
    }

      // Gets the default parent for inserting new cells. This is normally the first
      // child of the root (ie. layer 0).
      var parent = graph.getDefaultParent()

      // Enables tooltips, new connections and panning
      graph.setPanning(true)
      graph.setTooltips(true)
      graph.setConnectable(true)
      graph.setEnabled(true)
      graph.setEdgeLabelsMovable(false)
      graph.setVertexLabelsMovable(false)
      graph.setGridEnabled(true)
      graph.setAllowDanglingEdges(false)

      graph.getModel().beginUpdate()
      try {
        // mxGrapg component
        var doc = mxUtils.createXmlDocument()
        var node = doc.createElement('Node')
        node.setAttribute('ComponentID', '[P01]')

        const items = []
          jsonObj.mxGraphModel.root.mxCell.forEach(cell => {
            if (cell.value) {
              const vertexObj = {}

              let vertex = graph.insertVertex(
                parent,
                cell.id,
                cell.value,
                cell.mxGeometry.x,
                cell.mxGeometry.y,
                cell.mxGeometry.width,
                cell.mxGeometry.height,
                cell.style
              )
              vertexObj[cell.id] = vertex
              items.push(vertexObj)
            }
          })

          const mxCellCount = jsonObj.mxGraphModel.root.mxCell.length

          for (let i = 1; i < mxCellCount; i++) {
            const cell = jsonObj.mxGraphModel.root.mxCell[i]
            if (!cell.value) {
              let sourceObject = items.filter(vertex => {
                return parseInt(Object.keys(vertex)) === cell.source
              })[0]
              let source = sourceObject ? sourceObject[cell.source] : null

              let targetObject = items.filter(vertex => {
                return parseInt(Object.keys(vertex)) === cell.target
              })[0]
              let target = targetObject ? targetObject[cell.target] : null

              graph.insertEdge(
                parent,
                null,
                '',
                source,
                target
              )
            }
          }

        // data
      } finally {
        // Updates the display
        graph.getModel().endUpdate()
      }

      // Enables rubberband (marquee) selection and a handler for basic keystrokes
      new mxRubberband(graph)
      new mxKeyHandler(graph)
    }
  }
  render () {
    return (
      <div className='graph-container' ref='divGraph' id='divGraph' />
    )
  }
}

export default mxGraphGridAreaEditor

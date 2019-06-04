import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  // mxGraph,
  // mxEditor,
  mxRubberband,
  // mxKeyHandler,
  // mxCodec,
  mxGraph,
  // mxPartitionLayout,
  // mxClient,
  mxUtils
  // mxEvent
} from 'mxgraph-js'
import axios from 'axios'
// import parser from 'fast-xml-parser'

import '../../common.css'
import '../../mxgraph.css'

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
      currentTask: '',
      editor: null
    }
    this.LoadGraph = this.LoadGraph.bind(this)
  }
  componentDidMount () {
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('userAccessToken')
    axios.defaults.headers.common['Accept'] = 'application/vnd.jgraph.mxgraph.xml'

    axios.get('https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=63&view_key[0]=PenaltyScorecardDraw')
    .then(response => {
        console.log('response.data', response.data)
        this.setState({ data: response.data })
        this.LoadGraph()
    })
  //   .catch(e => {
  //     return console.log(e)
  //   })
  }

  parseXmlToGraph = (xmlDoc, graph) => {
    const cells = xmlDoc.documentElement.children[0].children
    const parent = graph.getDefaultParent()

    for (let i = 0; i < cells.length; i++) {
      const cellAttrs = cells[i].attributes
      console.log('cellAttrs', cellAttrs)
      if (cellAttrs.vertex) { // is vertex
        const vertexName = cellAttrs.value.value
        const vertexId = Number(cellAttrs.id.value)
        const geom = (cells && cells[i].children[0] && cells[i].children[0].attributes) || null
        const xPos = (geom && geom.x && Number(geom.x.value)) || 0
        const yPos = (geom && geom.y && Number(geom.y.value)) || 0
        const height = (geom && geom.height && Number(geom.height.value)) || 0
        const width = (geom && geom.width && Number(geom.width.value)) || 0
        graph.insertVertex(parent, vertexId, vertexName, xPos, yPos, width, height)
      } else if (cellAttrs.edge) {
        const edgeName = cellAttrs && cellAttrs.value && cellAttrs.value.value
        const edgeId = (cellAttrs && cellAttrs.id && Number(cellAttrs.id.value)) || 0
        const source = (cellAttrs && cellAttrs.source && Number(cellAttrs.source.value)) || null
        const target = (cellAttrs && cellAttrs.target && Number(cellAttrs.target.value)) || null
        graph.insertEdge(parent, edgeId, edgeName,
          graph.getModel().getCell(source),
          graph.getModel().getCell(target)
        )
      }
    }
  }

  LoadGraph () {
    var container = ReactDOM.findDOMNode(this.refs.divPenaltyGraph)
    var graph = new mxGraph(container)

    new mxRubberband(graph)

    const doc = mxUtils.parseXml(this.state.data)
    this.parseXmlToGraph(doc, graph)
    // const decoder = new mxCodec(doc)
    // const node = doc.documentElement
    // decoder.decode(node, graph.getModel())

    // const parent = graph.getDefaultParent()
    // layout.execute(parent)

    // Enables rubberband (marquee) selection and a handler for basic keystrokes
    // new mxKeyHandler(graph)
  }
  render () {
    return (
      <div className='graph-container' ref='divPenaltyGraph' id='divPenaltyGraph' />
    )
  }
}

export default mxGraphGridAreaEditor

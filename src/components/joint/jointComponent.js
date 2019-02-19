import React from 'react'
import ReactDOM from 'react-dom'
import joint from 'jointjs/index'
import $ from 'jquery/dist/jquery'
// import _ from 'lodash'
import styles from './jointComponent.scss'

// Sample data for visualization
  var apidata = {
    'data': [
        {
            'resource': {
                'type': 'Child',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 1,
                'target_component_type_name': 'Application',
                'name': 'Can be child of',
                'description': null,
                'id': 1,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/1'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                }
            ]
        },
        {
            'resource': {
                'type': 'Child',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 1,
                'target_component_type_name': 'Application',
                'name': 'Can be parent of',
                'description': null,
                'id': 2,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/2'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                }
            ]
        },
        {
            'resource': {
                'type': 'Child',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 5,
                'target_component_type_name': 'Department',
                'name': 'Can be child of',
                'description': null,
                'id': 3,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/3'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/5'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectFrom',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 1,
                'target_component_type_name': 'Application',
                'name': 'Target',
                'description': null,
                'id': 4,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/4'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectFrom',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 2,
                'target_component_type_name': 'Server',
                'name': 'Is Hosted At',
                'description': null,
                'id': 5,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/5'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/2'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectFrom',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 5,
                'target_component_type_name': 'Department',
                'name': 'Is Hosted At',
                'description': null,
                'id': 6,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/6'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/5'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectTo',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 6,
                'target_component_type_name': 'Vendor',
                'name': 'Access',
                'description': null,
                'id': 7,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/7'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/6'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectTo',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 7,
                'target_component_type_name': 'L3 Sub-process',
                'name': 'Consumes',
                'description': null,
                'id': 8,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/8'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/7'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectTo',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 8,
                'target_component_type_name': 'Business Capability',
                'name': 'Impacted By',
                'description': null,
                'id': 9,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/9'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/8'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectTo',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 9,
                'target_component_type_name': 'Service',
                'name': 'Implemented By',
                'description': null,
                'id': 10,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/10'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/9'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectTo',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 8,
                'target_component_type_name': 'Business Capability',
                'name': 'Requires',
                'description': null,
                'id': 11,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/11'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/8'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectTo',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 7,
                'target_component_type_name': 'L3 Sub-process',
                'name': 'Owns',
                'description': null,
                'id': 12,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/12'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/7'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectTo',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 5,
                'target_component_type_name': 'Department',
                'name': 'Produces',
                'description': null,
                'id': 13,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/13'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/5'
                }
            ]
        },
        {
            'resource': {
                'type': 'ConnectTo',
                'component_type': 1,
                'component_type_name': 'Application',
                'target_component_type': 4,
                'target_component_type_name': 'Process',
                'name': 'Is Supplied By',
                'description': null,
                'id': 14,
                'created': '0001-01-01T00:00:00',
                'modified': null,
                'created_by': 0,
                'modified_by': null
            },
            '_links': [
                {
                    'rel': 'self',
                    'action_key': 'GetComponentTypeConstraint',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1/constraints/14'
                },
                {
                    'rel': 'component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/1'
                },
                {
                    'rel': 'target_component_type',
                    'action_key': 'GetComponentType',
                    'href': 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-meta-model/component_types/4'
                }
            ]
        }
    ],
    'err_code': null,
    'err_msg': null,
    '_links': []
  }

  var nodeArray = []
  var linkArray = []
  var nodeData = apidata.data
  var firstNodeSet = false

  $.each(nodeData, function (index, data) {
    if (!firstNodeSet) {
      var node = {}
      node.Id = 17
      node.Name = data.resource.component_type_name
      node.Title = data.resource.component_type_name
      node.Attributes = ['']
      nodeArray.push(node)
      firstNodeSet = true
    }
    node = {}
    node.Id = data.resource.id
    node.Name = data.resource.target_component_type_name
    node.Title = data.resource.target_component_type_name
    node.Attributes = ['']
    nodeArray.push(node)

    var link = {}
    link.Id = data.resource.id
    link.Title = data.resource.name
    if (data.resource.type === 'Child') {
      link.StartComponentId = 17
      link.EndComponentId = data.resource.id
    } else if (data.resource.type === 'ConnectFrom') {
      link.StartComponentId = 17
      link.EndComponentId = data.resource.id
    } else if (data.resource.type === 'ConnectTo') {
      link.StartComponentId = data.resource.id
      link.EndComponentId = 17
    }

    linkArray.push(link)
    console.log('data', data)
  })

    var Shape = joint.dia.Element.define('graph.Shape', {
    size: {
        width: 100,
        height: 40
    },
    attrs: {
        rect: {
            refWidth: '100%',
            refHeight: '100%',
            fill: 'white',
            stroke: 'rgb(0, 0, 0)',
            strokeWidth: 1,
            strokeOpacity: 0.75,
            rx: 5,
            ry: 5
        },
        text: {
            refX: '50%',
            refY: '50%',
            yAlignment: 'middle',
            xAlignment: 'middle',
            'text-anchor': 'middle',
            fontSize: 8
        }
    }
    }, {
    markup: '<rect/><title/><text/>',
    setTitle: function (title) {
        return this.attr('title/text', title || '')
    },
    setText: function (text) {
        return this.attr('text/text', text || '')
    },
    setCSSClasses: function (cssClasses) {
        if (cssClasses) {
            var shape = this
            $.each(cssClasses, function (index, cssClass) {
                shape.attr('rect/class', (shape.attr('rect/class') || '') + ' ' + cssClass)
                shape.attr('text/class', (shape.attr('text/class') || '') + ' ' + cssClass)
                // shape.attr('image/class', (shape.attr('image/class') || '') + ' ' + cssClass);
            })
        }
    }
    })

    var Link = joint.dia.Link.define('graph.Link', {
    attrs: {
        '.connection': {
            stroke: 'black',
            strokeWidth: 2,
            cursor: 'pointer',
            // pointerEvents: 'none',
            targetMarker: {
                type: 'path',
                fill: 'black',
                stroke: 'none',
                d: 'M 8 -8 0 0 8 8 z'
            }
        },
        defaultLabel: {
            attrs: { text: { text: '*' } }
        }
    },
    wrapper: {
        connection: true,
        strokeWidth: 10,
        strokeLinejoin: 'round'
    },
    z: -1,
    weight: 1,
    minLen: 1,
    labels: [{
        markup: '<text/>',
        position: {
            distance: 0.5,
            offset: {
                x: 10,
                y: -5
            }
        },
        attrs: {
            text: {
                fill: 'gray',
                textAnchor: 'middle',
                refY: 5,
                refY2: '-60%',
                fontSize: 8,
                cursor: 'pointer',
                fontFamily: 'sans-serif'
            }
        },
        size: {
            width: 120, height: 20
        }
    }]

    }, {
    markup: '<path class="connection"/><g class="labels"/>',

    connect: function (sourceId, targetId) {
        return this.set({
            source: { id: sourceId },
            target: { id: targetId }
        })
    },

    setTitle: function (title) {
        return this.attr('text/text', title || '')
    },

    setLabelText: function (text) {
        return this.prop('labels/0/attrs/text/text', text || '')
    },
    setLinkId: function (id) {
        return this.attr('linkid/id', id || '')
    }
    })

    var LayoutControls = joint.mvc.View.extend({

    events: {
        change: 'layout',
        input: 'layout'
    },

    options: {
        padding: 50
    },

    init: function () {
        var options = this.options

        options.cells = this.buildGraph(options.nodes, options.connections)

        // if (options.adjacencyList) {
        //     options.cells = this.buildGraphFromAdjacencyList(options.adjacencyList);
        // }

        this.listenTo(options.paper.model, 'change', function (cell, opt) {
            if (opt.layout) {
                this.layout()
            }
        })
    },

    layout: function () {
        var paper = this.options.paper
        var graph = paper.model
        var cells = this.options.cells

        // joint.layout.DirectedGraph.layout(cells, this.getLayoutOptions());

        var gBox = joint.layout.DirectedGraph.layout(cells, this.getLayoutOptions())
        console.log('gBox', gBox)

        if (graph.getCells().length === 0) {
            // The graph could be empty at the beginning to avoid cells rendering
            // and their subsequent update when elements are translated
            graph.resetCells(cells)
        }

        paper.fitToContent({
            padding: this.options.padding,
            gridWidth: 10,
            gridHeight: 10,
            allowNewOrigin: 'any'
        })

        this.trigger('layout')
    },

    getLayoutOptions: function () {
        return {
            setVertices: false,
            setLabels: true,
            ranker: 'network-simplex',
            rankDir: 'LR',
            align: 'DR',
            rankSep: 50,
            edgeSep: 50,
            nodeSep: 50
        }
    },

    buildGraph: function (nodes, connections) {
        var elements = []
        var links = []

        if (nodes) {
            $.each(nodes, function (index, node) {
                var shape = new Shape({ id: node.Id })
                if (node.Id === 1) {
                    shape.position(0, 0)
                    // shape.resize(100, 30);
                }

                if (node.Id === 3) {
                    shape.prop('fillColor', ['blue'])
                }

                shape.setText(node.Name)

                if (node.Title) { shape.setTitle(node.Title) }
                // if (node.Attributes) { shape.setCSSClasses(node.Attributes); }
                shape.setCSSClasses(node.Attributes)
                elements.push(shape)
            })
        }

        if (connections) {
            $.each(connections, function (index, connection) {
                var link = new Link().connect(connection.StartComponentId, connection.EndComponentId)

                if (connection.Title) { link.setTitle(connection.Title) }

                link.setLinkId(connection.Id)
                links.push(link)
            })
        }
        console.log('buildGraph', links)
        // Links must be added after all the elements. This is because when the links
        // are added to the graph, link source/target
        // elements must be in the graph already.
        return elements.concat(links)
    }

    })

    var LinkControls = joint.mvc.View.extend({

    highlighter: {
        name: 'stroke',
        options: {
            attrs: {
                'stroke': 'lightcoral',
                'stroke-width': 4
            }
        }
    },

    events: {
        change: 'updateLink',
        input: 'updateLink'
    },

    init: function () {
        this.highlight()
        this.updateControls()
    },

    onRemove: function () {
        this.unhighlight()
    },

    highlight: function () {
        // console.log('highlited');
        // cellView.highlight();
        this.options.cellView.highlight('rect', { highlighter: this.highlighter })
    },

    unhighlight: function () {
        this.options.cellView.unhighlight('rect', { highlighter: this.highlighter })
    }

    }, {

    remove: function () {
        if (this.instance) {
            this.instance.remove()
            this.instance = null
        }
    },

    refresh: function () {
        if (this.instance) {
            this.instance.unhighlight()
            this.instance.highlight()
        }
    },

    instance: null,

    template: ''// document.getElementById('link-controls-template').content

    })

class JointComponent extends React.Component {
    componentDidMount () {
      this.controls = new LayoutControls({
        paper: new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.placeholder),
            gridSize: 1,
            height: 362,
            width: 400
        }),
        nodes: nodeArray,
        connections: linkArray
      }).on({
          'layout': LinkControls.refresh
      }, LinkControls)

      this.controls.layout()
    }
    render () {
      return (
        <div id='playground' className={styles.paper} ref='placeholder' />
      )
    }
}
export default JointComponent

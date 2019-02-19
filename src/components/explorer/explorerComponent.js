import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import DataModel from '../../containers/dataModel/dataModelContainer'
import AsyncSelect from 'react-select/lib/Async'
import debounce from 'lodash/debounce'
import PptxGenJS from 'pptxgenjs'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

var divStyle = {
    'overflowY': 'scroll',
    'overflowX': 'scroll',
    'border': '1px solid #000000'
}
console.log('PptxGenJS', PptxGenJS)
export default function Explorer (props) {
  let searchTextBox = ''
  let userName = ''
  let email = ''
  let modelRelationshipData = props.filterSettings.modelRelationshipData
  let startNode = props.filterSettings.startNode
  let filterList = ''
  let componentRelationships = props.componentRelationships
  let componentOptions = []
  console.log(props, searchTextBox, userName, email)
  let loadOptions = (inputValue, callback) => {
    console.log('inputValue', inputValue)
    let payload = {
      'search': inputValue,
      'page_size': 10,
      'page': 1,
      'recommended': true
    }
    props.fetchComponents && props.fetchComponents(payload)
    console.log(callback)
    // props.setCallback(callback)
    setTimeout(() => {
      callback(componentOptions)
    }, 1000)
  }
  let handleInputChange = debounce((event) => {
    console.log('debounce', event)
    return function (newValue: any, actionMeta: any) {
      const inputValue = newValue.replace(/\W/g, '')
      console.log('enter input change', inputValue)
      return inputValue
    }
  }, 500)
  let handleCheckbox = function (value, data, index) {
    console.log('value:', value)
    console.log('data:', data)
    console.log(`index: ${index}`)
    let filterSettings = JSON.parse(JSON.stringify(props.filterSettings))
    data.isChecked = value
    filterSettings.filters[index] = data
    filterSettings.setRelationshipData = true
    props.setFilterSettings(filterSettings)
  }
  let handleComponentSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let payload = {
        'componentTypeComponentId': newValue.id
      }
      props.fetchcomponentTypeComponentRelationships && props.fetchcomponentTypeComponentRelationships(payload)
      console.log('selected value', newValue)
      let startNode = {}
      startNode.name = newValue.name.trim()
      startNode.title = newValue.name.trim()
      let filterSettings = {...props.filterSettings, 'selectedOption': newValue, 'modelRelationshipData': [], filters: [], 'startNode': startNode}
      props.setFilterSettings(filterSettings)
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
    }
    if (actionMeta.action === 'clear') {
      let filterSettings = {...props.filterSettings, 'selectedOption': null, 'modelRelationshipData': [], filters: [], 'startNode': {}}
      props.setFilterSettings(filterSettings)
    }
  }
  let openPPTModal = function () {
    let modalSettings = {...props.modalSettings, 'isPPTModalOpen': true, 'enterFileName': ''}
    props.setModalSetting(modalSettings)
  }
  let handleInputName = function (event) {
    let value = event.target.value
    if (value.trim() !== '') {
      let modalSettings = {...props.modalSettings, 'enterFileName': value, 'exportValidationClass': 'form-group m-form__group row'}
      props.setModalSetting(modalSettings)
    } else {
      let modalSettings = {...props.modalSettings, 'enterFileName': value}
      props.setModalSetting(modalSettings)
    }
  }
  let closeModal = function () {
    let modalSettings = {...props.modalSettings, 'isPPTModalOpen': false}
    props.setModalSetting(modalSettings)
  }
  let generatePPT = function () {
    let fileName = props.modalSettings.enterFileName
    if (fileName.trim() === '') {
      let modalSettings = {...props.modalSettings, 'exportValidationClass': 'form-group m-form__group row has-danger'}
      props.setModalSetting(modalSettings)
    } else {
      let ref = {
        x: 0,
        y: 0
      }
      let filterList = []
      let quadWidth = 7
      let quadHeight = 5
      let horizontalGap = 0.1
      let quadA = {
        x: ref.x + 0.3,
        y: ref.y + 0.3
      }
      let quadB = {
        x: quadA.x + horizontalGap + quadWidth,
        y: quadA.y
      }
      let pptx = new PptxGenJS()
      let slide = pptx.addNewSlide('TITLE_SLIDE', {bkgd: 'FFFCCC'})
      slide.back = 'F1F1F1'
      slide.addShape(pptx.shapes.RECTANGLE, { x: quadA.x, y: quadA.y, w: quadWidth, h: quadHeight, line: '363636' })
      slide.addShape(pptx.shapes.RECTANGLE, { x: quadB.x, y: quadB.y, w: 2, h: quadHeight, line: '363636' })
      filterList.push({ text: 'FILTERS', options: { fontSize: 14, bullet: false, color: '363636', bold: true } })
      if (props.filterSettings.filters.length > 0) {
        let notChecked = 0
        props.filterSettings.filters.forEach(function (data, index) {
          if (data.isChecked) {
            filterList.push({ text: data.displayText + ' (' + data.data.length + ')', options: { fontSize: 8, bullet: true, color: '363636', indentLevel: 1 } })
          } else {
            notChecked++
          }
          if (notChecked === props.filterSettings.filters.length) {
            filterList.push({ text: 'no filter selected', options: { fontSize: 8, bullet: true, color: '363636', indentLevel: 1 } })
          }
        })
      } else {
        filterList.push({ text: 'no data to display', options: { fontSize: 8, bullet: true, color: '363636', indentLevel: 1 } })
      }
      slide.addText(filterList, { x: quadB.x + 0.1, y: 0, w: 2 - 0.2, h: quadHeight - 1, margin: 0.1 })
      let img = new Image()
      let svgString = new XMLSerializer().serializeToString(document.getElementById('diagramLayout'))
      let svgData = 'data:image/svg+xml;base64,' + window.btoa(svgString)
      // console.log('svgData', svgData, typeof svgData)
      img.src = svgData
      let canvas = document.createElement('canvas')
      canvas.width = 900
      canvas.height = 700
      let ctx = canvas.getContext('2d')
      let pngData = ''
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        pngData = canvas.toDataURL('image/png', 1.0)
        // console.log('pngData', pngData, typeof pngData)
        pngData = pngData.substring(5)
        slide.addImage({ data: pngData, x: quadA.x + 0.2, y: quadA.y + 0.2, w: quadWidth - 0.4, h: quadHeight - 0.4 })
        pptx.save(fileName)
        closeModal()
      }
    }
  }
  if (props.components && props.components !== '') {
    if (props.components.error_code === null) {
      componentOptions = props.components.resources.map(function (component, index) {
        component.value = component.id
        component.label = component.name
        return component
      })
      // console.log('call', props.callback)
      // if (props.callback) {
      //   console.log('call callback', componentOptions)
      //   props.callback(componentOptions)
      // }
    } else {}
  }
  if (componentRelationships !== '') {
    console.log(modelRelationshipData)
    // startNode.name = 'ABACUS Desktop Client v5.2'
    // startNode.title = 'ABACUS Desktop Client v5.2'
    if (componentRelationships.resources.length > 0) {
      var allGroup = _.chain(componentRelationships.resources)
      .groupBy('relationship_type')
      .mapValues(relationshipTypeGroup => _.groupBy(relationshipTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
      .value()
      console.log('allGroup', allGroup)
    }
  }
  if (props.filterSettings.filters.length > 0) {
    filterList = props.filterSettings.filters.map(function (data, index) {
      return (<label key={index} htmlFor='filter' className=''>
        <input type='checkbox' checked={data.isChecked} onChange={(event) => { handleCheckbox(event.target.checked, data, index) }} className='' />{data.displayText + ' (' + data.data.length + ')'}
        <span className='m-list-search__result-item-text' />
      </label>)
    })
  }
    return (
      <div>
        <div id='tasksList'>
          {/* The table structure begins */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                    <div className='row' style={{'marginBottom': '20px'}}>
                      <div className='col-sm-12 col-md-6'>
                        <div className='' id='m_table_1_length' style={{'display': 'flex'}}>
                          <h5 style={{'margin': '8px'}}>Select</h5>
                          {/* <Select
                            className='col-7 input-sm m-input'
                            placeholder='Enter Component Name'
                            isClearable
                            // defaultValue={dvalue}
                            // value={props.userActionSettings.selectedUser}
                            onChange={handleComponentSelect}
                            isSearchable
                            name={'component'}
                            options={componentOptions}
                          /> */}
                          <AsyncSelect
                            isClearable
                            className='col-7 input-sm m-input'
                            placeholder='Enter Component Name'
                            cacheOptions
                            loadOptions={loadOptions}
                            onChange={handleComponentSelect}
                            // defaultOptions={componentOptions}
                            defaultOptions
                            onInputChange={handleInputChange}
                          />
                        </div>
                      </div>
                      {props.filterSettings.selectedOption && (<div className='col-sm-12 col-md-6 float-left'>
                        <span className={'pull-right '}>
                          <button onClick={openPPTModal} type='button' className={'btn btn-secondary m-btn m-btn--custom m-btn--label-info '}>Generate PPTX</button>
                        </span>
                      </div>)}
                    </div>
                  </div>
                  <br />
                  <div className='row' style={{position: 'relative', overflow: 'auto', width: '100%'}}>
                    <div className='col-md-9 col-sm-12'>
                      <div style={divStyle}>
                        <DataModel startNode={startNode} onUse={'ExplorerPage'} relationships={modelRelationshipData} />
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-12'>
                      <div className='m-demo'>
                        <div className='m-demo__preview'>
                          <div className='m-list-search'>
                            <div className='m-list-search__results'>
                              <span className='m-list-search__result-category m-list-search__result-category--first'>Filter</span>
                              {/* <div className='m-list-search__result-item'>
                                <div className='m-checkbox-list'>
                                  <label role='checkbox' aria-checked='false' htmlFor='filter' className='m-checkbox' onClick={alert('hi')} onKeyDown={alert('hi')}>
                                    <input type='checkbox' className='' />Annual finance report
                                    <span className='m-list-search__result-item-text' />
                                  </label>
                                  <label htmlFor='filter' className='m-checkbox'>
                                    <input type='checkbox' className='' />Annual finance report
                                    <span className='m-list-search__result-item-text' />
                                  </label>
                                  <label htmlFor='filter' className='m-checkbox'>
                                    <input type='checkbox' className='' />Annual finance report
                                    <span className='m-list-search__result-item-text' />
                                  </label>
                                </div>
                              </div> */}
                              <div className='m-list-search__result-item'>
                                {filterList}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReactModal isOpen={props.modalSettings.isPPTModalOpen}
            onRequestClose={closeModal}
            className='modal-dialog'
            style={{'content': {'top': '20%'}}}
            >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={''}>
              <div className=''>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Generate Slide</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='col-md-12 m-form m-form--state m-form--fit'>
                      {/* {messageBlock} */}
                      <div className={props.modalSettings.exportValidationClass}>
                        <label htmlFor='example-email-input' className='col-4 col-form-label'>Capture File Name</label>
                        <input className='col-8 form-control m-input' value={props.modalSettings.enterFileName} onChange={handleInputName} type='text' placeholder='Enter Filename' id='example-userName-input' />
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                    <button onClick={generatePPT} className='btn btn-outline-info btn-sm' >Generate</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
        {/* <img alt='tt' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJkaWFncmFtTGF5b3V0IiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjcwMCIgZGlzcGxheT0iYmxvY2siPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwLDIwKSI+PGcgY2xhc3M9ImxpbmtzIj48dGl0bGUvPjwvZz48ZyBjbGFzcz0ibGlua3MiPjx0aXRsZS8+PC9nPjxwYXRoIGNsYXNzPSJlZGdlcGF0aCIgZmlsbC1vcGFjaXR5PSIwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yIiBpZD0iZWRnZXBhdGgwIiBtYXJrZXItZW5kPSJ1cmwoI2VuZCkiIG1hcmtlci1zdGFydD0iIiBkPSJNNDAwLDQ1MEwyMDkuMDkwOTA5MDkwOTA5MSwzMCIvPjxwYXRoIGNsYXNzPSJlZGdlcGF0aCIgZmlsbC1vcGFjaXR5PSIwIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yIiBpZD0iZWRnZXBhdGgxIiBtYXJrZXItZW5kPSJ1cmwoI2VuZCkiIG1hcmtlci1zdGFydD0iIiBkPSJNNDAwLDQ1MEw3ODAsMzA3LjUiLz48dGV4dCBjbGFzcz0iZWRnZWxhYmVsIiBpZD0iZWRnZWxhYmVsMCIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiMwMDAiIHN0eWxlPSJwb2ludGVyLWV2ZW50czogbm9uZTsiPjx0ZXh0UGF0aCB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeGxpbms6aHJlZj0iI2VkZ2VwYXRoMCIgc3RhcnRPZmZzZXQ9IjUwJSIgc3R5bGU9InRleHQtYW5jaG9yOiBtaWRkbGU7IHBvaW50ZXItZXZlbnRzOiBub25lOyI+SXMgQ2hpbGQgT2Y8L3RleHRQYXRoPjwvdGV4dD48dGV4dCBjbGFzcz0iZWRnZWxhYmVsIiBpZD0iZWRnZWxhYmVsMSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiMwMDAiIHN0eWxlPSJwb2ludGVyLWV2ZW50czogbm9uZTsiPjx0ZXh0UGF0aCB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeGxpbms6aHJlZj0iI2VkZ2VwYXRoMSIgc3RhcnRPZmZzZXQ9IjUwJSIgc3R5bGU9InRleHQtYW5jaG9yOiBtaWRkbGU7IHBvaW50ZXItZXZlbnRzOiBub25lOyI+VGFyZ2V0PC90ZXh0UGF0aD48L3RleHQ+PGRlZnM+PG1hcmtlciBpZD0iZW5kIiB2aWV3Qm94PSIwIC01IDEwIDEwIiByZWZYPSI5IiByZWZZPSIwIiBtYXJrZXJXaWR0aD0iMTAiIG1hcmtlckhlaWdodD0iMTAiIG9yaWVudD0iYXV0byIgc3Ryb2tlPSIjMDAwIiBmaWxsPSIjMDAwIj48cGF0aCBkPSJNMCwtNUwxMCwwTDAsNSIgc3R5bGU9InN0cm9rZS13aWR0aDogMC4xcHg7Ii8+PC9tYXJrZXI+PC9kZWZzPjxkZWZzPjxtYXJrZXIgaWQ9ImVuZCIgdmlld0JveD0iMCAtNSAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iMCIgbWFya2VyV2lkdGg9IjEwIiBtYXJrZXJIZWlnaHQ9IjEwIiBvcmllbnQ9ImF1dG8iIHN0cm9rZT0iIzAwMCIgZmlsbD0iIzAwMCI+PHBhdGggZD0iTTAsLTVMMTAsMEwwLDUiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDAuMXB4OyIvPjwvbWFya2VyPjwvZGVmcz48ZyBjbGFzcz0ibm9kZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAwLDQ1MCkiPjxyZWN0IHg9Ii0yMCIgeT0iLTIwIiByeD0iMTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iNzAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIi8+PHRpdGxlLz48dGV4dCB4PSI1MCIgeT0iMTUiIGR5PSIwLjI1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj48dHNwYW4geD0iNTAiIHk9IjUiIGR5PSIwZW0iLz48dHNwYW4geD0iNTAiIHk9IjUiIGR5PSIxLjFlbSI+dGNlbmgwNDA8L3RzcGFuPjwvdGV4dD48L2c+PGcgY2xhc3M9Im5vZGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCwxMCkiPjxyZWN0IHg9Ii0yMCIgeT0iLTIwIiByeD0iMTAiIHdpZHRoPSI5MCIgaGVpZ2h0PSI0NSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiLz48dGl0bGUvPjx0ZXh0IHg9IjI1IiB5PSIyLjUiIGR5PSIwLjI1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj48dHNwYW4geD0iMjUiIHk9Ii0xNy41IiBkeT0iMGVtIj5IUDwvdHNwYW4+PHRzcGFuIHg9IjI1IiB5PSItMTcuNSIgZHk9IjEuMWVtIj5TdXBlcmRvbWU8L3RzcGFuPjx0c3BhbiB4PSIyNSIgeT0iLTE3LjUiIGR5PSIyLjJlbSI+UEE4OTAwPC90c3Bhbj48dHNwYW4geD0iMjUiIHk9Ii0xNy41IiBkeT0iMy4zMDAwMDAwMDAwMDAwMDAzZW0iPkNlbnR1cmlvbjwvdHNwYW4+PC90ZXh0PjwvZz48ZyBjbGFzcz0ibm9kZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODAwLDMwMCkiPjxyZWN0IHg9Ii0yMCIgeT0iLTIwIiByeD0iMTAiIHdpZHRoPSI5MCIgaGVpZ2h0PSI0NSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiLz48dGl0bGUvPjx0ZXh0IHg9IjI1IiB5PSIyLjUiIGR5PSIwLjI1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj48dHNwYW4geD0iMjUiIHk9Ii0xNy41IiBkeT0iMGVtIj5IUDwvdHNwYW4+PHRzcGFuIHg9IjI1IiB5PSItMTcuNSIgZHk9IjEuMWVtIj5TdXBlcmRvbWU8L3RzcGFuPjx0c3BhbiB4PSIyNSIgeT0iLTE3LjUiIGR5PSIyLjJlbSI+UEE4OTAwPC90c3Bhbj48dHNwYW4geD0iMjUiIHk9Ii0xNy41IiBkeT0iMy4zMDAwMDAwMDAwMDAwMDAzZW0iPkNlbnR1cmlvbjwvdHNwYW4+PC90ZXh0PjwvZz48L2c+PC9zdmc+' />
        <img alt='tt' src='image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAU0klEQVR4Xu2dB7BUxbaGf4yYE1oqBp6KGDAHvOaEIuaMAcWMmDCjYuSWoohiwKxPqVIx5/RUgjnnhDmhohctMWAAefW1s3HgHs45nJm9Z3bvv6tu3eHM3h2+7vntXr1Wdys5mYAJmEBOCLTKST1dTRMwAROQBcuDwARMIDcELFi56SpX1ARMwILlMWACJpAbAhas3HSVK2oCUxCYW9KKkp4t++v/SJpZ0geSOkmarfTdTJLekvR13hlasPLeg65/UQksL+l2SStLmliC0ENSW0mDJH0s6VxJ/5HURtJASR0lvZ1nYBasPPee615kAu0lXSVpU0mTSiB2ltRO0mBJr0taRdJvpe/2lbSQpAF5hmbBynPvue61JDCjpFUlLSVpSUlzZlyZ+SUdIemVUrkTJCFiLBFfldRL0t2SxktqLWl3SUMlfZlxPcdJ+qI043utbDbYompYsFqEzS8VmMAiki6W1FXS7AXm0JKm/yrpAUlHtdSeZsFqCXa/U1QCh5SWVHMVFUCV2v2TpOMlXTm9+VmwppeYny8igXkl3SypS9L4Vq1aabHFFtNyyy2nFVZYQfPOyyPZpbFjx+q2227TIYccIupCeuONN/Tzzz9r7bXX1hVXXKEDDjhAs82WbBRmV7fykqjnqFGj9N577+mLL1gZTpEeltRN0o/NrZ0Fq7mk/FxRCeAmMFLSvxIASy+9tO644w6tsgo27dqkDz74IAjSiBEjNMMMM4RK3Hzzzfrqq6902GGHqVOnTuG7+eabrzYVbKDU119/XTvvvLM++uij8m+HS+rcXNuWBatuutMVqVMC2Kswboe077776rLLLtPss9t81ZL++vXXX7Xffvvp1ltvLX/9Ikm9m5OfBas5lPxMUQngiIkTJjuC2nPPPXXjjTcWlUVV2w1LZoSlhB/ZsqWdxEbLsWBVtRucWWQEhkjqTpsWWWSRYIeZe24czJ0qJTBu3Di1b99e3377bZIVrPEVs2A1BcHfm0ADBJhVfS8pKNTw4cO18cYbVwxqwoQJeuihh/Taa6+FH2zXrl1TF0HE4a233tK6665bcf2rmQEcaH8pYXhfoClblmdY1ewB5xUTgS0kPUKD2rVrp08++aTitk2aNEn777+/Fl98cXXu3Fkvv/yyzjnnHGGMXnjhhSvOf1oZYOTebrvtwi7ijDOG1W3dJNh+9tlnSX02kzSsscpZsOqm61yROiOAEfhC6rTlllvq4YfZga8s/fLLL2Fp+emnn2r++XFUV3BNWHXVVfXuu+8GN4nVV19dH374oZ566intscceOvLII8Oz/fv31wknnKCzzjpLs846q+666y7ttNNOWmuttXTDDTdo+eWX17nnnitE8ZlnntFNN92k3r1767777tOmm24qyr777rs1evRobbPNNkG8eP7YY48N7gZ8HjNmjL788kudcsopOu200/TNN9+EejATfPPNN7XDDjvou+++C7anrbfeujIYpbcR7sceeyzJC4dSNjmmmSxYVcHuTCIk0FdSP9p1xBFH6OKLG/0dNav5iMlJJ50UxOHwww8PyyGWmfhKIToIA8u2t99+W/fff394Bp+qvfbaS0cffbS6d+8exGbFFVfU3nvvreeff14ff/yxtt9+e73//vth9jZx4kSdf/75GjhwoOacc04dd9xxQeSYZd1+++1af/31deaZZ2qTTTYJooNrBKLH3xEnhOnQQw8Nn7HZDR06VJdeeqmWXHLJUF6bNm20zjrrhGXtsstiJ68s9erVS5dffnmSyUmS+luwKmPqt4tJ4AxJp9P0008/XWecwT+rk9555x098cQTGjBgQJixIFDDhg2bLFjMtu69914dddRRwdfrhRde0DzzzBNmXgcddJB222238DdmYH/99Vf4G8tK/K8uuOCCICrrrbeeHnnkkeCHxXKW2RGuBLz76quvBt8tBKlPnz46++yzdcsttwQhowzay24onxFDxHTHHXfUVVddFZaUCOB5551XFZsYXCm3lPjQKGjPsKozBp1LfASqLlgst4YMGaKTTz55Mi1mW/h0sfvYoUOHMHtJZliJYL344ovh+0SwcApFqNZcc83w/4gPsyWeRwRnmWWW4IFPPsl7OGwiWD179gziiHc831955ZVhRoVAnnjiiWFpyvKXGR3OqbvssksQtEsuuSQI459//hnqvuGGG2rRRRetuNctWBUjdAYmEAhUXbCwFS2xxBJihoXN6ffffw+zIgzi33//fRARHFOxW7E8RCDWWGONEGazwQYbBAM9sydsWszQLrroIrEDyHdPPvmkjjnmmDDz4fvdd989OGh26dIlzJ4GDx4chGi11VbT448/HuxlLE/btm2rzTbb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' /> */}
      </div>
      )
    }
Explorer.propTypes = {
  components: PropTypes.any,
  filterSettings: PropTypes.any,
  // callback: PropTypes.any,
  modalSettings: PropTypes.any,
  componentRelationships: PropTypes.any
}

import {createAction, handleActions} from 'redux-actions'
// import {
//   FETCH_TEMPLATES_SUCCESS,
//   CREATE_TEMPLATES_SUCCESS
// } from '../../sagas/template/templateSaga'
// Name Spaced Action Types
// const SET_CURRENT_PAGE = 'templatesReducer/SET_CURRENT_PAGE'
const SET_MODAL_OPEN_STATUS = 'viewServiceReducer/SET_MODAL_OPEN_STATUS'
// const RESET_RESPONSE = 'templatesReducer/RESET_RESPONSE'
// const SET_PER_PAGE = 'templatesReducer/SET_PER_PAGE'

export const actions = {
    SET_MODAL_OPEN_STATUS
}

export const actionCreators = {
//   setCurrentPage: createAction(SET_CURRENT_PAGE),
  setModalOpenStatus: createAction(SET_MODAL_OPEN_STATUS)
//   resetResponse: createAction(RESET_RESPONSE),
//   setPerPage: createAction(SET_PER_PAGE)
}

export const initialState = {
//   templates: '',
//   currentPage: 1,
//   perPage: 10,
//   createTemplateResponse: '',
//   addReviewSettings: {
    isModalOpen: false
//     templateSelected: null
//   }
}

export default handleActions(
  {
    // [SET_CURRENT_PAGE]: (state, action) => ({
    //   ...state,
    //   currentPage: action.payload
    // }),
    // [SET_PER_PAGE]: (state, action) => ({
    //   ...state,
    //   perPage: action.payload
    // }),
    [SET_MODAL_OPEN_STATUS]: (state, action) => ({
      ...state,
      isModalOpen: action.payload
    })
    // [FETCH_TEMPLATES_SUCCESS]: (state, action) => ({
    //   ...state,
    //   templates: action.payload
    // }),
    // [CREATE_TEMPLATES_SUCCESS]: (state, action) => ({
    //   ...state,
    //   createTemplateResponse: action.payload
    // }),
    // [RESET_RESPONSE]: (state, action) => ({
    //   ...state,
    //   createTemplateResponse: ''
    // })
  },
  initialState
)

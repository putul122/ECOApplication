import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import loginReducer from './loginReducer/loginReducerReducer'
import registerProcessReducer from './registerProcessReducer/registerProcessReducerReducer'
import componentTypeReducer from './componentTypeReducer/componentTypeReducerReducer'
import applicationDetailReducer from './applicationDetailReducer/applicationDetailReducerReducer'
import applicationActivityReducer from './applicationActivityReducer/applicationActivityReducerReducer'
import componentTypeComponentReducer from './componentTypeComponentReducer/componentTypeComponentReducerReducer'
import signUpReducer from './signUpReducer/signUpReducerReducer'
import discussionReducer from './discussionReducer/discussionReducerReducer'
import newDiscussionReducer from './newDiscussionReducer/newDiscussionReducerReducer'
import tasksReducer from './tasksReducer/tasksReducerReducer'
import explorerReducer from './explorerReducer/explorerReducerReducer'
import usersReducer from './usersReducer/usersReducerReducer'
import sheetsReducer from './sheetsReducer/sheetsReducerReducer'
import slaReducer from './slaDashboardReducer/slaDashboardReducerReducer'
import changePasswordReducer from './changePasswordReducer/changePasswordReducerReducer'
import componentModalViewReducer from './componentModalViewReducer/componentModalViewReducerReducer'
import dataModelReducer from './dataModelReducer/dataModelReducerReducer'
import viewServiceReducer from './viewServiceReducer/viewServiceReducerReducer'
import serviceDashboardReducer from './serviceDashboardReducer/serviceDashboardReducerReducer'
import perspectivesReducer from './perspectivesReducer/perspectivesReducerReducer'
import perspectiveHierarchyReducer from './perspectiveHierarchy/perspectiveHierarchyReducer'
import rolesReducer from './rolesReducer/rolesReducerReducer'
import editRolesReducer from './editRolesReducer/editRolesReducerReducer'
import dataReducer from './data/dataReducer'
import penaltyReducer from './penaltyDashboardReducer/penaltyDashboardReducerReducer'
import perspectiveExclusionReducer from './perspectiveExclusion/perspectiveExclusionReducer'
import mxGraphReducer from './mxGraphReducer/mxGraphReducerReducer'
import balancedScorecardReducer from './balancedScorecard/balancedScorecardReducer'

export default combineReducers({
    basicReducer,
    loginReducer,
    registerProcessReducer,
    componentTypeReducer,
    applicationDetailReducer,
    applicationActivityReducer,
    componentTypeComponentReducer,
    signUpReducer,
    discussionReducer,
    newDiscussionReducer,
    tasksReducer,
    explorerReducer,
    usersReducer,
    sheetsReducer,
    changePasswordReducer,
    componentModalViewReducer,
    dataModelReducer,
    viewServiceReducer,
    serviceDashboardReducer,
    perspectivesReducer,
    rolesReducer,
    editRolesReducer,
    perspectiveHierarchyReducer,
    slaReducer,
    dataReducer,
    penaltyReducer,
    perspectiveExclusionReducer,
    balancedScorecardReducer,
    mxGraphReducer
})

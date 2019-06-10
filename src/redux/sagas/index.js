import watchBasic, {actionCreators as basicActions} from './basic/basicSaga'
import watchLoginUser, {actionCreators as loginActions} from './login/loginSaga'
import watchCreateUser, {actionCreators as signUpActions} from './signUp/signUpSaga'
import watchRegisterProcess, {actionCreators as registerProcessActions} from './registerProcess/registerProcessSaga'
import watchComponentType, {actionCreators as componentTypeActions} from './componentType/componentTypeSaga'
import watchApplicationDetail, {actionCreators as applicationDetailActions} from './applicationDetail/applicationDetailSaga'
import watchApplicationActivity, {actionCreators as applicationActivityActions} from './applicationActivity/applicationActivitySaga'
import watchComponentTypeComponent, {actionCreators as componentTypeComponentActions} from './componentTypeComponent/componentTypeComponentSaga'
import watchDiscussions, {actionCreators as discussionActions} from './discussion/discussionSaga'
import watchUserActions, {actionCreators as userActions} from './user/userSaga'
import watchSlaActions, {actionCreators as slaActions} from './slaDashboard/slaDashboardSaga'
import watchAgreementScoringActions, {actionCreators as agreementScoringActions} from './agreementScoring/agreementScoringSaga'
import watchPenaltyScoreCardActions, {actionCreators as scoreCardActions} from './penaltyScoreCard/penaltyScoreCardSaga'
import watchPenaltyActions, {actionCreators as penaltyActions} from './penaltyDashboard/penaltyDashboardSaga'
import watchModelActivity, {actionCreators as modelActions} from './model/modelSaga'
import watchComponentModalView, {actionCreators as componentModalViewActions} from './componentModalView/componentModalViewSaga'
import watchServices, {actionCreators as serviceActions} from './service/serviceSaga'
import watchRoles, {actionCreators as rolesActions} from './roles/rolesSaga'
import watchMxGraph, {actionCreators as mxGraphActions} from './mxGraph/mxGraphSaga'

export const actions = {
  basicActions,
  loginActions,
  signUpActions,
  registerProcessActions,
  componentTypeActions,
  applicationDetailActions,
  applicationActivityActions,
  componentTypeComponentActions,
  discussionActions,
  userActions,
  slaActions,
  agreementScoringActions,
  penaltyActions,
  scoreCardActions,
  rolesActions,
  modelActions,
  componentModalViewActions,
  serviceActions,
  mxGraphActions
}
export default function * rootSaga () {
  yield [
    watchBasic(),
    watchCreateUser(),
    watchLoginUser(),
    watchRegisterProcess(),
    watchComponentType(),
    watchApplicationDetail(),
    watchApplicationActivity(),
    watchComponentTypeComponent(),
    watchDiscussions(),
    watchPenaltyScoreCardActions(),
    watchUserActions(),
    watchPenaltyActions(),
    watchSlaActions(),
    watchAgreementScoringActions(),
    watchModelActivity(),
    watchComponentModalView(),
    watchServices(),
    watchRoles(),
    watchMxGraph()
  ]
}

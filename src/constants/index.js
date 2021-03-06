const api = {
  getComponentTypes:
    'https://ecoconductor-dev-api-model.azurewebsites.net/component_types',
  clientAccessToken:
    'https://ecoconductor-dev-api-discovery.azurewebsites.net/client_access_token',
  createUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/users',
  loginUser:
    'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
  authenticateUser:
    'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
  registerProcess:
    'https://ecoconductor-dev-api-notification.azurewebsites.net/processes',
  metaModelPerpestives:
    'https://model-eco-dev.ecoconductor.com/meta_model_perspectives/72?view_key=AgreementScoring_AgreementDashboardFilter&min=1',
  modelperspectives:
    'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=72&view_key[0]=AgreementScoring_AgreementDashboardFilter&min=1',
  scoringMetaModelPerpestives:
    'https://model-eco-dev.ecoconductor.com/meta_model_perspectives/72?view_key=AgreementScoring_ScoringGrid&min=1',
  scoringModelperspectives: function (filter) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=72&view_key[0]=AgreementScoring_ScoringGrid&min=1&filter[0]=' + filter
  },
  penaltySummaryModelperspectives: function (filter) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=72&view_key[0]=AgreementScoring_PenaltySummaryGrid&min=1&filter[0]=' + filter
  },
  penaltyModelperspectives: function (filter) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=72&view_key[0]=AgreementScoring_PenaltyGrid&min=1&filter[0]=' + filter
  },
  currentPerformanceModelperspectives: function (filter) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=72&view_key[0]=AgreementScoring_CurrentPerformanceDashboard&min=1&filter[0]=' + filter
  },
  slaBarchart: function (filter) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=15&view_key[0]=ContractsList_VendorComparison&filter[0]=' + filter
  },
  penaltyScoreCardApi:
    'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=63&view_key[0]=PenaltyScorecardList',
  penaltymetaModelPerpestives:
    'https://model-eco-dev.ecoconductor.com/meta_model_perspectives/15?view_key=ContractsList_PenaltyDashboard',
  penaltymodelperspectives:
    'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=15&view_key[0]=ContractsList_PenaltyDashboard',
  getUser: function (userId) {
    return 'https://account-eco-dev.ecoconductor.com/users/' + userId
  },
  getDropDownItemsDep: function (userId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + userId + '/components'
  },
  getDropDownItemsSer: function (userId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + userId + '/components'
  },
  getDropDownItemsSup: function (userId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + userId + '/components'
  },
  getDropDownItemsKpi: function (userId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + userId + '/components'
  },
  deleteUser: function (userId) {
    return 'https://account-eco-dev.ecoconductor.com/users/' + userId
  },
  getExternalUsers: 'https://account-eco-dev.ecoconductor.com/external_users',
  // getRoles: 'https://account-eco-dev.ecoconductor.com/roles',
  getActivityMessage: function () {
    return 'https://ecoconductor-dev-api-notification.azurewebsites.net/messages'
  },
  getComponentById: function (componentTypeId) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' +
      componentTypeId
    )
  },
  getComponentTypeConstraints: function (componentTypeId) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' +
      componentTypeId +
      '/constraints'
    )
  },
  getComponentTypeComponents: function (componentTypeId) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' +
      componentTypeId +
      '/components'
    )
  },
  getComponent: function (payload) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      payload.componentTypeComponentId
    )
  },
  getComponents:
    'https://ecoconductor-dev-api-model.azurewebsites.net/components',
  getComponentProperty: function (payload) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      payload.componentTypeComponentId +
      '/component_properties'
    )
  },
  getComponentRelationships: function (payload) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      payload.componentTypeComponentId +
      '/component_relationships'
    )
  },
  addComponent: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components'
  },
  getComponentConstraints: function (payload) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      payload.componentTypeComponentId +
      '/constraints'
    )
  },
  updateComponentRelationships: function (payload) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      payload.componentId +
      '/component_relationships'
    )
  },
  updateComponentProperties: function (payload) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      payload.componentId +
      '/component_properties'
    )
  },
  updateComponent: function (payload) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      payload.componentId
    )
  },
  deleteComponent: function (componentTypeId) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      componentTypeId
    )
  },
  viewComponentRelationship: function (payload) {
    if (payload.relationshipType === 'Parent') {
      return (
        'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
        payload.componentId +
        '/component_relationships/' +
        payload.relationshipId +
        '?parent=true'
      )
    } else if (payload.relationshipType === 'Child') {
      return (
        'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
        payload.componentId +
        '/component_relationships/' +
        payload.relationshipId +
        '?child=true'
      )
    } else {
      return (
        'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
        payload.componentId +
        '/component_relationships/' +
        payload.relationshipId
      )
    }
  },
  deleteRelationship: function (payload) {
    return (
      'https://ecoconductor-dev-api-model.azurewebsites.net/components/' +
      payload.componentId +
      '/component_relationships/' +
      payload.relationshipId
    )
  },
  getDiscussions:
    'https://ecoconductor-dev-api-notification.azurewebsites.net/discussions',
  getDiscussionMessages: function (id) {
    return (
      'https://ecoconductor-dev-api-notification.azurewebsites.net/discussions/' +
      id +
      '/messages'
    )
  },
  getAccountArtefacts: 'https://account-eco-dev.ecoconductor.com/artefacts',
  getModelArtefacts: 'https://model-eco-dev.ecoconductor.com/artefacts',
  updateNotificationViewStatus:
    'https://notification-eco-dev.ecoconductor.com/notification_view_status',
  createDiscussion: 'https://notification-eco-dev.ecoconductor.com/discussions',
  getModelPerspective: function (subjectId) {
    return (
      'https://model-eco-dev.ecoconductor.com/model_perspectives/' +
      subjectId
    )
  },
  getModelPerspectives:
    'https://model-eco-dev.ecoconductor.com/model_perspectives',
  updateModelPerspectives: function (metaModelPerspectiveId) {
    return (
      'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id=' +
      metaModelPerspectiveId
    )
  },
  getMetaModelPerspective: function (perspectiveId) {
    return (
      'https://model-eco-dev.ecoconductor.com/meta_model_perspectives/' +
      perspectiveId
    )
  },
  getMetaModelPerspectives:
    'https://ecoconductor-dev-api-model.azurewebsites.net/meta_model_perspectives',
  getAllModelPerspectives: function (payload) {
    return (
      'https://model-eco-dev.ecoconductor.com/model_perspectives?' + payload
    )
  },
  forgotPassword: 'https://account-eco-dev.ecoconductor.com/user_passwords',
  getRoles: 'https://account-eco-dev.ecoconductor.com/roles',
  createRole: 'https://account-eco-dev.ecoconductor.com/roles',
  deleteRole: function (roleId) {
    return 'https://account-eco-dev.ecoconductor.com/roles/' + roleId
  },
  getRole: function (roleId) {
    return 'https://account-eco-dev.ecoconductor.com/roles/' + roleId
  },
  updateRole: function (roleId) {
    return 'https://account-eco-dev.ecoconductor.com/roles/' + roleId
  },
  inviteUser: 'https://account-eco-dev.ecoconductor.com/user_invitations',
  iconURL: 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/',
  getPackage: 'https://model-eco-dev.ecoconductor.com/model_packages/ECO_SM',
  getSLAPackage: 'https://model-eco-dev.ecoconductor.com/model_packages/ECO_SLA',
  getAllPackages: 'https://ecoconductor-dev-api-model.azurewebsites.net/model_packages',
  perspectiveFilter: function (filter) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=15&view_key[0]=ContractsList_Compliance&filter[0]=' + filter
  },
  newPerspectiveFilter: function (filter) {
    return 'https://model-eco-dev.ecoconductor.com/model_perspectives?meta_model_perspective_id[0]=72&view_key[0]=AgreementScoring_DefaultDashboard&filter[0]=' + filter
  }
}

export default api

export const timeOut = {
  'duration': 14000
}

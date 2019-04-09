import React, { Component } from 'react'
import ReactModal from 'react-modal'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'

import styles from './usersComponent.scss'
ReactModal.setAppElement('#root')

class Users extends Component {
  state = {
    searchTerm: '',
    pageSize: 10,
    currentPage: 1,
    previousClass: '',
    nextClass: '',
    invitedEmail: '',
    totalPages: 1
  }

  userList = () => {
    const getUserResponse = this.props.getUserResponse
    console.log('asd', getUserResponse)
    return (
      this.props &&
      getUserResponse &&
      getUserResponse.resources.map((user, index) => {
        return (
          <tr key={index} className='table-tr'>
            <td className='table-td'>
              {user.first_name + ' ' + user.last_name}
            </td>
            <td className='table-td'>
              {user.email}
            </td>
            <td className='table-td'>
              {user.is_active ? <span className='activated'>Activated</span> : <span className='deactivated'>Deativated</span>
              }
            </td>
            <td className='table-td'>
              <div className='table-div'>
                <span className='dropdown butn'>
                  <button className='btn btn-secondary dropdown-toggle removecaret' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' >
                    <img src='/assets/gear.png' alt='gear' className='td-icons' />
                  </button>
                  <div className='dropdown-menu dropmenu' aria-labelledby='#dropdownMenuButton'>
                    {user.is_active ? <a onClick={e => this.removeUser(e, user.id)} className='dropdown-item anchor' href='javascript:void(0)'>Deactivate</a> : <a onClick={e => this.activateUser(e, user.email)} className='dropdown-item anchor' href='javascript:void(0)'>Activate</a>}
                  </div>
                </span>
                <span>
                  <button onClick={e => {
                    e.preventDefault()
                    this.removeUser(e, user.id)
                  }}
                    className='btn btn-secondary dropdown-toggle removecaret' type='button'>
                    <img src='/assets/rubbish-bin.png' alt='delete' className='td-icons' />
                  </button>
                </span>
              </div>
            </td>
          </tr>
        )
      })
    )
  }

  activateUser = (e, email) => {
    e.preventDefault()

    const password =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)

    this.props.createUser({
      email,
      password,
      client_id: this.props.client_id,
      client_secret: this.props.client_secret,
      pageSize: this.state.pageSize,
      currentPage: this.state.currentPage,
      searchTerm: this.state.searchTerm
    })
  }

  removeUser = (e, userId) => {
    e.preventDefault()

    const payload = {
      user_id: userId,
      pageSize: this.state.pageSize,
      currentPage: this.state.currentPage,
      searchTerm: this.state.searchTerm
    }
    this.props.deleteUser(payload)
  }

  handleInputChange = debounce(e => {
    this.fetchUsers(
      this.state.pageSize,
      this.state.currentPage,
      this.state.searchTerm
    )
  }, 500)

  pageSizeBlurHandler = async e => {
    console.log('Hello Blur')
  }

  pageSizeChangeHandler = async e => {
    await this.setState({
      pageSize: +e.target.value
    })
    this.fetchUsers(
      this.state.pageSize,
      this.state.currentPage,
      this.state.searchTerm
    )
  }

  pageSizeBlurHandler = () => {
    console.log('Handle Blur')
  }

  searchUsersClickHandler = () => {
    this.fetchUsers(
      this.state.pageSize,
      this.state.currentPage,
      this.state.searchTerm
    )
  }

  fetchUsersForGivenPageNumber = async (e, pageNumber, arrow = null) => {
    e.preventDefault()

    if (arrow === 'next') {
      await this.setState(prevState => {
        return { currentPage: prevState.currentPage + 1 }
      })
    } else if (arrow === 'prev') {
      await this.setState(prevState => {
        return { currentPage: prevState.currentPage - 1 }
      })
    } else if (arrow === 'end') {
      await this.setState(prevState => {
        return { currentPage: pageNumber }
      })
    } else if (arrow === 'start') {
      await this.setState(prevState => {
        return { currentPage: 1 }
      })
    } else {
      await this.setState({ currentPage: pageNumber })
    }

    this.fetchUsers(
      this.state.pageSize,
      this.state.currentPage,
      this.state.searchTerm
    )
  }

  fetchUsers = () => {
    const payload = {
      page_size: this.state.pageSize,
      page: this.state.currentPage,
      search: this.state.searchTerm
    }
    this.props.fetchUsers(payload)
  }

  inviteUserClickHandler = () => {
    this.props.openInviteUser()
    this.setState({ isInviteUserModalOpen: true })
  }

  closeInviteUserModal = () => {
    this.props.closeInviteUser()
    this.setState({ isInviteUserModalOpen: false })
  }

  inviteUserSubmitHandler = e => {
    e.preventDefault()
    const payload = {
      email: this.state.invitedEmail,
      accept_invitation_url: `${window.location.origin}/invite_user`
    }
    this.props.inviteUser(payload)
  }
  showingPage = page => {
    this.setState({ pageSize: page })
  }

  render () {
    const {
      searchTerm,
      previousClass,
      nextClass,
      currentPage,
      invitedEmail,
      pageSize
    } = this.state

    const {
      userActionSettings: { isInviteUserModalOpen }
    } = this.props

    const totalPages = Math.ceil(
      this.props.getUserResponse.total_count / pageSize
    )

    let pageArray = []
    let paginationLimit = 6

    let i = 1
    while (i <= totalPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      pageArray.push(pageParameter)
      i++
    }
    pageArray = _.chunk(pageArray, paginationLimit)
    const listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, { number: currentPage })
      if (found.length > 0) {
        return group
      }
    })

    const startValueOfRange = (currentPage - 1) * pageSize + 1
    const endValueOfRange = (currentPage * pageSize) <= this.props.getUserResponse.total_count ? (currentPage * pageSize) : this.props.getUserResponse.total_count
    const totalItems = this.props.getUserResponse.total_count
    var activeClass = ''
    console.log('asdassdasdasdsadasdasdasd', pageSize)
    return (
      <div id='userList'>
        <ReactModal
          isOpen={isInviteUserModalOpen}
          onRequestClose={this.closeInviteUserModal}
          className={styles.Modal}
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className={`modal-header ${styles.border_none}`}>
                <h5 className={`modal-title ${styles.modal_title_class}`}>
                  Invite User
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={this.closeInviteUserModal}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <form onSubmit={this.inviteUserSubmitHandler}>
                  <div className='form-group row'>
                    <label
                      className='col-sm-2 col-form-label'
                      htmlFor='inviteUserEmail'
                    >
                      Email
                    </label>
                    <div className='col-sm-10'>
                      <input
                        type='text'
                        className='form-control'
                        value={invitedEmail}
                        onChange={e =>
                          this.setState({ invitedEmail: e.target.value })
                        }
                        id='inviteUserEmail'
                      />
                    </div>
                  </div>
                  <div className={`form-group row ${styles.submit_button_div}`}>
                    <button
                      type='submit'
                      className='btn btn-outline-info btn-md text-right'
                    >
                      Invite User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ReactModal>

        <div className='row'>
          <div className='col-md-12'>
            <h1> User </h1>
            <div className='m_datatable' id='scrolling_vertical'>
              <div
                className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'
                id='scrolling_vertical'
              >
                <div className=''>
                  <div className='m-portlet'>
                    <div className='m-portlet__body'>
                      <div
                        id='m_table_1_wrapper'
                        className='dataTables_wrapper dt-bootstrap4'
                      >
                        <div className='row'>
                          <div className='col-md-10' />
                          <div className='col-md-2 float-right'>
                            <button
                              className='btn btn-outline-info btn-sm pull-right'
                              onClick={this.inviteUserClickHandler}
                            >
                              Invite User
                            </button>
                            &nbsp;
                          </div>
                        </div>
                        <br />
                        <div className='row' style={{ marginBottom: '20px' }}>

                          <div className='col-sm-12 col-md-6'>
                            <div
                              className='dataTables_length'
                              id='m_table_1_length'
                            >
                              <div className='search-container'>
                                <input
                                  type='text'
                                  className='form-control pull-left Search-bar'
                                  placeholder='Search...'
                                  id='generalSearch'
                                  onKeyUp={this.handleInputChange}
                                  value={searchTerm}
                                  onChange={e =>
                                    this.setState({
                                      searchTerm: e.target.value
                                    })
                                  } />
                                <img src='/assets/search.png' alt='Search icon' className='search-icon'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className='dataTables_scrollBody'
                        style={{
                          position: 'relative',
                          overflow: 'auto',
                          width: '100%',
                          maxHeight: '80vh'
                        }}
                      >
                        <table
                          className='m-portlet table table-striped- table-hover table-checkable dataTable no-footer'
                          id='m_table_1'
                          aria-describedby='m_table_1_info'
                          role='grid'
                        >
                          <thead className='table-head'>
                            <tr role='row' className='table-head-row'>
                              <th className='table-th'>
                                <p>Name</p>
                              </th>
                              <th className='table-th'>
                                <p>Email</p>
                              </th>
                              <th className='table-th'>
                                <p>Status</p>
                              </th>
                              <th className='table-th'>
                                <p>Actions</p>
                              </th>
                            </tr>
                          </thead>
                          <tbody className='table-body'>
                            {this.userList()}
                          </tbody>
                        </table>
                      </div>
                      <div className='row'>
                        <div className='col-sm-12 col-md-6' id='scrolling_vertical'>
                          <div
                            className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll'
                            id='scrolling_vertical'
                          >
                            <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                              <ul className='pagination pg-blue pag'>
                                {currentPage > 1 && (
                                  <li className='page-item'>
                                    <a
                                      href=''
                                      title='Previous'
                                      id='m_blockui_1_5'
                                      className={
                                        'm-datatable__pager-link m-datatable__pager-link--prev page-link list links' +
                                        previousClass
                                      }
                                      onClick={e =>
                                        this.fetchUsersForGivenPageNumber(
                                          e,
                                          currentPage,
                                          'start'
                                        )
                                      }
                                    >
                                      <span aria-hidden='true'>&laquo;</span>
                                      <span className={'sr-only'}>Previous</span>
                                    </a>
                                  </li>
                                )}
                                {currentPage > 1 && (
                                  <li className='page-item'>
                                    <a
                                      href=''
                                      title='Previous'
                                      id='m_blockui_1_5'
                                      className={
                                        'm-datatable__pager-link m-datatable__pager-link--prev page-link list links' +
                                        previousClass
                                      }
                                      onClick={e =>
                                        this.fetchUsersForGivenPageNumber(
                                          e,
                                          currentPage,
                                          'prev'
                                        )
                                      }
                                    >
                                      <span aria-hidden='true'>&lt;</span>
                                      <span className={'sr-only'}>Previous</span>
                                    </a>
                                  </li>
                                )}
                                {listPage[0] &&
                                  listPage[0].map(page => {
                                    if (page.number === currentPage) {
                                      page.class =
                                      'kt-datatable__pager-link--active activ'
                                      activeClass = 'active'
                                    } else {
                                      activeClass = ''
                                      page.class = ''
                                    }

                                    return (
                                      <li key={page.number} className={'page-item' + activeClass}>
                                        <a
                                          href=''
                                          className={`kt-datatable__pager-link kt-datatable__pager-link-number ${page.class} page-link list `}
                                          data-page={page.number}
                                          title={page.number}
                                          onClick={e =>
                                            this.fetchUsersForGivenPageNumber(
                                              e,
                                              page.number
                                            )
                                          }
                                          >
                                          {page.number}
                                        </a>
                                      </li>
                                    )
                                  })}
                                {currentPage !== totalPages &&
                                  totalPages > 1 && (
                                  <li className='page-item'>{console.log(totalPages)}
                                    <a
                                      href=''
                                      title='Next'
                                      className={
                                        'm-datatable__pager-link m-datatable__pager-link--next page-link list links' +
                                        nextClass
                                      }
                                      onClick={e =>
                                        this.fetchUsersForGivenPageNumber(
                                          e,
                                          currentPage,
                                          'next'
                                        )
                                      }
                                    >
                                      <span aria-hidden='true'>&gt;</span>
                                      <span className={'sr-only'}>Next</span>
                                    </a>
                                  </li>
                                )}
                                {currentPage !== totalPages &&
                                  totalPages > 1 && (
                                  <li className='page-item'>{console.log(totalPages)}
                                    <a
                                      href=''
                                      title='Next'
                                      className={
                                        'm-datatable__pager-link m-datatable__pager-link--next page-link list links' +
                                        nextClass
                                      }
                                      onClick={e =>
                                        this.fetchUsersForGivenPageNumber(
                                          e,
                                          totalPages,
                                          'end'
                                        )
                                      }
                                    >
                                      <span aria-hidden='true'>&raquo;</span>
                                      <span className={'sr-only'}>Next</span>
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className={`col-sm-12 col-md-6 text-right ${styles.topSpacing}`}>
                          {/* showing dropdown */}
                          <div className='showing-div showspace spaceMargin '>
                            <div className='dropup dropup-showing'>
                              <button className='btn btn-default dropdown-toggle dropup-btn' type='button' data-toggle='dropdown'>{this.state.pageSize}<span className='caret' /></button>
                              <ul className='dropdown-menu menu'>
                                <li><a href='javascript:void(0)' onClick={() => this.showingPage(1)}>10</a></li>
                                <li><a href='javascript:void(0)' onClick={() => this.showingPage(20)}>20</a></li>
                                <li><a href='javascript:void(0)' onClick={() => this.showingPage(30)}>30</a></li>
                                <li><a href='javascript:void(0)' onClick={() => this.showingPage(40)}>40</a></li>
                                <li><a href='javascript:void(0)' onClick={() => this.showingPage(50)}>50</a></li>
                              </ul>
                            </div>
                            <span className='showing-text text-right showingText'> Showing {startValueOfRange} - {endValueOfRange} of {totalItems} </span>
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
    )
  }
}

Users.propTypes = {
  getUserResponse: PropTypes.any,
  client_id: PropTypes.any,
  client_secret: PropTypes.any,
  fetchUsers: PropTypes.func,
  openInviteUser: PropTypes.func,
  closeInviteUser: PropTypes.func,
  inviteUser: PropTypes.func,
  createUser: PropTypes.func,
  deleteUser: PropTypes.func,
  userActionSettings: PropTypes.any
}

export default Users

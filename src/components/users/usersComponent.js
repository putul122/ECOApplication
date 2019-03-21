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
    return (
      this.props &&
      getUserResponse &&
      getUserResponse.resources.map((user, index) => {
        return (
          <tr key={index}>
            <td>{user.first_name + ' ' + user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.roles.toString()}</td>
            <td>
              <span>
                {user.is_active ? (
                  <a href='' onClick={e => this.removeUser(e, user.id)}>
                    <span>DeActivate</span>
                  </a>
                ) : (
                  <a href='' onClick={e => this.activateUser(e, user.email)}>
                    <span>Activate</span>
                  </a>
                )}
              </span>
              /
              <a
                href=''
                onClick={e => {
                  e.preventDefault()
                  this.removeUser(e, user.id)
                }}
              >
                <span>Remove</span>
              </a>
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

    const totalPages = Math.floor(
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
            <h1> Users </h1>
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
                              style={{ display: 'flex' }}
                            >
                              <h5 style={{ margin: '8px' }}>Show</h5>
                              <select
                                value={pageSize}
                                name='m_table_1_length'
                                aria-controls='m_table_1'
                                className='custom-select custom-select-sm form-control form-control-sm'
                                style={{ height: '40px' }}
                                onChange={this.pageSizeChangeHandler}
                                onBlur={this.pageSizeBlurHandler}
                              >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                              </select>
                              <h5 style={{ margin: '8px' }}>Entries</h5>
                              {/* </label> */}
                            </div>
                          </div>
                          <div className='col-sm-12 col-md-6'>
                            <div
                              className='dataTables_length pull-right'
                              id='m_table_1_length'
                              style={{ display: 'flex' }}
                            >
                              <div style={{ display: 'flex' }}>
                                <h5 style={{ margin: '10px' }}>Search</h5>
                                <div className='m-input-icon m-input-icon--left'>
                                  <input
                                    type='text'
                                    className='form-control m-input'
                                    placeholder='Search...'
                                    id='generalSearch'
                                    onKeyUp={this.handleInputChange}
                                    value={searchTerm}
                                    onChange={e =>
                                      this.setState({
                                        searchTerm: e.target.value
                                      })
                                    }
                                  />
                                  <span className='m-input-icon__icon m-input-icon__icon--left'>
                                    <span>
                                      <i className='la la-search' />
                                    </span>
                                  </span>
                                </div>
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
                          className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer'
                          id='m_table_1'
                          aria-describedby='m_table_1_info'
                          role='grid'
                        >
                          <thead>
                            <tr role='row'>
                              <th className=''>
                                <h5>Name</h5>
                              </th>
                              <th className=''>
                                <h5>Email</h5>
                              </th>
                              <th className=''>
                                <h5>Roles</h5>
                              </th>
                              <th className=''>
                                <h5>Actions</h5>
                              </th>
                            </tr>
                          </thead>
                          <tbody>{this.userList()}</tbody>
                        </table>
                      </div>
                      <div className='row'>
                        <div className='col-md-12' id='scrolling_vertical'>
                          <div
                            className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll pull-right'
                            id='scrolling_vertical'
                          >
                            <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
                              <ul className='m-datatable__pager-nav'>
                                {currentPage > 1 && (
                                  <li>
                                    <a
                                      href=''
                                      title='Previous'
                                      id='m_blockui_1_5'
                                      className={
                                        'm-datatable__pager-link m-datatable__pager-link--prev ' +
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
                                      <i className='la la-angle-left' />
                                    </a>
                                  </li>
                                )}

                                {listPage[0] &&
                                  listPage[0].map(page => {
                                    if (page.number === currentPage) {
                                      page.class =
                                        'm-datatable__pager-link--active'
                                    } else {
                                      page.class = ''
                                    }

                                    return (
                                      <li key={page.number}>
                                        <a
                                          href=''
                                          className={
                                            'm-datatable__pager-link m-datatable__pager-link-number ' +
                                            page.class
                                          }
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
                                  totalPages !== 1 && (
                                    <li>
                                      <a
                                        href=''
                                        title='Next'
                                        className={
                                          'm-datatable__pager-link m-datatable__pager-link--next ' +
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
                                        <i className='la la-angle-right' />
                                      </a>
                                    </li>
                                  )}
                              </ul>
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

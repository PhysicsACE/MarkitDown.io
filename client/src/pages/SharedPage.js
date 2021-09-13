import { Component } from 'react';
import { api } from '../js/api';

import { recentShared, addShared, removeShared} from '../js/utils';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
  Input
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faDownload, faShare } from '@fortawesome/free-solid-svg-icons';
import Spacer from '../components/Spacer';
import '../components/styles.css'

function getIds(data) {
  const ids = []
  for (var value of data) {
    console.log(value['id'])
    ids.push(value['id'])
  }

  return ids

}

function compareIds (recent, data) {
  const dataId = getIds(data)
  const recentId = getIds(recent)
  console.log(dataId)
  console.log(recentId)
  return recentId.sort() === dataId.sort()
}

class SharedPage extends Component {
  state = { 
    recent: null, 
    modalState: false,
    shareModal: false, 
    password: '',
    shouldUpdate: false
  };

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    localStorage.setItem('type', 'share')
    const { data } = await api.get(`/workspace?ids=${recentShared()}`);
    this.setState({ recent: data });
  }

  async componentDidUpdate() {
    if (this.state.shouldUpdate) {
      const { data } = await api.get(`/workspace?ids=${recentShared()}`);
      this.setState({recent: data, shouldUpdate: false})
    }
  }

  async remove(id) {
    removeShared(id)
    this.setState({shouldUpdate: true})
  }

  togleModal() {
    this.setState((state) => ({
      modalState: !state.modalState
    }))
  }

  newPassword(s) {
    this.setState({password: s})
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await api.get(`/getshare/${this.state.password}`)
      console.log(data)
      addShared(data.id)
      this.setState({
        modalState: false,
        password: '',
        shouldUpdate: true
      })

    } catch (e) {
      alert('Error: ' + JSON.stringify(e.response.data))
    }
  }

  render() {
    return (
      <>
        <div className="p-4 h-100" style={{ overflowY: 'auto' }}>
          <span>
            <h1>Shared Files</h1>
            <Spacer />
            <Button className="modalbutton" onClick={() => this.togleModal()}>New File</Button>
          </span>
          <div className="d-flex flex-wrap">
            {this.state.recent ? (
              this.state.recent.length ? (
                this.state.recent.map((workspace) => (
                  <Card
                    key={workspace.id}
                    className="m-2"
                    style={{ flexBasis: '250px' }}
                  >
                    <CardBody>
                      <CardTitle className="font-weight-bold">
                        {workspace.title}
                      </CardTitle>
                      <Link to={`/workspace/${workspace.id}`}>
                        <Button>Open</Button>
                      </Link>
                      <Spacer width={6} />
                      <Button
                        color="danger"
                        onClick={() => this.remove(workspace.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <>
                  <p>Click Button to add new Shared File</p>
                </>
              )
            ) : (
              <Spinner type="grow" className="m-2" />
            )}
          </div>
        </div>
        <Modal isOpen={this.state.modalState}>
            <ModalHeader>Enter Password</ModalHeader>
            <ModalBody>
              <Form className="d-flex w 100">
                <Input bsSize="sm" autoFocus placeholder="Password..." onChange={(e) => this.newPassword(e.target.value)} />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => this.togleModal()}>Cancel</Button>
              <Button onClick={(e) => this.handleSubmit(e)}>Save</Button>
            </ModalFooter>
        </Modal>
      </>
    );
  }

}

export default SharedPage;
import React from 'react'

import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Button,
  Alert
} from 'reactstrap'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ImageCard from './ImageCard'
import ImageModal from './ImageModal'

import axios from 'axios'

export default class Favorites extends React.Component {
  constructor (props) {
    super(props)
    this.setModal = this.setModal.bind(this)
    this.toggle = this.toggle.bind(this)
    this.copy = this.copy.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.email = this.email.bind(this)

    let urlVars = new URLSearchParams(window.location.search)

    let favs = []
    if (urlVars.has('iids')) {
      favs = JSON.parse(window.atob(urlVars.get('iids')))
    }

    this.state = {
      saveModalOpen: false,
      modalOpen: false,
      iids: favs,
      urlText: window.location.href,
      copied: false
    }
  }

  componentDidUpdate (prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      let newUrl = `${window.location.protocol}//${window.location.host}/pancreatlas/favorites/?iids=${window.btoa(JSON.stringify(this.props.favorites))}`
      this.setState({
        iids: this.props.favorites,
        urlText: newUrl
      })
      window.history.pushState({ 'pageTitle': 'Pancreatlas / HANDEL-P' }, '', newUrl)
    }
  }

  setModal (imgInfo) {
    axios.get(`${process.env.REACT_APP_API_URL}/images/${imgInfo}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(response => {
      let result = response.data
      if (Object.keys(result.kvals).length > 0) {
        let path = result.kvals['File path'].val
        let re = /([0-9]+-[0-9]+-[0-9]+)?(\/[^/]+\.[a-z]+)$/
        let ageRe = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/

        let markerColors = result.channel_info
        let markerColorRe = /^.+\((.+)\)$/
        Object.keys(markerColors).forEach(function (key) {
          var newKey = markerColorRe.test(key) ? markerColorRe.exec(key)[1] : key
          if (newKey !== key) {
            markerColors[newKey] = markerColors[key]
            delete markerColors[key]
          }
        })

        let matches = re.exec(path)
        result.kvals['File path'].val = matches[0]
        result.kvals['Donor info - Age'].val = result.tags.filter(val => ageRe.test(val))[0]
        this.setState({
          modalData: {
            img_id: imgInfo,
            img_data: result.kvals,
            path_path: result.pathpath,
            markerColors: markerColors
          }
        })
      } else {
        this.setState({
          modalData: {
            img_id: imgInfo,
            img_data: { 'Warning': 'No information for this image' },
            path_path: result.pathpath
          }
        })
      }
      this.toggle('image')
    }).catch(err => {
      this.setState({
        loaded: false,
        error: err
      })
    })
  }

  toggle (modalType) {
    switch (modalType) {
      case 'image':
        this.setState({ modalOpen: !this.state.modalOpen })
        break
      case 'save':
        this.setState({ saveModalOpen: !this.state.saveModalOpen })
        break
      default:
        this.setState({ modalOpen: !this.state.modalOpen })
    }
  }

  copy () {
    this.urlRef.disabled = false
    this.urlRef.select()
    document.execCommand('copy')
    this.urlRef.disabled = true
    this.setState({
      urlText: 'Copied to clipboard!'
    })
    setTimeout(() => {
      this.setState({
        urlText: window.location.href
      })
    }, 3000)
  }

  email () {
    window.location.href = `mailto:${this.state.email}?subject=Your%20pancreatlas%20Favorites&body=${this.state.urlText}`
  }

  handleChange (event) {
    this.setState({
      email: event.target.value
    })
  }

  render () {
    if (this.state.iids.length <= 0) {
      return (
        <Container style={{ marginTop: '1.5rem' }}>
          <Row>
            <Col md='12'>
              <Alert color='danger'>
                <span>You do not have any images saved. <strong><Link to='/datasets'>Click here to view our datasets</Link></strong></span>
              </Alert>
            </Col>
          </Row>
        </Container>
      )
    }
    return (
      <Container style={{ marginTop: '1.5rem' }}>
        <Row>
          <Col md='12'>
            <Alert color='info'>
              <Row>
                <Col md='6'>
                  <span>
                    Here are some images you saved from earlier
                  </span>
                </Col>
                <Col md='6'>
                  <span className='float-right'><Button color='info' onClick={() => this.toggle('save')}>Save favorites for later</Button></span>
                </Col>
              </Row>
            </Alert>
          </Col>
        </Row>
        <div className='favorites-block'>
          <Row>
            {this.state.iids.map(iid =>
              <Col md='3'>
                <ImageCard filterActive={false} favoriteCallback={this.props.favoriteCallback} key={iid} iid={iid} callback={this.setModal} />
              </Col>
            )}
          </Row>
        </div>
        <Modal isOpen={this.state.saveModalOpen} toggle={() => this.toggle('save')}>
          <ModalHeader toggle={() => this.toggle('save')}>Save for Later</ModalHeader>
          <ModalBody>
            <Row className='flex favorites-row'>
              <Col md='10'>
                <input id='favorites-url' className='form-control' ref={url => (this.urlRef = url)} type='text' value={this.state.urlText} />
              </Col>
              <Col md='2 '>
                <FontAwesomeIcon icon='copy' size='2x' className='favorites copy' onClick={this.copy} />
              </Col>
            </Row>
            <Row>
              <Col md='10'>
                <Input type='email' placeholder='Enter email to send favorites link' onChange={this.handleChange} />
              </Col>
              <Col md='2'>
                <FontAwesomeIcon icon='paper-plane' size='2x' className='favorites send' onClick={this.email} />
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <ImageModal toggle={() => this.toggle('image')} isOpen={this.state.modalOpen} modalData={this.state.modalData} />
      </Container>
    )
  }
}

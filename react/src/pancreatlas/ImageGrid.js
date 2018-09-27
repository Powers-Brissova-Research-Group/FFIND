import React from 'react';
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Table
} from 'reactstrap';

import ImageCard from './ImageCard'
import FilterList from './FilterList'
import Error from './Error'
import DetailRow from './DetailRow'

export default class ImageGrid extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      loaded: false,
      tags: null,
      ids: [],
      matches: [],
      filters: {},
      start: 0,
      end: 12,
      modalOpen: false,
    }

    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.choosePage = this.choosePage.bind(this)
    this.filter = this.filter.bind(this)
    this.callback = this.callback.bind(this)
    this.updateTags = this.updateTags.bind(this)
    this.toggle = this.toggle.bind(this)
    this.setModal = this.setModal.bind(this)

    this.image_tags = {}
    this.tag_dict = {}
    this.tag_idx = {}
    this.raw_tags = {}
    this.initialized = false
    this.defs = require('../assets/pancreatlas/definitions.json')
  }

  componentDidMount() {
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/tagsets/')
      .then(res => res.json())
      .then(
        (tresult) => {
          this.raw_tags = tresult
          for (let o of Object.keys(tresult)) {
            if ('set_name' in tresult[o]) {
              this.tag_idx[tresult[o].set_name] = o
              this.tag_dict[tresult[o].set_name] = []
              let extras = ['depth 1', 'depth 2', 'depth 3']
              for (let t of Object.keys(tresult[o].tags)) {
                if (extras.indexOf(t) === -1) {
                  this.tag_dict[tresult[o].set_name].push(t)
                } else {
                  delete this.raw_tags[o].tags[t]
                }
              }
            }
          }
          fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/datasets/' + this.props.did + '/get-images')
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  loaded: true,
                  ids: result,
                  matches: Object.keys(result),
                  page: 0
                });
                this.updateTags(true)
                // this.filter(this.props.filters)
              })
            .catch(err => {
              console.log(err)
              this.setState({
                loaded: false,
                error: err
              })
            });
        }
      )
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.filters) !== JSON.stringify(this.state.filters)) {
      this.updateTags(false)
    }
  }

  updateTags(shouldDelete) {
    let app_tags = JSON.parse(JSON.stringify(this.raw_tags));
    for (let key of this.state.matches) {
      for (let tag of Object.keys(this.tag_dict)) {
        let intersection = this.state.ids[key].filter(val => -1 !== this.tag_dict[tag].indexOf(val))
        if (intersection.length > 0) {
          for (let tval of intersection) {
            app_tags[this.tag_idx[tag]].tags[tval]++
          }
        }
      }
      // console.log(result[key])
    }
    if (shouldDelete) {
      for (let tagset of Object.keys(app_tags)) {
        for (let tag of Object.keys(app_tags[tagset].tags)) {
          if (app_tags[tagset].tags[tag] === 0) {
            delete app_tags[tagset].tags[tag]
            delete this.raw_tags[tagset].tags[tag]
          }
        }
      }
    }
    // console.log(app_tags)
    this.setState({
      tags: app_tags
    })
  }

  choosePage(new_page) {
    console.log(new_page)
    this.setState({
      page: new_page
    })
  }

  nextPage() {
    if (this.state.page >= Math.ceil(this.state.images.length / 12)) { return false; }
    let new_page = this.state.page + 1
    this.setState({
      page: new_page
    })
  }

  prevPage() {
    if (this.state.page <= 0) { return false; }
    let new_page = this.state.page - 1
    this.setState({
      page: new_page
    })
  }

  filter(tagList) {
    let empty = true
    for (let key of Object.keys(tagList)) {
      if (tagList[key].length > 0) {
        empty = false
        break
      }
    }

    if (empty) {
      console.log('empty')
      this.setState({
        filters: {},
        matches: Object.keys(this.state.ids)
      })
    } else {
      let tmp = JSON.parse(JSON.stringify(Object.keys(this.state.ids)))
      let allIds = JSON.parse(JSON.stringify(this.state.ids))
      for (let id of Object.keys(allIds)) {
        let match = true
        for (let keyset of Object.keys(tagList)) {
          let intersection = tagList[keyset].filter(tag => -1 !== allIds[id].indexOf(tag))
          if (intersection.length <= 0) {
            match = false
            break
          }
        }
        if (!match) {
          tmp.splice(tmp.indexOf(id), 1)
        }
      }

      this.setState({
        filters: tagList,
        matches: tmp
      })
    }
  }

  callback(iid, tags) {
    this.image_tags[iid] = tags
  }

  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  setModal(imgInfo) {
    fetch('http://dev7-api-pancreatlas.app.vumc.org:8447/api/images/' + imgInfo)
      .then(res => res.json())
      .then(
        (result) => {
          let path = result.kvals['File path'].val
          let re = /([0-9]+-[0-9]+-[0-9]+)?(\/[^/]+\.[a-z]+)$/
          let matches = re.exec(path)
          result.kvals['File path'].val = matches[0]
          this.setState({
            modalData: {
              img_id: imgInfo,
              img_data: result.kvals,
              path_path: result.pathpath
            }
          })
          this.toggle()
        })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      });
  }

  render() {
    if (this.state.loaded) {
      let pages = []
      for (let i = 0; i < Math.ceil(this.state.matches.length / 16); i++) {
        if (i === this.state.page) {
          pages.push(<PaginationItem key={i} active><PaginationLink onClick={(e) => this.choosePage(i)}>{i}</PaginationLink></PaginationItem>)

        } else {
          pages.push(<PaginationItem key={i}><PaginationLink onClick={(e) => this.choosePage(i)}>{i}</PaginationLink></PaginationItem>)
        }
      }

      let img_grid = []
      let start = 16 * this.state.page
      let end = start + 16
      let slice = this.state.matches.slice(start, end);
      while (slice.length) {
        img_grid.push(slice.splice(0, 4));
      }

      // console.log(img_grid)

      // C:\Users\messmej\Documents\Projects\pancreatlas\react\src\assets\pancreatlas\thumbs\55.jpg

      return (
        <div className="image-grid">
          <h5 className='view-counter'>You are currently viewing {this.state.matches.length} out of a possible {Object.keys(this.state.ids).length} images</h5>
          <Container>
            <Row className="pancreatlas-row">
              <Col md="2">
                <FilterList ageGroup={this.props.groupName} tags={this.state.tags} filters={this.state.tags} callback={this.filter} />
              </Col>
              <Col md="10">
                {img_grid.map((item, idx) => (
                  <Row key={idx} className="image-row pancreatlas-row">
                    {item.map((image, idx) =>
                      <Col key={idx} md="3">
                        <ImageCard key={image} iid={image} callback={this.setModal} />
                      </Col>
                    )}
                  </Row>
                ))}
                <Row className="pancreatlas-row">
                  <Col md="12">
                    <Pagination>
                      <PaginationItem>
                        <PaginationLink previous href="#" onClick={this.prevPage} />
                      </PaginationItem>
                      {pages}
                      <PaginationItem>
                        <PaginationLink next href="#" onClick={this.nextPage} />
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Modal isOpen={this.state.modalOpen} toggle={this.toggle} className='image-detail-modal'>
              <ModalHeader toggle={this.toggle}>Image Details</ModalHeader>
              <ModalBody>
                {this.state.modalData !== undefined &&
                  <div className='modal-data'>
                    <a href={this.state.modalData.path_path}><img src={require(`../assets/pancreatlas/thumbs/${this.state.modalData.img_id}.jpg`)} alt={this.state.modalData.img_id} className='modal-image' /></a>
                    <a href={this.state.modalData.path_path}><Button color="success">Open Viewer</Button></a>
                    <h5>Image Details</h5>
                    <Table>
                      <tbody>
                        {Object.keys(this.state.modalData.img_data).sort().filter(key => ['Image info - Annotations', 'External id', '(DS notes)', 'Image info - Analysis', 'Image info - Pancreas Region'].indexOf(key) === -1).map(key => {
                          return <DetailRow data={this.state.modalData.img_data[key].val} desc={this.defs[key].short_desc} heading={key} />
                          // if (img_data[key] !== null && img_data[key] !== undefined && img_data[key] !== ''){
                          //   return (<tr><td><p id={key + '-tooltip'}>{key}</p></td><td className={key.split('-').map(val => val.trim()).join(' ')}>{img_data[key]}</td></tr>)
                          // } else {
                          //   return null
                          // }
                        })}
                      </tbody>
                    </Table>
                  </div>
                }
              </ModalBody>
            </Modal>

          </Container>
        </div>
      );

    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return (
        <div className="loading">
          <strong>Loading {this.props.dataset_name}...</strong>
          <Progress animated color="success" value="100" />
        </div>
      )
    }
  }
}
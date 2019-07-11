import React from 'react'
import {
  Button,
  Container,
  Table
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import ImageMatrix from './ImageMatrix'
import LoadingBar from './LoadingBar'

import Error from './Error'

import axios from 'axios'

import PageBanner from './PageBanner'

export default class MatrixView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tag1: null,
      tag2: null,
      toggled: false,
      tagsets: [],
      loaded: false,
      showMatrix: false,
      dsid: (this.props.match === undefined) ? 0 : this.props.match.params.dsid
    }
    this.handleChange = this.handleChange.bind(this)
    this.showMatrix = this.showMatrix.bind(this)
  }

  componentDidMount () {
    axios.get(`${process.env.REACT_APP_API_URL}/datasets/${this.props.match.params.dsid}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(result => {
      this.setState({
        title: result.data.dsname
      })
    })

    axios.get(`${process.env.REACT_APP_API_URL}/tagsets`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(response => {
      let result = response.data
      this.setState({
        tagsets: result,
        loaded: true,
        tag1: result[0].set_name,
        tag2: result[0].set_name
      })
    })
      .catch(err => {
        this.setState({
          loaded: false,
          error: err
        })
      })
  }

  handleChange (event) {
    let key = event.target.id
    if (key === 'tag1') {
      this.setState({
        tag1: event.target.value
      })
    } else {
      this.setState({
        tag2: event.target.value
      })
    }
  }

  showMatrix () {
    this.setState({
      showMatrix: true
    })
  }

  setMatrix (t1, t2) {
    this.setState({
      tag1: t1,
      tag2: t2,
      showMatrix: true
    })
  }

  render () {
    var logo = null
    if (this.state.title !== undefined) {
      logo = require(`../assets/${this.state.title.toLowerCase().replace(/ /g, '-').replace(/[^0-9a-zA-Z-_]/ig, '')}.jpg`)
    }

    if (this.state.loaded) {
      if (!this.state.showMatrix) {
        return (
          <div className='matrix-view'>
            <MetaTags>
              <title>Compare Attributes -- Pancreatlas / HANDEL-P</title>
              <meta name='description' content='Pick two attribute sets and compare matching images in the pancreatlas' />
            </MetaTags>
            <PageBanner image={logo !== null} bgImg={logo}>
              <h1>Matrix View</h1>
              <p className='text-larger'>Select two dimensions to generate a matrix of images based on these filters</p>
            </PageBanner>

            <Container>
              <div className='table table-responsive'>
                <Table className='matrix-table'>
                  <thead>
                    <tr>
                      <td className='matrix-sel' />
                      {this.state.tagsets.map(ts => (
                        <td className='matrix-sel'><strong>{ts.set_name}</strong></td>
                      ))}
                    </tr>
                  </thead>
                  {this.state.tagsets.map(tagset1 => (
                    <tr>
                      <td className='matrix-sel'><strong>{tagset1.set_name}</strong></td>
                      {Array(this.state.tagsets.indexOf(tagset1) + 1).fill(0).map(key => (<td class='matrix-sel' style={{ width: `${Math.floor(100 / (this.state.tagsets.length))}%` }}>&mdash;</td>))}
                      {this.state.tagsets.slice(this.state.tagsets.indexOf(tagset1) + 1).map(tagset2 => {
                        if (tagset1.set_name === tagset2.set_name) {
                          return <td className='matrix-sel'><span>&mdash;</span></td>
                        } else {
                          return (<td className='matrix-sel'><Button className='matrix-select-button' color='link' onClick={() => this.setMatrix(tagset1.set_name, tagset2.set_name)}>{tagset1.set_name} vs {tagset2.set_name}</Button></td>)
                        }
                      }
                      )}
                    </tr>
                  ))}
                </Table>
              </div>
            </Container>
          </div>

        )
      } else {
        return (<ImageMatrix tag_1={this.state.tag1} tag_2={this.state.tag2} dsid={this.state.dsid} />)
      }
    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return (
        <LoadingBar />
      )
    }
  }
}

MatrixView.defaultProps = {
  match: undefined
}

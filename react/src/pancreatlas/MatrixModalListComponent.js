import React from 'react'
import {
  Button
} from 'reactstrap'

import axios from 'axios'

export default class MatrixModalListComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      img: undefined
    }
  }
  componentDidMount () {
    axios.get(`${process.env.REACT_APP_API_URL}/images/${this.props.iid}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': process.env.REACT_APP_API_AUTH
      }
    }).then(response => {
      let result = response.data
      let kvals = result.kvals
      let markerRe = /(^Stain info)(\s+-\s+)([a-zA-Z0-9]+$)/i
      let donorRe = /(^Donor info)(\s+-\s+)(.+$)/i
      let regionRe = /(^Image info)(\s+-\s+)(Section Plane$|Pancreas Region$)/
      let markerKeys = Object.keys(kvals).filter(key => markerRe.test(key))
      let donorKeys = Object.keys(kvals).filter(key => donorRe.test(key))
      let regionKeys = Object.keys(kvals).filter(key => regionRe.test(key))

      donorKeys.sort()
      regionKeys.sort()
      let markers = {}
      let donor = {}
      let region = {
        [regionKeys[1]]: kvals[regionKeys[1]].val,
        [regionKeys[0]]: kvals[regionKeys[0]].val

      }
      for (let key of markerKeys) {
        kvals[key].val.split(',').map(val => (markers[val.trim()] = markerRe.exec(key)[3]))
      }
      for (let key of donorKeys) {
        if (kvals[key].val !== '' && kvals[key].val !== undefined) {
          let valKey = donorRe.exec(key)[3]
          if (valKey !== 'UNOS ID' && valKey !== 'LIMS ID' && kvals[key] !== '') {
            if (valKey === 'Age') {
              let ageRe = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/
              donor[donorRe.exec(key)[3]] = result.tags.filter(tag => ageRe.test(tag))[0]
            } else {
              donor[donorRe.exec(key)[3]] = kvals[key].val
            }
          }
        }
      }
      result.markers = markers
      result.donor = donor
      result.region = region

      return result
    }).then(img => {
      this.setState({
        loaded: true,
        img: img
      })
    })
  }

  render () {
    if (this.state.loaded === true) {
      return (
        <tr>
          <td><img className='modal-thumb' src={`https://dev7-pancreatlas.app.vumc.org/images/${this.state.img.iid}.jpg`} alt='' /></td>
          <td>
            {Object.keys(this.state.img.donor).map(key =>
              (<div>
                <strong>{key}: </strong>{this.state.img.donor[key]}
              </div>))}
            <div><strong>Markers: </strong>{Object.keys(this.state.img.markers).join(', ')}</div>
            <div><strong>Region: </strong>{Object.values(this.state.img.region).join(', ')}</div>
            <div><strong>Other Tags: </strong>{this.state.img.tags.filter(tag => Object.keys(this.state.img.markers).indexOf(tag) === -1 && Object.values(this.state.img.donor).indexOf(tag) === -1 && Object.values(this.state.img.region).indexOf(tag) === -1).map(tag => tag.tag).join(', ')}
            </div>
          </td>
          { /* onClick={() => this.setModal(this.state.img.iid)} */}
          <td><Button color='primary' onClick={() => this.props.modalCallback(this.state.img.iid)}>View</Button></td>
        </tr>

      )
    } else {
      return null
    }
  }
}

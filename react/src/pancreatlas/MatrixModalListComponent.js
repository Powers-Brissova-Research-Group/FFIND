import React from 'react'
import {
  Button
} from 'reactstrap'


export default class MatrixModalListComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      img: undefined
    }
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/images/${this.props.iid}`)
      .then(res => res.json())
      .then(result => {
        let kvals = result.kvals;
        let marker_re = /(^Stain info)(\s+-\s+)([a-zA-Z0-9]+$)/i
        let donor_re = /(^Donor info)(\s+-\s+)(.+$)/i
        let region_re = /(^Image info)(\s+-\s+)(Section Plane$|Pancreas Region$)/
        let marker_keys = Object.keys(kvals).filter(key => marker_re.test(key))
        let donor_keys = Object.keys(kvals).filter(key => donor_re.test(key))
        let region_keys = Object.keys(kvals).filter(key => region_re.test(key))

        donor_keys.sort()
        region_keys.sort()
        let markers = {}
        let donor = {}
        let region = {
          [region_keys[1]]: kvals[region_keys[1]].val,
          [region_keys[0]]: kvals[region_keys[0]].val

        }
        for (let key of marker_keys) {
          kvals[key].val.split(',').map(val => markers[val.trim()] = marker_re.exec(key)[3])
        }
        for (let key of donor_keys) {
          if (kvals[key].val !== '' && kvals[key].val !== undefined) {
            let val_key = donor_re.exec(key)[3]
            if (val_key !== 'UNOS ID' && val_key !== 'LIMS ID' && kvals[key] !== '') {
              if (val_key === 'Age') {
                let age_re = /^(G?)(\d+)(.\d)?(d|w|mo|y)(\+\dd)?$/
                donor[donor_re.exec(key)[3]] = result.tags.filter(tag => age_re.test(tag))[0]
              } else {
                donor[donor_re.exec(key)[3]] = kvals[key].val
              }
            }
          }
        }
        result.markers = markers
        result.donor = donor
        result.region = region

        return result
      })
      .then(img => {
        this.setState({
          loaded: true,
          img: img
        })
      })
  }

  render() {
    if(this.state.loaded === true){
      return (
        <tr>
          <td><img className='modal-thumb' src={require(`./../assets/pancreatlas/thumbs/${this.state.img.iid}.jpg`)} alt="" /></td>
          <td>
            {Object.keys(this.state.img.donor).map(key =>
              (<div>
                <strong>{key}: </strong>{this.state.img.donor[key]}
              </div>))}
            <div><strong>Markers: </strong>{Object.keys(this.state.img.markers).join(', ')}</div>
            <div><strong>Region: </strong>{Object.values(this.state.img.region).join(', ')}</div>
            <div><strong>Other Tags: </strong>{this.state.img.tags.filter(tag => Object.keys(this.state.img.markers).indexOf(tag) === -1 && Object.values(this.state.img.donor).indexOf(tag) === -1 && Object.values(this.state.img.region).indexOf(tag) === -1).join(', ')}
            </div>
          </td>
          { /* onClick={() => this.setModal(this.state.img.iid)} */}
          <td><Button color="primary" onClick={() => this.props.modalCallback(this.state.img.iid)}>View</Button></td>
        </tr>
  
      )  
    }  else {
      return null;
    }
  }
}
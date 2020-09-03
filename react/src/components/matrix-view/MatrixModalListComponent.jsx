import React from 'react'
import {
  Button
} from 'reactstrap'

export default class MatrixModalListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      img: undefined
    }
  }
  componentDidMount() {
    var mockImages = require(`../../assets/txt/ffind-defaults/all-images.json`)
    let result = mockImages[this.props.iid]
    this.setState({
      img: result,
      loaded: true
    })

  }

  render() {
    if (this.state.loaded === true) {
      return (
        <tr>
          <td><img className='modal-thumb' src={'//placehold.it/50x50'} alt='' /></td>
          <td>
            <div><strong>Name: </strong>{this.state.img.kvals['Name']['val'][0]}</div>
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

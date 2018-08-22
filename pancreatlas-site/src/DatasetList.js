import React from 'react'
import {
  Table,
  Button,
  ButtonGroup
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

import Error from './Error'

export default class DatasetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      datasets: []
    }
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/datasets')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            datasets: result
          })
        })
      .catch(err => {
        this.setState({
          error: err
        })
      });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div className="dataset-list">
          <Table hover>
            <thead>
              <tr>
                <th>Dataset ID</th>
                <th>Dataset Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.datasets.map(item => (
                <tr key={item.did}><td>{item.did}</td><td>{item.dsname}</td><td><ButtonGroup><Link to={'/matrixview/' + item.did}><Button className='ds-list-left-button' outline color="success">Create Matrix</Button></Link><Link to={'/dataset/' + item.did}><Button>Open Dataset</Button></Link></ButtonGroup></td></tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    } else if (this.state.error !== undefined) {
      return <Error error_desk={this.state.error.message} />
    } else {
      return <h1>Loading</h1>
    }
  }
}
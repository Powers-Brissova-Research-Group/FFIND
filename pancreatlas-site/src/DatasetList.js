import React from 'react'
import {
  Table,
  Button
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

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
        });
  }

  render() {
    const { loaded, datasets } = this.state;
    if (!loaded) {
      return <h1>Loading</h1>
    } else {
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
              {datasets.map(item => (
                <tr key={item.did}><td>{item.did}</td><td>{item.dsname}</td><td><Link to={'/dataset/' + item.did}><Button>Open Dataset</Button></Link></td></tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}
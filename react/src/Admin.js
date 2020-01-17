import React from 'react'

import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap'

import { withFirebase } from './firebase'

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    let ref = this.props.firebase.fetchUserInfoRef()
    let newRows = []
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        let d = doc.data()
        if (Object.keys(d).indexOf('date_accessed') >= 0) {
          let objType = Object.prototype.toString.call(d['date_accessed'])
          if (objType === '[object Object]') {
            d['date_accessed'] = d['date_accessed'].toDate().toString()
          } else {
            let tmp = new Date(parseInt(d['date_accessed']))
            d['date_accessed'] = tmp.toString()
          }
        }
        newRows.push(d)
        this.setState({
          rows: newRows
        })
      })
    })
  }

  render() {
    if (this.state.rows.length > 0) {
      return (
        <Container>
          <Row>
            <Col md={12}>
              <h3>Pancreatlas Admin Data</h3>
              <Table>
                <thead>
                  <tr>
                    {Object.keys(this.state.rows[0]).map(key => (
                      <th>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map(row => {
                    return (
                      <tr>
                        {Object.keys(row).map(key => <td>{row[key].toString()}</td>)}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )
    } else {
      return null
    }
  }
}

export default withFirebase(Admin)
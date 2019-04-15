import React from 'react'
import {
  Container,
  Table
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

export default class Nomenclature extends React.Component {
  constructor (props) {
    super(props)
    this.defs = require('../assets/pancreatlas/definitions.json')
  }
  render () {
    return (
      <div className='nomenclature'>
        <MetaTags>
          <title>Nomenclature -- Pancreatlas / HANDEL-P</title>
          <meta name='description' content='How pancreatlas organizes its images' />
        </MetaTags>
        <Container>
          <h1>Nomenclature</h1>
          <p>Below are descriptions regarding the various annotations we have added to our images</p>
          <Table hover>
            <thead>
              <tr>
                <th>Term</th>
                <th>Short Description</th>
                <th>Long Description</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.defs).map(key => (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  <td>{this.defs[key].short_desc}</td>
                  <td>{this.defs[key].long_desc}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

import React from 'react'

import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap'

import PageBanner from './pancreatlas/PageBanner'

import resourcesData from './assets/pancreatlas/resources.json'

export default class Resources extends React.Component {
  constructor (props) {
    super(props)
    console.log(resourcesData)
  }
  render () {
    return (
      <div className='resources'>
        <PageBanner image bgImg={require('./assets/about-header.jpg')}>
          <h1>Resources</h1>
          <p className='text-larger'>Linked below are major organizations and scientific consortia pursuing human pancreas and diabetes research. Please visit their webpages to learn more about how you can get involved.</p>
        </PageBanner>

        <Container>
          <Row>
            <Col md='12'>
              <Table>
                {resourcesData.resources.map((resource) => {
                  return (
                    <tr className='mb-4'>
                      {resource.url !== '' && <td><a href={resource.url}><img className='img-fluid' src={require(`./assets/${resource.img}`)} /></a></td>}
                      {resource.url === '' && <td><img className='img-fluid' src={require(`./assets/${resource.img}`)} /></td>}
                      <td><h6><strong>{resource.title}</strong></h6><div dangerouslySetInnerHTML={{ __html: resource.desc }} /></td>
                    </tr>
                  )
                })}
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

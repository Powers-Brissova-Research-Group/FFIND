import React from 'react'
import {
  Container
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import DatasetList from './DatasetList'
import PageBanner from './PageBanner'

export default class DatasetListPage extends React.Component {
  render () {
    return (
      <div className='dataset-list'>
        <MetaTags>
          <title>Available Datasets -- Pancreatlas</title>
          <meta name='description' content='List of datasets available to view in the pancreatlas' />
        </MetaTags>
        <PageBanner image bgImg={require('../assets/pancreatlas/headers/dataset-list-header.jpg')}>
          <h1>Explore Image Collections</h1>
          <p className='text-larger'>Collections are organized by specific disease phenotype, biological event, or scientific program. For more information about a collection’s origin, please click on <em>Collection Details</em>. Appropriate citations and authorship are provided where possible</p>
        </PageBanner>
        {/* <Parallax
          blur={0}
          bgImage={require('../assets/header1.jpg')}
          bgImageAlt='Sample Image'
          strength={0}
          style={{ marginBottom: '1.5rem' }}
        >
          <div className='parallax-filler' style={{ height: '45vh' }}>
            <Container className='h-100'>
              <Row className='h-100'>
                <Col md='12' className='d-flex align-items-center'>
                  <div className='dataset-title align-middle'>
                    <h1>Explore Image Collections</h1>
                    <p className='text-larger'>For more information on our data, please visit our <Link to='/nomenclature' className='link-light'>nomenclature page</Link>.</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Parallax> */}
        <Container>
          <DatasetList />
        </Container>
      </div>
    )
  }
}

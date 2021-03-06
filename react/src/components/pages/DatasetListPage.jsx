import React from 'react'
import {
  Container
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import { DatasetList, PageBanner } from '../utils'

/**
 * Page to list all datasets
 * @component
 * @author Jimmy Messmer
 */
class DatasetListPage extends React.Component {
  render () {
    return (
      <div className='dataset-list'>
        <MetaTags>
          <title>Available Datasets -- FFIND</title>
          <meta name='description' content='List of datasets available to view in FFIND' />
        </MetaTags>
        <PageBanner>
          <h1>Explore Data Collections</h1>
          <p className='text-larger'>Collections are standalone sets of data, such as images or other outputs, which can each have specific attributes. For more information about a collection’s origin, please click on <em>Collection Details</em>. Appropriate citations and authorship are provided where possible.</p>
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
                    <h1>Explore Data Collections</h1>
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

export default DatasetListPage
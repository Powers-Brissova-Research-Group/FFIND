import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import { Link } from 'react-router-dom'

import PageBanner from './pancreatlas/PageBanner'

export default class About extends React.Component {
  render () {
    return (
      <div className='about'>
        <MetaTags>
          <title>About Pancreatlas</title>
          <meta name='description' content='What is the Pancreatlas project?' />
        </MetaTags>
        {/* <Header heading="About" /> */}
        <PageBanner image bgImg={require('./assets/about-header.jpg')}>
          <h1>About Pancreatlas</h1>
          <p className='text-larger'>Our goal is to organize and make accessible a subset of the rich, full-resolution images of human pancreas samples. By connecting images from several independent programs and efforts, we have created a practical resource to elevate and accelerate scientific study of the human pancreas.</p>
        </PageBanner>
        <Container className='v-padded'>
          <Row className='mb-4'>
            <Col md='12'>
              <p> Immunohistochemical analyses have been performed on the human pancreas for over a decade, but until now the field has lacked a central image repository. Pancreatlas was born out of the desire to share full-resolution, multi-channel imaging data – and our hope is that it becomes a practical and useful resource for researchers around the world.</p>
              <p>Images are housed within Collections that are organized by specific disease phenotype, biological event, or scientific program. Where possible, we have provided the appropriate citations, tissue processing details, and authorship. All images include metadata in standardized nomenclature that you can read more about <Link to='/nomenclature'>here</Link>.</p>
            </Col>
          </Row>
          <Row className='mb-4'>
            <Col md='12'>
              <h1 className='mt-4'>The Pancreatlas Team</h1>
              <Row className='mb-4'>
                <Col md='2' className='text-center'>
                  <img className='img-fluid rounded-circle team-member-img' src={require('./assets/pancreatlas/credits/jimmy.jpg')} alt='Jimmy Messmer' />
                </Col>
                <Col md='8' className='mb-auto mt-auto'>
                  <h4>Jimmy Messmer, B.S. &bull; <em>Senior Developer</em></h4>
                  <p>The brains behind our beautiful application, Jimmy creates an intuitive web experience that allow users to filter and preview images with ease. His computer science training and fluency in programming have been instrumental in bringing Pancreatlas to life.</p>
                </Col>
              </Row>
              <Row className='mb-4'>
                <Col md='2' className='text-center'>
                  <img className='img-fluid rounded-circle team-member-img' src={require('./assets/pancreatlas/credits/jp.jpg')} alt='JP Cartailler' />
                </Col>
                <Col md='8' className='mb-auto mt-auto'>
                  <h4>JP Cartailler, Ph.D. &bull; <em>Chief Technology Officer</em></h4>
                  <p>With an extensive background in database development and experience working with interdisciplinary teams, JP saw the opportunity for this imaging platform and worked tirelessly to make it a reality. In addition to wrangling the necessary IT support and resources to keep everything running smoothly, he provides key leadership in the areas of application development and connectivity.</p>
                </Col>
              </Row>
              <Row className='mb-4'>
                <Col md='2' className='text-center'>
                  <img className='img-fluid rounded-circle team-member-img' src={require('./assets/pancreatlas/credits/diane.jpg')} alt='Diane Saunders' />
                </Col>
                <Col md='8' className='mb-auto mt-auto'>
                  <h4>Diane Saunders, Ph.D. &bull; <em>Lead Curator</em></h4>
                  <p>Diane’s research interest in juvenile pancreas development, as well as her love of beautiful images, fed naturally into the conception of “mapping” the human pancreas. As the main scientist on the Pancreatlas team, Diane reviews and prepares image collections for publication, ensuring that all data and metadata meets our quality standards. She is also responsible for written content and related communications. </p>
                </Col>
              </Row>
              <Row className='mb-4'>
                <Col md='2' className='text-center'>
                  <img className='img-fluid rounded-circle team-member-img' src={require('./assets/pancreatlas/credits/marcela.png')} alt='Marcela Brissova' />
                </Col>
                <Col md='8' className='mb-auto mt-auto'>
                  <h4>Marcela Brissova, Ph.D. &bull; <em>Scientific Director</em></h4>
                  <p>Marcela’s expertise and leadership in the field of human pancreas and islet biology has been essential to the creation of Pancreatlas. She is the driver of important organizational decisions and overall direction, and she serves as the interface between a number of collaborative efforts to share scientific data and knowledge about the human pancreas.</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mb-4'>
            <Col md='12'>
              <h1>Credits</h1>
              <p>Pancreas and islet schematics on the homepage are courtesy of <strong>Rachel Chandler</strong>, a talented biomedical illustrator who worked with our team at Vanderbilt. <strong>Diane Saunders</strong> created the Pancreatlas logo.</p>
              <p>Pancreatlas depends on the OMERO-Plus software licensed from <a href='https://wwww.glencoesoftware.com'>Glencoe Software</a>. We are especially grateful to <strong>Dr. Jason Swedlow</strong> and <strong>Emil Rozbicki</strong> of Glencoe for their technical expertise and collaboration.</p>
            </Col>
          </Row>
          <Row className='mb-4'>
            <Col md='12'>
              <h1>FAQ</h1>
              <p><strong>Do I need an account to view/access images?</strong></p>
              <p className='mb-4'>No registration is required to access images. We are committed to making data publicly available.</p>
              <p><strong>Can I download images for analysis?</strong></p>
              <p className='mb-4'>At this time, we do not have the capability to offer downloads. If you are interested in seeing this feature added in a future version of Pancreatlas, please send your feedback <a href='mailto:diane.saunders@vumc.org'>here</a>.</p>
              <p><strong>Can I upload my own images to Pancreatlas?</strong></p>
              <p>Pancreatlas is a curated resource, and since our goal is to provide a trustworthy reference for human pancreatic architecture, we have chosen to limit content accordingly. If you have images that you feel would be appropriate, we would love to discuss the possibility of including them. Please <a href='mailto:diane.saunders@vumc.org'>get in touch</a> for more information.</p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

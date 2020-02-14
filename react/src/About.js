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
        <PageBanner image bgImg={require('./assets/pancreatlas/headers/about-header.jpg')}>
          <h1>About Pancreatlas</h1>
          <p className='text-larger'>Our goal is to organize and make accessible full-resolution images from a diverse array of human pancreas samples. By connecting images from several independent programs and efforts, we have created a practical resource to elevate and accelerate scientific study of the human pancreas.</p>
        </PageBanner>
        <Container className='v-padded'>
          <Row className='mb-4'>
            <Col md='12'>
              <div>
                <p>Since the human pancreas cannot be safely biopsied, the research community has long relied on pancreatic tissues from cadaveric donors to understand the molecular and cellular processes of pancreatic development and disease. Such studies generate a wealth of complex images from multiple experimental modalities; however, many of these images are condensed into small, static figures for publication and contain substantial data that cannot be included at all, thus never becoming widely available to the scientific community. Furthermore, comprehensive image datasets of the human pancreas over the lifespan are not available to investigators working to understand human diabetes or the origins of pancreatic cancer. The <a href='https://www.powersresearch.org/'>Powers and Brissova Research Group</a> at Vanderbilt, one of several groups investigating the human pancreas, recognized these unmet needs for a comprehensive atlas of the human pancreas and more sophisticated management and dissemination of imaging data. Supported by The Leona M. and Harry B. Helmsley Charitable Trust, the Human Islet Research Network, the NIDDK, and the JDRF, a multidisciplinary team at Vanderbilt has developed the online resource Pancreatlas&trade;.</p>
                <p>The goal is to provide the scientific community with easily accessible, detailed, comprehensive images of the human pancreas with the hope that this will advance our understanding of diseases such as diabetes, pancreatic cancer, and pancreatitis. Pancreatlas was built on the principles of automation/scalability, customization, and ease of use. By housing images in <Link to='/datasets'>Collections</Link> we provide curated points of entry to large image data sets; our filtering menus allow users to view and refine images based on multiple variables of interest. Additionally, we have integrated <Link to='nomenclature'>metadata annotations</Link> into images to provide information about the human samples and to encourage standardized nomenclature within the field.</p>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid className='shaded'>

          <Container>
            <Row className='mb-4'>
              <Col md='12'>
                <h1 className='mt-4'>The Pancreatlas Team at Vanderbilt</h1>
                <Row className='mt-4 mb-4'>
                  <Col md='2' className='text-center'>
                    <img className='img-fluid rounded-circle team-member-img' src={require('./assets/pancreatlas/credits/diane.jpg')} alt='Diane Saunders' />
                  </Col>
                  <Col md='8' className='mb-auto mt-auto'>
                    <h4>Diane Saunders, Ph.D. &bull; <em>Co-Scientific Director</em></h4>
                    <p>Diane’s research interest in juvenile pancreas development, as well as her love of beautiful images, fed naturally into the conception of “mapping” the human pancreas. As the scientific coordinator of the Pancreatlas team, Diane generates, reviews, and prepares image collections for publication, ensuring that all data and metadata meets our quality standards. She is also responsible for written content and related communications.</p>
                  </Col>
                </Row>
                <Row className='mb-4'>
                  <Col md='2' className='text-center'>
                    <img className='img-fluid rounded-circle team-member-img' src={require('./assets/pancreatlas/credits/marcela.png')} alt='Marcela Brissova' />
                  </Col>
                  <Col md='8' className='mb-auto mt-auto'>
                    <h4>Marcela Brissova, Ph.D. &bull; <em>Co-Scientific Director</em></h4>
                    <p>Marcela’s expertise and leadership in the field of human pancreas and islet biology has been essential to the creation of Pancreatlas. She is the driver of important organizational decisions and overall direction, and she serves as the interface between a number of collaborative efforts to share scientific data and knowledge about the human pancreas.</p>
                  </Col>
                </Row>
                <Row className='mb-4'>
                  <Col md='2' className='text-center'>
                    <img className='img-fluid rounded-circle team-member-img' src={require('./assets/pancreatlas/credits/jp.jpg')} alt='JP Cartailler' />
                  </Col>
                  <Col md='8' className='mb-auto mt-auto'>
                    <h4>JP Cartailler, Ph.D. &bull; <em>Director, Creative Data Solutions</em></h4>
                    <p>With an extensive background in systems development and bioinformatics, JP helped envision the multidisciplinary opportunity for this imaging platform and worked tirelessly to make it a reality. In addition to wrangling the necessary IT infrastructure  to provide a flexible and scalable environment, he provides key leadership in the areas of application development and systems integration.</p>
                  </Col>
                </Row>
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
                    <img className='img-fluid rounded-circle team-member-img' src={require('./assets/pancreatlas/credits/al.jpg')} alt='Alvin Powers' />
                  </Col>
                  <Col md='8'>
                    <h4>Alvin Powers, M.D. &bull; <em>Consultant</em></h4>
                    <p>Al, a physician-scientist interested in the role of the pancreatic islet in human diabetes, co-leads the Powers and Brissova Research Group at Vanderbilt. This group is working to define the molecular and cellular changes in the pancreas of individuals with diabetes (type 1, type 2, cystic fibrosis-related, and monogenic). Al also directs the <a href='https://www.vumc.org/diabetescenter/'>Vanderbilt Diabetes Center</a>, which provides critical administrative support for Pancreatlas.</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container>
          <Row className='my-4'>
            <Col md='12'>
              <h1>Credits</h1>
              <p>We thank <a href='https://helmsleytrust.org/'>The Leona M. and Harry B. Helmsley Charitable Trust</a>, the <a href='https://hirnetwork.org/'>Human Islet Research Network</a>, (DK104211, DK108120, DK112232, DK106755), the <a href='https://www.jdrf.org/'>JDRF</a>, and the <a href='https://www.vumc.org/diabetescenter/'>Vanderbilt Diabetes Center</a> and <a href='https://www.vumc.org/diabetescenter/DRTC'>Vanderbilt Diabetes Research and Training Center</a> (DK20593) for project support.</p>
              <p>Images were acquired in part through use of the <a href='http://cisrweb.mc.vanderbilt.edu/CISR/'> Vanderbilt Imaging Shared Resource</a> (supported by NIH grants CA68485, DK20593, DK58404, DK59637, and EY08126) and the <a href='https://labnodes.vanderbilt.edu/community/profile/id/2228'>Islet Procurement and Analysis Core</a> of the Vanderbilt Diabetes Research and Training Center (DK20593).</p>
              <p>We are grateful to the following users who provided feedback and/or beta testing of the website: Dr. Irina Kusmartseva and Maria Beery (University of Florida/<a href='https://www.jdrfnpod.org/contact-us/'>nPod</a>); Dr. Maria Golson (Johns Hopkins); <a href='https://medicine.iu.edu/faculty/26337/linnemann-amelia/'>Dr. Amelia Linnemann</a> (Indiana); Heather Durai, Radhika Aramandla, and Greg Poffenberger (VUMC)</p>
              <p>Pancreas and islet schematics on the homepage are courtesy of <strong>Rachel Chandler</strong>, a talented biomedical illustrator who worked with our team at Vanderbilt. <strong>Diane Saunders</strong> created the Pancreatlas logo.</p>
              <p>Pancreatlas depends on the OMERO-Plus and PathViewer software licensed from <a href='https://wwww.glencoesoftware.com'>Glencoe Software</a>. We are especially grateful to <strong>Dr. Jason Swedlow</strong> and <strong>Emil Rozbicki</strong> of Glencoe for their technical expertise and collaboration.</p>
            </Col>
          </Row>
        </Container>
        <Container fluid className='shaded'>
          <Container>
            <Row>
              <Col md='12' className='my-4'>
                <h1 className='my-4'>FAQ</h1>
                <h5><strong>Do I need an account to view/access images?</strong></h5>
                <p className='mb-4'>No registration is required to access images. We are committed to making data publicly available.</p>
                <h5><strong>Can I download images for analysis?</strong></h5>
                <p className='mb-4'>At this time, we do not have the capability to offer downloads. If you are interested in seeing this feature added in a future version of Pancreatlas, please send your feedback <a href='mailto:pancreatlas@vumc.org'>here</a>.</p>
                <h5><strong>Can I upload my own images to Pancreatlas?</strong></h5>
                <p className='mb-4'>Pancreatlas is a curated resource, and since our initial goal is to provide a reference for human pancreatic architecture, we have chosen to limit content at this time. If you have images that you feel would be appropriate, we would love to discuss the possibility of including them. Please <a href='mailto:diane.saunders@vumc.org'>get in touch</a> for more information.</p>
                <h5><strong>How do I reference Pancreatlas?</strong></h5>
                <p className='mb-4'>Please see our <Link to='/data-usage'>Data Usage and Citation Policy</Link>.</p>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    )
  }
}

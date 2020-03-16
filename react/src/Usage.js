import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import PageBanner from './pancreatlas/PageBanner'

import DoiFigure from './assets/DOI_figure.png'

export default class About extends React.Component {
  render() {
    return (
      <div className='usage'>
        <MetaTags>
          <title>About Pancreatlas</title>
          <meta name='description' content='Pancreatlas data usage and citation policy' />
        </MetaTags>
        {/* <Header heading="About" /> */}
        <PageBanner image bgImg={require('./assets/pancreatlas/headers/data-usage-header.png')}>
          <h1>Data Usage and Citation Policy</h1>
          <p className='text-larger'>In order to ensure the fair usage of the data presented in Pancreatlas, we ask for your cooperation with the policies outlined here. If you have any questions, do not hesitate to contact us at <a href="mailto:pancreatlas@vumc.org" className='link-light'>pancreatlas@vumc.org</a>.</p>
        </PageBanner>
        <Container className='v-padded'>
          <Row className='mb-4'>
            <Col md='12'>
              <div style={{ fontSize: '1.125rem' }}>
                <p>By using this resource, you agree to the following terms:</p>
                <ul>
                  <li>Your use must be for research or other noncommercial purposes and must be in compliance with all applicable federal, state and local laws and regulations.</li>
                  <li>You acknowledge the Disclaimers provided below, and you agree that you will not use the resource or its data in any way to violate the rights, including copyright, trademark, and trade secret, right of privacy, right of publicity, or other rights of any individual or entity.</li>
                  <li>When referencing content from Pancreatlas, you will follow the Citation Guidelines, or, if your use falls outside of cases described, you will provide proper attribution of the source in accordance with applicable academic and/or industry customs and standards.</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid className='shaded'>
          <Container>
            <Row>
              <Col md='12' className='my-4'>
                <h1 className='my-4'>Citation Guidelines</h1>
                <div style={{ fontSize: '1.125rem' }}>
                  <p>To ensure continued funding for this resource, we kindly request that you cite Pancreatlas and include its URL (<a href='https://www.pancreatlas.org'>http://www.pancreatlas.org</a>) when you reference or display the resource or its contents in any form (including, but not limited to: print or web publications, presentations, grant applications, websites, social media posts).</p>
                  <p>If referencing <strong>individual images</strong>, include image DOI where applicable (DOI is listed on Image Preview and within Annotations menu in PathViewer).</p>
                  <div className='my-4 d-flex justify-content-center'>
                    <img src={DoiFigure} style={{maxWidth: '75%'}} className='img-fill' alt='DOI Figure' />
                  </div>
                  <p>If referencing <strong>groups of images</strong>, please give Collection name and associated RRID (where applicable).</p>
                </div>
                <p><em>* Because some images in Pancreatlas are already published, and the sources of other images may change and evolve, please be aware of varied citation requirements for individual images or collections. Citations for currently published collections (v1.1) are provided for convenience below.</em></p>
                <p>
                  <div><strong>Cystic Fibrosis-Related Diabetes (CFRD)</strong></div>
                  <div>Hart NJ et al., 2018. Cystic fibrosis-related diabetes is caused by islet loss and inflammation.</div>
                  <div>JCI Insight. PubMed:29669939</div>
                  <div>DOI:10.1172/jci.insight.98240</div>
                </p>
                <p>
                  <div><strong>nPOD case #6362</strong></div>
                  <div>URL: <a href='https://www.jdrfnpod.org'>http://www.jdrfnpod.org</a></div>
                  <div>RRID: SCR_014641</div>
                  <div>Please note: <a href='https://www.jdrfnpod.org/publications/policies/'>nPOD Publication Policies</a></div>
                </p>
                <p>
                  <div><strong>Human Pancreas Analysis Program</strong></div>
                  <div>URL: <a href='https://hpap.pmacs.upenn.edu/'>https://hpap.pmacs.upenn.edu/</a></div>
                  <div>RRID: SCR_016202</div>
                  <div>Please note: HPAP <a href='https://hpap.pmacs.upenn.edu/user-agreement'>User Agreement</a> and <a href='https://hpap.pmacs.upenn.edu/citation'>Citation Policy</a></div>
                </p>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container>
          <Row>
            <Col md='12' className='my-4'>
              <h1 className='my-4'>Disclaimers</h1>
              <div style={{ fontSize: '1.125rem' }}>
                <p>Data are provided with no warranties, express or implied, including warranties of merchantability; warranties of fitness for a particular purpose; warranties of identity, ownership, quality, accuracy, or completeness of data; or warranties that the use of data will not infringe any patent, intellectual property, or proprietary rights of any party.</p>
                <p>Data providers and Pancreatlas funders do not individually or collectively make any representations that data or analyses available are suitable for human diagnostic purposes, for informing treatment decisions, or for any other purposes and accept no responsibility or liability whatsoever for such use.</p>
                <p>Pancreatlas contains links to third-party websites. These are provided as a convenience to users and their contents are not the responsibility of data providers or Pancreatlas funders.</p>
              </div>
              <p>
                <hr />
                <div><em>This policy is in draft form and was developed in part through the review of policies from related programs: Human Pancreas Analysis Program of the Human Islet Research Network (RRID:SCR_014393; <a href='https://hirnetwork.org'>https://hirnetwork.org</a>), The Human Protein Atlas (RRID:SCR_006710; <a href='https://www.proteinatlas.org'>http://www.proteinatlas.org</a>), and The Allen Brain Map (RRID:SCR_017001; <a href='https://portal.brain-map.org/'>https://portal.brain-map.org/</a>).</em></div>
              </p>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}

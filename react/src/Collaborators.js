import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

import TeamMember from './TeamMember'
import MapPicture from './assets/map-collaborations6.png'

export default class Collaborators extends React.Component {
  render () {
    return (
      <div className='collaborators'>
        <MetaTags>
          <title>Collaborators -- Pancreatlas / HANDEL-P</title>
          <meta name='description' content='Who is working together to create the HANDEL-P project?' />
        </MetaTags>
        {/* <Header heading="Collaborators" subheading="Creating multi-disciplinary expert groups" /> */}
        <Container fluid>
          <Container>
            <Row className='v-padded'>
              <Col md='6'>
                <h1>Creating Connections</h1>
                <p style={{ fontSize: '1.5rem' }}>We are cross-pollinating numerous activities and programs to develop new ideas that accelerate diabetes research, education and clinical care.</p>
                <p style={{ fontSize: '1.5rem' }}>If you are interested in collaborating with us&mdash;either by accessing tissue samples or contributing images&mdash;please get in touch!</p>
              </Col>
              <Col md='6'>
                <img src={MapPicture} alt='Collaborators map' className='img-fill' />
              </Col>
            </Row>
          </Container>
        </Container>

        <Container fluid className='shaded'>

          <Container className='v-padded'>
            <h2 className='mb-3'><span>Meet the investigators</span></h2>
            <Row className='mt-2'>
              <Col md='4'>
                <TeamMember
                  name='Mark Atkinson, Ph.D.'
                  institution='University of Florida'
                  imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/mark-atkinson.jpg'
                  site='https://diabetes.ufl.edu/atkinson-lab/'
                  email='mailto:atkinson@pathology.ufl.edu'
                  phone='tel:352-273-8277'>
                    Dr. Atkinson is a longtime champion of type 1 diabetes research, serving the community in numerous leadership roles throughout his career. His lab seeksto directly define methods for disease prevention in non-diabetic subjects identified to be at increased risk for the disease, in association with novel forms of immunotherapy.
                </TeamMember>
              </Col>
              <Col md='4'>
                <TeamMember
                  name='Rita Bottino, Ph.D.'
                  institution='Allegheny Health Network'
                  imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/rita-bottino.jpg'
                  site='https://www.ahn.org/research/our-research-institutes/cellular-therapeutics/our-team'
                  email='mailto:rita.bottino@ahn.org'
                  phone='tel:412-512-6496'>
                    Dr. Bottino leads a world-class islet isolation center that provides human islets for both clinical transplants and research. Her highly experienced team has established reference protocols and best practices for human islet isolation, processing thousands of organs with an array of disease phenotypes.
                </TeamMember>
              </Col>
              <Col md='4'>
                <TeamMember
                  name='Marcela Brissova, Ph.D.'
                  institution='Vanderbilt University'
                  imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/marcela-brissova.jpg'
                  site='https://medicine.mc.vanderbilt.edu/person/marcela-brissova-phd'
                  email='mailto:marcela.brissova@vanderbilt.edu'
                  phone='tel:615-936-1729'>
                    Dr. Brissova directs the Human Islet Phenotyping Program (HIPP) of the <a href='https://iidp.coh.org/'>Integrated Islet Distribution Program (IIDP)</a>, with particular expertise in functional islet phenotyping and immunohistochemistry. Her research interests include human pancreatic development, islet vascularization, and translation of transgenic mouse models to human islet biology.
                </TeamMember>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col md='4'>
                <TeamMember
                  name='Seung Kim, Ph.D.'
                  institution='Stanford University'
                  imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/seung-kim.jpg'
                  site='https://seungkimlab.stanford.edu/'
                  email='mailto:seungkim@stanford.edu'
                  phone='tel:650-723-6230'>
                    Dr. Kim leads diabetes research efforts at Stanford, having pioneered numerous approaches to create, expand, and regenerate islets. Dr. Kim’s group performs sophisticated molecular and cellular analyses to elucidate mechanisms that underlie pancreatic development and growth, with the aim of developing diagnostic and therapeutic paradigms for human disease.
                </TeamMember>
              </Col>
              <Col md='4'>
                <TeamMember
                  name='Al Powers, M.D.'
                  institution='Vanderbilt University'
                  imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/al-powers.jpg'
                  site='https://www.powersresearch.org/'
                  email='mailto:al.powers@vanderbilt.edu'
                  phone='tel:615-936-7678'>
                    Dr. Powers, a president emeritus of the American Diabetes Association (ADA), is committed to cross-institutional efforts for integrated, multi-modal analyses of donor pancreata. His group seeks to understand and reverse &beta; cell and islet dysfunction in type 1 and type 2 diabetes, studying human islets in both <em>in vitro</em> and <em>in vivo</em> settings.
                </TeamMember>
              </Col>
              <Col md='4'>
                <TeamMember
                  name='Chris Wright, Ph.D.'
                  institution='Vanderbilt University'
                  imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/chris-wright.jpg'
                  site='https://lab.vanderbilt.edu/wright-lab/'
                  email='mailto:chris.wright@vanderbilt.Edu'
                  phone='tel:615-343-8256'>
                    Dr. Wright leads a research group focused on early embryonic development and organogenesis, with particular interests in cell ontogeny and plasticity. Employing a combination of molecular and genetic techniques, his team works to detail intracellular signaling pathways critical to pancreas formation and maintenance.
                </TeamMember>
              </Col>
            </Row>
          </Container>
        </Container>

      </div>
    )
  }
}

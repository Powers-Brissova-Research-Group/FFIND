import React from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

import MetaTags from 'react-meta-tags'

import { PageBanner, TeamMember } from '../utils'
import MapPicture from '../../assets/map-collaborations.png'

export default class Collaborators extends React.Component {
  render () {
    return (
      <div className='collaborators'>
        <MetaTags>
          <title>Contributors -- Pancreatlas</title>
          <meta name='description' content='Who is working together to create the HANDEL-P project?' />
        </MetaTags>
        {/* <Header heading="Collaborators" subheading="Creating multi-disciplinary expert groups" /> */}
        <PageBanner image bgImg={require('../../assets/pancreatlas/headers/collaborators-header.jpg')}>
          <h1>Contributors</h1>
          <p className='text-larger'>The images displayed in our <Link className='link-light' to='/datasets'>Collections</Link> are the result of team-based efforts around the country. We are grateful to Pancreatlas investigators for their scientific contributions and support of this project.</p>
        </PageBanner>
        <Container className='v-padded'>
          <h2 className='mb-3'><span>Meet our Contributors</span></h2>
          <Row className='mt-2'>
            <Col md='4'>
              <TeamMember
                name='Mark Atkinson, Ph.D.'
                institution='University of Florida'
                imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/mark-atkinson.jpg'
                site='https://diabetes.ufl.edu/atkinson-lab/'
                email='mailto:atkinson@pathology.ufl.edu'
                phone='tel:352-273-8277'>
                    Dr. Atkinson is a longtime champion of type 1 diabetes research, serving the community in numerous leadership roles, including as the Executive Director of <a href='https://www.jdrfnpod.org/'>nPOD</a> (<a href='https://dev7-pancreatlas.app.vumc.org/datasets/525/overview'>nPOD Image Collection</a>). His lab seeks to define methods for disease prevention in non-diabetic subjects identified to be at increased risk for the disease, in association with novel forms of immunotherapy.
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
                institution='Vanderbilt University Medical Center'
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
                name='Nathaniel Hart, Ph.D.'
                institution='Vanderbilt University Medical Center'
                imgSrc={require('../../assets/pancreatlas/contributors/nathaniel-hart.jpg')}
                site=''
                email='mailto:njhart@email.arizona.edu'
                phone='tel:520-626-7754'
              >
                  While at Vanderbilt, Dr. Hart performed in-depth compositional and genetic studies of pancreata from individuals with cystic fibrosis-related diabetes (<Link to='datasets/410/overview'>CFRD Image Collection</Link>) Additionally, his work characterizing islet architectural changes during human pancreas development laid the groundwork for the <Link to='/datasets/459/overview'>HANDEL-P</Link> project In 2018 Dr. Hart joined the Department of Surgery at The University of Arizona College of Medicine.
              </TeamMember>
            </Col>
            <Col md='4'>
              <TeamMember
                name='Klaus Kaestner, Ph.D.'
                institution='University of Pennsylvania'
                imgSrc={require('../../assets/pancreatlas/contributors/klaus-kaestner.jpg')}
                site='https://www.med.upenn.edu/kaestnerlab/'
                email='mailto:kaestner@mail.med.upenn.edu'
                phone='tel:215-898-8759'
              >
                  Dr. Kaestner, an investigator in the Department of Genetics and Institute for Diabetes, Obesity, and Metabolism at the University of Pennsylvania, leads the HIRN Human Pancreas Analysis Program  for type 1 diabetes (<Link to='/datasets/508/overview'>HPAP Image Collection</Link>) His group uses genetic, genomic, and epigenomic tools to study organogenesis and physiology of the liver, pancreas, and gastrointestinal tract.
              </TeamMember>
            </Col>
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
          </Row>
          <Row className='mt-2'>
            <Col md='4'>
              <TeamMember
                name='Fong Cheng Pan, Ph.D.'
                institution='Vanderbilt University Medical Center'
                imgSrc={require('../../assets/pancreatlas/contributors/pan-fong.jpg')}
                site=''
                email='mailto:fcp2002@med.cornell.edu'
                phone='tel:212-746-5145'
              >
                Dr. Fong Cheng Pan previously studied genetic regulatory networks and intercellular signaling pathways in pancreatic cell differentiation as part of Dr. Christopher Wright’s group at Vanderbilt. She has since become a Research Assistant Professor of Cell and Developmental Biology at Weill Cornell Medical College, where she focuses on metastasis of pancreatic cancer.
              </TeamMember>
            </Col>
            <Col md='4'>
              <TeamMember
                name='Alvin Powers, M.D.'
                institution='Vanderbilt University'
                imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/al-powers.jpg'
                site='https://www.powersbrissovaresearch.org/'
                email='mailto:al.powers@vanderbilt.edu'
                phone='tel:615-936-7678'
              >
                Dr. Powers, a physician-scientist interested in the role of the pancreatic islet in human diabetes, co-leads the Powers and Brissova Research Group at Vanderbilt. This group is working to define the molecular and cellular changes in the pancreas of individuals with diabetes (type 1, type 2, cystic fibrosis-related, and monogenic). Dr. Powers also directs the <a href='https://www.vumc.org/diabetescenter/'>Vanderbilt Diabetes Center</a>, which provides critical administrative support for Pancreatlas.
              </TeamMember>
            </Col>
            <Col md='4'>
              <TeamMember
                name='Diane Saunders, Ph.D.'
                institution='Vanderbilt University Medical Center'
                imgSrc={require('../../assets/pancreatlas/contributors/diane-saunders.jpg')}
                site=''
                email='mailto:diane.saunders@vumc.org'
                phone='tel:615-936-1672'
              >
                Dr. Saunders leads efforts in multiplexed imaging and characterization of the young human pancreas (<Link to='/datasets/459/overview'>HANDEL-P</Link> Image Collection) as part of the Powers and Brissova Research Group. In addition, she coordinates the Vanderbilt Pancreatlas team and works with all contributors to ensure images are uploaded and annotated accurately.
              </TeamMember>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md='4'>
              <TeamMember
                name='Christopher Wright, Ph.D.'
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

        <Container fluid className='shaded'>
          <Container fluid>
            <Container>
              <Row className='v-padded'>
                <Col md='6'>
                  <h1 className='py-4'>Creating Connections</h1>
                  <p style={{ fontSize: '1.5rem' }}>We are cross-pollinating numerous activities and programs to develop new ideas that accelerate diabetes research, education and clinical care.</p>
                  <p style={{ fontSize: '1.5rem' }}>If you are interested in collaborating with us &mdash; either by accessing tissue samples or contributing images &mdash; please <a href='mailto:pancreatlas@vumc.org'>get in touch</a>!</p>
                </Col>
                <Col md='6'>
                  <img src={MapPicture} alt='Collaborators map' className='img-fill' />
                </Col>
              </Row>
            </Container>
          </Container>

        </Container>

      </div>
    )
  }
}

import React from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import Header from './Header';
import TeamMember from './TeamMember';
import MapPicture from './assets/map-collaborations6.png';


export default class Collaborators extends React.Component {
  render() {
    return (
      <div className="collaborators">
        <Header heading="Collaborators" subheading="Creating multi-disciplinary expert groups" />
        <Container fluid className='shaded'>
          <Container>
            <Row className='v-padded'>
              <Col md="6">
                <h3>Creating new</h3>
                <h1>Connections</h1>
                <p>We are cross-pollinating numerous activities and programs to develop new ideas and endeavors on diabetes research, education and clinical care.</p>
                <p>A major strategy of this effort is to branch out to those with novel ideas and approaches in order to and share knowledge, technologies and developments that can more rapidly help us understand the underpinnings of diabetes in people.</p>
              </Col>
              <Col md="6">
                <img src={MapPicture} alt='Collaborators map' className='img-fill' />
              </Col>
            </Row>
          </Container>
        </Container>
        <Container className='v-padded'>
          <h5><span>Meet the investigators</span></h5>
          <h2>Accelerating discovery by teaming up</h2>
          <Row>
            <Col md="4">
              <TeamMember name='Mark Atkinson' institution='University of Florida' desc='Our laboratory seeks to directly define methods for disease prevention in non-diabetic subjects identified to be at increased risk for the disease or diabetic subjects through pancreatic transplantation in association with novel forms of immunotherapy.' imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/mark-atkinson.jpg' site='http://pathology.ufl.edu/faculty/experimental-pathology/mark-a-atkinson/' email='mailto:atkinson@pathology.ufl.edu?subject=Inquiry via Collaboration on Human Islets and Diabetes' phone='tel:352-273-8277'/>
            </Col>
            <Col md="4">
              <TeamMember name='Rita Bottino' institution='Allegheny General Hospital, Pittsburgh' imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/rita-bottino.jpg' site='https://www.ahn.org/research/our-research-institutes/cellular-therapeutics/our-team' email='mailto:rita.bottino@ahn.org?subject=Inquiry via Collaboration on Human Islets and Diabetes' phone='tel:412-512-6496' desc='Our team is a reference laboratory for the isolation and distribution is islets of Langerhans obtained from the pancreas of deceased organ donors for research purposes' />
            </Col>
            <Col md="4">  
              <TeamMember name='Marcela Brissova' institution='Vanderbilt University Medical Center' imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/marcela-brissova.jpg' site='https://labnodes.vanderbilt.edu/member/profile/id/10427' email='mailto:marcela.brissova@vanderbilt.edu?subject=Inquiry via Collaboration on Human Islets and Diabetes' phone='tel:615-936-1729' desc='Our research interests include the biology of pancreatic islets with a focus on the regulation of beta cell gene expression to provide insight into processes controlling normal pancreatic beta cell function in rodent models and translating this research to human islet biology.' />
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <TeamMember name='Chunhua Dai' institution='Vanderbilt University Medical Center' imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/chunhua-dai.jpg' site='https://faculty.mc.vanderbilt.edu/Faculty/Details/34956' email='mailto:chunhua.dai@vanderbilt.edu?subject=Inquiry via Collaboration on Human Islets and Diabetes' phone='tel:615-936-7678' desc='Our research is focused on the molecular, cellular, and vascular changes in human islets when they are challenged with hyperglycemia and/or insulin resistance in vivo.' />
            </Col>
            <Col md="4">
              <TeamMember name='Seung Kim' institution='Stanford University' imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/seung-kim.jpg' site='http://seungkimlab.stanford.edu/' email='mailto:seungkim@stanford.edu?subject=Inquiry via Collaboration on Human Islets and Diabetes' phone='tel:650-723-6230' desc='The Kim lab studies islet and pancreas biology with the aim of developing diagnostic and therapeutic paradigms for human diseases.' />        
            </Col>            
            <Col md="4">
              <TeamMember name='Al Powers' institution='Vanderbilt University Medical Center' imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/al-powers.jpg' site='https://www.powersresearch.org/' email='mailto:al.powers@vanderbilt.edu?subject=Inquiry via Collaboration on Human Islets and Diabetes' phone='tel:615-936-7678' desc='The Powers lab seeks to understand and reverse β-cell and islet abnormalities and dysfunction in type 1 and type 2 diabetes.' />
            </Col>              
          </Row>
          <Row>
            <Col md="4">
              <TeamMember name='Chris Wright' institution='Vanderbilt University Medical Center' imgSrc='https://dev8-labnodes.app.vanderbilt.edu/assets/handelp/media/chris-wright.jpg' site='https://medschool.vanderbilt.edu/wright-lab/' email='mailto:chris.wright@vanderbilt.Edu?subject=Inquiry via Collaboration on Human Islets and Diabetes' phone='tel:615-343-8256' desc='The Wright lab focuses on early embryonic development and organogenesis.' />
            </Col>
          </Row>
        </Container>
        <Container fluid className='v-padded shaded'>
          <h1>Support</h1>
        </Container>
      </div>
    );
  }
}
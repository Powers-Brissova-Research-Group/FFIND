import React from 'react'
import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap'

import MetaTags from 'react-meta-tags'

export default class Diabetes extends React.Component {
  render () {
    return (
      <div className='diabetes'>
        <MetaTags>
          <title>Why Study Diabetes -- Pancreatlas / HANDEL-P</title>
          <meta name='description' content='Learn all about diabetes on this page in the HANDEL-P site.' />
        </MetaTags>
        {/* <Header heading="Diabetes" /> */}
        <Container className='v-padded'>
          <Row>
            <Col md='6'>
              <h1 className='section-heading'>What is diabetes?</h1>
              <p>Human and rodent islets differ substantially in architecture, cell composition, proliferative capacity, etc. While much of our current knowledge is based on decades of rodent studies, new efforts are needed to study human pancreas and isolated islets, such as CHIPS and the NIDDK-supported Human Islet Research Network (HIRN).</p>
              <p><img className='pull-left img-responsive img-thumbnail p-img' alt='placeholder' src='//placehold.it/200x150' />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas diam aliquam pulvinar sodales. Suspendisse potenti. Pellentesque vehicula ex non nibh rhoncus ultricies. Nullam a ex magna. In nisl elit, bibendum eget scelerisque sed, varius ut ipsum. Sed faucibus, elit ut ornare eleifend, augue sem ornare neque, id molestie orci ipsum at purus. Pellentesque rutrum, tortor sed maximus auctor, turpis libero placerat velit, eu fringilla ipsum libero sed augue. Sed quis sollicitudin nunc. Ut blandit feugiat est vel blandit. Donec blandit, ipsum vel mattis mollis, dolor ex gravida libero, nec ullamcorper est ipsum quis lorem. Mauris et commodo purus, in pretium magna. Phasellus volutpat efficitur dui, eu ultricies ligula consectetur eget. Proin leo augue, mollis et scelerisque eget, pretium ac felis.</p>
              <p>Cras quis mauris nunc. Integer egestas ligula vitae tortor efficitur, vel malesuada metus vulputate. Phasellus in lectus sapien. Etiam venenatis augue non turpis lobortis, sit amet ultricies risus venenatis. Donec aliquam mauris at felis facilisis euismod. Vestibulum eu quam ut purus viverra fringilla at sed metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris non volutpat ante, tincidunt elementum risus. Quisque pharetra facilisis elementum. Maecenas non viverra diam, ac placerat ex. Cras purus eros, molestie id metus in, dapibus porta tortor. Nunc erat dolor, finibus et tincidunt quis, feugiat a odio. Aenean quam dui, laoreet molestie dictum at, fermentum vel neque. Proin vel auctor neque.</p>
              <p>Nullam vel nisi in arcu eleifend mollis vel in ligula. Phasellus fringilla consectetur leo a suscipit. Donec a purus a lorem pellentesque bibendum. Aenean sagittis nisi sed commodo commodo. Sed eget laoreet ante. Quisque at mauris a ligula consectetur suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque consequat lorem nunc, id vehicula dui dignissim quis. Phasellus iaculis libero pretium consectetur feugiat. Sed faucibus metus ut scelerisque imperdiet. Phasellus feugiat sed neque in pellentesque. Curabitur in arcu dui. In tempus congue nulla eu semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ornare magna non eros tempus, ac hendrerit magna viverra. Maecenas mollis aliquet consectetur.</p>
              <p><img className='pull-left img-responsive img-thumbnail p-img' alt='placeholder' src='//placehold.it/200x150' />Proin suscipit pulvinar lorem nec venenatis. In blandit nibh nisl, in cursus dui tempor vitae. Aenean interdum lacinia tortor, in feugiat neque placerat non. Donec lobortis, mauris in molestie faucibus, mi orci vestibulum dolor, eu imperdiet mauris tellus at elit. Nunc ullamcorper et nibh ut faucibus. Phasellus congue, mauris sit amet commodo ullamcorper, quam tortor ultrices arcu, ac tristique quam velit ac nibh. Nullam malesuada sodales neque id blandit. Donec mollis aliquet sem non maximus. Donec non egestas mauris. Fusce pretium in justo nec viverra. Donec egestas sagittis enim, nec luctus dui mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam molestie urna lectus, convallis vulputate augue porta quis. Maecenas pellentesque mollis sapien, feugiat consequat nulla sagittis sed. Donec condimentum nibh eget dui porttitor, eu sodales odio ultricies. Praesent mollis felis quis dictum tincidunt.</p>
            </Col>
            <Col md='6'>
              <div className='embed-responsive embed-responsive-16by9'>
                <iframe className='embed-responsive-item' title='Diabetes Video' width='560' height='315' src='https://www.youtube-nocookie.com/embed/wmOW091P2ew?rel=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen />
              </div>
              <small className='pull-right'>Courtesy of <a href='https://www.cdc.gov/'>Centers for Disease Control and Prevention (CDC)</a></small>
              <h4>Links</h4>
              <ul>
                <li><a href='https://www.vanderbilthealth.com/diabetes/'>Vanderbilt Diabetes</a></li>
                <li><a href='https://labnodes.vanderbilt.edu/drtc'>Vanderbilt Diabetes Research and Training Center (DRTC)</a></li>
                <li><a href='https://www.trialnet.org/'>Type 1 Diabetes TrialNet</a></li>
                <li />
                <li />
                <li />
                <li />
              </ul>
              <h4>Classification of diabetes</h4>
              <ul>
                <li>Type 1</li>
                <li>Type 2</li>
                <li>Other types of diabetes</li>
                <li>Gestational</li>
              </ul>
              <Table>

                <thead>
                  <tr>
                    <th />
                    <th>Type 1 Diabetes</th>
                    <th>Type 2 Diabetes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Older terms</td>
                    <td>IDDM, JODM</td>
                    <td>NIDDM, AODM</td>
                  </tr>
                  <tr>
                    <td>Age of onset (yrs)</td>
                    <td>Usually &lt; 30</td>
                    <td>Usually &gt; 30</td>
                  </tr>
                  <tr>
                    <td>Ketosis</td>
                    <td>Yes</td>
                    <td>Rare</td>
                  </tr>
                  <tr>
                    <td>Body weight</td>
                    <td>Not obsese</td>
                    <td>Obsese (80%)</td>
                  </tr>
                  <tr>
                    <td>Prevalence</td>
                    <td>0.5%</td>
                    <td>2-10%</td>
                  </tr>
                  <tr>
                    <td>Treatment</td>
                    <td>Insulin</td>
                    <td>Diet, orals, insulin</td>
                  </tr>
                </tbody>
                <caption>(Src. Harrison's Textbook of Medicine, 19th edition, 2015)</caption>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

import React from 'react'
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap'
import {Link} from "react-router-dom";

export default class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  render() {
    return (
      <div>
        <Container className='banner-container'>
          <Row>
            <Col xs={8}>
              <div className='ffind-banner'>
                <h1 className="display-3 ffind-banner">{this.props.title}</h1>
                <p className='lead'>{this.props.subtitle}</p>
                <hr className="my-2" />
                <p>{this.props.description}</p>
              </div>
            </Col>
            <Col>
              <div className='ffind-banner'>
                <Link to='/explore-all-images'>
                  <Button color="primary" size="lg" block >Explore all data</Button>
                </Link>
                <br/>
                <p>This option allows you to query all collection entries at once. Filter attributes are combined into the same interface, hence it is most useful when datasets with common attributes are combined.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

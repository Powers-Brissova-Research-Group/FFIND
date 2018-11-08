import React from 'react'
import {
  Button,
  Container,
  Progress,
  Table
} from 'reactstrap'
import ImageMatrix from './ImageMatrix';

import Error from './Error'

export default class MatrixView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag1: null,
      tag2: null,
      toggled: false,
      tagsets: [],
      loaded: false,
      showMatrix: false,
      dsid: this.props.match.params.dsid
    }
    this.handleChange = this.handleChange.bind(this)
    this.showMatrix = this.showMatrix.bind(this)
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/tagsets`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          tagsets: result,
          loaded: true,
          tag1: result[0].set_name,
          tag2: result[0].set_name
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loaded: false,
          error: err
        })
      })
  }

  handleChange(event) {
    let key = event.target.id
    if (key === 'tag1') {
      this.setState({
        tag1: event.target.value
      })
    } else {
      this.setState({
        tag2: event.target.value
      })
    }

  }

  showMatrix() {
    this.setState({
      showMatrix: true
    })
  }

  setMatrix(t1, t2){
    this.setState({
      tag1: t1,
      tag2: t2,
      showMatrix: true
    })
  }

  render() {
    if (this.state.loaded) {
      if (!this.state.showMatrix) {
        return (
          <div className='matrix-view'> 
            <h1>Matrix View</h1>
            <p>Select two dimensions to generate a matrix of images based on these filters.</p>
            <div className='grid-select'>
              <Container fluid>
                <Table className='matrix-table'>
                  <thead>
                    <tr className='row'>
                      <td className='col-md-2'></td>
                    {this.state.tagsets.map(ts => (
                      <td className='col-md-2'><strong>{ts.set_name}</strong></td>
                    ))}
                    </tr>
                  </thead>
                  {this.state.tagsets.map(tagset1 => (
                    <tr className='row'>
                      <td className='col-md-2'><strong>{tagset1.set_name}</strong></td>
                      {this.state.tagsets.map(tagset2 => (
                        <td className='col-md-2'><Button className='matrix-select-button' color="link" onClick={() => this.setMatrix(tagset1.set_name, tagset2.set_name)}>{tagset1.set_name} vs {tagset2.set_name}</Button></td>
                      ))}
                    </tr>
                  ))}
                </Table>
              </Container>
            </div>
            {/* <Form>
              <FormGroup>
                <Label for="tag1">Choose the first tag</Label>
                <Input type="select" name="tag_1" id="tag1" onChange={this.handleChange}>
                  {this.state.tagsets.map(tagset => (
                    <option key={tagset.set_name}>{tagset.set_name}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="tag2">Choose the second tag</Label>
                <Input type="select" name="tag_2" id="tag2" onChange={this.handleChange}>
                  {this.state.tagsets.map(tagset => (
                    <option key={tagset.set_name}>{tagset.set_name}</option>
                  ))}
                </Input>
              </FormGroup>
              <Button onClick={this.showMatrix}>Generate Matrix</Button>
            </Form> */}
          </div>
        )
      } else {
        return (<ImageMatrix tag_1={this.state.tag1} tag_2={this.state.tag2} dsid={this.state.dsid} />)
      }
    } else if (this.state.error !== undefined) {
      return <Error error_desc={this.state.error.message} />
    } else {
      return (
        <Container className="loading">
          <strong>Loading {this.props.dataset_name}...</strong>
          <Progress animated color="success" value="100" />
        </Container>
      )
    }
  }
}
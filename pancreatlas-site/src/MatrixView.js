import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Progress
} from 'reactstrap'
import ImageMatrix from './ImageMatrix';

export default class MatrixView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag1: null,
      tag2: null,
      toggled: false,
      tagsets: [],
      loaded: false,
      showMatrix: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.showMatrix = this.showMatrix.bind(this)
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/tagsets')
      .then(res => res.json())
      .then(result => {
        this.setState({
          tagsets: result,
          loaded: true,
          tag1: result[0].set_name,
          tag2: result[0].set_name
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

  render() {
    if (!this.state.loaded) {
      return (
        <div className="loading">
          <strong>Loading {this.props.dataset_name}...</strong>
          <Progress animated color="success" value="100" />
        </div>
      )
    } else {
      if (!this.state.showMatrix) {
        return (
          <div className='matrix-view'>
            <Form>
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
            </Form>
          </div>
        )
      } else {
        return (<ImageMatrix tag_1={this.state.tag1} tag_2={this.state.tag2} /> )
      }
    }
  }
}
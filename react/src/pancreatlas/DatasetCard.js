import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Col,
  Button
} from 'reactstrap'

export default class DatasetCard extends React.Component {
  render() {
    // This condition actually should detect if it's an Node environment
    if (typeof require.context === 'undefined') {
      const fs = require('fs');
      const path = require('path');

      require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
        const files = {};

        function readDirectory(directory) {
          fs.readdirSync(directory).forEach((file) => {
            const fullPath = path.resolve(directory, file);

            if (fs.statSync(fullPath).isDirectory()) {
              if (scanSubDirectories) readDirectory(fullPath);

              return;
            }

            if (!regularExpression.test(fullPath)) return;

            files[fullPath] = true;
          });
        }

        readDirectory(path.resolve(__dirname, base));

        function Module(file) {
          return require(file);
        }

        Module.keys = () => Object.keys(files);

        return Module;
      };
    }
    const images = require.context('../assets/', true)
    console.log(this.props.funding)
    let sponsors = this.props.funding !== undefined ? this.props.funding.split(',').map(source => images(`./${source}.jpg`)) : []
    let logo = 'http://www.placehold.it/326x116'
    try {
      logo = images(`./pancreatlas/logos/${this.props.title.toLowerCase().replace(/ /g, '-')}.png`)
    } catch (e) {
      console.log('Cannot find logo')
    }
    return (
      <Card className='h-100'>
        <CardImg className='ds-logo' src={logo} alt='placeholder' />
        <CardBody className='text-left'>
          <CardText><strong>{this.props.title}</strong></CardText>
          <div className='ds-alt'><CardText>{this.props.description}</CardText></div>
          {sponsors.map(item =>
            <Col md='6'>
              <img className='dataset-funder' src={item} alt={item} />
            </Col>
          )}
          <Button color='primary'>View Dataset</Button>
        </CardBody>
      </Card>
    )
  }
}

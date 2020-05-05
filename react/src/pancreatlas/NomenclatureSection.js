import React from 'react'
import {
  Table,
  Collapse
} from 'reactstrap'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

export default class NomenclatureSection extends React.Component {
  constructor (props) {
    super(props)
    let asterisk = (Object.keys(this.props.data).includes('asterisk')) ? this.props.data['asterisk'] : undefined
    let blacklist = ['Image info - Pancreas Region', 'Image info - Section Plane']
    let rows = Object.keys(this.props.data).filter(key => key !== 'asterisk' && blacklist.indexOf(key) < 0)
    let headings = Object.keys(this.props.data[rows[0]]).filter(key => key.toLowerCase() !== 'image')

    this.state = {
      rows: rows,
      headings: headings,
      open: false,
      asterisk: asterisk
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.openOverride !== this.props.openOverride && this.props.openOverride !== this.state.open) {
      this.setState({
        open: this.props.openOverride
      })
    }
  }

  render () {
    return (
      <div className='nomenclature-section'>
        <span className='nomenclature-collapse' onClick={() => this.setState({ open: !this.state.open })}><h3><FontAwesomeIcon className={this.state.open ? 'collapse-button collapse-button-open' : 'collapse-button collapse-button-closed'} icon='angle-right' />&nbsp;{this.props.sectionName}</h3></span>
        <Collapse isOpen={this.state.open} >
          <Table className='my-4' hover>
            <thead>
              <tr className='table-header-row'>
                <th>Term</th>
                {this.state.headings.map(heading => <th key={heading}>{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {this.state.rows.map(row => {
                return (
                  <tr key={row}>
                    <td className='nomenclature-title'><strong>{row}</strong></td>
                    {Object.keys(this.props.data[row]).filter(key => key.toLowerCase() !== 'image').map(heading => {
                      if (heading.toLowerCase() === 'description' && Object.keys(this.props.data[row]).includes('Image')) {
                        let img = require(`../assets/img/${this.props.data[row]['Image']}`)
                        let asdf = (<td key={heading} className='img-cell'><img className='nomenclature-img' src={img} alt='demo img' /><p dangerouslySetInnerHTML={{ __html: this.props.data[row][heading] }} /></td>)
                        return asdf
                      } else {
                        return (<td key={heading} dangerouslySetInnerHTML={{ __html: this.props.data[row][heading] }} />)
                      }
                    }
                    )}
                  </tr>
                )
              })}
            </tbody>
          </Table>
          {this.state.asterisk !== undefined && <p><em>* {this.state.asterisk.description}</em></p>}
        </Collapse>
        <hr />
      </div>
    )
  }
}

NomenclatureSection.defaultProps = {
  data: {},
  sectionName: 'no name'
}

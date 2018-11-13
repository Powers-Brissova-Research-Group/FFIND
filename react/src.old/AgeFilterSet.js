import React from 'react'
import {
  Row,
  Col,
  Input
} from 'reactstrap'

import {
  Collapse
} from 'react-collapse'


import AgeFilterItem from './AgeFilterItem'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import { faAngleRight } from '@fortawesome/free-solid-svg-icons'



export default class AgeFilterSet extends React.Component {

  constructor(props) {
    super(props)
    this.findAgeGroup = this.findAgeGroup.bind(this);
    // this.createFilters = this.createFilters.bind(this)
    this.updateFilters = this.updateFilters.bind(this)
    this.toggleGroup = this.toggleGroup.bind(this)
    this.state = {
      open: true,
      ageFilters: this.props.ages,
      gestational: this.props.ageGroup !== null && this.props.ageGroup.toUpperCase() !== 'GESTATIONAL',
      neonatal: this.props.ageGroup !== null && this.props.ageGroup.toUpperCase() !== 'NEONATAL',
      infancy: this.props.ageGroup !== null && this.props.ageGroup.toUpperCase() !== 'INFANCY',
      childhood: this.props.ageGroup !== null && this.props.ageGroup.toUpperCase() !== 'CHILDHOOD'
    }
    this.allFilters = this.props.ages
    this.AgeGroups = {
      GESTATIONAL: 0,
      NEONATAL: 1,
      INFANCY: 2,
      CHILDHOOD: 3,
      ADULT: 4
    };
    this.initialized = false
  }



  findAgeGroup(age) {
    let ageRe = /^(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+d|w|mo|y)?$/;
    let tmp = ageRe.exec(age)
    if (tmp[1] !== undefined) {
      if (Number(tmp[2]) < 33 && tmp[3] === 'w') {
        return this.AgeGroups.GESTATIONAL
      } else {
        return this.AgeGroups.NEONATAL
      }
    } else if (tmp[3] === 'd' || tmp[3] === 'w') {
      return this.AgeGroups.NEONATAL
    } else if (tmp[3] === 'mo') {
      if (Number(tmp[2]) <= 2) {
        return this.AgeGroups.NEONATAL
      } else if (Number(tmp[2]) <= 24) {
        return this.AgeGroups.INFANCY
      } else {
        return this.AgeGroups.CHILDHOOD
      }
    } else {
      if (Number(tmp[2]) <= 2) {
        return this.AgeGroups.INFANCY
      } else if (Number(tmp[2]) <= 10) {
        return this.AgeGroups.CHILDHOOD
      } else {
        return this.AgeGroups.ADULT
      }
    }
  }

  compareAges(age1, age2) {
    let ageRe = /^(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+d|w|mo|y)?$/;
    let a = ageRe.exec(age1)
    let b = ageRe.exec(age2)
    switch (a[3]) {
      case 'd':
        a[3] = 0;
        break;
      case 'w':
        a[3] = 1;
        break;
      case 'mo':
        a[3] = 2;
        break;
      case 'y':
        a[3] = 3
        break;
      default:
        a[3] = -1
    }

    switch (b[3]) {
      case 'd':
        b[3] = 0;
        break;
      case 'w':
        b[3] = 1;
        break;
      case 'mo':
        b[3] = 2;
        break;
      case 'y':
        b[3] = 3
        break;
      default:
        b[3] = -1
    }

    if (a[1] === 'G' && b[1] !== 'G') {
      return -1
    } else if (a[1] !== 'G' && b[1] === 'G') {
      return 1
    } else {
      if (a[3] < b[3]) {
        return -1
      } else if (a[3] > b[3]) {
        return 1
      } else {
        if (Number(a[2]) < Number(b[2])) {
          return -1
        } else if (Number(a[2]) > Number(b[2])) {
          return 1
        } else {
          if (a[4] === undefined && b[4] !== undefined) {
            return -1
          } else if (a[4] !== undefined && b[4] === undefined) {
            return 1
          } else {
            return 0
          }
        }
      }
    }
  }

  toggleGroup(checked, ages, key) {
    // let checked = evt.target.checked
    let newAges = null
    if (checked) {
      let nonAdded = ages.filter(age => this.state.ageFilters.indexOf(age) === -1)
      newAges = this.state.ageFilters.concat(nonAdded)
      this.setState({
        [key]: false
      })
    } else {
      newAges = this.state.ageFilters.filter(age => ages.indexOf(age) === -1)
      this.setState({
        [key]: true
      })
    }
    // let newAges = this.state.ages.filter(age => group.indexOf(age) === -1)
    this.updateFilters(newAges)
  }

  updateFilters(ages) {
    this.setState({ ageFilters: ages })
    this.props.callback('AGE', ages)
  }

  render() {
    // let ages = ['G8w', 'G12w', 'G12.3w', 'G15w', 'G15.5w', 'G17w', 'G17.3w', 'G18w', 'G32w', 'G33w', 'G33.4w+4d', 'G37w', 'G39.9w', 'G41w', '1d', '5d', '2mo', '3mo', '10mo', '20mo', '4y', '5y', '10y']

    let ageGroups = {
      gestational: [],
      neonatal: [],
      infancy: [],
      childhood: []
    }
    for (let age of this.allFilters) {
      let grp = this.findAgeGroup(age)
      switch (grp) {
        case 0:
          ageGroups.gestational.push(age)
          break;
        case 1:
          ageGroups.neonatal.push(age)
          break
        case 2:
          ageGroups.infancy.push(age)
          break;
        case 3:
          ageGroups.childhood.push(age)
          break;
        default:
          break
      }
    }
    let activeFilters = []
    for (let key of Object.keys(ageGroups)) {
      ageGroups[key].sort(this.compareAges)
      if (!this.state[key]){
        activeFilters = activeFilters.concat(ageGroups[key])
      }
    }
    if(!this.initialized){
      this.updateFilters(activeFilters)
      this.initialized = true
    }
    return (
      <div className='age-filter'>
        <Row>
          <Col md="8">
            <h4>AGE</h4>
          </Col>
          <Col className='text-right' md="4">
            <FontAwesomeIcon icon={faAngleRight} className={this.state.open ? 'collapse-button collapse-button-open' : 'collapse-button collapse-button-closed'} onClick={() => this.setState({ open: !this.state.open })} />
          </Col>
        </Row>
        <Collapse isOpened={this.state.open}>
          {Object.keys(ageGroups).map(key => (
            <div className='group-filter' key={key}>
              <Row>
                <Col md="9">
                  <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                </Col>
                <Col className='text-right' md="3">
                  <Input type="checkbox" defaultChecked={this.props.ageGroup === null || this.props.ageGroup.toUpperCase() === key.toUpperCase()} onChange={evt => this.toggleGroup(evt.target.checked, ageGroups[key], key)} />
                </Col>
              </Row>
              <AgeFilterItem ages={ageGroups[key]} group={key} callback={this.updateFilters} allFilters={this.allFilters} currentFilters={this.state.ageFilters} hidden={this.state[key]} />
            </div>
          ))}
        </Collapse>

      </div>
    )
  }
}
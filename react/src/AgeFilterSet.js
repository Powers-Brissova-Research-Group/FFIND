import React from 'react'
import {
  Row,
  Col,
  Input
} from 'reactstrap'

import AgeFilterItem from './AgeFilterItem'


export default class AgeFilterSet extends React.Component {

  constructor(props) {
    super(props)
    this.findAgeGroup = this.findAgeGroup.bind(this);
    // this.createFilters = this.createFilters.bind(this)
    this.updateFilters = this.updateFilters.bind(this)
    this.toggleGroup = this.toggleGroup.bind(this)
    this.state = {
      ageFilters: ['G8w', 'G12w', 'G12.3w', 'G15w', 'G15.5w', 'G17w', 'G17.3w', 'G18w', 'G32w', 'G33w', 'G33.4w+4d', 'G37w', 'G39.9w', 'G41w', '1d', '5d', '2mo', '3mo', '10mo', '20mo', '4y', '5y', '10y']
    }
    this.allFilters = ['G8w', 'G12w', 'G12.3w', 'G15w', 'G15.5w', 'G17w', 'G17.3w', 'G18w', 'G32w', 'G33w', 'G33.4w+4d', 'G37w', 'G39.9w', 'G41w', '1d', '5d', '2mo', '3mo', '10mo', '20mo', '4y', '5y', '10y']
    this.AgeGroups = {
      GESTATIONAL: 0,
      NEONATAL: 1,
      INFANCY: 2,
      CHILDHOOD: 3,
      ADULT: 4
    };
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

  toggleGroup(evt, ages){
    let checked = evt.target.checked
    let newAges = null
    if (checked){
      let nonAdded = ages.filter(age => this.state.ageFilters.indexOf(age) === -1)
      newAges = this.state.ageFilters.concat(nonAdded)
    } else {
      newAges = this.state.ageFilters.filter(age => ages.indexOf(age) === -1)
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
    for (let key of Object.keys(ageGroups)) {
      ageGroups[key].sort(this.compareAges)
    }
    return (
      <div className='age-filter'>
        {Object.keys(ageGroups).map(key => (
          <div className='group-filter' key={key}>
            <Row>
              <Col md="9">
                <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
              </Col>
              <Col md="3">
                <Input type="checkbox" defaultChecked={true} onChange={evt => this.toggleGroup(evt, ageGroups[key])} />
              </Col>
            </Row>
            <AgeFilterItem ages={ageGroups[key]} group={key} callback={this.updateFilters} allFilters={this.allFilters} currentFilters={this.state.ageFilters} />
          </div>
        ))}
      </div>
    )
  }
}
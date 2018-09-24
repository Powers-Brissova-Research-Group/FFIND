import React from 'react';
import CollectionRow from './CollectionRow'
export default class CollectionList extends React.Component {
  render() {
    return (
      <div className="collection-list">
        {this.props.collections.map(item => (
          <CollectionRow title={item.name} description={item.description} key={item.name}/>
        ))}
      </div>
    )
  }
}

CollectionList.defaultProps = {
  collections: [
    {
      name: 'Collection 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat tincidunt ante, et faucibus nisi rutrum eget. Vestibulum bibendum justo mi, vel aliquet orci rhoncus vitae. Donec et luctus augue. Suspendisse ut felis in tortor iaculis sodales id in elit. Aliquam lorem urna, elementum eget justo sit amet, placerat semper nunc.'
    },
    {
      name: 'Collection 2',
      description: 'Integer eget tortor consectetur, vulputate turpis consequat, convallis felis. Phasellus suscipit egestas eleifend. Mauris venenatis, augue id volutpat porta, odio ante finibus diam, non vestibulum mauris mauris condimentum felis. Nam convallis mi sit amet rutrum cursus. Proin justo tellus, consequat ac viverra ut, fringilla at tortor. Nam ut metus arcu.'
    },
    {
      name: 'Collection 3',
      description: 'Aliquam ut augue elementum velit commodo pharetra. Morbi leo magna, luctus eget tellus eu, mollis ultricies ipsum. Curabitur sodales neque eros. Donec non tellus hendrerit, egestas nisi quis, finibus odio. Cras malesuada, nunc a consectetur posuere, odio lacus volutpat est, sit amet euismod risus felis nec nunc.'
    },
    {
      name: 'Collection 4',
      description: 'In interdum pharetra leo et molestie. Ut ipsum velit, varius vitae nibh ac, condimentum ornare urna. Maecenas euismod eros quis arcu maximus tristique. Mauris cursus varius condimentum. Proin eget nulla ut nisi tempor tincidunt a nec massa. In iaculis velit quis felis placerat tincidunt. Phasellus fermentum euismod iaculis.'
    }
  ]
}
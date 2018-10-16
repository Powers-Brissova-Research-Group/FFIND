import React from 'react';
import { Link } from 'react-router-dom'


export default class PageNotFound extends React.Component {
  render() {
    return (
     <div className='page-not-found'>
      <h1>Oops! Page Not Found</h1>
      <p>The page you requested has not been found. Click <Link to={'/pancreatlas'}>here</Link> to return home.</p>
     </div>       
    )
  }
} 
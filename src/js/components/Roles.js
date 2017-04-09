import React from 'react';
import { render } from 'react-dom';
import rolesData from '../data/roles';

const Role = ({ title, organisation, period, key }) => (
  <div className="box">
    <div className="level is-marginless">
      <div className="level-left">
        <div className="level-item">
          <div className="heading">
            <h4 className="title is-6">{title}</h4>
          </div>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <span className='is-italic'>{period}</span>
        </div>
      </div>
    </div>
    <h5 className="is-bold">{organisation}</h5>
  </div>
);

const renderRoles = roles => roles.map(Role);

const Roles = ({ roles }) => (
  <div>{renderRoles(roles)}</div>
);

export default () => (
  render(
    <Roles roles={rolesData}/>,
    document.getElementById('roles')
  )
);

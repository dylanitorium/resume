import React from 'react';
import { render } from 'react-dom';
import rolesData from '../data/roles';

const CollapseIcon = () => (
  <div className="level-item">
    <a className="icon is-large">
      <i className="fa fa-chevron-circle-down"></i>
    </a>
  </div>
);


const Role = ({ title, organisation, period, description, location }) => (
  <div className="box role-box">
    <div className="level is-marginless">
      <div className="level-left">
        <div className="level-item">
          <div className="heading is-marginless">
            <h4 className="title is-6 is-bold is-spaced">{title}</h4>
            <h5 className="subtitle is-6">{organisation}</h5>
          </div>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <div className="content">
            <div className='is-italic'>{period}</div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    {description}
  </div>
);

const renderRole = ({ title, organisation, period, description, location, key }) => (
  <Role
    title={title}
    organisation={organisation}
    period={period}
    description={description}
    key={key} />
)

const renderRoles = roles => roles.map(renderRole);

const Roles = ({ roles }) => (
  <div>{renderRoles(roles)}</div>
);

export default () => (
  render(
    <Roles roles={rolesData}/>,
    document.getElementById('roles')
  )
);

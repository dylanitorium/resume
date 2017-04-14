import React from 'react';
import { render } from 'react-dom';
import qualificationsData from '../data/qualifications';

const QualificationIcon = ({ icon }) => (
  <div className="level-item">
    <span className="icon is-large">
      {icon}
    </span>
  </div>
);


const Qualification = ({ degree, institute, period, description, icon }) => (
  <div className="box role-box">
    <div className="level is-marginless">
      <div className="level-left">
        <QualificationIcon icon={icon} />
        <div className="level-item">
          <div className="heading is-marginless">
            <h4 className="title is-6 is-bold is-spaced">{degree}</h4>
            <h5 className="subtitle is-6">{institute}</h5>
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

const renderQualification = ({ degree, institute, period, description, icon, key }) => (
  <Qualification
    degree={degree}
    institute={institute}
    period={period}
    description={description}
    icon={icon}
    key={key}
    />
);

const renderQualifications = qualifications => qualifications.map(renderQualification);

const Qualifications = ({ qualifications }) => (
  <div>{renderQualifications(qualifications)}</div>
);

export default () => (
  render(
    <Qualifications qualifications={qualificationsData}/>,
    document.getElementById('qualifications')
  )
);

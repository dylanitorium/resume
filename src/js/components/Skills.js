import React from 'react';
import { render } from 'react-dom';
import skillsData from '../data/skills';

const getClassname = (tier) => {
  switch(tier) {
    case 2:
      return 'icon is-devicon is-tier-2';
    case 3:
      return 'icon is-devicon is-tier-3';
      case 1:
      default:
        return 'icon is-devicon';
  }
};

const Skill = ({ content, tier, key }) => (
  <div className="column is-2">
    <span className={getClassname(tier)}>
      {content}
    </span>
  </div>
);

const renderSkills = skills => skills.map(Skill);

const Skills = ({ skills }) => (
  <div className="columns is-multiline">{renderSkills(skills)}</div>
);

export default () => (
  render(
    <Skills skills={skillsData}/>,
    document.getElementById('skills')
  )
);

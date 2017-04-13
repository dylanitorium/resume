import React from 'react';
import { render } from 'react-dom';
import skillsData from '../data/skills';

const getClassname = (tier, colored) => {

};

class Skill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colored: false,
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  getWrapperClassname() {
    const { tier } = this.props
    switch(tier) {
      case 2:
        return 'icon is-devicon is-tier-2';
      case 3:
        return  'icon is-devicon is-tier-3';
      case 1:
      default:
        return  'icon is-devicon';
    }
  }

  getIconClassname() {
    const { content } = this.props;
    const { colored } = this.state;
    const colorClass = (colored) ? ' colored' : '';
    return `${content}${colorClass}`;
  }

  onMouseEnter() {
    this.setState({
      colored: true,
    });
  }

  onMouseLeave() {
    this.setState({
      colored: false,
    });
  }

  render() {
    return (
      <div className="column is-2">
        <span
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          className={this.getWrapperClassname()}
        >
          <i className={this.getIconClassname()}></i>
        </span>
      </div>
    )
  }
}

const renderSkill = ({ content, tier }) => (<Skill content={content} tier={tier} />)

const renderSkills = skills => skills.map(renderSkill);

const Skills = ({ skills }) => (
  <div className="columns is-multiline">{renderSkills(skills)}</div>
);

export default () => (
  render(
    <Skills skills={skillsData}/>,
    document.getElementById('skills')
  )
);

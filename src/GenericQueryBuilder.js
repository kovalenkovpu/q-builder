import React, { Component } from 'react';
import QueryBuilder from 'react-querybuilder';
import './GenericQueryBuilder.css';

const fields = [
  {name: 'firstName', label: 'First Name'},
  {name: 'lastName', label: 'Last Name'},
  {name: 'age', label: 'Age'},
  {name: 'address', label: 'Address'},
  {name: 'phone', label: 'Phone'},
  {name: 'email', label: 'Email'},
  {name: 'twitter', label: 'Twitter'},
  {name: 'isDev', label: 'Is a Developer?', value: false},
];

const controlClassnames = {
  queryBuilder: 'vg-q-builder',
  ruleGroup: 'vg-q-rule',
  combinators: 'vg-q-combinators',
  addRule: 'vg-q-addRule',
  addGroup: 'vg-q-addGroup',
  removeGroup: 'vg-q-removeGroup',
  rule: '',
  fields: '',
  operators: '',
  value: '',
  removeRule: '',
};

class CustomCombinator extends Component {
  state = {
    options: [
      {name: 'and', label: 'AND'},
      {name: 'or', label: 'OR'},
    ],
    isActive: 'and'
  };

  handleClick = (name) => {
    this.setState({
      isActive: name
    }, () => this.props.handleOnChange(name));
  };

  render() {
    const { isComplex } = this.props;
    const { options, isActive } = this.state;

    if (!isComplex) return null;

    return (
      options.map(({ name, label }) =>
        <button
          value={name}
          onClick={() => this.handleClick(name)}
          className={`vg-q-combinator-button ${isActive === name ? 'active' : ''}`}
        >
          {label}
        </button>
      )
    )
  }
}

class CustomAddGroup extends Component {
  render() {
    const { isComplex } = this.props;

    if (!isComplex) return null;

    return (
      <button
        onClick={this.props.handleOnClick}
        className={'vg-q-addGroup'}
      >
        Add Group
      </button>
    )
  }
}

class CustomAddFilter extends Component {
  render() {
    return (
      <button
        onClick={this.props.handleOnClick}
        className={'vg-q-addRule'}
      >
        Add Filter
      </button>
    )
  }
}

class ClearAll extends Component {
  handleClick = () => {
    console.log('cleared');
    this.props.clearHandler();
  };

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={'clear-all'}
      >
        Clear All
      </button>
    )
  }
}

export default class GenericQueryBuilder extends Component {
  queryTemplate = {
    "id": "g-a629551c-2743-4de9-943e-ba6582d67b3b",
    "rules": [
      {
        "id": "g-764af164-acd5-4c91-90dd-1bf05f79afc4",
        "rules": [
          {
            "id": "r-aa448f33-a3ea-43d8-9ffe-ce8cee12057a",
            "field": "firstName",
            "value": "",
            "operator": "null"
          }
          ],
        "combinator": "and"
      },
      {
        "id": "g-c9371c69-6b9d-422a-9dcb-fe9cc2aad425",
        "rules": [
          {
            "id": "r-60a87eb6-cb6d-458f-a603-c8bbaf2a5983",
            "field": "firstName",
            "value": "",
            "operator": "null"
          }
          ],
        "combinator": "and"
      }
      ],
    "combinator": "and"
  };

  state = {
    fields: fields,
    query: null,
  };

  logQuery = (query) => {
    console.clear();
    console.log(JSON.stringify(query, null, '\t'));
    this.setState({
      query
    });
  };

  getOperators = (field) => {
    if (field === 'lastName') return [{name: '<', label: '<'}, {name: '>', label: '>'}];
  };

  clearQuery = () => {
    // This isn/'t working as expected!
    this.setState({ query: this.queryTemplate }, () => {
      console.log('Force');
      this.forceUpdate();
    });
  };

  render() {
    const { isComplex } = this.props;
    const { query } = this.state;

    return (
      <setion className='builder-wrapper'>
        <QueryBuilder
          query={query}
          fields={this.state.fields}
          onQueryChange={this.logQuery}
          controlClassnames={controlClassnames}
          getOperators={(field) => this.getOperators(field)}
          controlElements={{
            combinatorSelector: (props) => <CustomCombinator isComplex={isComplex} {...props} />,
            addGroupAction: (props) => <CustomAddGroup isComplex={isComplex} {...props} />,
            addRuleAction: (props) => <CustomAddFilter {...props} />
          }}
        />
        <ClearAll clearHandler={this.clearQuery}/>
    </setion>
    );
  }
}
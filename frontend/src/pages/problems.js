import React from 'react';
import { Component,useState, useEffect } from 'react'
import Axios from "axios";
import ProblemBody from '../components/problems/ProblemBody'
import Select from 'react-select'
import { colors } from '../global/vars';

export default class Problem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allProbs: [],
      bellProbs: [],
      jaleProbs: [],
      habeProbs: [],
      ghosProbs: [],

      bellSelected: [],
      jaleSelected: [],
      habeSelected: [],
      ghosSelected: [],

      selectedTags: [],
      selectedTitle: ""
    }

    this.options = [
      { value: 'Binary Search', label: 'Binary Search' }, { value: 'Bitmasks', label: 'Bitmasks' }, { value: 'Brute Force', label: 'Brute Force' },
      { value: 'DP', label: 'DP' }, { value: 'Geomertry', label: 'Geomertry' }, { value: 'Graphs', label: 'Graphs' }, { value: 'Greedy', label: 'Greedy' },
      { value: 'Math', label: 'Math' }, { value: 'Number Theory', label: 'Number Theory' }, { value: 'Prefix-Sum', label: 'Prefix-Sum' },
      { value: 'Probability', label: 'Probability' }, { value: 'Shortest Paths', label: 'Shortest Paths' }, { value: 'Sorting', label: 'Sorting' },
      { value: 'Trees', label: 'Trees' }, { value: 'Two Pointers', label: 'Two Pointers' }
    ]
  }


  handleTagsChange(e) {
    this.setState({selectedTags: e}, this.handleFilter)
  }

  handleTitleChange(e) {
    this.setState({selectedTitle: e.target.value}, this.handleFilter)
  }

  handleFilter() {
    this.setState({bellSelected: this.state.bellProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
    this.setState({jaleSelected: this.state.jaleProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
    this.setState({habeSelected: this.state.habeProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
    this.setState({ghosSelected: this.state.ghosProbs.filter((problem) => {
      return this.problemIsSelected(problem)
    })})
  }

  problemIsSelected(problem) {
    if (this.state.selectedTags.length !== 0) { //remove from screen if there are tags selected and none of them are a tag of the problem
      for (let i = 0; i < this.state.selectedTags.length; i++) {
        if (!problem.tags.includes(this.state.selectedTags[i])) {
          return false
        }
      }
    }
    if (this.state.selectedTitle !== "" && !problem.title.toLowerCase().includes(this.state.selectedTitle) && !problem.questionID.toString().includes(this.state.selectedTitle)) { //remove from screen if 
      return false
    }
    return true
  }

  async componentDidMount() {
    let allTemp = []
    let bellTemp = []
    let jaleTemp = []
    let habeTemp = []
    let ghosTemp = []
    await Axios.get("http://localhost:3002/problems").then((response) => {
      allTemp = response.data.result
    });
    allTemp.forEach(problem => {
      switch (problem.difficulty) {
        case 0:
          bellTemp.push(problem)
          break
        case 1:
          jaleTemp.push(problem)
          break
        case 2:
          habeTemp.push(problem)
          break
        case 3:
          ghosTemp.push(problem)
          break
      }
    })
    this.setState({
      allProbs: allTemp,
      bellProbs: bellTemp,
      bellSelected: bellTemp,
      jaleProbs: jaleTemp,
      jaleSelected: jaleTemp,
      habeProbs: habeTemp,
      habeSelected: habeTemp,
      ghosProbs: ghosTemp,
      ghosSelected: ghosTemp
    })
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3em',
        padding: '0em 3em',
        maxHeight: 'calc(100vh - 8em)',
        zIndex: 1
      },
      problemBodyContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '3em',
        paddingTop: '2em'
      },
      pad: {
        minHeight: '1em',
        marginTop: '-3em',
        width: '100%'
      },
      bySearchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3em',
        position: 'absolute',
        top: '3em'
      },
      constrainText: {
        color: colors.accent1,
        fontSize: '2.7em'
      },
      textInput: {
        backgroundColor: colors.grey,
        fontSize: '2em',
        border: 'none',
        outline: 'none',
        width: '10em',
        fontWeight: 'bold',
        color: colors.accent2
      },
      tagSelect: {
        width: '10em',
        control: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: '1.4em',
          fontWeight: 'bold'
        })
      }
    }

    return (<div style={styles.container}>
      <div style={styles.bySearchContainer}>
        <Select styles={styles.tagSelect} options={this.options} onChange={this.handleTagsChange.bind(this)} isSearchable isMulti closeMenuOnSelect={false} placeholder="no tags selected"
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: colors.accent1,
              primary: colors.accent2,
              neutral0: colors.grey
            },
        })}/>
        <h5 style={styles.constrainText}>&larr; constrain your search &rarr;</h5>
        <input style={styles.textInput} placeholder="no title specified" type="text"  name="title" default="Enter" value={this.state.selectedTitle} onChange={this.handleTitleChange.bind(this)}/>
      </div>
      <div style={styles.problemBodyContainer}>
        <ProblemBody i={0} diff={"Bell"} problems={this.state.bellSelected}/>
        <ProblemBody i={1} diff={"Jalepeño"} problems={this.state.jaleSelected}/>
        <ProblemBody i={2} diff={"Habenero"} problems={this.state.habeSelected}/>
        <ProblemBody i={3} diff={"Ghost"} problems={this.state.ghosSelected}/>
      </div>
      </div>);
  }
};
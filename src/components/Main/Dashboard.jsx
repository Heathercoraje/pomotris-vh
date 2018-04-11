import React, { Component } from 'react';
import styled from 'styled-components';
import Timer from './Timer';
import Recordboard from './Recordboard';
import apiLocalStorage from '../../js/apiLocalStorage';
import { addColorDetail } from '../../js/helper';

class Dashboard extends React.Component {
  state = {
    records: [],
    categories: []
  };

  // I am leaving log statements for us to make sure things are working
  // these log statements need to be removed before deployment

  componentWillMount() {
    apiLocalStorage.loadRecords().then(records => {
      this.setState({ records });
    }).catch(err=>{
      console.log('Failed to retrieve records');
    });
    apiLocalStorage.loadCategories().then(categories => {
      this.setState({ categories });
    }).catch(err=>{
      console.log('Failed to retrieve category data');
    });
  }
  handleRecordSubmit = newRecord => {
    const records = [...this.state.records, newRecord];
    console.log('success saving a new record');
    apiLocalStorage
      .saveRecords(records)
      .then(() => {
        console.log('success saving a new record');
        this.setState({
          records
        });
        console.log('success updating records state');
      })
      .catch(err => {
        console.error(
          'Sorry, Are you sure your localStorage is currently available?'
        );
      });
  };

  updateRecordsDetails = (data) => {
    const prevRecords = this.state.records.slice();
    const categories = data;
    const records = addColorDetail(prevRecords, categories);
    apiLocalStorage.saveRecords(records).then(()=>{
      this.setState({records});
    })
  }

  // if category is no longer valid, remove colors
  // this will be coming along soon after fixing updating d3 issue
  // validateColors =() => {
  // }

  handleCategorySubmit = data => {
    const categories = data;
    this.setState({ categories });
    apiLocalStorage
      .saveCategories(categories)
      .then(() => {
        console.log('success saving a new categories');
        this.setState({
          categories
        });
        console.log('success updating categories state');
      })
      .catch(err => {
        console.error(
          'Sorry, Are you sure your localStorage is currently available?'
        );
      });
    this.updateRecordsDetails(data);
  };

  render() {
    return (
      <div className="children-container">
        <Timer
          onRecordSubmit={this.handleRecordSubmit}
          onCategorySubmit={this.handleCategorySubmit}
          categories={this.state.categories}
        />
        <Recordboard
          records={this.state.records}
          categories={this.state.categories}
        />
      </div>
    );
  }
}

export default Dashboard;

import React from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import InputFields from './inputFields';
import { Redirect } from 'react-router';

export default class EditFlagCard extends React.Component<any, any>{

  constructor(props: any) {
    super(props);

    this.onChangeCountryname = this.onChangeCountryname.bind(this);
    this.onChangeCountrycode = this.onChangeCountrycode.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      countryname: '',
      countrycode: '',
      description: '',
      date: new Date(),
      redirect: "false"
    }
  }

  componentDidMount() {
    axios.get('https://flag-card.herokuapp.com/country/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          countryname: response.data.countryname,
          countrycode: response.data.countrycode,
          description: response.data.description,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeCountryname(e) {
    this.setState({
      countryname: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeCountrycode(e) {
    this.setState({
      countrycode: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const updatedCountryData = {
      countryname: this.state.countryname,
      countrycode: this.state.countrycode,
      description: this.state.description,
      date: this.state.date
    }

    console.log(updatedCountryData);

    axios.post('https://flag-card.herokuapp.com/country/update/' + this.props.match.params.id, updatedCountryData)
      .then(res => {
        console.log(res.data);
        this.setState({ redirect: "true" });
      });
  }

  render() {
    return (
      this.state.redirect === "true" ?
        <Redirect to="/" />
        :
        <div>
          <h3>Edit Country Description</h3>
          <InputFields action={"edit"} onSubmit={this.onSubmit.bind(this)} state={this.state} onChangeCountryname={this.onChangeCountryname.bind(this)} onChangeCountrycode={this.onChangeCountrycode.bind(this)} onChangeDate={this.onChangeDate.bind(this)} onChangeDescription={this.onChangeDescription.bind(this)} />
        </div>
    )
  }
}
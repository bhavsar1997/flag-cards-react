import React from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import InputFields from './inputFields';
import { Redirect } from 'react-router';

export default class CreateFlagCard extends React.Component<any,any> {
  constructor(props:any) {
    super(props);

    this.onChangeCountryname = this.onChangeCountryname.bind(this);
    this.onChangeCountrycode = this.onChangeCountrycode.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      countryname:'',
      countrycode:'',
      description:'',
      date: new Date(),
      redirect:"false"
    }
  }

  onChangeCountryname(e:any) {
    this.setState({
      countryname: e.target.value
    })
  }

  onChangeDescription(e:any) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeCountrycode(e:any) {
    this.setState({
      countrycode: e.target.value
    })
  }

  onChangeDate(date:Date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e:any) {
    e.preventDefault();

    const countryDetails = {
      countryname: this.state.countryname,
      description: this.state.description,
      countrycode: this.state.countrycode,
      date: this.state.date
    }

    console.log(countryDetails);

    axios.post('https://flag-card.herokuapp.com/country/add', countryDetails)
      .then(res => {console.log(res.data);
         this.setState({redirect:"true"});
         }).catch((error) => {console.log(error)})
  }

  render() {
    return (
      this.state.redirect==="true"?
      <Redirect to="/"/>
      :
    <div>
      <h3>Create New Card</h3>
        <InputFields action={"create"} onSubmit={this.onSubmit.bind(this)} state={this.state} onChangeCountryname={this.onChangeCountryname.bind(this)} onChangeCountrycode={this.onChangeCountrycode.bind(this)} onChangeDate={this.onChangeDate.bind(this)} onChangeDescription={this.onChangeDescription.bind(this)} />
    </div>
    )
  }
}
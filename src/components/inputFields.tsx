import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class InputFields extends React.Component<any,any> {
  render() {
    return (
      <form onSubmit={this.props.onSubmit.bind(this)}>
        <div className="form-group">
          <label>Country Name: </label>
          <input type="text"
            required
            className="form-control"
            value={this.props.state.countryname}
            onChange={this.props.onChangeCountryname.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Country Code: </label>
          <input type="text"
            required
            className="form-control"
            value={this.props.state.countrycode}
            onChange={this.props.onChangeCountrycode.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={this.props.state.description}
            onChange={this.props.onChangeDescription.bind(this)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.props.state.date}
              onChange={this.props.onChangeDate.bind(this)}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value={this.props.action === "edit" ? "Edit Country Card" : "Create Country Card"} className="btn btn-primary" />
        </div>
      </form>
    )
  }
}

export default InputFields;
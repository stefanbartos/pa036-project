import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import {
  defaultFromDate,
  defaultReloadTime,
  defaultToDate,
} from '../constants/defaultTimeSettings';

type TimeSettingsState = {
  fromDateTime: Date,
  toDateTime: Date,
  reloadTime: number,
};

type TimeSettingsProps = {
  saveSettings: (fromDate: Date, toDate: Date, reloadTime: number) => void,
};

export class TimeSettings extends React.PureComponent<TimeSettingsProps, TimeSettingsState> {
  static displayName = 'TimeSettings';
  static propTypes = {
    saveSettings: PropTypes.func.isRequired,
  };

  state = {
    fromDateTime: defaultFromDate,
    toDateTime: defaultToDate,
    reloadTime: defaultReloadTime,
  };

  _updateFromDateTime = (date: Date): void => {
    this.setState(prevState => ({
      ...prevState,
      fromDateTime: date,
    }));
  };

  _updateToDateTime = (date: Date): void => {
    this.setState(prevState => ({
      ...prevState,
      toDateTime: date,
    }));
  };

  _updateReloadTime = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const datetime = event.target.value;
    const parsedValue = parseInt(datetime, 10);
    this.setState(prevState => ({
      ...prevState,
      reloadTime: parsedValue,
    }));
  };

  _save = (_: any): void => {
    this.props.saveSettings(this.state.fromDateTime, this.state.toDateTime, this.state.reloadTime);
  };

  render(): React.ReactNode {
    return (
      <div>
        <div>
          <label>Begin time:</label>
          <ReactDatePicker
            onChange={this._updateFromDateTime}
            selected={this.state.fromDateTime}
            maxDate={new Date()}
          />
          <br />
          <label>Finish time:</label>
          <ReactDatePicker
            onChange={this._updateToDateTime}
            selected={this.state.toDateTime}
            minDate={this.state.fromDateTime}
            maxDate={new Date()}
          />
        </div>

        <div>
          <label>Reload time: (sec)</label>
          <input
            type="number"
            id="reloadTime"
            placeholder={this.state.reloadTime.toString()}
            required={true}
            onChange={this._updateReloadTime}
            min={2}
          />
        </div>
        <button
          onClick={this._save}
        >
          Submit
        </button>
      </div>
    );
  }
}

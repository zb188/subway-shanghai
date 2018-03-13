import React from 'react'

class TimesheetTable extends React.Component {
  constructor(props) {
    super(props)
  }
  
  formatNum(num) {
    if (num < 10) {
      num = '次日0' + num;
    }
    return '' + num;
  }
  
  addTime(currentTime, minutes) {
    const timeArr = currentTime.split(':');
    let hour = +timeArr[0];
    let minute = +timeArr[1];
    minute = minute + minutes;
    if (minute > 60) {
      hour = hour + parseInt(minute / 60);
      minute = minute % 60;
    } 
    if (hour > 23) {
      hour = hour - 24;
    }
    return this.formatNum(hour) + ':' + this.formatNum(minute);
  }
  
  timeExtend(weekday, lastTime) {
    if (weekday[weekday.length - 1] !== 0) {
      lastTime = this.addTime(lastTime, +weekday[weekday.length -1]);
    }
    return lastTime;
  }
    
  
  render() {
    const timesheetOfEachLine = this.props.timesheetOfEachLine;
    const timesheetTableDiv = [];
    const tableHead = <tr><th>方向</th><th>周日-周四</th><th>周五-周六</th></tr>;
    timesheetTableDiv.push(tableHead);
    for (const ele in timesheetOfEachLine) {
      const direction = ele.description;
      const firstTime = ele.firstTime;
      const lastTime = ele.lastTime;
      const lastTimeExtend = this.timeExtend(ele.weekday, lastTime);
      const style = lastTime === lastTimeExtend ? 'color:red;' : null;
      timesheetTableDiv.push(
        <tr><td>{direction}</td><td>{firstTime} {lastTime}</td><td>{firstTime} <span style={style}>{lastTimeExtend}</span></td></tr>
      );
    }
    return (
      <table>{timesheetTableDiv}</table>
    )
  }
}

export default TimesheetTable

import React, { Component } from 'react'
import { Card } from 'antd';
import './weatherCard.css';


export default class DayCard extends Component {
    render()
    {
    
    return (
        <Card className="day-tittle" title={this.props.day} style={{ width: 300 }}>
            <p className="day-time">{this.props.date} {this.props.time}</p>
            <p className="day-temp">{this.props.temp}</p>
            <p className="day-desc">{this.props.desc}</p>
        </Card>
    );
    }
}

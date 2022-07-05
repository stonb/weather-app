import React, { useState, useEffect } from 'react';
import { Col, Divider, Row, Select } from 'antd';
import DayCard from './weatherCard';
import 'antd/dist/antd.css';
import './weather.css';
import axios from 'axios';

const { Option } = Select;
//TODO Set Api key as ENV variable
const APIKEY = "APIKEY"; //API key from OpenWeather
var cityChoice = "newyork";
var apiURL = "";

const Weather = () => {
    const [dayOne , setDayOne] = useState('');
    const [dateOne , setDateOne] = useState('');
    const [timeOne , setTimeOne] = useState('');
    const [tempOne , setTempOne] = useState('');
    const [descOne , setDescOne] = useState('');

    const [dayTwo , setDayTwo] = useState('');
    const [dateTwo , setDateTwo] = useState('');
    const [timeTwo , setTimeTwo] = useState('');
    const [tempTwo , setTempTwo] = useState('');
    const [descTwo , setDescTwo] = useState('');

    const [dayThree , setDayThree] = useState('');
    const [dateThree , setDateThree] = useState('');
    const [timeThree , setTimeThree] = useState('');
    const [tempThree , setTempThree] = useState('');
    const [descThree , setDescThree] = useState('');

    const [dayFour , setDayFour] = useState('');
    const [dateFour , setDateFour] = useState('');
    const [timeFour , setTimeFour] = useState('');
    const [tempFour , setTempFour] = useState('');
    const [descFour , setDescFour] = useState('');

    const [dayFive , setDayFive] = useState('');
    const [dateFive , setDateFive] = useState('');
    const [timeFive , setTimeFive] = useState('');
    const [tempFive , setTempFive] = useState('');
    const [descFive , setDescFive] = useState('');

    const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const cities = {
        newyork: {lat:40.7, lon:-74.0},
        miami: {lat:25.77, lon:-80.20},
        sydney: {lat:-33.868820, lon:151.209290},
        shuzenji: {lat:35, lon:139},
        tokyo: {lat:35.689487, lon:139.691711},
        cairo: {lat:30.044420, lon:31.235712}
    }
    
    var weekWeather;
    var weekForecast = [{day:"", date: "", time: "", temp: 0, desc: ""}];

    function createDate(date)
    {
        const dateArray = date.split(" ");
        const dateYMD = dateArray[0].split("-");
        const dateTime = dateArray[1].split(":");
        return new Date(dateYMD[0], dateYMD[1]-1, dateYMD[2], dateTime[0], dateTime[1], dateTime[2]);
    }

    useEffect(() => {
        apiCall();
    });

    function setDaysWeather(weatherInfo)
    {
    
        var fiveDayArray = [];
        var today = new Date();
        var todayDay = today.getDate();
        weatherInfo.forEach(element => {
        var elementDate = createDate(element.dt_txt);

        if(todayDay !== elementDate.getDate())
        {
            if(elementDate.getHours() === 12)
            {
            fiveDayArray.push(element);
            }
        }
        });

        fiveDayArray.forEach(function (element, index) {
        var tempDate = createDate(element.dt_txt)
        
        var tempDay = weekdays[tempDate.getDay()];
        var tempMonthDay = months[tempDate.getMonth()] + " " +  tempDate.getDate();
        var tempTime = tempDate.getHours() + ":" + tempDate.getMinutes() + "0 pm";
        var tempTemp = element.main.temp + " \u2103";
        var tempDesc = (element.weather)[0].description;
        var tempDayObj = {day:tempDay, date: tempMonthDay, time: tempTime, temp: tempTemp, desc: tempDesc};
        weekForecast.push(tempDayObj)

        if (index === 0) { 
            setDayOne(tempDay);
            setDateOne(tempMonthDay);
            setTimeOne(tempTime);
            setTempOne(tempTemp);
            setDescOne(tempDesc);
        }
        else if (index === 1) 
        { 
            setDayTwo(tempDay);
            setDateTwo(tempMonthDay);
            setTimeTwo(tempTime);
            setTempTwo(tempTemp);
            setDescTwo(tempDesc);
        }
        else if (index === 2) 
        { 
            setDayThree(tempDay);
            setDateThree(tempMonthDay);
            setTimeThree(tempTime);
            setTempThree(tempTemp);
            setDescThree(tempDesc);
        }
        else if (index === 3) 
        { 
            setDayFour(tempDay);
            setDateFour(tempMonthDay);
            setTimeFour(tempTime);
            setTempFour(tempTemp);
            setDescFour(tempDesc);
        }
        else if (index === 4) 
        { 
            setDayFive(tempDay);
            setDateFive(tempMonthDay);
            setTimeFive(tempTime);
            setTempFive(tempTemp);
            setDescFive(tempDesc);
        }
        });

    }

    const handleChange = (value) => {
        cityChoice = value;
        if (APIKEY !== "APIKEY")
        {
            apiCall();
        }
        
    };

    const apiCall = () => {
        if(cities[cityChoice])
        {
            if (APIKEY !== "APIKEY")
            {
                // Please update the API KEY at the top of the file
                apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cities[cityChoice].lat + "&lon=" + cities[cityChoice].lon + "&appid=" + APIKEY + "&units=metric";

                axios.get(apiURL, {responseType: "json"})
                .then(res => {
                    const weather = res.data;
                    weekWeather = weather.list;
                    setDaysWeather(weekWeather);
                })
            }
            else
            {
                alert("PLEASE CHANGE API KEY!")
            }
        }
        else{
            console.log("City does not exist");
        }
    }

    return (
        <>
        <div className='weather-tittle' >5 Day Weather</div>
        <Divider>Select a city</Divider>
        
        {/* TODO get list of cities from array */}
        <Divider>
            <Select defaultValue="newyork" style={{ width: 300 }} onChange={handleChange}>
            <Option value="newyork">New York, USA</Option>    {/*lat 40.7 lon -74.0 */}
            <Option value="miami">Miami, USA</Option>         {/*lat 25.77 lon -80.20 */}
            <Option value="sydney">Sydney, Australia</Option> {/*lat -33.868820 lon 151.209290 */}
            <Option value="shuzenji">Shuzenji, Japan</Option> {/*lat 35 lon 139 */}
            <Option value="tokyo">Tokyo, Japon</Option>       {/*lat 35.689487 lon 139.691711 */}
            <Option value="cairo">Cairo, Egypt</Option>       {/*lat 30.044420 lon 31.235712 */}
            </Select>
        </Divider>
        
        <div className="site-card-wrapper">
            <Row gutter={[16,16]}>
            {/* TODO dinamyc day generation */}
            <Col className="gutter-row" span={4}>
                <DayCard 
                day={dayOne}
                date={dateOne}
                time={timeOne}
                temp={tempOne}
                desc={descOne}
                />
            </Col>
            <Col span={4}>
                <DayCard 
                day={dayTwo}
                date={dateTwo}
                time={timeTwo}
                temp={tempTwo}
                desc={descTwo}
                />
            </Col>
            <Col span={4}>
                <DayCard 
                day={dayThree}
                date={dateThree}
                time={timeThree}
                temp={tempThree}
                desc={descThree}
                />
            </Col>
            <Col span={4}>
                <DayCard 
                day={dayFour}
                date={dateFour}
                time={timeFour}
                temp={tempFour}
                desc={descFour}
                />
            </Col>
            <Col span={4}>
                <DayCard 
                day={dayFive}
                date={dateFive}
                time={timeFive}
                temp={tempFive}
                desc={descFive}
                />
            </Col>
            </Row>
        </div>
        <p></p>
        </>
        
    );
}

export default Weather;
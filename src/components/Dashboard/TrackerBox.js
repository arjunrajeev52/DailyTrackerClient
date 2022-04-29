import React from 'react';
import { Statistic } from 'semantic-ui-react'

const TrackerBox = ({ trackerData, setTrackerData, getResult }) => {

    React.useEffect(() => {
        let exp = 0;
        let Inc = 0;
        getResult(trackerData.apiData).map(d => exp += Number(d[3]))
        getResult(trackerData.apiData).map(d => Inc += Number(d[2]))
        setTrackerData((e) =>
        ({
            ...e, totalExpense: exp, totalIncome: Inc
        }));
    });

    return (
        <>
            <Statistic.Group widths='four'>
                <Statistic color='green'>
                    <Statistic.Value>{getResult(trackerData.apiData).length}</Statistic.Value>
                    <Statistic.Label>Total Request</Statistic.Label>
                </Statistic>
                <Statistic color='yellow'>
                    <Statistic.Value>{trackerData.totalIncome}</Statistic.Value>
                    <Statistic.Label>Income</Statistic.Label>
                </Statistic>
                <Statistic color='orange'>
                    <Statistic.Value>{trackerData.totalExpense}</Statistic.Value>
                    <Statistic.Label>Expense</Statistic.Label>
                </Statistic>
                <Statistic color='olive'>
                    <Statistic.Value>{trackerData.totalIncome - trackerData.totalExpense}</Statistic.Value>
                    <Statistic.Label>Balance</Statistic.Label>
                </Statistic>
                {/* <Statistic color='green'>
      <Statistic.Value>14</Statistic.Value>
      <Statistic.Label>green</Statistic.Label>
    </Statistic>
    <Statistic color='teal'>
      <Statistic.Value>82</Statistic.Value>
      <Statistic.Label>teal</Statistic.Label>
    </Statistic>
    <Statistic color='blue'>
      <Statistic.Value>1'</Statistic.Value>
      <Statistic.Label>blue</Statistic.Label>
    </Statistic>
    <Statistic color='violet'>
      <Statistic.Value>22</Statistic.Value>
      <Statistic.Label>violet</Statistic.Label>
    </Statistic> */}
            </Statistic.Group>
        </>
    );
};

export default TrackerBox;
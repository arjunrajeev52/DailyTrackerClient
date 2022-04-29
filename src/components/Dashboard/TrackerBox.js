import React from 'react';
import { Statistic } from 'semantic-ui-react'

const TrackerBox = ({ trackerData, setTrackerData, getResult }) => {

    function getSum(total, num) {
        return total + Math.round(num);
      }

    return (
        <>
            <Statistic.Group widths='four'>
                <Statistic color='green'>
                    <Statistic.Value>{getResult(trackerData.apiData).length}</Statistic.Value>
                    <Statistic.Label>Total Request</Statistic.Label>
                </Statistic>
                <Statistic color='yellow'>
                    <Statistic.Value>{getResult(trackerData.apiData).map(d => d.income).reduce(getSum, 0)}</Statistic.Value>
                    <Statistic.Label>Income</Statistic.Label>
                </Statistic>
                <Statistic color='orange'>
                    <Statistic.Value>{getResult(trackerData.apiData).map(d => d.expense).reduce(getSum, 0)}</Statistic.Value>
                    <Statistic.Label>Expense</Statistic.Label>
                </Statistic>
                <Statistic color='olive'>
                    <Statistic.Value>{getResult(trackerData.apiData).map(d => d.income).reduce(getSum, 0) - getResult(trackerData.apiData).map(d => d.expense).reduce(getSum, 0)}</Statistic.Value>
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
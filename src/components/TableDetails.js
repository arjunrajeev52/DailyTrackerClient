import React from "react";
import { Table, Icon } from "semantic-ui-react";

const TableDetails = (props) => {
  const { apiData, updateRow } = props;

  return (
    <Table fixed color='orange' key='orange'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Item</Table.HeaderCell>
          <Table.HeaderCell>Income</Table.HeaderCell>
          <Table.HeaderCell>Expense</Table.HeaderCell>
          <Table.HeaderCell>Account Type</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {apiData.length
          ? apiData.map((data, index) => {
            return (
              // index !==0 &&
              <>
                <Table.Row>
                  <Table.Cell>{data[0]}</Table.Cell>
                  <Table.Cell>{data[1]}</Table.Cell>
                  <Table.Cell>{data[2]}</Table.Cell>
                  <Table.Cell>{data[3]}</Table.Cell>
                  <Table.Cell>{data[4]}</Table.Cell>
                  <Table.Cell onClick={() => updateRow(index)}>
                    <Icon enabled name='edit outline' />
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })
          : ""}
      </Table.Body>
    </Table>);
};

export default TableDetails;
import React, { useState } from 'react';
import { View, StyleSheet, Text, Document, Page } from '@react-pdf/renderer';

export default function Table({ data }) {
  const [tableData, setTableData] = useState(data);
  const styles = StyleSheet.create({
    rowView: {
      display: 'flex',
      flexDirection: 'row',
      borderTop: '1px solid #EEE',
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: 'center',
    },
    body: {
      padding: 16,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });

  return (
    <>
      <Document
        title="Sale Ledger"
        creator="Easy Accounts"
        producer="Easy Accounts"
        author="Easy Accounts"
      >
        <Page size="A4" style={styles.body}>
          <Text style={styles.header}>Sale Ledger</Text>
          <View style={styles.rowView}>
            {tableData['columns'].map((c) => (
              <Text
                style={{
                  width: `${100 / tableData['columns'].length}%`,
                }}
              >
                {c}
              </Text>
            ))}
          </View>
          {tableData['data'].map((rowData) => (
            <>
              <View style={styles.rowView}>
                {tableData['columns'].map((c) => (
                  <Text
                    style={{
                      width: `${100 / tableData['columns'].length}%`,
                    }}
                  >
                    {rowData[c]}
                  </Text>
                ))}
              </View>
            </>
          ))}
        </Page>
      </Document>
    </>
  );
}

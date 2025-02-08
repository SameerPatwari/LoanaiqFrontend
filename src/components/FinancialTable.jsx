import { useState } from 'react';

const FinancialTable = ({ title, data, years, onDataChange }) => {
  const [tableData, setTableData] = useState(data);

  if (!tableData || !years) {
    return <div>Loading...</div>;
  }

  const handleEdit = (category, key, index, value) => {
    const updatedData = { ...tableData };
    updatedData[category][key][index] = value;
    setTableData(updatedData);
    onDataChange && onDataChange(title.toLowerCase().replace(/\s+/g, '_'), updatedData);
  };

  const tableStyles = {
    container: {
      position: 'relative',
      maxHeight: '600px',
      backgroundColor: '#F8EDED',
      color: '#173B45',
      display: 'flex',
      flexDirection: 'column',
    },
    wrapper: {
      overflowX: 'auto',
      overflowY: 'auto',
      maxHeight: '600px',
    },
    table: {
      borderCollapse: 'collapse',
      width: 'max-content',
      backgroundColor: '#F8EDED',
      color: '#173B45',
    },
    stickyHeader: {
      position: 'sticky',
      top: 0,
      zIndex: 3,
      backgroundColor: '#FF8225',
    },
    stickyFirstColumn: {
      position: 'sticky',
      left: 0,
      zIndex: 2,
      backgroundColor: '#FFFFFF',
      color: '#000000',
      width: '300px',
    },
    headerCell: {
      padding: '12px 8px',
      textAlign: 'center',
      backgroundColor: '#FF8225',
      color: '#F8EDED',
      width: '100px',
    },
    dataCell: {
      padding: '4px',
      backgroundColor: '#F8EDED',
      width: '100px',
      borderBottom: '1px solid #173B45',
    },
    input: {
      width: '90%',
      padding: '4px',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      border: '1px solid #B43F3F',
      borderRadius: '4px',
    },
    title: {
      color: '#173B45',
      padding: '16px',
      backgroundColor: '#F8EDED',
      margin: 0,
      textAlign: 'center',
    },
    rowHover: {
      backgroundColor: '#B43F3F',
    },
  };

  return (
    <div>
      <h3 style={tableStyles.title}>{title}</h3>
      <div style={tableStyles.container}>
        <div style={tableStyles.wrapper}>
          <table style={tableStyles.table}>
            <thead>
              <tr>
                <th style={{...tableStyles.stickyFirstColumn, ...tableStyles.stickyHeader}}>
                  Financial Term
                </th>
                {years.map((year, index) => (
                  <th key={index} style={{...tableStyles.headerCell, ...tableStyles.stickyHeader}}>
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(tableData).map(([category, items]) => {
                if (category === 'years' || typeof items !== 'object' || items === null) return null;
                
                return Object.entries(items).map(([key, values]) => {
                  const valueArray = Array.isArray(values) ? values : [];
                  
                  return (
                    <tr key={`${category}-${key}`} style={tableStyles.rowHover}>
                      <td style={tableStyles.stickyFirstColumn}>{key}</td>
                      {valueArray.map((value, index) => (
                        <td key={index} style={tableStyles.dataCell}>
                          <input
                            type="number"
                            style={tableStyles.input}
                            value={value || 0}
                            onChange={(e) =>
                              handleEdit(category, key, index, parseFloat(e.target.value) || 0)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialTable;
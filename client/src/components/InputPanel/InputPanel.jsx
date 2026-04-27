import React from 'react';
import AlgoConfig from './AlgoConfig';
import ProcessTable from './ProcessTable';
import ExampleLoader from './ExampleLoader';

const InputPanel = () => {
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <AlgoConfig />
      <ProcessTable />
      <ExampleLoader />
    </div>
  );
};

export default InputPanel;

import React from 'react';
import TreeView from 'devextreme-react/tree-view';
import List from 'devextreme-react/list';
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';

import { employees, showCheckboxesModeLabel, selectionModeLabel } from './data.js';

const showCheckBoxesModes = ['normal', 'selectAll', 'none'];
const selectionModes = ['multiple', 'single'];

const renderTreeViewItem = (item) => `${item.fullName} (${item.position})`;

const renderListItem = (item) => `${item.prefix} ${item.fullName} (${item.position})`;

const App = () => {
  const treeViewRef = React.useRef();
  const [selectedEmployees, setSelectedEmployees] = React.useState([]);
  const [selectNodesRecursive, setSelectNodesRecursive] = React.useState(true);
  const [selectByClick, setSelectByClick] = React.useState(false);
  const [showCheckBoxesMode, setShowCheckBoxesMode] = React.useState(showCheckBoxesModes[0]);
  const [selectionMode, setSelectionMode] = React.useState(selectionModes[0]);
  const [isSelectionModeDisabled, setIsSelectionModeDisabled] = React.useState(false);
  const [isRecursiveDisabled, setIsRecursiveDisabled] = React.useState(false);

  const treeViewSelectionChanged = React.useCallback((e) => {
    syncSelection(e.component);
  }, [syncSelection]);

  const treeViewContentReady = React.useCallback((e) => {
    syncSelection(e.component);
  }, [syncSelection]);

  const syncSelection = React.useCallback((treeView) => {
    const syncSelectedEmployees = treeView.getSelectedNodes()
      .map((node) => node.itemData);

    setSelectedEmployees(syncSelectedEmployees);
  }, [setSelectedEmployees]);

  const showCheckBoxesModeValueChanged = React.useCallback((e) => {
    const value = e.value;
    setShowCheckBoxesMode(value);

    if (value === 'selectAll') {
      setSelectionMode('multiple');
      setIsRecursiveDisabled(false);
    }
    setIsSelectionModeDisabled(value === 'selectAll');
  }, [setShowCheckBoxesMode, setSelectionMode, setIsRecursiveDisabled, setIsSelectionModeDisabled]);

  const selectionModeValueChanged = React.useCallback((e) => {
    const value = e.value;
    setSelectionMode(value);

    if (value === 'single') {
      setSelectNodesRecursive(false);
      treeViewRef.current.instance.unselectAll();
    }
    setIsRecursiveDisabled(value === 'single');
  }, [setSelectionMode, setSelectNodesRecursive, setIsRecursiveDisabled]);

  const selectNodesRecursiveValueChanged = React.useCallback((e) => {
    setSelectNodesRecursive(e.value);
  }, [setSelectNodesRecursive]);

  const selectByClickValueChanged = React.useCallback((e) => {
    setSelectByClick(e.value);
  }, [setSelectByClick]);

  return (
    <div>
      <div className="form">
        <h4>Employees</h4>
        <TreeView
          id="treeview"
          ref={treeViewRef}
          width={340}
          height={320}
          items={employees}
          selectNodesRecursive={selectNodesRecursive}
          selectByClick={selectByClick}
          showCheckBoxesMode={showCheckBoxesMode}
          selectionMode={selectionMode}
          onSelectionChanged={treeViewSelectionChanged}
          onContentReady={treeViewContentReady}
          itemRender={renderTreeViewItem}
        />
        {' '}
        <div className="selected-container">Selected employees
          <List
            id="selected-employees"
            width={400}
            height={200}
            showScrollbar="always"
            items={selectedEmployees}
            itemRender={renderListItem}
          />
        </div>
      </div>
      <div className="options">
        <div className="caption">Options</div>
        <div className="options-container">
          <div className="option">
            <span>Show Check Boxes Mode:</span>
            <div className="editor-container">
              <SelectBox
                items={showCheckBoxesModes}
                value={showCheckBoxesMode}
                inputAttr={showCheckboxesModeLabel}
                onValueChanged={showCheckBoxesModeValueChanged} />
            </div>
          </div>
          <div className="option">
            <span>Selection Mode:</span>
            <div className="editor-container">
              <SelectBox
                items={selectionModes}
                value={selectionMode}
                inputAttr={selectionModeLabel}
                disabled={isSelectionModeDisabled}
                onValueChanged={selectionModeValueChanged} />
            </div>
          </div>
          <div className="option">
            <div className="caption-placeholder">&nbsp;</div>
            <div className="editor-container">
              <CheckBox
                text="Select Nodes Recursive"
                value={selectNodesRecursive}
                disabled={isRecursiveDisabled}
                onValueChanged={selectNodesRecursiveValueChanged} />
            </div>
          </div>
          <div className="option">
            <div className="caption-placeholder">&nbsp;</div>
            <div className="editor-container">
              <CheckBox
                text="Select By Click"
                value={selectByClick}
                onValueChanged={selectByClickValueChanged} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

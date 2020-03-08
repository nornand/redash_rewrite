import React from "react";
import PropTypes from "prop-types";
import { isEmpty, toUpper, includes } from "lodash";
import Button from "antd/lib/button";
import List from "antd/lib/list";
import Modal from "antd/lib/modal";
import Input from "antd/lib/input";
import Steps from "antd/lib/steps";
import { getErrorMessage } from "@/components/ApplicationArea/ErrorMessage";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import { PreviewCard } from "@/components/PreviewCard";
import EmptyState from "@/components/items-list/components/EmptyState";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import helper from "@/components/dynamic-form/dynamicFormHelper";
import HelpTrigger, { TYPES as HELP_TRIGGER_TYPES } from "@/components/HelpTrigger";

const { Step } = Steps;
const { Search } = Input;

const StepEnum = {
  SELECT_TYPE: 0,
  CONFIGURE_IT: 1,
  DONE: 2,
};

class CreateSourceDialog extends React.Component {
  static propTypes = {
    dialog: DialogPropType.isRequired,
    types: PropTypes.arrayOf(PropTypes.object),
    sourceType: PropTypes.string.isRequired,
    imageFolder: PropTypes.string.isRequired,
    helpTriggerPrefix: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    types: [],
    helpTriggerPrefix: null,
  };

  state = {
    searchText: "",
    selectedType: null,
    savingSource: false,
    currentStep: StepEnum.SELECT_TYPE,
  };

  selectType = selectedType => {
    this.setState({ selectedType, currentStep: StepEnum.CONFIGURE_IT });
  };

  resetType = () => {
    if (this.state.currentStep === StepEnum.CONFIGURE_IT) {
      this.setState({ searchText: "", selectedType: null, currentStep: StepEnum.SELECT_TYPE });
    }
  };

  createSource = (values, successCallback, errorCallback) => {
    const { selectedType, savingSource } = this.state;
    if (!savingSource) {
      this.setState({ savingSource: true, currentStep: StepEnum.DONE });
      this.props
        .onCreate(selectedType, values)
        .then(data => {
          successCallback("已保存。");
          this.props.dialog.close({ success: true, data });
        })
        .catch(error => {
          this.setState({ savingSource: false, currentStep: StepEnum.CONFIGURE_IT });
          errorCallback(getErrorMessage(error.message));
        });
    }
  };

  renderTypeSelector() {
    const { types } = this.props;
    const { searchText } = this.state;
    const filteredTypes = types.filter(
      type => isEmpty(searchText) || includes(type.name.toLowerCase(), searchText.toLowerCase())
    );
    return (
      <div className="m-t-10">
        <Search
          placeholder="搜索..."
          onChange={e => this.setState({ searchText: e.target.value })}
          autoFocus
          data-test="SearchSource"
        />
        <div className="scrollbox p-5 m-t-10" style={{ minHeight: "30vh", maxHeight: "40vh" }}>
          {isEmpty(filteredTypes) ? (
            <EmptyState className="" />
          ) : (
            <List size="small" dataSource={filteredTypes} renderItem={item => this.renderItem(item)} />
          )}
        </div>
      </div>
    );
  }

  renderForm() {
    const { imageFolder, helpTriggerPrefix } = this.props;
    const { selectedType } = this.state;
    const fields = helper.getFields(selectedType);
    const helpTriggerType = `${helpTriggerPrefix}${toUpper(selectedType.type)}`;
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <img className="p-5" src={`${imageFolder}/${selectedType.type}.png`} alt={selectedType.name} width="48" />
          <h4 className="m-0">{selectedType.name}</h4>
        </div>
        <div className="text-right">
          {HELP_TRIGGER_TYPES[helpTriggerType] && (
            <HelpTrigger className="f-13" type={helpTriggerType}>
              配置指引 <i className="fa fa-question-circle" />
            </HelpTrigger>
          )}
        </div>
        <DynamicForm id="sourceForm" fields={fields} onSubmit={this.createSource} feedbackIcons hideSubmitButton />
      </div>
    );
  }

  renderItem(item) {
    const { imageFolder } = this.props;
    return (
      <List.Item className="p-l-10 p-r-10 clickable" onClick={() => this.selectType(item)}>
        <PreviewCard title={item.name} imageUrl={`${imageFolder}/${item.type}.png`} roundedImage={false}>
          <i className="fa fa-angle-double-right" />
        </PreviewCard>
      </List.Item>
    );
  }

  render() {
    const { currentStep, savingSource } = this.state;
    const { dialog, sourceType } = this.props;
    return (
      <Modal
        {...dialog.props}
        title={`创建新的数据集`}
        footer={
          currentStep === StepEnum.SELECT_TYPE
            ? [
                <Button key="cancel" onClick={() => dialog.dismiss()}>
                  取消
                </Button>,
                <Button key="submit" type="primary" disabled>
                  创建
                </Button>,
              ]
            : [
                <Button key="previous" onClick={this.resetType}>
                  上一步
                </Button>,
                <Button
                  key="submit"
                  htmlType="submit"
                  form="sourceForm"
                  type="primary"
                  loading={savingSource}
                  data-test="CreateSourceButton">
                  创建
                </Button>,
              ]
        }>
        <div data-test="CreateSourceDialog">
          <Steps className="hidden-xs m-b-10" size="small" current={currentStep} progressDot>
            {currentStep === StepEnum.CONFIGURE_IT ? (
              <Step title={<a>选择数据库类型</a>} className="clickable" onClick={this.resetType} />
            ) : (
              <Step title="选择数据库类型" />
            )}
            <Step title="配置" />
            <Step title="完成" />
          </Steps>
          {currentStep === StepEnum.SELECT_TYPE && this.renderTypeSelector()}
          {currentStep !== StepEnum.SELECT_TYPE && this.renderForm()}
        </div>
      </Modal>
    );
  }
}

export default wrapDialog(CreateSourceDialog);

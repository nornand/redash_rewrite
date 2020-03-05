import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal";
import Alert from "antd/lib/alert";
import DynamicForm from "@/components/dynamic-form/DynamicForm";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import recordEvent from "@/services/recordEvent";

class CreateUserDialog extends React.Component {
  static propTypes = {
    dialog: DialogPropType.isRequired,
    onCreate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { savingUser: false, errorMessage: null };
    this.form = React.createRef();
  }

  componentDidMount() {
    recordEvent("view", "page", "users/new");
  }

  createUser = () => {
    this.form.current.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ savingUser: true });
        this.props
          .onCreate(values)
          .then(() => {
            this.props.dialog.close();
          })
          .catch(error => {
            // TODO: Is raw error message correct here?
            this.setState({ savingUser: false, errorMessage: error.message });
          });
      }
    });
  };

  render() {
    const { savingUser, errorMessage } = this.state;
    const formFields = [
      { name: "name", title: "名称", type: "text", autoFocus: true },
      { name: "email", title: "邮箱", type: "email" },
    ].map(field => ({ required: true, props: { onPressEnter: this.createUser }, ...field }));

    return (
      <Modal
        {...this.props.dialog.props}
        title="创建新用户"
        okText="创建"
        cancelText="取消"
        okButtonProps={{ loading: savingUser }}
        onOk={() => this.createUser()}>
        <DynamicForm fields={formFields} ref={this.form} hideSubmitButton />
        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      </Modal>
    );
  }
}

export default wrapDialog(CreateUserDialog);

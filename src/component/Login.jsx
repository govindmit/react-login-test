import React, { Component } from "react";
import { login } from "../actions/userAction";
import { connect } from "react-redux";
import $ from "jquery";
import validate from "jquery-validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Flex,
  Box,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

class Login extends Component {
  state = {
    email: localStorage.getItem("userEmail"),
    password: "",
  };

  componentDidMount() {
    const data = localStorage.getItem("userEmail");

    $(document).ready(function () {
      $("#myform").validate({
        rules: {
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
          },
        },
        messages: {
          email: {
            required: "<p style='color:red'>Please provide a email</p>",
            email:
              "<p style='color:red'>Please enter a valid email address.</p>",
          },
          password: {
            required: "<p style='color:red'>Please provide  password</p>",
          },
        },
      });
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(reqData, (response) => {
      if (response.status === 200) {
        toast.success("Login successfully");
        localStorage.clear();
        this.setState({ displayCancelOrderModal: false });
      } else {
      }
    });
  };
  render() {
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <ToastContainer />
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <form id="myform" onSubmit={this.onSubmit} className="myform">
              <fieldset>
                <div className="form-outline mb-4">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <span style={{ color: "red" }}>{this.state.emailError}</span>
                </div>
                <div className="form-outline mb-2">
                  <FormLabel>Password</FormLabel>

                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <span style={{ color: "red" }}>
                    {this.state.passwordError}
                  </span>
                </div>
                <div className="form-outline mb-2">
                  <Button
                    type="submit"
                    name="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    marginLeft="40%"
                    marginTop="10%"
                  >
                    Sign in
                  </Button>
                </div>
              </fieldset>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }
}

const mapStateToProps = (store) => {
  var registerData = store;
  return registerData;
};
export default connect(mapStateToProps, {
  login,
})(Login);

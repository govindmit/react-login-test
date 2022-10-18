import React, { Component } from "react";
import { Link } from "react-router-dom";
import { register } from "../actions/userAction";
import { connect } from "react-redux";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Flex,
  Box,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

class Registration extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  };
  componentDidMount() {
    $(document).ready(function () {
      $("#myform").validate({
        rules: {
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            minlength: 3,
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
            minlength:
              "<p style='color:red'>Your password must consist of at least 3 characters</p>",
          },
        },
      });
    });
  }
  valid() {
    const validEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-5]).{6,}$");
    if (!validEmail.test(this.state.email)) {
      this.setState({ emailError: "please enter valid email" });
    } else if (!validPassword.test(this.state.password)) {
      this.setState({ passwordError: "please enter valid password" });
    } else {
      this.setState({ emailError: "" });
      this.setState({ emailError: "" });

      return true;
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();

    const reqdata = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.register(reqdata, (response) => {
      console.log(response.data.email, "fgsdfgsd");
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);
      toast.success("Registerd successfully");
      localStorage.setItem("userEmail", response.data.email);
      this.setState({ displayCancelOrderModal: false });
    });
  };

  render() {
    return (
      <>
        <ToastContainer />
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool{" "}
                <Link color={"blue.400"}>features</Link> ✌️
              </Text>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <form
                id="myform"
                onSubmit={this.onSubmit}
                method="post"
                className="myform"
              >
                <fieldset>
                  <div className="form-outline mb-4">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.emailError}
                    </span>
                  </div>
                  <div className="form-outline mb-2">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      id="password outlined-basic"
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
                  <br></br>
                  <Button
                    type="submit"
                    name="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    marginLeft="40%"
                  >
                    Sign up
                  </Button>
                  <br />
                  <br />
                  <span>If you already have account, you may login from </span>
                  <Link
                    class="nav-link"
                    to={"/login"}
                    style={{ color: "blue" }}
                  >
                    here
                  </Link>
                </fieldset>
              </form>
            </Box>
          </Stack>
        </Flex>
      </>
    );
  }
}

const mapDispatchToProps = (store) => {
  var registerData = store;
  return registerData;
};
export default connect(mapDispatchToProps, {
  register,
})(Registration);

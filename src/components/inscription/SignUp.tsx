import React, { Fragment, useContext, useState, useEffect } from "react";
import logo from "../../img/Auth/logo.png";
import "./SignUp.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fontSize, sizing } from "@mui/system";
import Loader from "../loader/Loader";
import { CreateContext } from "../../firebase/firebase";
import { Mail } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [errMail, setErrMail] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [errCheckbox, setErrCheckbox] = useState(false);
  const [errMailEx, setErrMailEx] = useState(false);
  const Cont = useContext(CreateContext);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.length < 0) {
      setErrMail(true);
    } else if (password.length < 6) {
      setErr(true);
    } else if (checkbox !== true) {
      setErrCheckbox(true);
    } else {
      await Cont.CreateFunction(email, password);
      const local = localStorage.getItem("createErr");
      if (local !== "") {
        console.log("email exist");
        setErrMailEx(true);
      } else {
        navigate("../AccountCreation");
      }
    }
  };
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#2F4F4F",
        contrastText: "#fff",
      },
    },
  });

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg">
          <div className="bg-form">
            <img className="logo" src={logo} alt="logo" />

            <Container component="main" sx={{ width: "70%", height: "200%" }}>
              <Box
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: 2,
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 0 }}
                >
                  {errMail ? (
                    <h5 style={{ fontSize: "6em" }}>
                      Vous devez renseigner un mail pour vous connecter!
                    </h5>
                  ) : (
                    console.log()
                  )}
                  {errMailEx ? (
                    <h5 style={{ fontSize: "6em" }}>
                      Le Mail que vous essayez de renseigner est déjà utilisé!
                      Ont ne peut pas s'inscrire deux fois à Beaux Batons!
                    </h5>
                  ) : (
                    console.log()
                  )}
                  <TextField
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    color="primary"
                    size="small"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  {err ? (
                    <h5 style={{ fontSize: "6em" }}>
                      Le mot de passe doit contenir au minimum 6 caractères
                    </h5>
                  ) : (
                    console.log()
                  )}
                  <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    size="small"
                    color="primary"
                    onChange={(event) => setPassword(event.target.value)}
                  />

                  {errCheckbox ? (
                    <h5 style={{ fontSize: "6em" }}>
                      Veuillez accepter les conditions générales
                    </h5>
                  ) : (
                    console.log()
                  )}
                  <FormControlLabel
                    control={<Checkbox value="remember" color="default" />}
                    label="J'accepte  les conditions général"
                    onChange={() => {
                      if (checkbox === false) {
                        setCheckbox(true);
                      } else {
                        setCheckbox(false);
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="button"
                    onClick={() => {
                      setErrCheckbox(false);
                      setErrMail(false);
                      setErrMailEx(false);
                      setErr(false);
                    }}
                    sx={{
                      mt: 0,
                      mb: 1,
                      backgroundColor: "#2F4F4F",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#2969699f",
                      },
                    }}
                  >
                    S'inscrire
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item></Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default SignUp;

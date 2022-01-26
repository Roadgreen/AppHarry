import React, { Fragment, useEffect, useState, useContext } from "react";
import Loader from "../../loader/Loader";
import "./HouseTest.css";
import Checkbox from "@mui/material/Checkbox";
import { HouseTestContext } from "../../../firebase/firebase";
import { TestContext } from "./HouseTest/Test";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { DragHandleOutlined, SetMealOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";

export function Presentation() {
  return (
    <Fragment>
      <h1 className="h1HouseTest">Bienvenue à l'école Beaux Batons</h1>
      <h5>L'école des Sorciers Française</h5>
      <p>
        Bienvenue, jeune sorcier. Le banquet de début d’année va bientôt
        commencer mais avant que vous preniez place dans la Salle du Sondeur,
        vous allez être répartis dans les différents Ordres. Cette répartition
        constitue une cérémonie très importante. Vous devez savoir, en effet,
        que tout au long de votre séjour à l’école, votre Ordre sera pour vous
        comme une seconde famille. Vous y suivrez les mêmes cours, vous y
        dormirez dans le même dortoir et vous passerez votre temps libre dans la
        même salle commune. Les Ordres sont au nombre de trois. Elles ont pour
        nom Aloysia, Lonicera et Urtica. Chaque Ordre a sa propre histoire, sa
        propre noblesse, et chacune d’elles a formé au cours des ans des
        sorciers et des sorcières de premier plan. Pendant votre année à Beaux
        Batons, chaque fois que vous obtiendrez de bons résultats, vous
        rapporterez des points à votre Ordre, mais chaque fois que vous
        enfreindrez les règles communes, votre Ordre perdra des points. À la fin
        de l’année scolaire, l'Ordre qui aura obtenu le plus de points gagnera
        la coupe des Trois Ordres ce qui constitue un très grand honneur.
        J’espère que chacun et chacune d’entre vous aura coeur de bien servir
        son Ordre, quelle qu’il soit. Le Sondeur choisira votre Ordre celon les
        réponses que vous donnerez à ce questionnaire!
      </p>
    </Fragment>
  );
}

function HouseTest() {
  const [mode, setMode] = useState("presentation");
  const [isLoading, setIsLoading] = useState(true);
  const [reponse, setReponse] = useState(0);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const two = "two";
  const three = "three";
  const four = "four";
  const Test = useContext(TestContext);
  const { Reponse } = useContext(HouseTestContext);
  useEffect(() => {
    Load();
    return ()=>{setIsLoading(Boolean)}
  });

  const Load = () => {
    setTimeout(()=>{setIsLoading(false)},2500)
  }

  const handleSubmit =
    (change: string) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (reponse === 0) {
        setErr(true);
      } else {
        Reponse.push(reponse);
        setMode(change);
      }
      
    };

  const handleEnd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reponse === 0) {
      setErr(true);
    } else {
      Reponse.push(reponse);
      navigate("../Ordre");
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bgHouseTest">
          <div className="bgFormHouseTest">
            {mode === "presentation" ? <Presentation /> : console.log()}
            {mode === "FirstQuestion" ? (
              <Box
                component="form"
                onSubmit={handleSubmit("two")}
                noValidate
                sx={{ mt: 0 }}
              >
                <h1>{Test.TestQuestion1[0][0]}</h1>
                {err ? (
                  <h3>Veuillez sélectionner une réponse!</h3>
                ) : (
                  console.log()
                )}
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Cliquer pour répondre{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="1"
                      onChange={() => {
                        setReponse(1);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[0][1]}
                    />
                    <FormControlLabel
                      value="2"
                      onChange={() => {
                        setReponse(2);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[0][2]}
                    />
                    <FormControlLabel
                      value="3"
                      onChange={() => {
                        setReponse(3);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[0][3]}
                    />
                    <FormControlLabel
                      value="4"
                      onChange={() => {
                        setReponse(4);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[0][4]}
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Button type="submit">Répondre</Button>
              </Box>
            ) : (
              console.log()
            )}
            {mode === "two" ? (
              <Box
                component="form"
                onSubmit={handleSubmit("three")}
                noValidate
                sx={{ mt: 0 }}
              >
                <h1>{Test.TestQuestion1[1][0]}</h1>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Cliquer pour répondre{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="1"
                      onChange={() => {
                        setReponse(1);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[1][1]}
                    />
                    <FormControlLabel
                      value="2"
                      onChange={() => {
                        setReponse(2);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[1][2]}
                    />
                    <FormControlLabel
                      value="3"
                      onChange={() => {
                        setReponse(3);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[1][3]}
                    />
                    <FormControlLabel
                      value="4"
                      onChange={() => {
                        setReponse(4);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[1][4]}
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Button type="submit">Répondre</Button>
              </Box>
            ) : (
              console.log()
            )}
            {mode === "three" ? (
              <Box
                component="form"
                onSubmit={handleSubmit('four')}
                noValidate
                sx={{ mt: 0 }}
              >
                <h1>{Test.TestQuestion1[2][0]}</h1>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Cliquer pour répondre{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="1"
                      onChange={() => {
                        setReponse(1);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[2][1]}
                    />
                    <FormControlLabel
                      value="2"
                      onChange={() => {
                        setReponse(2);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[2][2]}
                    />
                    <FormControlLabel
                      value="3"
                      onChange={() => {
                        setReponse(3);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[2][3]}
                    />
                    <FormControlLabel
                      value="4"
                      onChange={() => {
                        setReponse(4);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[2][4]}
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Button type="submit">Répondre</Button>
              </Box>
            ) : (
              console.log()
            )}
            {mode === "four" ? (
              <Box
                component="form"
                onSubmit={handleEnd}
                noValidate
                sx={{ mt: 0 }}
              >
                <h1>{Test.TestQuestion1[3][0]}</h1>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Cliquer pour répondre{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="1"
                      onChange={() => {
                        setReponse(1);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[3][1]}
                    />
                    <FormControlLabel
                      value="2"
                      onChange={() => {
                        setReponse(2);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[3][2]}
                    />
                    <FormControlLabel
                      value="3"
                      onChange={() => {
                        setReponse(3);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[3][3]}
                    />
                    <FormControlLabel
                      value="4"
                      onChange={() => {
                        setReponse(4);
                      }}
                      control={<Radio />}
                      label={Test.TestQuestion1[3][4]}
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Button type="submit">Répondre</Button>
              </Box>
            ) : (
              console.log()
            )}
            {mode === "presentation" ? (
              <Button
                onClick={() => {
                  setMode("FirstQuestion");
                }}
              >
                Passer a la première question
              </Button>
            ) : (
              console.log()
            )}
          </div>
        </div>
            )}   
    </Fragment>
  );
}

export default HouseTest;

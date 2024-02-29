import React, { useEffect } from "react";
import io from 'socket.io-client';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

type RegisterType = {
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  edad: number;
  celular: string;
  password: string;
};

export const App: React.FC<{}> = () => {
  // const [messages, setMessages] = useState([]);
  const [registerData, setRegisterData] = React.useState<RegisterType>({
    nombre: "",
    apPaterno: "",
    apMaterno: "",
    edad: 0,
    celular: "",
    password: "",
  });

  const dataRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const {
        nombre,
        apPaterno,
        apMaterno,
        edad,
        celular,
        password,
      } = registerData;

      const response = await axios.post("https://api-rest-hexagonal.onrender.com/clients", {
        nombre,
        apPaterno,
        apMaterno,
        edad,
        celular,
        password,
      });

      if (response) {
        console.log("Registro exitoso");

        setRegisterData({
          nombre: "",
          apPaterno: "",
          apMaterno: "",
          edad: 0,
          celular: "",
          password: "",
        });
      } else {
        console.error("Error al registrar");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const socket = io("https://socketserver-ybwx.onrender.com");

    socket.on("newClient", (message) => { 
      alert("Recibido: "+message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: "blue" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Paper sx={{ padding: "1.2em", borderRadius: "15px" }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography
                  variant="h5"
                  justifyContent="center"
                  sx={{ mt: 1, mb: 1 }}
                >
                  Registrar Cliente
                </Typography>
              </Stack>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="nombre"
                  margin="normal"
                  fullWidth
                  label="Nombre"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.nombre}
                />
                <TextField
                  name="apPaterno"
                  margin="normal"
                  fullWidth
                  label="Apellido Paterno"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.apPaterno}
                />
                <TextField
                  name="apMaterno"
                  margin="normal"
                  fullWidth
                  label="Apellido Materno"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.apMaterno}
                />{" "}
                <TextField
                  name="edad"
                  margin="normal"
                  fullWidth
                  label="Edad"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.edad}
                />{" "}
                <TextField
                  name="celular"
                  margin="normal"
                  fullWidth
                  label="Celular"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.celular}
                />{" "}
                <TextField
                  name="password"
                  margin="normal"
                  fullWidth
                  label="Password"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.password}
                />
                <Stack spacing={2} direction="row" justifyContent="end">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 2, mb: 3 }}
                  >
                    Registrar
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

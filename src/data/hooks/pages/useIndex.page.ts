import { ApiService } from "./../../services/ApiService";
import { useState, useMemo } from "react";
import { UserShortInterface } from "data/@types/UerInterface";
import { ValidationService } from "data/services/ValidationServices";

export default function useIndex() {
  const [cep, setCep] = useState(""),
    cepValido = useMemo(() => ValidationService.cep(cep), [cep]),
    [erro, setErro] = useState(""),
    [buscaFeita, setBuscaFeita] = useState(false),
    [carregando, setCarregando] = useState(false),
    [diaristas, setDiaristas] = useState([] as UserShortInterface[]),
    [diaristasRestantes, setDiaristasRestantes] = useState(0);

  function precionaEnter(event: any) {
    console.log(cep);
    console.log(process.env.VERCEL_URL);
    console.log(
      process.env.VERCEL_URL + "/diaristas-cidade?cep=" + cep.replace(/\D/g, "")
    );
    console.log(ApiService);

    if (event.key == "Enter" && !carregando && cepValido) {
      buscarProfissionais();
    }
  }
  function readInputCep(event: any) {
    var new_cep = event.target.value.replace(/\D/g, "");
    if (new_cep.length < cep.length) {
      setErro("");
    }
    setCep(new_cep);
  }

  async function buscarProfissionais() {
    setBuscaFeita(false);
    setCarregando(true);
    setErro("");

    try {
      console.log("Aqui");
      const { data } = await ApiService.get<{
        diaristas: UserShortInterface[];
        diaristas_restantes: number;
      }>("/diaristas-cidade?cep=" + cep.replace(/\D/g, ""));
      setBuscaFeita(true);
      setCarregando(false);

      setDiaristas(data.diaristas);
      setDiaristasRestantes(data.diaristas_restantes);
      // if (data.diaristas.length <= 6) {
      //   setDiaristas(data.diaristas);
      //   setDiaristasRestantes(0);
      // } else {
      //   setDiaristas(data.diaristas.slice(0, 6));
      //   setDiaristasRestantes(data.diaristas.length - 6);
      // }
    } catch (error) {
      setErro("CEP não encontrado ");
      setCarregando(false);
    }
  }

  return {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    erro,
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes,
    precionaEnter,
    readInputCep,
  };
}

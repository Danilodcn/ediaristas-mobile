import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { useTheme } from "@emotion/react";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import TextInput from "ui/components/inputs/TextInput/TextInput";
import { TextInputMask } from "react-native-masked-text";
import Button from "ui/components/inputs/Button/Button";
import UserInformation from "ui/components/data-display/UserInformation/UserInformation";
import {
  FormContainer,
  ErrorText,
  ResponseContainer,
  TextContainer,
} from "@styles/pages/EncontrarDiarista.style";

const EncontrarDiaristas: React.FC = () => {
  const { colors } = useTheme();
  const [cep, setCep] = useState("");

  return (
    <ScrollView>
      <PageTitle
        title={"Conheça os profissionais"}
        subtitle={
          "Preencha seu endereço e veja todos os profissionais da sua localidade"
        }
      />

      <FormContainer>
        <TextInputMask
          value={cep}
          onChangeText={setCep}
          type={"custom"}
          options={{ mask: "99.999-999" }}
          customTextInput={TextInput}
          customTextInputProps={{ label: "Digite seu CEP" }}
        />

        <ErrorText>CEP não encontrado</ErrorText>

        <Button
          mode={"contained"}
          onPress={() => {
            console.log("cricano");
          }}
          style={{ marginTop: 32 }}
          color={colors.accent}
        >
          Buscar
        </Button>
      </FormContainer>

      <ResponseContainer>
        <UserInformation
          name={"Eloisa Helena"}
          rating={4}
          picture={
            "https://cdn.pixabay.com/photo/2015/07/09/00/29/woman-837156_960_720.jpg"
          }
          description={"Açailandia"}
          darker={false}
        />
        <TextContainer>
          ... e mais X profissionais atendem ao seu endereço
        </TextContainer>
        <TextContainer>
          Ainda não temos nenhuma diarista disponível na sua localidade
        </TextContainer>

        <Button
          color={colors.accent}
          mode={"contained"}
          onPress={() => {
            console.debug("contratar");
          }}
        >
          contratar um profissional
        </Button>
      </ResponseContainer>
    </ScrollView>
  );
};

export default EncontrarDiaristas;

import { ApiService } from "./ApiService";

export const ValidationService = {
  cep(cep = ""): boolean {
    return cep.replace(/\D/g, "").length === 8;
  },
  async cepViaAPI(cep = "") {
    var url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
      const { data, status } = await ApiService.get<{ erro: string }>(url);
      var _status = status == 200 ? true : false;

      if (data.erro == undefined && _status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return { error: error };
    }
  },
};

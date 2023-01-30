const validationService = {
  ValidaCPF: function (strCPF) {
    strCPF = strCPF.replace(/\D/g, '');
    let Soma = 0;
    let Resto;

    if (strCPF == '00000000000') return false;
    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  },

  ValidaData: function (data) {
    data = data.split('/').reverse().join('/');
    if (data.length < 10) return false;
    let isValidDate = Date.parse(data);
    if (isNaN(isValidDate)) return false;
    if (isValidDate > new Date()) return false;
    return true;
  },
};

export default validationService;

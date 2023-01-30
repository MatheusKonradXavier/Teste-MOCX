import mongoose from 'mongoose';

const Pessoa = mongoose.model(
  "Pessoas",
  new mongoose.Schema({
      nome : {
        type : String,
        required : [true, 'É necessário preencher o campo nome']
      },
      data_nascimento : {
        type : Date,
        required : [true, 'É necessário preencher o campo data nascimento']
      },
      CPF : {
        type : Number,
        required : [true, 'É necessário preencher o campo CPF'],
        unique : true,
        immutable: true,
        validate: {
          validator: function (strCPF) {
            strCPF = strCPF.toString();
            let Soma = 0;
            let Resto;
            
            if (strCPF == "00000000000") return false;
            for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;
            
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
          
            Soma = 0;
            for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
        
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
            return true;
          },
          message: props => `${props.value} não é um CPF válido!`
        }
      }
  })
)

export default Pessoa;
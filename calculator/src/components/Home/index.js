import './home.css';
import React from "react";
import { useState} from "react";
import { useForm } from "react-hook-form";
import Api from "../../services/Api";




const Home = () => {
  
  const [dados, setDados] = useState([])
  const [valorParcelas, setValorParcelas] = useState([])
  
  const { register, handleSubmit } = useForm()

  const handleChange = (data) => {
    setValorParcelas(data)
    Api.post("/", data)
      .then(response => setDados(response.data))
  };


  const amanha = Math.round(dados[1] / valorParcelas.installments) - (valorParcelas.mdr / 100 * 1 / 30).toFixed(2)
  const quinzeDias = Math.round(dados[15] / valorParcelas.installments) - (valorParcelas.mdr / 100 * 15 / 30).toFixed(2)
  const trintaDias = Math.round((dados[30] / valorParcelas.installments) - valorParcelas.mdr / 100).toFixed(2)
  const noventaDias = Math.round(dados[90]/ valorParcelas.installments) - valorParcelas.mdr/100 *3

  
  return (
    <main>
      <form onSubmit={handleSubmit(handleChange)}>
        <h2>Simule sua Antecipação</h2>
        
        <label>Informe o valor da venda*</label>
        <input
          placeholder='R$ 0,00'
          type="text"
          autoComplete="none"
          name = 'amount'
          {...register('amount')}
        />
        <label>Em quantas parcelas*</label>
        <input
          type="text"
          autoComplete="none"
          name = 'installments'
          {...register('installments')}
        />
        <span className='max'>Máximo de 12 parcelas</span>

        <label>Informe o percentual do MDR*</label>
        <input 
          placeholder='%'
            type="text"
          autoComplete="none"
          name = 'mdr'
          {...register('mdr')}
        />
        <button type="submit">Calcular</button>
      </form>

      <div className='result'>
        <h3>VOCÊ RECEBERÁ:</h3>
        <span>Amanhã: R$ {amanha > 0 ?(amanha):('0,00')}</span>
        <span>Em 15 dias: R$ {quinzeDias > 0 ? quinzeDias:('0,00')}</span>
        <span>Em 30 dias: R$ {trintaDias>0 ?(trintaDias):('0,00') }</span>
        <span>Em 90 dias: R$ {noventaDias>0 ? (noventaDias):('0,00')}</span>
      </div>
        
    </main>
  )
};
   
export default Home;

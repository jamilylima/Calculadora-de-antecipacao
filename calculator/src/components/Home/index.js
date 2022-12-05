import './home.css';
import React from "react";
import { useState} from "react";
import { useForm } from "react-hook-form";
import Api from "../../services/Api";




const Home = () => {
  
  const [dados, setDados] = useState([])
  const { register, handleSubmit } = useForm()

  const handleChange = (data) => {
    setDados(data)
    Api.post("/", data)
      .then(response => setDados(response.data))
  };

  
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
        <span>Amanhã: R$ {dados[1]}</span>
        <span>Em 15 dias: R$ {dados[15]}</span>
        <span>Em 30 dias: R$ {dados[30]}</span>
        <span>Em 90 dias: R$ {dados[90]}</span>
      </div>
        
    </main>
  )
};
   
export default Home;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Clima.css'; 

const Clima = () => {
    const [cidade, setCidade] = useState('');
    const [temperatura, setTemperatura] = useState(null);
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');

    const apiKey = 'b1f22c7879fa92cbe35215b5caac126b';

    const buscarClima = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            const data = await response.json();
            setTemperatura(data.main.temp);
            setData(new Date().toLocaleDateString());
            setHora(new Date().toLocaleTimeString());
        } catch (error) {
            console.error("Erro ao buscar dados climáticos:", error);
            setTemperatura(null);
        }
    };

    const getBackgroundClass = () => {
        if (temperatura <= 0) return 'cold';
        if (temperatura > 0 && temperatura < 20) return 'cool';
        if (temperatura >= 20 && temperatura < 30) return 'warm';
        if (temperatura >= 30) return 'hot';
    };

    return (
        <div className={`container ${getBackgroundClass()}`}>
            <h1>Clima</h1>
            <div className='local'>
                <input
                    type='text'
                    placeholder='Informe sua cidade'
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />
                <button onClick={buscarClima}>Pesquisar</button>
                
                {temperatura !== null && (
                    <motion.div
                        className='seção'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className='clima-atual'>{temperatura}°C</h2>
                        <div className="dados">
                            <p>Data: {data}</p>
                            <p>Hora: {hora}</p>
                        </div>
                    </motion.div>
                )}
                {temperatura === null && (
                    <p>Cidade não encontrada ou erro ao buscar dados climáticos.</p>
                )}
            </div>
        </div>
    );
};

export default Clima;

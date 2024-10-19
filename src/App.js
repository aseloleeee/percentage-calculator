import React, { useState } from 'react';

function App() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    minHeight: '100vh',
    margin: '0 auto',
    backgroundColor: '#282c34',
    // paddingLeft: '0px'
  };

  const appInputStyle = {
    textAlign: 'left',
    backgroundColor: '#282c34',
    padding: '20px',
    width: '45%',
    color: 'white',
  };

  const appOutputStyle = {
    textAlign: 'left',
    backgroundColor: '#282c34',
    padding: '20px',
    width: '45%',
    color: 'white',
  };

  const separatorStyle = {
    width: '1px',
    height: '80%',
    backgroundColor: 'white',
    margin: '0 20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    color: '#282c34',
    cursor: 'pointer',
    marginRight: '10px'
  };

  const resetButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff6666'
  };

  const leverageSimStyle = {
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #61dafb',
    paddingTop: '10px',
    marginTop: '10px',
    color: '#61dafb'
  };

  const highlightTextStyle = {
    backgroundColor: '#ffff99',
    padding: '2px 4px',
    borderRadius: '4px',
    color:'black'
  };

  const [persentase, setPersentase] = useState(0);
  const [modal, setModal] = useState(0);
  const [leverage, setLeverage] = useState(1);
  const [outputPertama, setOutputPertama] = useState(null);
  const [outputKedua, setOutputKedua] = useState(null);
  const [persentaseLeverage, setPersentaseLeverage] = useState(null);
  const [leverageSim, setLeverageSim] = useState({});
  const [modalPersentase, setModalPersentase] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kalkulasi persentase * leverage
    const hasilPersentaseLeverage = (persentase / 100) * leverage;

    // Output kedua: hasil persentase * leverage dari modal
    const hasilOutputKedua = modal * hasilPersentaseLeverage;
    // Output pertama: modal - (persentase * leverage)
    const hasilOutputPertama = modal - hasilOutputKedua;

    // Set hasil ke state
    setPersentaseLeverage(hasilPersentaseLeverage);
    setOutputPertama(hasilOutputPertama);
    setOutputKedua(hasilOutputKedua);

    // Kalkulasi untuk leverage simulasi (lv+2, lv+4, lv+8)
    setLeverageSim({
      lvPlus2: modal * ((persentase / 100) * (leverage + 2)),
      lvPlus4: modal * ((persentase / 100) * (leverage + 4)),
      lvPlus8: modal * ((persentase / 100) * (leverage + 8))
    });

    // Kalkulasi modal untuk persentase 25%, 50%, dan 75% dan output perkiraan modal minus
    setModalPersentase({
      modal25: {
        modal: modal * 0.25,
        hasilMinus: modal * 0.25 - (persentase / 100 * leverage * modal * 0.25),
        hasilPerhitungan: (persentase / 100 * leverage * modal * 0.25),
      },
      modal50: {
        modal: modal * 0.50,
        hasilMinus: modal * 0.50 - (persentase / 100 * leverage * modal * 0.50),
        hasilPerhitungan: (persentase / 100 * leverage * modal * 0.50),
      },
      modal75: {
        modal: modal * 0.75,
        hasilMinus: modal * 0.75 - (persentase / 100 * leverage * modal * 0.75),
        hasilPerhitungan: (persentase / 100 * leverage * modal * 0.75),
      },
    });
  };

  const handleReset = () => {
    setPersentase(0);
    setModal(0);
    setLeverage(1);
    setOutputPertama(null);
    setOutputKedua(null);
    setPersentaseLeverage(null);
    setLeverageSim({});
    setModalPersentase({});
  };

  return (
    <div style={containerStyle}>
      <div className='appInput' style={appInputStyle}>
        <h1>Calculator Persentase</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Persentase (%) <br />:
              <input
                type="number"
                value={persentase}
                onChange={(e) => setPersentase(parseFloat(e.target.value))}
                step="0.01"
              />
            </label>
          </div>
          <div>
            <label>
              Modal ($) <br />:
              <input
                type="number"
                value={modal}
                onChange={(e) => setModal(parseFloat(e.target.value))}
                step="0.01"
              />
            </label>
          </div>
          <div>
            <label>
              Leverage <br />:
              <input
                type="number"
                value={leverage}
                onChange={(e) => setLeverage(parseFloat(e.target.value))}
                min="1"
              />
            </label>
          </div>
          <br />
          <button type="submit" style={buttonStyle}>Hitung</button>
          <button type="button" style={resetButtonStyle} onClick={handleReset}>Reset</button>
        </form>
      </div>

      {/* Garis pemisah */}
      <div style={separatorStyle}></div>

      <div className='appOutput' style={appOutputStyle}>
        <h1>Hasil Kalkulasi</h1>
        {persentaseLeverage !== null && (
          <div>
            <p>
              Persentase minus Leverage = {(persentaseLeverage * 100).toFixed(2)}%
            </p>
            <p>
              Perkiraan hasil modal minus = {(outputPertama).toFixed(2)}$
            </p>
            <p style={highlightTextStyle}>
              Perikiraan modal minus = {(outputKedua).toFixed(2)}$
            </p>
            
            {/* Simulasi Leverage */}
            <div style={leverageSimStyle}>
              <span>lv+2 = {(leverageSim.lvPlus2).toFixed(2)}$</span>
              <span>lv+4 = {(leverageSim.lvPlus4).toFixed(2)}$</span>
              <span>lv+8 = {(leverageSim.lvPlus8).toFixed(2)}$</span>
            </div>

            {/* Hasil kalkulasi 25%, 50%, dan 75% modal */}
            <div style={{ marginTop: '20px' }}>
              <h3>Hasil Kalkulasi untuk 25%, 50%, dan 75% Modal:</h3>
              <p>25% Modal = {(modalPersentase.modal25.modal).toFixed(2)}$ | {(modalPersentase.modal25.hasilMinus).toFixed(2)}$ | ={'>'} {(modalPersentase.modal25.hasilPerhitungan).toFixed(2)}$</p>
              <p>50% Modal = {(modalPersentase.modal50.modal).toFixed(2)}$ | {(modalPersentase.modal50.hasilMinus).toFixed(2)}$ | ={'>'} {(modalPersentase.modal50.hasilPerhitungan).toFixed(2)}$</p>
              <p>75% Modal = {(modalPersentase.modal75.modal).toFixed(2)}$ | {(modalPersentase.modal75.hasilMinus).toFixed(2)}$ | ={'>'} {(modalPersentase.modal75.hasilPerhitungan).toFixed(2)}$</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
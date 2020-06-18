import React, {useContext} from 'react';

import AlertContext from '../../contexts/alert/AlertContext';

const AlertsList = () => {
  const {state: alerts, clearAlert} = useContext(AlertContext);

  if (alerts.length === 0) return null;

  return (
    <section className='section pb-0'>
      <div className='container'>
        <div className='columns'>
          {alerts.map(({id, message}) => (
            <div key={id} className='column is-one-third is-offset-one-third'>
              <div className='notification has-background-white-bis has-text-dark'>
                <button
                  onClick={() => clearAlert(id)}
                  className='delete'
                ></button>
                {message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlertsList;

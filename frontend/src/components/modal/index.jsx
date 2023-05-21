import { useContext, useState } from 'react';
import FormToggleContext from '../../context/FormToggleContext';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
const Modal = ({ id }) => {
  const { modal } = useContext(FormToggleContext);
  const [paying, setPaying] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ngn');
  const { loading, data: singleData } = useFetch(`/events/${id}`);

  const data = {
    currency: currency,
    amount,
    event_owner: singleData?.response?.created_by,
  };
  const makeDonation = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      return;
    }
    if (currency === 'ngn') {
      if (amount <= 900) {
        alert('Minimun amount is 10000');
      }
    }
    setPaying(true);
    const response = await axios.post(
      `http://localhost:8080/api/v1/events/${id}/donate`,
      data
    );
    window.location.replace(response.data.data);
    setPaying(false);
  };

  return (
    <>
      <input type="checkbox" id={modal} className="modal-toggle" />
      <div className="modal bg-[rgba(0,0,0,0.75)]">
        <div className="modal-box w-[95%] md:w-2/6 rounded bg-[#1c1f26] border-[rgba(255,255,255,0.2)] border-[1px] text-[#ccc]">
          <label
            htmlFor={modal}
            className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent border-none text-[#d8c5c5] text-[1.3rem] hover:bg-transparent hover:text-black"
          >
            ✕
          </label>
          <div className="p-5 max-h-[500px]">
            {loading ? (
              <p>loading...</p>
            ) : (
              <>
                <div className="flex flex-col">
                  <div className="text-sm">
                    <h1 className="font-Kinn py-1">
                      {singleData?.response?.title}
                    </h1>
                  </div>
                  <p className="text-[12px] py-1 font-Heebo ">
                    {singleData?.response?.description}
                  </p>
                  <p className="my-2">
                    <img
                      src={singleData?.response?.image_url}
                      alt={singleData?.response?.title}
                    />
                  </p>
                  <div className="flex  pt-2 flex-col">
                    <div className="flex gap-2 mb-3 flex-col md:flex-row">
                      <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="1"
                        className=" flex-col md:w-[25%] px-2 py-2 md:py-0 outline-none border-none text-[#000] rounded-[6px]"
                      />
                      <select
                        name="currency"
                        className="select "
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="ngn">NGN</option>
                        <option value="usd">USD</option>
                      </select>
                      <button
                        className="btn gap-2 w-full md:w-[50%]"
                        onClick={makeDonation}
                        disabled={paying}
                      >
                        Donate
                      </button>
                    </div>
                    <button className="btn gap-2 bg-primary border-none hover:bg-primary hover:text-[#000]">
                      Volunteer
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

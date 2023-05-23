import { useContext, useState } from 'react';
import FormToggleContext from '../../context/FormToggleContext';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import Swal from 'sweetalert2';

const Modal = ({ id }) => {
  const { modal } = useContext(FormToggleContext);
  const [paying, setPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ngn');
  const [eventid, setEventId] = useState('');
  const { loading, data: singleData } = useFetch(`/events/${id}`);

  const [inputFields, setInputFields] = useState({
    volunteer_name: '',
    volunteer_phone: '',
    volunteer_email: '',
  });
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
      `https://novu.braga.com.ng/api/v1/events/${id}/donate`,
      data
    );
    window.location.replace(response.data.data);
    setPaying(false);
  };
  const handleFormChange = (e) => {
    const value = e.target.value;
    setInputFields({
      ...inputFields,
      [e.target.name]: value,
    });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (
      !inputFields.volunteer_email ||
      !inputFields.volunteer_name ||
      !inputFields.volunteer_phone ||
      !eventid ||
      !singleData?.response?.created_by
    ) {
      Swal.fire({
        title: 'All fields are required',
        text: 'Please fill out the volunteer form',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      let formData = {
        volunteer_name: inputFields.volunteer_name,
        volunteer_phone: inputFields.volunteer_phone,
        volunteer_email: inputFields.volunteer_email,
        eventid,
        created_by: singleData?.response?.created_by,
      };
      setIsLoading(true);
      const response = await axios.post(
        `https://novu.braga.com.ng/api/v1/events`,
        formData
      );
      setIsLoading(false);
      if (response.data.status) {
        alert(`${response.data.message}`);
        window.location = window.location;
      } else {
        alert(`${response.data.message}`);
      }
    }
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
                  <div className="flex  pt-2 flex-col mb-10 md:mb-0">
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
                    {singleData?.response?.requires_volunteer && (
                      <label
                        htmlFor="my-modal-3"
                        className="p-3 rounded-md text-center cursor-pointer gap-2 bg-primary border-none hover:bg-primary hover:text-[#000]"
                        onClick={() => setEventId(id)}
                      >
                        Volunteer
                      </label>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal bg-[rgba(0,0,0,0.75)]">
        <div className="modal-box w-[95%] md:w-2/6 rounded bg-[#1c1f26] border-[rgba(255,255,255,0.2)] border-[1px] text-[#ccc]">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm bg-transparent border-none absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Volunteer</h3>
          <div className="py-4">
            <div className="w-full pb-2">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full text-black"
                name="volunteer_name"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-1/2">
                <input
                  type="number"
                  min={0}
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full text-black"
                  name="volunteer_phone"
                  value={inputFields?.volunteer_phone}
                  onChange={handleFormChange}
                />
              </div>
              <div className="w-1/2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="input input-bordered w-full text-black"
                  name="volunteer_email"
                  value={inputFields?.volunteer_email}
                  onChange={handleFormChange}
                />
              </div>
              <input type="hidden" name="eventid" value={eventid} />
            </div>
            <button
              className="btn w-full bg-primary mt-2"
              onClick={(e) => submitForm(e)}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

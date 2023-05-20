import { useContext, useState } from 'react';
import FormToggleContext from '../../context/FormToggleContext';
import axios from 'axios';
const Modal = () => {
  const { modal } = useContext(FormToggleContext);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [amount, setAmount] = useState('');

  const data = {
    currency: 'ngn',
    amount,
  };
  const makeDonation = async (e) => {
    e.preventDefault();
    setPaying(true);
    const response = await axios.post(
      'http://localhost:8080/api/v1/events/646875b3a70d94f90c500046/donate',
      data
    );
    setPaying(false);
    console.log(response.data.data);
    window.location.replace(response.data.data);
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
                      Title description goes here.
                    </h1>
                  </div>
                  <p className="text-[12px] py-1 font-Heebo ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae, necessitatibus id. Nemo ullam aperiam facilis
                    repellat non pariatur autem quod esse, distinctio nobis ipsa
                    sunt eaque! Qui amet voluptas maiores.
                  </p>
                  <p className="my-2">
                    <img
                      src="https://templatekit.jegtheme.com/dyelex/wp-content/uploads/sites/102/2021/06/painting-the-walls-e1623048353262.jpg"
                      alt="img"
                    />
                  </p>
                  <div className="flex justify-between pt-2">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="1"
                        className="w-1/3 px-2 outline-none border-none text-[#000] rounded-[6px]"
                      />
                      <button
                        className="btn gap-2"
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

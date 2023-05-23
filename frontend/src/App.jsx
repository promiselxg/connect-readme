import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './components/modal';
import Card from './components/card';
import FormToggleContext from './context/FormToggleContext';
import useFetch from './hooks/useFetch';
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const { switchScreen, modal } = useContext(FormToggleContext);
  const [id, setID] = useState('');
  const { loading, data } = useFetch('/events');
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const x = searchParams.get('x');
    if (x) {
      const submitRecord = async () => {
        await axios.get(`https://novu.braga.com.ng/api/v1/events/${x}/confirm`);
      };
      submitRecord();
    }
    if (x) {
      Swal.fire({
        title: 'Donation successfull!',
        text: 'Your donation has been received.',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    }
  }, []);
  return (
    <>
      <div className="flex w-full py-7 ">
        <div className="container mx-[10px] md:mx-auto">
          <div className="container mx-auto py-5 text-center md:w-1/2">
            <h1 className="text-[20px] md:text-[70px] font-Kinn leading-[30px] md:leading-[80px] pt-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-700">
              Welcome to NOVU Donate
            </h1>
            <div className="flex w-full items-center text-center">
              <p className="text-center text-[rgba(255,255,255,0.5)] p-5 font-Heebo">
                We are inspired to work to provide a new standard of living and
                opportunities for children in difficult life circumstance,
                children of IDPs, children of fallen heros and all children
                affected by the war in Ukraine and Suda.
              </p>
            </div>
            <div className="container">
              <h1 className="text-[30px] font-Kinn leading-[80px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-700">
                Areas of Assistance
              </h1>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {loading ? (
              <>
                <div className="h-screen">
                  <h2 className="text-white">loading...</h2>
                </div>
              </>
            ) : (
              data?.data?.map((event) => (
                <label
                  htmlFor={modal}
                  onClick={() => switchScreen(event._id)}
                  onMouseDown={() => setID(event._id)}
                  key={event._id}
                >
                  <Card
                    title={event.title}
                    desc={event.description}
                    img={event.image_url}
                  />
                </label>
              ))
            )}
          </div>
          <div className="container py-10 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700">
            <h1>
              Powered by <a href="https://novu.co/">Novu</a>
            </h1>
            <p>The open-source notification infrastructure for Devlopers </p>
          </div>
          <Modal htmlFor={modal} id={id} />
        </div>
      </div>
    </>
  );
}

export default App;

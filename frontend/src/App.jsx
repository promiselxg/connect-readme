import { useContext } from 'react';
import Modal from './components/modal';
import Card from './components/card';
import Image from './components/image';
import FormToggleContext from './context/FormToggleContext';
import { FiFilter } from 'react-icons/fi';
function App() {
  const { switchScreen, modal } = useContext(FormToggleContext);

  return (
    <>
      <div className="flex w-full py-7 max-h-screen h-screen">
        <div className="container mx-[10px] md:mx-auto">
          <div className="container ">
            <div className="flex p-8 justify-between">
              <div className="flex items-center gap-3 text-white font-Kinn">
                <span>
                  <h1>Filter</h1>
                </span>
                <span>
                  <FiFilter />
                </span>
              </div>

              <div className="w-[25%] hidden md:flex  flex-col gap-3  p-3 rounded-[10px] border-[rgba(255,255,255,0.3)] border-[1px] text-white text-[28px]">
                <h1 className="text-[14px] font-Kinn">Technologies Used</h1>
                <div className="flex gap-3">
                  <span>
                    <Image
                      src="https://w7.pngwing.com/pngs/186/205/png-transparent-react-native-react-logos-brands-icon.png"
                      alt="react"
                      url="/"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </span>
                  <span>
                    <Image
                      src="https://res.cloudinary.com/practicaldev/image/fetch/s--EyU9RR6N--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5804/9c8d9724-6aea-4480-8832-40c47db5d14b.jpeg"
                      alt="react"
                      url="/"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </span>
                  <span>
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0lQmLnHQcpewSHisRMFB4BX6haNshM9TKSQ&usqp=CAU"
                      alt="paystack"
                      url="/"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </span>
                  <span>
                    <Image
                      src="https://image.pngaaa.com/668/4547668-middle.png"
                      alt="react"
                      url="/"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </span>
                  <span>
                    <Image
                      src="https://e7.pngegg.com/pngimages/768/167/png-clipart-mongodb-nosql-document-oriented-database-nosql-icon-leaf-grass.png"
                      alt="MongoDB"
                      url="/"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </span>
                  <span>
                    <Image
                      src="https://image.pngaaa.com/668/4547668-middle.png"
                      alt="react"
                      url="/"
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            <label htmlFor={modal} onClick={() => switchScreen(2345672)}>
              <Card
                title="Page title"
                desc="Let us know what you think of the daily.dev extension on the chrome store!"
                img="https://plus.unsplash.com/premium_photo-1681406994502-bb673c265877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              />
            </label>
            <label htmlFor={modal} onClick={() => switchScreen(222222123)}>
              <Card
                title="Page title"
                desc="Let us know what you think of the daily.dev extension on the chrome store!"
                img="https://templatekit.jegtheme.com/dyelex/wp-content/uploads/sites/102/2021/06/white-wall-with-triangle-theme-e1623048155565.jpg"
              />
            </label>
            <label htmlFor={modal} onClick={() => switchScreen(11111111)}>
              <Card
                title="Page title"
                desc="Let us know what you think of the daily.dev extension on the chrome store!"
                img="https://templatekit.jegtheme.com/dyelex/wp-content/uploads/sites/102/2021/06/painting-the-walls-e1623048353262.jpg"
              />
            </label>
            <label htmlFor={modal} onClick={() => switchScreen(2222222)}>
              <Card
                title="Page title"
                desc="Let us know what you think of the daily.dev extension on the chrome store!"
                img="https://templatekit.jegtheme.com/dyelex/wp-content/uploads/sites/102/2021/06/desk-and-wall-decoration-e1623048343491.jpg"
              />
            </label>
          </div>
          <Modal htmlFor={modal} />
        </div>
      </div>
    </>
  );
}

export default App;

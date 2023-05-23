import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';
import axios from 'axios';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [vol, setVol] = useState(true);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [inputFields, setInputFields] = useState({
    title: '',
    description: '',
  });

  const handleFormChange = (e) => {
    const value = e.target.value;
    setInputFields({
      ...inputFields,
      [e.target.name]: value,
    });
  };
  const imageHandleChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const timestamp = Math.round(new Date().getTime() / 1000);
    try {
      setUploading(true);
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'novu-2023');
          formData.append('timestamp', timestamp);
          formData.append('api_key', '461934834584427');
          const uploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/promiselxg/image/upload`,
            formData
          );

          const { data } = uploadRes;
          return data;
        })
      );

      const newPost = {
        title: inputFields.title,
        description: inputFields.description,
        requires_volunteer: vol,
        image_url: list[0].url,
        image_id: list[0].public_id,
        created_by: user.id,
        email: user.email,
      };

      try {
        await axios.post(`https://novu.braga.com.ng/api/v1/events/upload`, newPost);
        window.location = window.location;
      } catch (error) {
        Swal.fire({
          text: 'New Event creation failed.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      setUploading(false);
    } catch (error) {
      Swal.fire({
        text: 'New Event creation failed.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      setUploading(false);
    }
  };
  return (
    <>
      <div className="w-full border-b-[#333] border-b-[0.4px] text-white">
        <div className="container mx-auto flex justify-between items-center p-5">
          <div className="font-Kinn">
            <Link to="/">
              <h1 className="text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Novu Donate
              </h1>
            </Link>
          </div>
          {!user ? (
            <>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="logo">
                  <NovuProvider
                    subscriberId={user.email}
                    applicationIdentifier={'2nhXKIcp5Jor'}
                  >
                    <PopoverNotificationCenter colorScheme={'light'}>
                      {({ unseenCount }) => (
                        <NotificationBell unseenCount={unseenCount} />
                      )}
                    </PopoverNotificationCenter>
                  </NovuProvider>
                </div>
                <div className="dropdown dropdown-end  ">
                  <label
                    tabIndex={0}
                    className="btn m-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                  >
                    {user.username}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-[rgba(0,0,0,0.75)] rounded-box w-52"
                  >
                    <li>
                      <label htmlFor="my-modal-4" className="hover:bg-[#333]">
                        Create Event
                      </label>
                    </li>
                    <li>
                      <a
                        onClick={() => dispatch({ type: 'LOGOUT' })}
                        className="hover:bg-[#333]"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal bg-[rgba(0,0,0,0.75)]">
        <div className="modal-box relative w-[95%] md:w-2/6 rounded bg-[#1c1f26] border-[rgba(255,255,255,0.2)] border-[1px] text-[#ccc]">
          <label
            htmlFor="my-modal-4"
            className="btn btn-sm bg-transparent border-none absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Create a new Event.</h3>
          <div className="py-4 text-white">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-[#ccc]">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={inputFields.title}
                onChange={handleFormChange}
                className="input input-bordered w-full text-black"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-[#ccc]">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered text-black"
                name="description"
                placeholder="Description"
                value={inputFields.description}
                onChange={handleFormChange}
              ></textarea>
            </div>
            <div className="flex py-2">
              <label className="label cursor-pointer flex gap-2">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={vol}
                  name="volunteer"
                  onChange={(e) => setVol(e.target.checked)}
                />
                <span className="label-text text-white">
                  Requires Volunteering?
                </span>
              </label>
            </div>
            <div className="flex py-2">
              <input
                type="file"
                name="files"
                accept="image/*"
                onChange={imageHandleChange}
                className="file-input file-input-bordered w-full text-black"
              />
            </div>
            <button
              className="btn btn-primary w-full mt-2"
              disabled={uploading}
              onClick={submitForm}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

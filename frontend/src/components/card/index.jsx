const Card = ({ title, desc, img }) => {
  return (
    <>
      <div className="card rounded-[15px] w-full shadow-xl bg-[#1c1f26] border-[rgba(255,255,255,0.1)] border-[1px] text-white  hover:border-[rgba(255,255,255,0.2)] hover:cursor-pointer">
        <div className="py-5 px-4 h-fit md:h-[150px]">
          <h1 className="text-[16px] font-[400] font-Kinn text-[#fff]">
            {title}
          </h1>
          <p className="text-[16px] py-2 font-Heebo">{desc}</p>
        </div>
        <figure className="p-2 h-fit md:h-[250px]">
          <img
            src={img}
            alt={title}
            className="rounded-[15px] object-cover w-full h-fit md:h-[230px]"
          />
        </figure>
      </div>
    </>
  );
};

export default Card;

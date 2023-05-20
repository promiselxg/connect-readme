const Image = ({ url, src, label, ...children }) => {
  return (
    <>
      <a href={url}>
        <img src={src} alt={label} {...children} />
      </a>
    </>
  );
};

export default Image;

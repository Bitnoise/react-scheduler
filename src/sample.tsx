const Component = () => {
  return (
    <>
      {hasName && <h1>John Doe</h1>}
      {!!hasName && <h1>Unknown name</h1>}
    </>
  );
};

export default Component;

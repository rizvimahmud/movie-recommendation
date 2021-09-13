function Container({ children }) {
  return (
    <div className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-auto py-8 mx-auto">
      <main className="w-full">{children}</main>
    </div>
  );
}

export default Container;

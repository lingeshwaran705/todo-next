type propType = {
  error: string;
};
export default function Error({ error }: propType) {
  return (
    <>
      {error ? (
        <p className="absolute bottom-6 left-6 border border-red-500 bg-red-300 py-2 px-4 transition-all duration-200">
          {error}
        </p>
      ) : null}
    </>
  );
}

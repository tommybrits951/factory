export default function Announcements(props) {
  const { change, submit, announce, open } = props;
  function changeHandle(e) {
    return change(e);
  }
  function subHandle(e) {
    return submit(e);
  }
  function openHandle(e) {
    return open(e);
  }
  return (
    <form
      onSubmit={subHandle}
      className="absolute top-3 left-2/4 w-3/6 p-2 bg-stone-400 rounded-xl"
    >
      <h2 className="text-red-600 text-4xl text-center font-times">
        Change Announcements
      </h2>
      <br />
      <textarea
        name="data"
        value={announce.data}
        className="h-52 w-4/5 m-5"
        onChange={changeHandle}
      />
      <br />
      <button
        className="text-white bg-red-800 p-1 rounded m-2"
        name="cancel"
        onClick={openHandle}
      >
        Cancel
      </button>
      <button name="submit" className="bg-green-600 p-1 rounded m-2 text-white">
        Submit
      </button>
    </form>
  );
}

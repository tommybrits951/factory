export default function Form(props) {
  const { change, formData } = props;
  function changeHandle(e) {
    change(e);
  }
  return (
    <form>
      <label></label>
    </form>
  );
}

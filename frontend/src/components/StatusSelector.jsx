const StatusSelector = ({ status, setStatus }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="RETURN"
          checked={status === "RETURN"}
          onChange={() => setStatus("RETURN")}
        />
        Return
      </label>

      <label>
        <input
          type="radio"
          value="ATTEMPT"
          checked={status === "ATTEMPT"}
          onChange={() => setStatus("ATTEMPT")}
        />
        Attempt
      </label>
    </div>
  );
};

export default StatusSelector;

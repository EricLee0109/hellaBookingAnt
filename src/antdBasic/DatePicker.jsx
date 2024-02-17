import { useState } from "react";
// import "./App.css";
import { Alert, Button, DatePicker, Space, message, version } from "antd";

function App() {
  const [date, setDate] = useState(null);
  //   const [massageApi, contextHolder] = message.useMessage();
  const handleChange = (value) => {
    // massageApi.info(
    //   `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    // );
    // => notify message
    setDate(value);
  };

  return (
    <div style={{ width: 400, margin: "100px auto" }}>
      <DatePicker onChange={handleChange} />
      <div
        style={{
          marginTop: 16,
        }}
      >
        {/* Selected Date: {date ? date.format("YYYY-MM-DD") : "None"} */}
        <Alert
          message="Selected Date"
          description={date ? date.format("YYYY-MM-DD") : "None"}
        />
      </div>
      {/* {contextHolder} => use contextHolder to set message to popup notify */}
    </div>
  );
}

export default App;

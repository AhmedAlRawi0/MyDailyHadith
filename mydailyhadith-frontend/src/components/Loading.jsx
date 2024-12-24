import React from "react";
import "../styling/Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-box">
        <div className="loading-spinner"></div>
        <p className="loading-message">
          MyDailyHadith is loading, which may take up to a minute due to hosting
          constraints. <br />
          <strong>
            In the meantime, spend this moment sending Salawat (salutations)
            upon the Prophet ﷺ.
          </strong>
        </p>
        <p className="loading-salawat">ﷺ</p>
      </div>
    </div>
  );
};

export default Loading;

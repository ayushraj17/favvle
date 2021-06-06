import React from "react";

export default function GetUser(props) {
  console.log(props);
  return (
    <div>
      <div className="card-body">
        <div className="table-responsive">
          <div className="row" style={{ margin: 40 }}>
            <div className="col-sm-4">
              <label className="User Name">
                UserName:
                <span style={{ padding: 10 }}>{props.name}</span>
              </label>
            </div>
            <div className="col-sm-4">
              <label className="Email">
                Email:
                <span style={{ padding: 10 }}>{props.email}</span>
              </label>
            </div>
            <div className="col-sm-4">
              <label className="Plan Id">
                Mode of login:
                <span style={{ padding: 10 }}>{props.type}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

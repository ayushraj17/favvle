import axios from "axios";
import React from "react";
import { BASE_URL } from "../../../Constants";

const PlanDetail = (props) => {
  const [name, setName] = React.useState("");
  const [item_limit, setItem_limit] = React.useState("");
  const [rank_limit, setRank_limit] = React.useState("");
  const [newplan, setNewplan] = React.useState(0);

  React.useEffect(() => {
    axios
      .post(BASE_URL + "/admin/getPlan", {
        plan_id: props.plan_id,
      })
      .then((res) => {
        console.log(res);
        setName(res.data[0].name);
        setItem_limit(res.data[0].item_limit);
        setRank_limit(res.data[0].rank_limit);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handlePlan = () => {
    axios
    .post(BASE_URL + "/admin/changeuserplan", {
      plan_id: newplan,
      id: props.id
    })
    .then((res) => {
      axios
      .post(BASE_URL + "/admin/getPlan", {
        plan_id: newplan,
      })
      .then((res) => {
        console.log(res);
        setName(res.data[0].name);
        setItem_limit(res.data[0].item_limit);
        setRank_limit(res.data[0].rank_limit);
      })
      .catch((e) => {
        console.log(e);
      });
    })
    .catch((e) => {
      console.log(e);
    });
  }

  return (
    <div>
      <div className="card-body">
        <div className="table-responsive">
          <div className="row" style={{ margin: 10 }}>
            <div className="col-sm-4">
              <label className="Created">
                Plan Name:
                <span style={{ marginLeft: 10, width: 150 }}>{name}</span>
              </label>
            </div>
            <div className="col-sm-4">
              <label className="Country">
                Rank Limit:
                <span style={{ marginLeft: 10, width: 150 }}>{rank_limit}</span>
              </label>
            </div>
            <div className="col-sm-4">
              <label className="ListCreated">Item Limit:</label>
              <span style={{ marginLeft: 10, width: 150 }}>{item_limit}</span>
            </div>
          </div>
          <label style={{paddingLeft:20 }}for="plans">Change plan:</label>

          <select name="plans" id="plans" onChange={(e)=>setNewplan(e.target.value)}>
            <option value={0}>Free</option>
            <option value={1}>Fan</option>
            <option value={2}>Pro</option>
          </select>
          <button style={{ marginLeft: 20 }} className="btn btn-primary" onClick={handlePlan}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;

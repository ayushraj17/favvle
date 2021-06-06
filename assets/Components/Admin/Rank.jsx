import axios from "axios";
import React from "react";
import { BASE_URL } from "../../../Constants";
import RankModal from "../Admin/RankModal";

export default function Rank(props) {
  const [rank, setrank] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(BASE_URL + "/admin/getrankingbyuser", { user_id: props.id })
      .then((res) => {
        console.log(res)
        setrank(res.data.ranks);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <main>
        <div className="container-fluid" style={{ marginTop: 20 }}>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                        <tr>
                          <th>Ranking Name</th>
                          <th>Category</th>
                          <th>Rank Size</th>
                          <th>Create Time</th>
                          <th>Ranks List</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rank.map((item, i) => {
                          return (
                            <tr>
                              <td>{item.name}</td>
                              <td>
                                {item.category}
                              </td>
                              <td>
                                {item.ranking.length}
                              </td>
                              <td>
                                {new Date(item.created_at).getDate() +
                                  "/" +
                                  (new Date(item.created_at).getMonth() + 1) +
                                  "/" +
                                  new Date(item.created_at).getFullYear()}
                              </td>
                              <td><RankModal 
                                id={item._id}
                              /></td>
                            </tr>
                          );
                        })}
                      </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
